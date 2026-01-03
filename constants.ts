
import { Mahajanapada } from './types';

export const MAHAJANAPADAS: Mahajanapada[] = [
  {
    id: 'magadha',
    name: 'Magadha',
    region: 'Modern South Bihar (Patna/Gaya)',
    mapCoords: { x: 70, y: 55 },
    significance: 'Magadha was the most powerful Mahajanapada. Its strategic location, iron deposits, and control over the Ganges trade routes allowed it to establish India\'s first great empire.',
    dynasties: [
      {
        name: 'Brihadratha Dynasty',
        period: 'Early Vedic - c. 682 BCE',
        description: 'The legendary first dynasty of Magadha, established by King Brihadratha and mentioned in the Mahabharata.',
        pros: ['First unified capital at Girivraja', 'Ancestral prestige', 'Natural mountain defenses'],
        cons: ['Limited expansionist vision', 'Fragmented authority'],
        kings: [
          { 
            name: 'Brihadratha', 
            historicalEvents: { 
              war: 'Defended the hilly borders of Rajgir from tribal incursions.', 
              justice: 'Followed the early Vedic codes of conduct.' 
            } 
          },
          {
            name: 'Jarasandha',
            historicalEvents: {
              war: 'Famously fought the Yadavas and was defeated by Bhima in a duel.',
              alliance: 'Maintained a powerful network of 86 vassal kings.'
            }
          }
        ]
      },
      {
        name: 'Haryanka Dynasty',
        period: 'c. 544 BCE – 413 BCE',
        description: 'Founded by Bimbisara, this dynasty initiated Magadha\'s rise through aggressive expansion and clever diplomacy.',
        pros: ['High military focus', 'Strategic marriage alliances', 'Control of major river trade'],
        cons: ['Pattern of patricide (sons killing fathers)', 'Frequent internal rebellions'],
        kings: [
          { name: 'Bimbisara', historicalEvents: { alliance: 'Married Kosala Devi and gained Kashi as dowry.', war: 'Conquered Anga and secured the port of Champa.' } },
          { name: 'Ajatashatru', historicalEvents: { war: 'Used the Mahashilakantaka (catapult) and Rathamusala (scythed chariot) against the Vajjis.', justice: 'Patronized the first Buddhist Council after Buddha\'s Mahaparinirvana.' } },
          { name: 'Udayin', historicalEvents: { justice: 'Permanently moved the capital to Pataliputra due to its strategic river confluence.' } },
          { name: 'Anuruddha', historicalEvents: { justice: 'Administered the expanding heartland under Buddhist influence.' } },
          { name: 'Munda', historicalEvents: { war: 'Maintained borders against hill tribes despite civil unrest.' } },
          { name: 'Darshaka', historicalEvents: { justice: 'Reign was short and marked by administrative attempts to quell rebellion.' } },
          { name: 'Nagadasaka', historicalEvents: { justice: 'Final Haryanka king, overthrown by a popular revolt led by his minister Shishunaga.' } }
        ]
      },
      {
        name: 'Shishunaga Dynasty',
        period: 'c. 413 BCE – 345 BCE',
        description: 'Overthrew the Haryankas and successfully defeated the long-standing rival, Avanti.',
        pros: ['Military brilliance', 'Destruction of the Pradyota power of Avanti'],
        cons: ['Later instability within the royal family'],
        kings: [
          { name: 'Shishunaga', historicalEvents: { war: 'Finally destroyed the power of Avanti, annexing the kingdom into Magadha.' } },
          { name: 'Kalashoka', historicalEvents: { justice: 'Convened the Second Buddhist Council in Vaishali; moved capital back to Pataliputra.' } },
          { name: 'Nandivardhana', historicalEvents: { justice: 'Continued the expansionist policies of his predecessors.' } },
          { name: 'Mahanandin', historicalEvents: { justice: 'Last of the Shishunagas, killed by his son Mahapadma Nanda.' } }
        ]
      },
      {
        name: 'Nanda Dynasty',
        period: 'c. 345 BCE – 322 BCE',
        description: 'The first "unifiers" of India with a massive standing army that deterred even the Macedonians.',
        pros: ['First unified imperial tax system', 'Enormous military power', 'Incredible wealth'],
        cons: ['Highly unpopular due to low-caste origins', 'Tyrannical extraction of taxes'],
        kings: [
          { name: 'Mahapadma Nanda', historicalEvents: { war: 'Known as "Sarvakshatrantaka" (Destroyer of all Kshatriyas).' } },
          { name: 'Dhana Nanda', historicalEvents: { war: 'Commanded a force of 200,000 infantry and 3,000 elephants.', justice: 'Accumulated vast treasures buried in the Ganges bed.' } }
        ]
      },
      {
        name: 'Maurya Empire',
        period: 'c. 322 BCE – 185 BCE',
        description: 'The first truly pan-Indian empire that brought almost the entire subcontinent under one rule.',
        pros: ['Subcontinental unification', 'Sophisticated espionage and bureaucracy', 'Advanced economic management'],
        cons: ['Extreme administrative overhead', 'Succumbed to weak later rulers'],
        kings: [
          { name: 'Chandragupta Maurya', historicalEvents: { war: 'Defeated Dhana Nanda. Failed first by attacking the center; succeeded the second time by attacking the frontiers first.', treaty: 'Defeated Seleucus Nicator and signed a peace treaty exchange.' } },
          { name: 'Bindusara', historicalEvents: { war: 'Conquered the land between the two seas (Deccan).' } },
          { name: 'Ashoka the Great', historicalEvents: { war: 'The bloody Kalinga War followed by a total conversion to Dhamma.', justice: 'Established Edicts of non-violence and public welfare.' } },
          { name: 'Dasharatha Maurya', historicalEvents: { justice: 'Patron of the Ajivika monks, donating the Barabar caves.' } },
          { name: 'Samprati', historicalEvents: { alliance: 'Spread Jainism throughout South and West India.' } },
          { name: 'Salisuka', historicalEvents: { justice: 'Struggled with the rise of regional satraps.' } },
          { name: 'Devavarman', historicalEvents: { justice: 'Attempted to hold together the crumbling frontiers.' } },
          { name: 'Shatadhanvan', historicalEvents: { war: 'Faced mounting pressure from Greco-Bactrian incursions.' } },
          { name: 'Brihadratha', historicalEvents: { war: 'Assassinated by his general Pushyamitra Shunga during a military review.' } }
        ]
      },
      {
        name: 'Shunga Dynasty',
        period: 'c. 185 BCE – 73 BCE',
        description: 'Established by Pushyamitra Shunga, reviving Vedic rituals and rituals like the Ashvamedha.',
        pros: ['Revival of Brahmanical traditions', 'Defense against Indo-Greek invasions'],
        cons: ['Continuous wars with neighboring kingdoms like Kalinga', 'Internal court intrigues'],
        kings: [
          { name: 'Pushyamitra Shunga', historicalEvents: { war: 'Assassinated Brihadratha Maurya to seize power; repelled Yavana (Greek) invasions.' } },
          { name: 'Agnimitra', historicalEvents: { war: 'Conquered Vidarbha as part of his expansionist policy.' } },
          { name: 'Vasujyeshtha', historicalEvents: { justice: 'Managed the empire\'s core territories with focus on tradition.' } },
          { name: 'Vasumitra', historicalEvents: { war: 'Defeated a Greek cavalry contingent on the banks of the River Indus.' } },
          { name: 'Bhadraka', historicalEvents: { justice: 'Ruled from Vidisha, fostering a period of cultural stability.' } },
          { name: 'Pulindaka', historicalEvents: { justice: 'Governed the kingdom during a time of relative internal peace.' } },
          { name: 'Ghosha', historicalEvents: { justice: 'Patronized Vedic rituals and strengthened religious foundations.' } },
          { name: 'Vajramitra', historicalEvents: { justice: 'Maintained the administration of the empire despite external pressures.' } },
          { name: 'Bhagabhadra', historicalEvents: { alliance: 'Received Heliodorus, the Greek ambassador from King Antialcidas, at his court in Vidisha.' } },
          { name: 'Devabhuti', historicalEvents: { justice: 'Last ruler, assassinated by his minister Vasudeva Kanva during a court plot.' } }
        ]
      },
      {
        name: 'Kanva Dynasty',
        period: 'c. 73 BCE – 28 BCE',
        description: 'A small Brahmin dynasty that succeeded the Shungas through court intrigue.',
        pros: ['Maintained Pataliputra as a cultural center'],
        cons: ['Minimal military power compared to predecessors'],
        kings: [{ name: 'Vasudeva Kanva', historicalEvents: { justice: 'Established new court regulations based on Dharmic law.' } }]
      },
      {
        name: 'Gupta Empire',
        period: 'c. 240 CE – 550 CE',
        description: 'The "Golden Age of India," where arts, science, and philosophy reached their zenith.',
        pros: ['Scientific and artistic revolution', 'Powerful heavy cavalry', 'Decentralized but effective rule'],
        cons: ['Vulnerable to later Huna invasions'],
        kings: [
          { name: 'Sri Gupta', historicalEvents: { alliance: 'Founded the dynasty and used the title Maharaja.' } },
          { name: 'Ghatotkacha', historicalEvents: { justice: 'Consolidated early Gupta holdings in the Magadha region.' } },
          { name: 'Chandragupta I', historicalEvents: { alliance: 'Married Kumaradevi of the Lichchhavis; started the Gupta Era in 319 CE.' } },
          { name: 'Samudragupta', historicalEvents: { war: 'Undefeated "Napoleon of India", conquered kingdoms from Aryavarta to the Deep South.' } },
          { name: 'Chandragupta II (Vikramaditya)', historicalEvents: { war: 'Annihilated the Western Sakas; patron of the Navaratnas (Nine Gems).' } },
          { name: 'Kumaragupta I', historicalEvents: { justice: 'Founded the world-famous Nalanda University.' } },
          { name: 'Skandagupta', historicalEvents: { war: 'Successfully repelled the fierce Huna invasions to save the empire.' } },
          { name: 'Purugupta', historicalEvents: { justice: 'Maintained the core of the empire during rising internal instability.' } },
          { name: 'Narasimha Gupta Baladitya', historicalEvents: { war: 'Successfully resisted the Huna king Mihirakula.' } },
          { name: 'Budhagupta', historicalEvents: { justice: 'The last ruler to hold power over most of the empire\'s traditional territory.' } },
          { name: 'Vainyagupta', historicalEvents: { justice: 'Ruled over a significantly fragmented empire.' } },
          { name: 'Vishnugupta', historicalEvents: { justice: 'The last known ruler of the great Gupta line.' } }
        ]
      }
    ]
  },
  {
    id: 'kosala',
    name: 'Kosala',
    region: 'Modern Awadh (UP)',
    mapCoords: { x: 60, y: 45 },
    significance: 'Home of the legendary Ikshvaku dynasty and a massive rival to early Magadha.',
    dynasties: [{ 
      name: 'Ikshvaku Dynasty', 
      period: '6th Century BCE', 
      pros: ['Ancient prestige', 'Fertile heartland'], 
      cons: ['Caught in the rise of Magadha'], 
      description: 'The solar lineage associated with the epics.', 
      kings: [
        { name: 'Mahakosala', historicalEvents: { alliance: 'Gave Kashi as dowry to Magadha.' } },
        { name: 'Prasenajit', historicalEvents: { alliance: 'Friend of Buddha, married into the Shakya clan.' } },
        { name: 'Vidudabha', historicalEvents: { war: 'Annihilated the Shakya republic.' } }
      ] 
    }]
  },
  {
    id: 'kashi',
    name: 'Kashi',
    region: 'Varanasi',
    mapCoords: { x: 62, y: 53 },
    significance: 'The most sacred city of India, world-renowned for its learning and textiles.',
    dynasties: [{ 
      name: 'Brahmadatta Dynasty', 
      period: '7th Century BCE', 
      pros: ['Spiritual authority', 'Textile trade wealth'], 
      cons: ['Frequently occupied by neighbors'], 
      description: 'The ancient kings of the holy city.', 
      kings: [{ name: 'Brahmadatta', historicalEvents: { war: 'Constant struggle for dominance against Kosala.' } }] 
    }]
  },
  {
    id: 'vajji',
    name: 'Vajji',
    region: 'Vaishali',
    mapCoords: { x: 72, y: 48 },
    significance: 'The world\'s first republic, a powerful confederacy of eight clans.',
    dynasties: [{ 
      name: 'Lichchhavi Clan', 
      period: '6th Century BCE', 
      pros: ['Republican unity', 'Democratic assembly'], 
      cons: ['Prone to internal spies'], 
      description: 'The dominant clan of the Vajji confederacy.', 
      kings: [{ name: 'Chetaka', historicalEvents: { alliance: 'Father-in-law to many major kings of the era.' } }] 
    }]
  },
  {
    id: 'malla',
    name: 'Malla',
    region: 'Kushinagar',
    mapCoords: { x: 68, y: 42 },
    significance: 'A martial republic, famous for its wrestlers and for being the site of Buddha\'s death.',
    dynasties: [{ 
      name: 'Malla Gana', 
      period: '6th Century BCE', 
      pros: ['Martial skill', 'Independent spirit'], 
      cons: ['Small population base'], 
      description: 'Republican clans of Kushinara and Pava.', 
      kings: [{ name: 'Okkaka', historicalEvents: { justice: 'Upheld republican laws strictly.' } }] 
    }]
  },
  {
    id: 'vatsa',
    name: 'Vatsa',
    region: 'Prayagraj',
    mapCoords: { x: 55, y: 58 },
    significance: 'Strategically located trade hub at the confluence of rivers.',
    dynasties: [{ 
      name: 'Paurava Dynasty', 
      period: '6th Century BCE', 
      pros: ['Trade node control', 'Massive fortifications'], 
      cons: ['Caught between Avanti and Magadha'], 
      description: 'The lineage of King Udayana.', 
      kings: [{ name: 'Udayana', historicalEvents: { alliance: 'Romance and marriage with the princess of Avanti.' } }] 
    }]
  },
  {
    id: 'chedi',
    name: 'Chedi',
    region: 'Bundelkhand',
    mapCoords: { x: 52, y: 65 },
    significance: 'Rich in iron and on the route to the South.',
    dynasties: [{ 
      name: 'Chediya Dynasty', 
      period: '6th Century BCE', 
      pros: ['Mineral wealth', 'Hardy archers'], 
      cons: ['Frequent political instability'], 
      description: 'Lineage mentioned in the Mahabharata.', 
      kings: [{ name: 'Shishupala', historicalEvents: { war: 'Rivalry with the Krishna-Yadava clan.' } }] 
    }]
  },
  {
    id: 'kuru',
    name: 'Kuru',
    region: 'Indraprastha',
    mapCoords: { x: 45, y: 38 },
    significance: 'The ancient center of Vedic culture, though its military might faded.',
    dynasties: [{ 
      name: 'Kuru Dynasty', 
      period: '6th Century BCE', 
      pros: ['Legendary cultural prestige'], 
      cons: ['Limited military relevance in 6th BCE'], 
      description: 'Descendants of the Great War.', 
      kings: [{ name: 'Koravya', historicalEvents: { justice: 'Strict adherence to ancient dharma.' } }] 
    }]
  },
  {
    id: 'panchala',
    name: 'Panchala',
    region: 'Rohilkhand',
    mapCoords: { x: 52, y: 40 },
    significance: 'Major center for scholarship and Brahmanical learning.',
    dynasties: [{ 
      name: 'Panchala Gana', 
      period: '6th Century BCE', 
      pros: ['Scholarly prestige', 'Balanced administration'], 
      cons: ['Divided into North and South'], 
      description: 'Dual republic/kingdom clans.', 
      kings: [{ name: 'Brahmadatta (Panchala)', historicalEvents: { alliance: 'Cultural exchange with other Vedic states.' } }] 
    }]
  },
  {
    id: 'matsya',
    name: 'Matsya',
    region: 'Jaipur',
    mapCoords: { x: 38, y: 48 },
    significance: 'Known for cattle and archers, located in semi-arid terrain.',
    dynasties: [{ 
      name: 'Matsya Dynasty', 
      period: '6th Century BCE', 
      pros: ['Pastoral wealth', 'Elite archers'], 
      cons: ['Limited agriculture'], 
      description: 'Ruled from Viratnagar.', 
      kings: [{ name: 'Virata', historicalEvents: { war: 'Defended cattle from Kuru raids.' } }] 
    }]
  },
  {
    id: 'surasena',
    name: 'Surasena',
    region: 'Mathura',
    mapCoords: { x: 48, y: 50 },
    significance: 'Center of the Yadu tribes and a bustling trade city on the Yamuna.',
    dynasties: [{ 
      name: 'Yadava Dynasty', 
      period: '6th Century BCE', 
      pros: ['Spiritual centrality', 'Trade route hub'], 
      cons: ['Open frontiers to northern raids'], 
      description: 'Descendants of the Vrishnis.', 
      kings: [{ name: 'Avantiputra', historicalEvents: { justice: 'First king to bring Buddhism to Mathura.' } }] 
    }]
  },
  {
    id: 'assaka',
    name: 'Assaka',
    region: 'Godavari banks',
    mapCoords: { x: 45, y: 85 },
    significance: 'The only Mahajanapada in the South (Dakshinapatha).',
    dynasties: [{ 
      name: 'Assaka Dynasty', 
      period: '6th Century BCE', 
      pros: ['Southern trade monopoly', 'Isolation from northern wars'], 
      cons: ['Geographical isolation from heartland'], 
      description: 'Connected the Deccan to the North.', 
      kings: [{ name: 'Brahmadatta (Assaka)', historicalEvents: { war: 'Control of Godavari river ports.' } }] 
    }]
  },
  {
    id: 'avanti',
    name: 'Avanti',
    region: 'Malwa (Ujjain)',
    mapCoords: { x: 45, y: 65 },
    significance: 'Magadha\'s greatest rival with massive iron works and elite forces.',
    dynasties: [{ 
      name: 'Pradyota Dynasty', 
      period: '6th Century BCE', 
      pros: ['Elite elephant army', 'Strategic iron resources'], 
      cons: ['Cruel and violent reputation of kings'], 
      description: 'Lineage of the fierce Chanda Pradyota.', 
      kings: [{ name: 'Chanda Pradyota', historicalEvents: { war: 'Kidnapped King Udayana to force an alliance.' } }] 
    }]
  },
  {
    id: 'anga',
    name: 'Anga',
    region: 'Bhagalpur',
    mapCoords: { x: 78, y: 52 },
    significance: 'A wealthy seafaring nation with the massive port of Champa.',
    dynasties: [{ 
      name: 'Anga Dynasty', 
      period: '6th Century BCE', 
      pros: ['Seafaring wealth', 'Naval power'], 
      cons: ['Bordering the aggressive Magadha'], 
      description: 'The wealthy merchant kings of the East.', 
      kings: [{ name: 'Brahmadatta (Anga)', historicalEvents: { war: 'Initial victory over early Magadha.' } }] 
    }]
  },
  {
    id: 'gandhara',
    name: 'Gandhara',
    region: 'Taxila',
    mapCoords: { x: 15, y: 25 },
    significance: 'The bridge to the West and home to the world\'s oldest university.',
    dynasties: [{ 
      name: 'Gandhara Dynasty', 
      period: '6th Century BCE', 
      pros: ['Educational center', 'Advanced metallurgy'], 
      cons: ['First to face foreign invasions'], 
      description: 'Lords of the Northwestern frontier.', 
      kings: [
        { name: 'Pukkusati', historicalEvents: { alliance: 'Sent diplomatic missions to King Bimbisara.' } },
        { name: 'Porus', historicalEvents: { war: 'Faced Alexander the Great at Hydaspes.' } }
      ] 
    }]
  },
  {
    id: 'kamboja',
    name: 'Kamboja',
    region: 'Hindu Kush',
    mapCoords: { x: 12, y: 18 },
    significance: 'Famous for the finest horses and its republican constitution.',
    dynasties: [{ 
      name: 'Kamboja Gana', 
      period: '6th Century BCE', 
      pros: ['Superior cavalry', 'Republican spirit'], 
      cons: ['Harsh mountain terrain'], 
      description: 'A martial republic of horse-breeders.', 
      kings: [{ name: 'Sudakshina', historicalEvents: { war: 'Led the cavalry in the Kurukshetra war.' } }] 
    }]
  }
];
