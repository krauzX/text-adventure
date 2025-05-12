/**
 * Enemy data for the game
 */
const EnemyData = {
  // Basic enemies
  IMP: {
    name: 'IMP',
    description: 'A common demon that throws fireballs.',
    health: 50,
    damage: [5, 15],
    image: 'images/enemies/imp.png',
    abilities: [
      {
        name: 'Fireball',
        type: 'damage_multiplier',
        value: 1.5
      }
    ],
    weaknesses: [
      {
        type: 'weapon',
        value: 'SHOTGUN',
        multiplier: 1.5
      }
    ],
    resistances: []
  },
  
  DEMON: {
    name: 'DEMON',
    description: 'A fast-moving demon with powerful bite attacks.',
    health: 100,
    damage: [10, 20],
    image: 'images/enemies/demon.png',
    abilities: [
      {
        name: 'Charge',
        type: 'damage_multiplier',
        value: 1.3
      }
    ],
    weaknesses: [
      {
        type: 'weapon',
        value: 'CHAINSAW',
        multiplier: 1.7
      }
    ],
    resistances: [
      {
        type: 'weapon',
        value: 'PISTOL',
        multiplier: 0.8
      }
    ]
  },
  
  CACODEMON: {
    name: 'CACODEMON',
    description: 'A floating demon with powerful energy attacks.',
    health: 150,
    damage: [15, 25],
    image: 'images/enemies/cacodemon.png',
    abilities: [
      {
        name: 'Energy Ball',
        type: 'damage_multiplier',
        value: 1.4
      }
    ],
    weaknesses: [
      {
        type: 'weapon',
        value: 'SHOTGUN',
        multiplier: 1.3
      }
    ],
    resistances: [
      {
        type: 'weapon',
        value: 'CHAINSAW',
        multiplier: 0.7
      }
    ]
  },
  
  // Mini-bosses
  BARON: {
    name: 'BARON OF HELL',
    description: 'A powerful demon lord with devastating attacks.',
    health: 200,
    damage: [20, 30],
    image: 'images/enemies/baron.png',
    abilities: [
      {
        name: 'Hellfire',
        type: 'damage_multiplier',
        value: 1.6
      },
      {
        name: 'Ground Slam',
        type: 'damage_multiplier',
        value: 1.8
      }
    ],
    weaknesses: [
      {
        type: 'weapon',
        value: 'BFG',
        multiplier: 1.5
      }
    ],
    resistances: [
      {
        type: 'weapon',
        value: 'PISTOL',
        multiplier: 0.5
      },
      {
        type: 'weapon',
        value: 'FISTS',
        multiplier: 0.3
      }
    ]
  },
  
  // Final boss
  CYBERDEMON: {
    name: 'CYBERDEMON',
    description: 'A massive cybernetic demon with devastating firepower.',
    health: 500,
    damage: [30, 50],
    image: 'images/enemies/cyberdemon.png',
    abilities: [
      {
        name: 'Rocket Barrage',
        type: 'damage_multiplier',
        value: 2.0
      },
      {
        name: 'Stomp',
        type: 'damage_multiplier',
        value: 1.5
      },
      {
        name: 'Laser Beam',
        type: 'damage_multiplier',
        value: 1.8
      }
    ],
    weaknesses: [
      {
        type: 'weapon',
        value: 'BFG',
        multiplier: 1.3
      }
    ],
    resistances: [
      {
        type: 'weapon',
        value: 'PISTOL',
        multiplier: 0.3
      },
      {
        type: 'weapon',
        value: 'SHOTGUN',
        multiplier: 0.7
      },
      {
        type: 'weapon',
        value: 'FISTS',
        multiplier: 0.1
      }
    ]
  }
};
