
export enum GameState {
  START = 'START',
  SELECT_MAHAJANAPADA = 'SELECT_MAHAJANAPADA',
  MAHAJANAPADA_BRIEF = 'MAHAJANAPADA_BRIEF',
  DYNASTY_SEQUENCE = 'DYNASTY_SEQUENCE',
  COURT = 'COURT',
  ACTION_RESULT = 'ACTION_RESULT',
  BATTLE = 'BATTLE',
  QUIZ = 'QUIZ',
  SELECT_TARGET = 'SELECT_TARGET',
  JUSTICE_CASE = 'JUSTICE_CASE',
  JUSTICE_OUTCOME = 'JUSTICE_OUTCOME',
  MODERN_INSIGHT = 'MODERN_INSIGHT',
  END = 'END'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Mahajanapada {
  id: string;
  name: string;
  significance: string;
  region: string;
  dynasties: Dynasty[];
  mapCoords: { x: number; y: number };
}

export interface Dynasty {
  name: string;
  period: string;
  pros: string[];
  cons: string[];
  description: string;
  kings: King[];
}

export interface King {
  name: string;
  successor?: string;
  historicalEvents: {
    war?: string;
    treaty?: string;
    alliance?: string;
    justice?: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizProgress {
  current: number;
  total: number;
}

export interface JusticeCase {
  title: string;
  situation: string;
  advisors: {
    name: string;
    role: string;
    opinion: string;
  }[];
  judgments: {
    text: string;
    outcome: string;
  }[];
}

export interface ActionScenario {
  type: 'war' | 'treaty' | 'alliance' | 'justice';
  title: string;
  content: string;
  techniques?: string[];
  graphicsData?: any;
  sources?: GroundingSource[];
}

export interface ModernInsight {
  content: string;
  sources: GroundingSource[];
}
