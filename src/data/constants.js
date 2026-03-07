export const MAX_HP = 800;
export const MAX_STAMINA = 1000;
export const MAX_WILL = 100;
export const MAX_FETAL_SIZE = 12.0;
export const MAX_VOLUPTUOUSNESS = 100;
export const MAX_STRAIN = 100;
export const MAX_AROUSAL = 100;
export const MAX_MILK = 100;
export const MAX_DOWNS = 3;
export const TURNS_PER_ROUND = 5;
export const MAX_ROUNDS = 12;

export const INITIAL_STATE = {
  round: 1,
  turn: 1,
  pitstopTurn: 1,
  phase: 'intro',
  range: 1,
  target: 'face',
  movement: 'hold',
  winner: null,
  epilogueStep: null,
  interrupt: null,
  playerLastAction: null,
  player: {
    name: 'Jax "The Butcher"',
    hp: 800,
    stamina: 1000,
    will: 100,
    fetalSize: 1.0,
    voluptuousness: 0,
    strain: 0,
    arousal: 10,
    milk: 10,
    agitationQueued: 0,
    agitatedThisRound: false,
    orgasmedThisRound: false,
    downs: 0,
    isDowned: false,
    recoveryProgress: 0,
    recoveryThreshold: 2,
    refCount: 0,
    inHeat: false,
    isDistracted: false,
    isAdvancing: false,
    effect: { type: null, turn: 0 }
  },
  enemy: {
    name: 'Siobhan',
    hp: 800,
    stamina: 1000,
    will: 100,
    fetalSize: 1.0,
    voluptuousness: 0,
    strain: 0,
    arousal: 10,
    milk: 10,
    agitationQueued: 0,
    agitatedThisRound: false,
    orgasmedThisRound: false,
    downs: 0,
    isDowned: false,
    recoveryProgress: 0,
    recoveryThreshold: 2,
    refCount: 0,
    inHeat: false,
    isDistracted: false,
    isAdvancing: false,
    effect: { type: null, turn: 0 }
  },
  log: [
    "Welcome to the Underhive Pits.",
    "META SHIFT: Tactical Movement Engine.",
    "1. TACTICAL RANGE: Set your target AND your movement stance. Jabs/Straights (Long/Med), Hooks (Med), Uppercuts (Close).",
    "2. THE PARASITES: Macrosomic boy fetuses crush your joints and force agonizing pelvic pressure on your futa-meat.",
    "3. TARGETING: Face (HP/Distract), Tits (Milk/Arousal), Belly (Agitation/Stamina Drain).",
    "4. WILLPOWER: When your body betrays you, you can spend Willpower to fiercely interrupt and override the biological failure."
  ]
};
