
import React, { useState, useEffect, useRef } from 'react';
import { GameState, Mahajanapada, Dynasty, King, QuizQuestion, QuizProgress, ActionScenario, JusticeCase, ModernInsight, GroundingSource } from './types';
import { MAHAJANAPADAS } from './constants';
import { getHistoricalScenario, getQuizQuestion, getJusticeCase, getModernLocationInfo, generateRoyalPortrait, editRoyalPortrait } from './services/geminiService';
import BattleSim from './components/BattleSim';
import MahajanapadaMap from './components/MahajanapadaMap';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [selectedMahajanapada, setSelectedMahajanapada] = useState<Mahajanapada | null>(null);
  const [currentDynastyIndex, setCurrentDynastyIndex] = useState(0);
  const [currentKingIndex, setCurrentKingIndex] = useState(0);
  const [actionScenario, setActionScenario] = useState<ActionScenario | null>(null);
  const [justiceCase, setJusticeCase] = useState<JusticeCase | null>(null);
  const [activeAdvisor, setActiveAdvisor] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion | null>(null);
  const [quizProgress, setQuizProgress] = useState<QuizProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [targetJanapada, setTargetJanapada] = useState<string | null>(null);
  const [isSuccession, setIsSuccession] = useState(false);
  const [successionInfo, setSuccessionInfo] = useState<{ old: string; new: string } | null>(null);
  const [modernInsight, setModernInsight] = useState<ModernInsight | null>(null);
  const [royalPortrait, setRoyalPortrait] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');

  const currentDynasty = selectedMahajanapada?.dynasties[currentDynastyIndex];
  const currentKing = currentDynasty?.kings[currentKingIndex];

  useEffect(() => {
    if (gameState === GameState.COURT && currentKing && currentDynasty) {
      const fetchPortrait = async () => {
        setLoading(true);
        const img = await generateRoyalPortrait(currentKing.name, currentDynasty.name);
        setRoyalPortrait(img);
        setLoading(false);
      };
      fetchPortrait();
    }
  }, [currentKing, gameState]);

  const handleAction = async (type: 'war' | 'treaty' | 'alliance' | 'justice') => {
    if (!currentKing || !selectedMahajanapada) return;

    if (type === 'justice') {
      setLoading(true);
      const totalQuestions = 3;
      setQuizProgress({ current: 1, total: totalQuestions });
      setActionScenario({ type, title: `COURT OF JUSTICE`, content: '' });
      const q = await getQuizQuestion(currentKing.name, selectedMahajanapada.name, 1);
      setQuiz(q);
      setGameState(GameState.QUIZ);
      setLoading(false);
    } else {
      setGameState(GameState.SELECT_TARGET);
      setActionScenario({ type, title: `${type.toUpperCase()} PROTOCOL`, content: '' });
    }
  };

  const selectTarget = async (mj: Mahajanapada) => {
    setLoading(true);
    setTargetJanapada(mj.name);
    const totalQuestions = 3;
    setQuizProgress({ current: 1, total: totalQuestions });
    
    const q = await getQuizQuestion(currentKing!.name, selectedMahajanapada!.name, 1, mj.name);
    setQuiz(q);
    setGameState(GameState.QUIZ);
    setLoading(false);
  };

  const handleQuizAnswer = async (index: number) => {
    if (!quiz || !quizProgress || !actionScenario) return;

    if (index === quiz.correctAnswer) {
      if (quizProgress.current >= quizProgress.total) {
        setLoading(true);
        if (actionScenario.type === 'justice') {
          const jCase = await getJusticeCase(currentKing!.name, selectedMahajanapada!.name);
          setJusticeCase(jCase);
          setGameState(GameState.JUSTICE_CASE);
        } else {
          const result = await getHistoricalScenario(actionScenario.type, currentKing!.name, selectedMahajanapada!.name, targetJanapada || undefined);
          setActionScenario({ ...actionScenario, content: result.text, sources: result.sources });
          setGameState(actionScenario.type === 'war' ? GameState.BATTLE : GameState.ACTION_RESULT);
        }
        setLoading(false);
        setQuizProgress(null);
      } else {
        setLoading(true);
        const nextIdx = quizProgress.current + 1;
        setQuizProgress({ ...quizProgress, current: nextIdx });
        const nextQuestion = await getQuizQuestion(currentKing!.name, selectedMahajanapada!.name, nextIdx, targetJanapada || undefined);
        setQuiz(nextQuestion);
        setLoading(false);
      }
    } else {
      setMessage("TRIAL FAILED: Your advisors question your authority. Action denied.");
      setTimeout(() => {
        setGameState(GameState.COURT);
        setMessage('');
        setQuizProgress(null);
        setTargetJanapada(null);
      }, 3000);
    }
  };

  const showModernInsight = async () => {
    if (!selectedMahajanapada) return;
    setLoading(true);
    const insight = await getModernLocationInfo(selectedMahajanapada.name, selectedMahajanapada.region);
    setModernInsight(insight);
    setGameState(GameState.MODERN_INSIGHT);
    setLoading(false);
  };

  const handlePortraitEdit = async () => {
    if (!royalPortrait || !editPrompt) return;
    setLoading(true);
    const newImg = await editRoyalPortrait(royalPortrait, editPrompt);
    setRoyalPortrait(newImg);
    setEditPrompt('');
    setLoading(false);
  };

  const handleJudgment = (outcome: string) => {
    setActionScenario({ ...actionScenario!, content: outcome, title: "THE ROYAL DECREE" });
    setGameState(GameState.JUSTICE_OUTCOME);
    setJusticeCase(null);
  };

  const passThrone = () => {
    if (!currentDynasty || !currentKing || !selectedMahajanapada) return;
    
    let nextKingName = "";
    let isFinalSuccession = false;

    if (currentKingIndex < currentDynasty.kings.length - 1) {
      nextKingName = currentDynasty.kings[currentKingIndex + 1].name;
    } else if (currentDynastyIndex < selectedMahajanapada.dynasties.length - 1) {
      nextKingName = selectedMahajanapada.dynasties[currentDynastyIndex + 1].kings[0].name;
    } else {
      isFinalSuccession = true;
    }

    if (isFinalSuccession) {
      setGameState(GameState.END);
      return;
    }

    setSuccessionInfo({ old: currentKing.name, new: nextKingName });
    setIsSuccession(true);

    setTimeout(() => {
      if (currentKingIndex < currentDynasty.kings.length - 1) {
        setCurrentKingIndex(prev => prev + 1);
        setGameState(GameState.COURT);
      } else if (currentDynastyIndex < selectedMahajanapada.dynasties.length - 1) {
        setCurrentDynastyIndex(prev => prev + 1);
        setCurrentKingIndex(0);
        setGameState(GameState.DYNASTY_SEQUENCE);
      }
      setIsSuccession(false);
      setSuccessionInfo(null);
      setRoyalPortrait(null);
    }, 3000);
  };

  const renderSources = (sources?: GroundingSource[]) => {
    if (!sources || sources.length === 0) return null;
    return (
      <div className="mt-8 pt-8 border-t border-amber-900/30">
        <h5 className="cinzel text-[10px] text-amber-500 uppercase tracking-widest mb-4">Historical Evidences & Sources:</h5>
        <div className="flex flex-wrap gap-3">
          {sources.map((s, i) => (
            <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-amber-900/20 border border-amber-500/20 rounded-full text-[10px] text-amber-200 hover:bg-amber-900/40 transition-all">
              {s.title} ↗
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#1a120b] text-[#f5e8c7]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl bg-[#2a1b0e]/90 border border-amber-900/40 rounded-3xl shadow-2xl backdrop-blur-md p-6 md:p-12 min-h-[700px] flex flex-col">
        {loading && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 rounded-3xl">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 cinzel text-amber-500 tracking-[0.2em] text-xl animate-pulse">Consulting the Scrolls...</p>
          </div>
        )}

        {isSuccession && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950 rounded-3xl animate-fade-in text-center p-8">
             <div className="text-8xl mb-8 animate-bounce">👑</div>
             <h2 className="cinzel text-4xl text-amber-500 mb-6 uppercase tracking-widest">Cycle of Sovereignty</h2>
             <p className="medieval text-amber-200/60 italic text-xl">"The reign of {successionInfo?.old} passes into the annals of history..."</p>
             <div className="h-px w-32 bg-amber-900/40 mx-auto my-6"></div>
             <p className="cinzel text-2xl text-amber-100 font-bold uppercase tracking-widest">The Crown Awaits</p>
             <p className="cinzel text-5xl text-amber-500 font-black gold-glow animate-pulse mt-2">{successionInfo?.new}</p>
          </div>
        )}

        {message && (
          <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[110] bg-red-950 text-white px-10 py-5 rounded-full shadow-2xl cinzel border border-amber-500/30 text-center animate-bounce">
            {message}
          </div>
        )}

        {gameState === GameState.START && (
          <div className="text-center flex-1 flex flex-col justify-center animate-fade-in">
            <h1 className="cinzel text-6xl md:text-8xl font-black text-amber-500 mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">MAHAJANAPADA</h1>
            <p className="medieval text-2xl md:text-3xl text-amber-200/50 mb-16 tracking-widest uppercase">Ancient India Strategy</p>
            <div className="max-w-xs mx-auto w-full">
              <button onClick={() => setGameState(GameState.SELECT_MAHAJANAPADA)} className="w-full bg-gradient-to-b from-amber-600 to-amber-800 text-white font-black py-5 px-10 rounded-xl transition-all transform hover:scale-105 cinzel tracking-[0.2em] shadow-2xl border-b-8 border-amber-950 uppercase">Forging Legacy</button>
            </div>
          </div>
        )}

        {gameState === GameState.SELECT_MAHAJANAPADA && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h2 className="cinzel text-3xl text-amber-500 mb-8 text-center uppercase tracking-[0.2em]">Select Your Mahajanapada</h2>
            <MahajanapadaMap onSelect={(mj) => {
              setSelectedMahajanapada(mj);
              setGameState(GameState.MAHAJANAPADA_BRIEF);
            }} />
          </div>
        )}

        {gameState === GameState.MAHAJANAPADA_BRIEF && selectedMahajanapada && (
          <div className="flex-1 flex flex-col animate-fade-in text-center justify-center max-w-4xl mx-auto">
            <h2 className="cinzel text-6xl text-amber-500 mb-8">{selectedMahajanapada.name}</h2>
            <p className="medieval text-amber-200/60 mb-8 text-xl italic uppercase tracking-widest">{selectedMahajanapada.region}</p>
            <div className="bg-amber-900/10 p-12 rounded-3xl border-2 border-amber-900/40 mb-12 shadow-inner">
               <p className="text-2xl leading-relaxed italic text-amber-100/90">"{selectedMahajanapada.significance}"</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button onClick={() => setGameState(GameState.SELECT_MAHAJANAPADA)} className="flex-1 py-5 border-2 border-amber-900/40 rounded-xl cinzel font-bold text-amber-500 hover:bg-amber-900/20">BACK TO MAP</button>
                <button onClick={showModernInsight} className="flex-1 py-5 border-2 border-amber-600/40 rounded-xl cinzel font-bold text-amber-600 hover:bg-amber-600/10 flex items-center justify-center gap-2">
                  <span>📍</span> MODERN INSIGHT
                </button>
              </div>
              <button onClick={() => setGameState(GameState.DYNASTY_SEQUENCE)} className="w-full py-5 bg-emerald-900 text-white rounded-xl cinzel font-black uppercase tracking-widest shadow-2xl transition-all hover:bg-emerald-800">I understand, and I want to proceed with my choice</button>
            </div>
          </div>
        )}

        {gameState === GameState.MODERN_INSIGHT && modernInsight && (
          <div className="flex-1 flex flex-col animate-fade-in text-center justify-center max-w-4xl mx-auto">
            <h2 className="cinzel text-4xl text-amber-500 mb-8 uppercase tracking-widest">Modern-Day {selectedMahajanapada?.name}</h2>
            <div className="bg-stone-900/80 p-12 rounded-3xl border-2 border-amber-900/40 mb-12 shadow-2xl overflow-y-auto max-h-[400px]">
               <p className="text-xl leading-relaxed text-amber-100/90 whitespace-pre-wrap">{modernInsight.content}</p>
               {renderSources(modernInsight.sources)}
            </div>
            <button onClick={() => setGameState(GameState.MAHAJANAPADA_BRIEF)} className="py-5 bg-amber-800 text-white rounded-xl cinzel font-bold uppercase tracking-widest">Return to Brief</button>
          </div>
        )}

        {gameState === GameState.DYNASTY_SEQUENCE && selectedMahajanapada && (
          <div className="flex-1 flex flex-col animate-fade-in overflow-hidden">
            <h2 className="cinzel text-3xl text-amber-500 mb-10 text-center uppercase tracking-widest">Historical Dynasties of {selectedMahajanapada.name}</h2>
            <div className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scroll">
              {selectedMahajanapada.dynasties.map((dyn, idx) => (
                <div key={idx} className="p-10 rounded-3xl border-2 border-stone-800 bg-stone-900/50 hover:border-amber-500 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="cinzel text-3xl text-amber-100 mb-1">{dyn.name}</h3>
                      <p className="text-amber-500/60 cinzel text-sm uppercase tracking-widest">{dyn.period}</p>
                    </div>
                    <button onClick={() => { setCurrentDynastyIndex(idx); setCurrentKingIndex(0); setGameState(GameState.COURT); }} className="px-10 py-3 bg-amber-700 hover:bg-amber-600 text-white cinzel font-bold rounded-lg transition-colors shadow-lg">CHOOSE ERA</button>
                  </div>
                  <p className="text-lg italic text-amber-100/70 mb-8 leading-relaxed">"{dyn.description}"</p>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="bg-green-950/20 p-6 rounded-2xl border border-green-900/30">
                      <span className="cinzel text-xs font-black text-green-500 uppercase block mb-4 border-b border-green-900/30 pb-2">Advantages (Pros)</span>
                      <ul className="space-y-2 text-sm text-green-100/70">
                        {dyn.pros.map((p, i) => <li key={i}>• {p}</li>)}
                      </ul>
                    </div>
                    <div className="bg-red-950/20 p-6 rounded-2xl border border-red-900/30">
                      <span className="cinzel text-xs font-black text-red-500 uppercase block mb-4 border-b border-red-900/30 pb-2">Challenges (Cons)</span>
                      <ul className="space-y-2 text-sm text-red-100/70">
                        {dyn.cons.map((c, i) => <li key={i}>• {c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === GameState.COURT && currentKing && (
          <div className="flex-1 flex flex-col items-center animate-fade-in overflow-y-auto custom-scroll pr-2">
            <div className="mb-12 text-center w-full">
               <h2 className="medieval text-4xl text-amber-500/60 mb-4">Welcome to your court,</h2>
               <h1 className="cinzel text-6xl md:text-8xl font-black text-amber-100 gold-glow italic mb-2">"Rajadhiraj Maharaj Devaputra"</h1>
               <h3 className="cinzel text-5xl text-amber-500 font-bold tracking-[0.4em] uppercase drop-shadow-lg">{currentKing.name}</h3>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
              <div className="lg:col-span-1 space-y-6">
                <div className="relative group overflow-hidden rounded-3xl border-4 border-amber-900/50 aspect-square bg-stone-900">
                  {royalPortrait ? (
                    <img src={royalPortrait} alt="Royal Portrait" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center animate-pulse bg-stone-800 text-amber-500 cinzel uppercase text-xs">Painting Portrait...</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <p className="cinzel text-[10px] text-amber-500 uppercase font-black">Royal Artist at your command</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Command the artist (e.g., 'Add a retro filter')" 
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    className="w-full bg-stone-900 border border-amber-900/30 p-4 rounded-xl cinzel text-sm text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                  <button 
                    onClick={handlePortraitEdit}
                    disabled={!royalPortrait || !editPrompt}
                    className="w-full bg-amber-700 hover:bg-amber-600 disabled:opacity-50 py-3 rounded-xl cinzel font-bold text-xs uppercase tracking-widest text-white transition-all"
                  >
                    Apply Revision
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                {['war', 'treaty', 'alliance', 'justice'].map(id => (
                  <button key={id} onClick={() => handleAction(id as any)} className="group relative bg-stone-900/80 border border-amber-900/30 p-10 rounded-3xl cinzel font-bold hover:bg-amber-900/20 transition-all flex flex-col items-center shadow-xl hover:-translate-y-2">
                    <span className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500">
                      {id === 'war' ? '⚔️' : id === 'treaty' ? '📜' : id === 'alliance' ? '🤝' : '⚖️'}
                    </span>
                    <span className="uppercase tracking-[0.2em] text-lg">{id}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={passThrone} className="mt-8 mb-12 text-stone-700 hover:text-amber-500 cinzel text-xs tracking-[0.8em] uppercase transition-all flex items-center gap-4 hover:tracking-[1em]">
               The Wheel of Time Turns &rarr;
            </button>
          </div>
        )}

        {gameState === GameState.SELECT_TARGET && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h2 className="cinzel text-3xl text-amber-500 mb-8 text-center uppercase tracking-widest">Select Target for {actionScenario?.type.toUpperCase()}</h2>
            <MahajanapadaMap onSelect={selectTarget} />
            <button onClick={() => setGameState(GameState.COURT)} className="mt-8 py-4 border border-amber-900/40 rounded-xl cinzel text-amber-500 hover:bg-amber-900/10">CANCEL</button>
          </div>
        )}

        {gameState === GameState.QUIZ && quiz && quizProgress && (
          <div className="flex-1 flex flex-col animate-fade-in max-w-3xl mx-auto w-full justify-center">
            <div className="text-center mb-16">
              <span className="cinzel text-amber-500 text-sm font-black uppercase tracking-[0.5em]">TRIAL OF SOVEREIGNTY</span>
              <p className="text-amber-100/40 text-xs cinzel mt-4 tracking-widest">Knowledge Gate: {quizProgress.current} / {quizProgress.total}</p>
            </div>
            <h2 className="cinzel text-3xl text-amber-100 mb-12 text-center leading-relaxed">"{quiz.question}"</h2>
            <div className="grid grid-cols-1 gap-6">
              {quiz.options.map((opt, idx) => (
                <button key={idx} onClick={() => handleQuizAnswer(idx)} className="bg-stone-800/60 hover:bg-amber-900/40 p-8 rounded-2xl border-2 border-stone-700 hover:border-amber-500 transition-all text-left group flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center cinzel text-amber-500 text-xl font-black group-hover:bg-amber-500 group-hover:text-white transition-all">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-amber-100 group-hover:text-white text-xl font-medium">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === GameState.BATTLE && actionScenario && currentKing && (
          <div className="flex-1 flex flex-col animate-fade-in overflow-y-auto custom-scroll pr-2">
            <BattleSim king={currentKing.name} opponent={targetJanapada || "Enemy Host"} />
            <div className="mt-12 bg-stone-900/80 p-10 rounded-3xl border-2 border-amber-900/30 shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-amber-900/30 pb-4">
                 <span className="text-3xl">⚔️</span>
                 <h4 className="cinzel text-amber-500 text-xl font-black uppercase tracking-widest">Tactical Battle Log</h4>
              </div>
              <div className="prose prose-invert max-w-none text-amber-100/90 italic leading-relaxed text-xl">
                 {actionScenario.content.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)}
              </div>
              {renderSources(actionScenario.sources)}
            </div>
            <button onClick={() => setGameState(GameState.COURT)} className="mt-10 mb-12 py-6 bg-amber-800 text-white rounded-xl cinzel font-black uppercase tracking-[0.3em] hover:bg-amber-700 transition-all shadow-2xl">Return to Capital</button>
          </div>
        )}

        {gameState === GameState.JUSTICE_CASE && justiceCase && (
          <div className="flex-1 flex flex-col animate-fade-in overflow-y-auto custom-scroll pr-2">
             <h2 className="cinzel text-4xl text-amber-500 mb-10 text-center uppercase tracking-widest">Hall of Imperial Justice</h2>
             <div className="bg-stone-800/80 p-12 rounded-3xl border-2 border-amber-900/40 mb-12 shadow-2xl">
                <h3 className="cinzel text-2xl text-amber-100 mb-6 font-black uppercase tracking-widest border-b border-amber-900/30 pb-4">{justiceCase.title}</h3>
                <p className="text-2xl leading-relaxed text-amber-100/90 italic">"{justiceCase.situation}"</p>
             </div>

             <div className="grid grid-cols-3 gap-8 mb-12">
                {justiceCase.advisors.map((adv, idx) => (
                  <button key={idx} onClick={() => setActiveAdvisor(idx)} className={`p-8 rounded-2xl border-2 transition-all group flex flex-col items-center ${activeAdvisor === idx ? 'bg-amber-900/50 border-amber-500 shadow-2xl' : 'bg-stone-900/80 border-stone-800 hover:border-amber-900'}`}>
                    <div className="w-16 h-16 rounded-full bg-stone-800 border-2 border-amber-900/30 mb-4 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {adv.role.includes('Senapati') ? '🪖' : adv.role.includes('Purohit') ? '🕉️' : '🧠'}
                    </div>
                    <div className="text-xs text-amber-500 font-black uppercase tracking-widest mb-2">{adv.role}</div>
                    <div className="text-sm text-amber-100/60 cinzel">{adv.name}</div>
                  </button>
                ))}
             </div>

             {activeAdvisor !== null && (
               <div className="bg-amber-950/40 p-8 rounded-2xl border-2 border-amber-500/40 mb-12 animate-fade-in text-center shadow-xl">
                  <span className="cinzel text-[10px] text-amber-500 uppercase font-black block mb-4 tracking-[0.5em]">The Advisor Whispers</span>
                  <p className="text-xl italic text-amber-100 font-light">"{justiceCase.advisors[activeAdvisor].opinion}"</p>
               </div>
             )}

             <div className="grid grid-cols-1 gap-4 mt-auto mb-12">
                {justiceCase.judgments.map((j, idx) => (
                  <button key={idx} onClick={() => handleJudgment(j.outcome)} className="group bg-stone-900/80 hover:bg-emerald-950 border-2 border-amber-900/30 p-6 rounded-2xl cinzel text-lg text-left transition-all flex justify-between items-center">
                    <span className="text-amber-100 group-hover:text-white">{j.text}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-500">DECREE &rarr;</span>
                  </button>
                ))}
             </div>
          </div>
        )}

        {(gameState === GameState.ACTION_RESULT || gameState === GameState.JUSTICE_OUTCOME) && actionScenario && (
          <div className="flex-1 flex flex-col animate-fade-in max-w-4xl mx-auto w-full justify-center">
            <h2 className="cinzel text-5xl text-amber-500 mb-12 text-center uppercase tracking-[0.3em]">{actionScenario.title}</h2>
            <div className="bg-stone-900/90 p-16 rounded-[3rem] border-2 border-amber-900/30 mb-16 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[500px] custom-scroll">
              <div className="text-2xl text-amber-100/90 italic font-light leading-relaxed text-center space-y-6">
                {actionScenario.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
              {renderSources(actionScenario.sources)}
            </div>
            <button onClick={() => { setGameState(GameState.COURT); setTargetJanapada(null); }} className="py-6 bg-amber-800 text-white rounded-xl cinzel font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-amber-700 transition-all">Dominion Persists</button>
          </div>
        )}

        {gameState === GameState.END && (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in text-center">
            <div className="mb-12">
              <div className="text-9xl mb-8 animate-pulse drop-shadow-lg">✨</div>
              <h1 className="cinzel text-7xl md:text-9xl font-black gold-glow text-amber-500 mb-10 tracking-[0.1em]">Thanks for playing.</h1>
              <p className="medieval text-3xl text-amber-200/50 mb-16 tracking-widest uppercase italic">Your name is etched in the eternal scrolls of Bharat.</p>
            </div>
            <div className="max-w-xs mx-auto w-full">
              <button onClick={() => {
                setGameState(GameState.START);
                setSelectedMahajanapada(null);
                setRoyalPortrait(null);
              }} className="w-full bg-gradient-to-b from-stone-700 to-stone-900 text-amber-100 font-bold py-6 px-12 rounded-2xl transition-all transform hover:scale-110 cinzel tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-amber-500/20 uppercase">Revisit History</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
