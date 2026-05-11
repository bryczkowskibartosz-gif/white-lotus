const fireUnits = [
  {
    id: "flame_adept",
    name: "Flame Adept",
    element: "Fire",
    type: "unit",
    keywords: ["Ignite"],
    cost: 1,
    attack: 1,
    health: 2,
    igniteBuff: { attack: 1, health: 1 },
    text: "Ignite: Gain +1/+1."
  },

  {
    id: "southern_raider",
    name: "Southern Raider",
    element: "Fire",
    type: "unit",
    keywords: ["Swift", "Ignite"],
    cost: 2,
    attack: 2,
    health: 1,
    igniteBuff: { attack: 1, health: 0 },
    text: "Swift. Ignite: Gain +1 Attack."
  },

  {
    id: "fire_nation_recruit",
    name: "Fire Nation Recruit",
    element: "Fire",
    type: "unit",
    cost: 1,
    attack: 1,
    health: 1,
    text: "A quick recruit ready to prove himself."
  }
];

const fireSpells = [
  {
    id: "ember_strike",
    name: "Ember Strike",
    element: "Fire",
    school: "Firebending",
    type: "spell",
    cost: 1,
    spellType: "damage_enemy_unit",
    damage: 2,
    text: "Deal 2 damage to an enemy unit."
  },

  {
    id: "face_burn",
    name: "Face Burn",
    element: "Fire",
    school: "Firebending",
    type: "spell",
    cost: 3,
    spellType: "damage_enemy_hero",
    damage: 2,
    igniteDamage: 4,
    text: "Deal 2 damage to the enemy hero. Ignite: Deal 4 instead."
  },

  {
    id: "scorch_mark",
    name: "Scorch Mark",
    element: "Fire",
    school: "Firebending",
    type: "spell",
    cost: 1,
    spellType: "damage_enemy_hero",
    damage: 1,
    igniteDamage: 2,
    text: "Deal 1 damage to the enemy hero. Ignite: Deal 2 instead."
  },

  {
    id: "fire_whip",
    name: "Fire Whip",
    element: "Fire",
    school: "Firebending",
    type: "spell",
    cost: 2,
    spellType: "damage_enemy_unit",
    damage: 3,
    text: "Deal 3 damage to an enemy unit."
  },

  {
    id: "war_drums",
    name: "War Drums",
    element: "Fire",
    type: "spell",
    cost: 2,
    spellType: "draw_cards",
    drawAmount: 1,
    igniteDrawAmount: 1,
    text: "Draw 1 card. Ignite: Draw 1 more."
  }
];

const fireReactions = [];

// --------------------------------------------------
// Water
// --------------------------------------------------

const waterUnits = [
  {
    id: "southern_sailor",
    name: "Southern Sailor",
    element: "Water",
    type: "unit",
    keywords: ["Swift"],
    cost: 2,
    attack: 2,
    health: 2,
    text: "Swift."
  },

  {
    id: "waterbending_initiate",
    name: "Waterbending Initiate",
    element: "Water",
    type: "unit",
    cost: 2,
    attack: 1,
    health: 3,
    text: "A young Waterbender in training."
  }
];

const waterSpells = [
  {
    id: "flowing_touch",
    name: "Flowing Touch",
    element: "Water",
    school: "Waterbending",
    type: "spell",
    keywords: ["Flow"],
    cost: 1,
    spellType: "heal_friendly_unit",
    heal: 2,
    text: "Flow. Restore 2 HP to a friendly unit."
  },

  {
    id: "river_spark",
    name: "River Spark",
    element: "Water",
    school: "Waterbending",
    type: "spell",
    keywords: ["Flow"],
    cost: 1,
    spellType: "damage_enemy_unit",
    damage: 1,
    text: "Flow. Deal 1 damage to an enemy unit."
  },

  {
    id: "ice_blast",
    name: "Ice Blast",
    element: "Water",
    school: "Waterbending",
    type: "spell",
    cost: 2,
    spellType: "damage_enemy_unit",
    damage: 2,
    preventsNextAttack: true,
    text: "Deal 2 damage to an enemy unit. It can't attack next turn."
  }
];

const waterReactions = [];

// --------------------------------------------------
// Earth
// --------------------------------------------------

const earthUnits = [
  {
    id: "stone_guardian",
    name: "Stone Guardian",
    element: "Earth",
    type: "unit",
    keywords: ["Guard"],
    cost: 2,
    attack: 1,
    health: 3,
    text: "Guard."
  },

  {
    id: "pebble_catcher",
    name: "Pebble Catcher",
    element: "Earth",
    type: "unit",
    keywords: ["Fortify"],
    cost: 2,
    attack: 1,
    health: 3,
    fortifyBuff: { attack: 1, health: 1 },
    text: "Fortify: Gain +1/+1 at the start of your next Action Phase."
  },

  {
    id: "wall_watcher",
    name: "Wall Watcher",
    element: "Earth",
    type: "unit",
    keywords: ["Guard", "Fortify"],
    cost: 3,
    attack: 0,
    health: 5,
    fortifyBuff: { attack: 1, health: 0 },
    text: "Guard. Fortify: Gain +1 Attack at the start of your next Action Phase."
  }
];

