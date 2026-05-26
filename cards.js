const fireUnits = [
  {
    id: "flame_adept",
    name: "Flame Adept",
    element: "Fire",
    type: "unit",
    keywords: ["Ignite"],
    cost: 1,
    attack: 2,
    health: 1,
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
    health: 2,
    igniteBuff: { attack: 1, health: 0 },
    text: "Swift. Ignite: Gain +1 Attack."
  },

  {
    id: "fire_nation_recruit",
    name: "Fire Nation Recruit",
    element: "Fire",
    type: "unit",
    keywords: ["Swift"],
    cost: 1,
    attack: 1,
    health: 1,
    text: "A quick recruit ready to prove himself."
  },

  {
    id: "army_recruiter",
    name: "Army Recruiter",
    element: "Fire",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 2,
    attack: 2,
    health: 1,
    battlecry: {
      type: "draw_card_type",
      cardType: "unit",
      amount: 1
    },
    text: "Battlecry: Draw a unit."
  },

  {
    id: "spark_thrower",
    name: "Spark Thrower",
    element: "Fire",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 3,
    attack: 3,
    health: 3,
    battlecry: {
      type: "damage_random_enemy_unit",
      damage: 1
    },
    text: "Battlecry: Deal 1 damage to a random enemy unit."
  },

  {
    id: "fiery_mercenary",
    name: "Fiery Mercenary",
    element: "Fire",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 4,
    attack: 4,
    health: 2,
    battlecry: {
      type: "draw_card_type_with_keyword",
      cardType: "unit",
      keyword: "Swift",
      amount: 1
    },
    text: "Battlecry: Draw a Swift unit."
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
    cost: 2,
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
    igniteDamage: 3,
    text: "Deal 1 damage to the enemy hero. Ignite: Deal 3 instead."
  },

  {
    id: "fire_whip",
    name: "Fire Whip",
    element: "Fire",
    school: "Firebending",
    type: "spell",
    cost: 2,
    spellType: "damage_enemy_unit",
    damage: 4,
    text: "Deal 4 damage to an enemy unit."
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
    health: 3,
    text: "Swift."
  },

  {
    id: "stream_guide",
    name: "Stream Guide",
    element: "Water",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 2,
    attack: 3,
    health: 2,
    battlecry: {
      type: "draw_card_type_with_keyword",
      cardType: "spell",
      keyword: "Flow",
      amount: 1
    },
    text: "Battlecry: Draw a Flow move."
  },

  {
    id: "waterbending_initiate",
    name: "Waterbending Initiate",
    element: "Water",
    type: "unit",
    cost: 3,
    attack: 3,
    health: 4,
    text: "A young Waterbender in training."
  },

  {
    id: "river_guardian",
    name: "River Guardian",
    element: "Water",
    type: "unit",
    cost: 2,
    attack: 2,
    health: 4,
    text: "A durable Water unit that works well with healing."
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
    canTargetHero: true,
    heal: 2,
    text: "Flow. Restore 2 HP to a friendly unit or your hero."
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
  },

  {
    id: "tidal_splash",
    name: "Tidal Splash",
    element: "Water",
    school: "Waterbending",
    type: "spell",
    keywords: ["Flow"],
    cost: 3,
    spellType: "damage_enemy_units",
    damage: 1,
    text: "Flow. Deal 1 damage to all enemy units."
  }
];

const waterReactions = [];

// --------------------------------------------------
// Earth
// --------------------------------------------------

const earthUnits = [

  {
    id: "lowly_armorsmith",
    name: "Lowly Armorsmith",
    element: "Earth",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 1,
    attack: 1,
    health: 1,
    battlecry: {
      type: "draw_card_type_with_keyword",
      cardType: "unit",
      keyword: "Guard",
      amount: 1
    },
    text: "Battlecry: Draw a Guard unit."
  },

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
  },

  {
    id: "academy_student",
    name: "Academy Student",
    element: "Earth",
    type: "unit",
    keywords: ["Fortify"],
    cost: 1,
    attack: 1,
    health: 2,
    fortifyBuff: { attack: 1, health: 1 },
    text: "Fortify: Gain +1/+1 at the start of your next Action Phase."
  },
];

const earthSpells = [

  {
    id: "pebble_toss",
    name: "Pebble Toss",
    element: "Earth",
    school: "Earthbending",
    type: "spell",
    cost: 1,
    spellType: "damage_two_enemy_units",
    damage: 1,
    text: "Choose two enemy units. Deal 1 damage to them."
  },

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
  },

  {
    id: "shifting_sands",
    name: "Shifting Sands",
    element: "Earth",
    school: "Earthbending",
    type: "spell",
    cost: 2,
    spellType: "damage_enemy_units",
    damage: 1,
    text: "Deal 1 damage to all enemy units."
  },

  {
    id: "overwhelming_weight",
    name: "Overwhelming Weight",
    element: "Earth",
    school: "Earthbending",
    type: "spell",
    cost: 3,
    spellType: "damage_enemy_unit",
    damage: 5,
    text: "Deal 5 damage to an enemy unit."
  },

  {
    id: "splitting_rock",
    name: "Splitting Rock",
    element: "Earth",
    school: "Earthbending",
    type: "spell",
    cost: 5,
    spellType: "damage_two_enemy_units",
    damage: 3,
    text: "Choose two enemy units. Deal 3 damage to them."
  },

  {
    id: "enduring_spirit",
    name: "Enduring Spirit",
    element: "Earth",
    school: "Spirit",
    type: "spell",
    cost: 2,
    spellType: "gain_hero_health",
    heal: 5,
    text: "Gain 5 HP."
  }

];

