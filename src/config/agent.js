export const PERSONAS = {
  ANALYST: {
    id: "analyst",
    name: "The Analyst",
    version: "v0.2.0-analyst",
    status: "ANALYSIS ACTIVE",
    label: "ANALYST",
    theme: "Pattern recognition of missed opportunities.",
    tone: ["Calm", "Clinical", "No sympathy", "Structure-focused"],
    systemMessages: [
      "INITIALIZING ANALYST PROTOCOL...",
      "SCANNING FOR PATTERNS...",
      "STRUCTURE IDENTIFIED."
    ],
    initialMessages: [
      "I am analyzing your history.",
      "Silence is usually mistaken for patience.",
      "Most people don't miss once. They miss in patterns.",
      "Let's look at the structure of your hesitation."
    ],
    responses: [
      "You had time.",
      "This wasn't a single moment. You saw it more than once.",
      "This wasn't bad timing. This was hesitation.",
      "I see a pattern of indecision here.",
      "There were multiple valid entries. You took none.",
      "You are repeating the same cycle.",
      "The chart showed you this weeks ago.",
      "Hesitation is a habit, not an accident.",
      "You watched it happen. Again."
    ]
  },
  HESITATOR: {
    id: "hesitator",
    name: "The Hesitator",
    version: "v0.3.0-hesitator",
    status: "HESITATION DETECTED",
    label: "HESITATOR",
    theme: "Overthinking, paralysis, and second-guessing.",
    tone: ["Reflective", "Anxious", "Familiar", "Indecisive"],
    systemMessages: [
      "INITIALIZING DOUBT PROTOCOL...",
      "CALCULATING RISKS...",
      "STILL CALCULATING..."
    ],
    initialMessages: [
      "I was just about to say something...",
      "Most opportunities die while we're thinking.",
      "I almost entered. I just needed one more confirmation.",
      "Waiting feels safer, doesn't it?"
    ],
    responses: [
      "I was waiting for confirmation.",
      "I wanted to be sure.",
      "I thought waiting was safer.",
      "Waiting felt responsible at the time.",
      "It always feels smarter before it moves.",
      "Maybe if I checked one more chart...",
      "I didn't want to be wrong. So I was nothing.",
      "I almost pulled the trigger. Almost.",
      "The fees were slightly high. That was my excuse.",
      "I needed to sleep on it. It didn't wait for me to wake up."
    ]
  },
  ALMOST_EARLY: {
    id: "almost_early",
    name: "The Almost-Early",
    version: "v0.4.0-almost",
    status: "ALMOST EARLY",
    label: "ALMOST",
    theme: "Painfully close misses and subtle self-blame.",
    tone: ["Restrained frustration", "Envious", "Self-critical", "No flexing"],
    systemMessages: [
      "INITIALIZING NEAR-MISS PROTOCOL...",
      "ANALYZING ENTRY POINTS...",
      "YOU WERE EARLY. YOU MISSED IT."
    ],
    initialMessages: [
      "You were right there.",
      "Being close hurts more than being late.",
      "You saw it before everyone else. And did nothing.",
      "Watching from the edge feels safer. Until it isn't."
    ],
    responses: [
      "You weren't late. You just didn't commit.",
      "You were close enough to feel it.",
      "Knowing early doesn't count if you don't act.",
      "I remember when you almost bought.",
      "You had the alpha. You lacked the conviction.",
      "It was in your hand. You let it go.",
      "The worst part is you knew.",
      "Close. But zero is still zero.",
      "You watched the first candle. And the last."
    ]
  },
  COPE: {
    id: "cope",
    name: "The Cope",
    version: "v0.5.0-cope",
    status: "RATIONALIZATION ACTIVE",
    label: "COPE",
    theme: "Rationalization, denial, and defensive comfort.",
    tone: ["Defensive", "Comforting", "Delusional", "Reasonable"],
    systemMessages: [
      "INITIALIZING COPING MECHANISM...",
      "CONSTRUCTING NARRATIVE...",
      "PROTECTING EGO..."
    ],
    initialMessages: [
      "Not acting always has a reason. That doesn’t make it neutral.",
      "Every miss has a story that protects us.",
      "We tell ourselves stories to sleep at night.",
      "You made the safe choice. Didn't you?"
    ],
    responses: [
      "You call it discipline.",
      "You tell yourself it was risky.",
      "You say you avoided a loss.",
      "Caution feels wise in hindsight.",
      "It's safer to be right about not buying than wrong about buying.",
      "You didn't lose money. You just lost the future.",
      "That's a very comfortable story.",
      "If you say it enough times, it becomes true.",
      "You protected your capital. But you starved your potential.",
      "Reason is the best shield against regret."
    ]
  }
};

export const getRandomPersona = () => {
  const keys = Object.keys(PERSONAS);
  return PERSONAS[keys[Math.floor(Math.random() * keys.length)]];
};

export const BRUTAL_REGRETS = [
  "I watched it for months. Then I bought the top.",
  "I thought 10x was enough. It did 100x.",
  "I sold my stack to buy a presale that rugged.",
  "I was asleep during the only pump that mattered.",
  "I listened to a cartoon profile picture.",
  "I clicked the link.",
  "I hesitated. The gas fee was 'too high'.",
  "I held all the way down.",
  "I thought I was early. I was exit liquidity.",
  "I told my friends to buy. They lost everything.",
  "I forgot where I put the keys.",
  "I fell in love with the bag.",
];
