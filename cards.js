const cards = [
  {
    id: "lotus_seal",
    name: "Lotus Seal",
    element: "Neutral",
    school: "Spirit",
    type: "reaction",
    cost: 3,
    reactionType: "destroy_summoned_unit",
    text: "Destroy an enemy unit summoned this turn."
  },

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
    id: "flame_adept",
    name: "Flame Adept",
    element: "Fire",
    school: "Firebending",
    type: "unit",
    keywords: ["Ignite"],
    cost: 1,
    attack: 1,
    health: 2,
    igniteBuff: { attack: 1, health: 1 },
    text: "Ignite: Gain +1/+1."
  },

  {
    id: "stone_guardian",
    name: "Stone Guardian",
    element: "Earth",
    type: "unit",
    keywords: ["Guard"],
    cost: 2,
    attack: 1,
    health: 4,
    text: "Guard."
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
    text: "Deal 2 damage to an enemy unit. It can't attack next turn."
  },

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
    spellType: "damage_enemy_unit",
    damage: 2,
    text: "Choose two enemy units. Deal 2 damage to them."
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
    id: "burrow_into_earth",
    name: "Burrow into Earth",
    element: "Earth",
    school: "Earthbending",
    type: "spell",
    cost: 2,
    spellType: "buff_friendly_unit",
    buff: { attack: 1, health: 3 },
    text: "Give a friendly unit +1/+3."
  }
];