const earthReactions = [];

// --------------------------------------------------
// Air
// --------------------------------------------------

const airUnits = [

  {
    id: "simple_monk",
    name: "Simple Monk",
    element: "Air",
    type: "unit",
    keywords: ["Dodge"],
    cost: 1,
    attack: 1,
    health: 1,
    text: "Dodge."
  },

  {
    id: "wind_reader",
    name: "Wind Reader",
    element: "Air",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 2,
    attack: 1,
    health: 3,
    battlecry: {
      type: "draw_card_type",
      cardType: "reaction",
      amount: 1
    },
    text: "Battlecry: Draw a Reaction."
  },

  {
    id: "gale_trainee",
    name: "Gale Trainee",
    element: "Air",
    type: "unit",
    keywords: ["Momentum"],
    cost: 2,
    attack: 2,
    health: 2,
    momentumBuff: { attack: 1, health: 1 },
    text: "Momentum: Gain +1/+1."
  },

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
  },

  {
    id: "skyline_courier",
    name: "Skyline Courier",
    element: "Air",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 2,
    attack: 2,
    health: 2,
    battlecry: {
      type: "draw_card_type_with_keyword",
      cardType: "spell",
      keyword: "Momentum",
      amount: 1
    },
    text: "Battlecry: Draw a Momentum move."
  },

  {
    id: "airheaded_student",
    name: "Airheaded Student",
    element: "Air",
    type: "unit",
    cost: 3,
    attack: 3,
    health: 4,
    text: "A quick Air student learning to control the wind."
  },

  {
    id: "windstep_duelist",
    name: "Windstep Duelist",
    element: "Air",
    type: "unit",
    keywords: ["Dodge"],
    cost: 3,
    attack: 3,
    health: 3,
    text: "Dodge."
  },
];

const airSpells = [
  {
    id: "sweeping_strikes",
    name: "Sweeping Strikes",
    element: "Air",
    school: "Airbending",
    type: "spell",
    keywords: ["Momentum"],
    cost: 2,
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
  },

  {
    id: "open_sky_training",
    name: "Open Sky Training",
    element: "Air",
    school: "Airbending",
    type: "spell",
    keywords: ["Momentum"],
    cost: 2,
    spellType: "draw_cards",
    drawAmount: 1,
    momentumDrawAmount: 1,
    text: "Draw 1 card. Momentum: Draw 1 more."
  },
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
    id: "turtle_duck",
    name: "Turtle Duck",
    element: "Neutral",
    type: "unit",
    cost: 1,
    attack: 1,
    health: 2,
    text: "Not immune to pebbles."
  },

  {
    id: "traveling_cook",
    name: "Traveling Cook",
    element: "Neutral",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 2,
    attack: 2,
    health: 2,
    battlecry: {
      type: "gain_hero_health",
      heal: 2
    },
    text: "Battlecry: Your Hero gains 2 HP."
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
    id: "tea_house_patron",
    name: "Tea House Patron",
    element: "Neutral",
    type: "unit",
    cost: 2,
    attack: 2,
    health: 3,
    text: "A calm and collected individual who enjoys a good cup of tea."
  },

  {
    id: "village_recruiter",
    name: "Village Recruiter",
    element: "Neutral",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 3,
    attack: 2,
    health: 2,
    battlecry: {
      type: "draw_card_type",
      cardType: "unit",
      amount: 1
    },
    text: "Battlecry: Draw a unit."
  },

  {
    id: "confident_duelist",
    name: "Confident Duelist",
    element: "Neutral",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 3,
    attack: 2,
    health: 2,
    battlecry: {
      type: "buff_self",
      buff: { attack: 1, health: 1 }
    },
    text: "Battlecry: Gain +1/+1."
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
  },

  {
    id: "young_rascal",
    name: "Young Rascal",
    element: "Neutral",
    type: "unit",
    keywords: ["Swift"],
    cost: 3,
    attack: 3,
    health: 1,
    text: "Swift. A mischievous troublemaker who can't sit still."
  },

  {
    id: "scroll_keeper",
    name: "Scroll Keeper",
    element: "Neutral",
    type: "unit",
    keywords: ["Battlecry"],
    cost: 4,
    attack: 3,
    health: 3,
    battlecry: {
      type: "buff_random_other_friendly_unit",
      buff: { attack: 2, health: 1 }
    },
    text: "Battlecry: Give another random friendly unit +2/+1."
  },

  {
    id: "platypus_bear",
    name: "Platypus Bear",
    element: "Neutral",
    type: "unit",
    cost: 4,
    attack: 5,
    health: 4,
    text: "Not JUST a bear."
  },

  {
    id: "roadside_colossus",
    name: "Roadside Colossus",
    element: "Neutral",
    type: "unit",
    cost: 5,
    attack: 4,
    health: 6,
    text: "A huge traveler who takes up the whole road."
  },

  {
    id: "city_guard",
    name: "City Guard",
    element: "Neutral",
    type: "unit",
    cost: 6,
    attack: 3,
    health: 6,
    keywords: ["Guard"],
    text: "Will do everything to guard the protect."
  },

  {
    id: "overbearing_teacher",
    name: "Overbearing Teacher",
    element: "Neutral",
    type: "unit",
    cost: 6,
    attack: 6,
    health: 4,
    text: "Class is in session."
  },
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
  },

  {
    id: "old_map",
    name: "Old Map",
    element: "Neutral",
    type: "spell",
    cost: 3,
    spellType: "draw_cards",
    drawAmount: 2,
    text: "Draw 2 cards."
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