/**
 * Weapon data for the game
 */
const WeaponData = {
  // Melee weapons
  FISTS: {
    name: 'FISTS',
    description: 'Your bare hands. Not very effective, but never run out of ammo.',
    damage: [5, 10],
    requiresAmmo: false,
    attackSpeed: 1.0,
    range: 'melee',
    icon: 'images/weapons/fists.png',
    sound: 'fists'
  },
  
  CHAINSAW: {
    name: 'CHAINSAW',
    description: 'A powerful melee weapon that tears through demons.',
    damage: [40, 60],
    requiresAmmo: false,
    attackSpeed: 0.8,
    range: 'melee',
    icon: 'images/weapons/chainsaw.png',
    sound: 'chainsaw'
  },
  
  // Ranged weapons
  PISTOL: {
    name: 'PISTOL',
    description: 'Standard issue UAC pistol. Reliable but not very powerful.',
    damage: [15, 25],
    requiresAmmo: true,
    ammoType: 'BULLETS',
    attackSpeed: 0.7,
    range: 'medium',
    icon: 'images/weapons/pistol.png',
    sound: 'pistol'
  },
  
  SHOTGUN: {
    name: 'SHOTGUN',
    description: 'Pump-action shotgun. Devastating at close range.',
    damage: [30, 50],
    requiresAmmo: true,
    ammoType: 'SHELLS',
    attackSpeed: 0.5,
    range: 'short',
    icon: 'images/weapons/shotgun.png',
    sound: 'shotgun'
  },
  
  BFG: {
    name: 'BFG',
    description: 'The legendary Big F***ing Gun. Extremely powerful.',
    damage: [80, 100],
    requiresAmmo: true,
    ammoType: 'CELLS',
    attackSpeed: 0.2,
    range: 'long',
    icon: 'images/weapons/bfg.png',
    sound: 'bfg'
  }
};