const earthSpells = [
  {
    id: "burrow_into_earth",
    name: "Burrow into Earth",
    element: "Earth",
    school: "Earthbending",
    type: "spell",
    cost: 2,
    spellType: "buff_friendly_unit",
    buff: { attack: 1, health: 2 },
    text: "Give a friendly unit +1/+2."
  },

  {
    id: "proper_stance",
    name: "Proper Stance",
    element: "Earth",
    school: "Earthbending",
    type: "spell",
    cost: 1,
    spellType: "buff_friendly_unit",
    buff: { attack: 0, health: 1 },
    text: "Give a friendly unit +0/+1."
  }
];

const earthReactions = [];

// --------------------------------------------------
// Air
// --------------------------------------------------

const airUnits = [
  {
    id: "air_acolyte",
    name: "Air Acolyte",
    element: "Air",
    type: "unit",
    keywords: ["Dodge"],
    cost: 2,
    attack: 3,
    health: 1,
    text: "Dodge."
  }
];

const airSpells = [
  {
    id: "sweeping_strikes",
    name: "Sweeping Strikes",
    element: "Air",
    school: "Airbending",
    type: "spell",
    keywords: ["Momentum"],
    cost: 3,
    spellType: "damage_enemy_units",
    damage: 1,
    text: "Deal 1 damage to all enemy units. Momentum: Do it again."
  },

  {
    id: "wind_slice",
    name: "Wind Slice",
    element: "Air",
    school: "Airbending",
    type: "spell",
    cost: 3,
    spellType: "damage_two_enemy_units",
    damage: 2,
    text: "Choose two enemy units. Deal 2 damage to them."
  }
];

const airReactions = [
  {
    id: "banish",
    name: "Banish",
    element: "Air",
    school: "Airbending",
    type: "reaction",
    cost: 1,
    reactionType: "destroy_friendly_unit_draw_cards",
    drawAmount: 2,
    text: "Destroy a friendly unit. Draw 2 cards."
  },

  {
    id: "be_the_leaf",
    name: "Be the Leaf",
    element: "Air",
    school: "Airbending",
    type: "reaction",
    cost: 1,
    reactionType: "give_dodge_to_friendly_unit",
    text: "Give a friendly unit Dodge."
  },

  {
    id: "gust_snare",
    name: "Gust Snare",
    element: "Air",
    school: "Airbending",
    type: "reaction",
    cost: 1,
    reactionType: "freeze_summoned_unit",
    text: "Choose an enemy unit summoned this turn. It can't attack next turn."
  },

  {
    id: "crosswind_jab",
    name: "Crosswind Jab",
    element: "Air",
    school: "Airbending",
    type: "reaction",
    cost: 1,
    reactionType: "damage_summoned_unit",
    damage: 3,
    text: "Deal 3 damage to an enemy unit summoned this turn."
  },

  {
    id: "sudden_gale",
    name: "Sudden Gale",
    element: "Air",
    school: "Airbending",
    type: "reaction",
    cost: 1,
    reactionType: "weaken_summoned_unit",
    attackDebuff: 2,
    text: "Choose an enemy unit summoned this turn. It gets -2 Attack."
  }
];

// --------------------------------------------------
// Neutral
// --------------------------------------------------

const neutralUnits = [
  {
    id: "wandering_merchant",
    name: "Wandering Merchant",
    element: "Neutral",
    type: "unit",
    cost: 1,
    attack: 2,
    health: 1,
    text: "A stubborn merchant with a very fragile cart."
  },

  {
    id: "harbor_brawler",
    name: "Harbor Brawler",
    element: "Neutral",
    type: "unit",
    cost: 2,
    attack: 3,
    health: 2,
    text: "A rough fighter from the busy southern docks."
  },

  {
    id: "shrine_guardian",
    name: "Shrine Guardian",
    element: "Neutral",
    type: "unit",
    keywords: ["Guard"],
    cost: 3,
    attack: 1,
    health: 4,
    text: "Guard. A calm protector of old sacred paths."
  }
];

const neutralSpells = [
  {
    id: "travelers_rations",
    name: "Traveler's Rations",
    element: "Neutral",
    type: "spell",
    cost: 1,
    spellType: "gain_hero_health",
    heal: 2,
    text: "Gain 2 HP."
  },

  {
    id: "bending_scroll",
    name: "Bending Scroll",
    element: "Neutral",
    type: "spell",
    cost: 2,
    spellType: "buff_friendly_unit",
    buff: { attack: 1, health: 1 },
    text: "Give a friendly unit +1/+1."
  }
];

const neutralReactions = [
  {
    id: "lotus_seal",
    name: "Lotus Seal",
    element: "Neutral",
    school: "Spirit",
    type: "reaction",
    cost: 3,
    reactionType: "destroy_summoned_unit",
    text: "Destroy an enemy unit summoned this turn."
  }
];

// --------------------------------------------------
// Full card pool
// --------------------------------------------------

const cards = [
  ...fireUnits,
  ...fireSpells,
  ...fireReactions,

  ...waterUnits,
  ...waterSpells,
  ...waterReactions,

  ...earthUnits,
  ...earthSpells,
  ...earthReactions,

  ...airUnits,
  ...airSpells,
  ...airReactions,

  ...neutralUnits,
  ...neutralSpells,
  ...neutralReactions
];