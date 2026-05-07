const cards = [
  {
    id: "lotus_seal",
    name: "Lotus Seal",
    element: "Neutral",
    school: "Spirit",
    type: "reaction",
    cost: 0,
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
    type: "unit",
    cost: 1,
    attack: 1,
    health: 2,
    text: "A small aggressive unit."
  },

  {
    id: "stone_guardian",
    name: "Stone Guardian",
    element: "Earth",
    type: "unit",
    cost: 2,
    attack: 1,
    health: 4,
    text: "A sturdy defensive unit."
  },

  {
    id: "air_acolyte",
    name: "Air Acolyte",
    element: "Air",
    type: "unit",
    cost: 2,
    attack: 3,
    health: 1,
    text: "Fast, but fragile."
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
  }
];