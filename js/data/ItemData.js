/**
 * Item data for the game
 */
const ItemData = {
  // Health items
  MEDKIT: {
    name: 'MEDKIT',
    description: 'Restores 25 health points.',
    type: 'consumable',
    effect: 'health',
    value: 25,
    icon: 'images/items/medkit.png'
  },
  
  LARGE_MEDKIT: {
    name: 'LARGE MEDKIT',
    description: 'Restores 50 health points.',
    type: 'consumable',
    effect: 'health',
    value: 50,
    icon: 'images/items/large_medkit.png'
  },
  
  // Armor items
  ARMOR_SHARD: {
    name: 'ARMOR SHARD',
    description: 'Adds 15 armor points.',
    type: 'consumable',
    effect: 'armor',
    value: 15,
    icon: 'images/items/armor_shard.png'
  },
  
  ARMOR_VEST: {
    name: 'ARMOR VEST',
    description: 'Adds 50 armor points.',
    type: 'consumable',
    effect: 'armor',
    value: 50,
    icon: 'images/items/armor_vest.png'
  },
  
  // Ammo items
  AMMO_PACK: {
    name: 'AMMO PACK',
    description: 'Adds 20 ammo points.',
    type: 'consumable',
    effect: 'ammo',
    value: 20,
    icon: 'images/items/ammo_pack.png'
  },
  
  LARGE_AMMO_PACK: {
    name: 'LARGE AMMO PACK',
    description: 'Adds 50 ammo points.',
    type: 'consumable',
    effect: 'ammo',
    value: 50,
    icon: 'images/items/large_ammo_pack.png'
  },
  
  // Key items
  RED_KEYCARD: {
    name: 'RED KEYCARD',
    description: 'Grants access to red-locked areas.',
    type: 'key',
    icon: 'images/items/red_keycard.png'
  },
  
  BLUE_KEYCARD: {
    name: 'BLUE KEYCARD',
    description: 'Grants access to blue-locked areas.',
    type: 'key',
    icon: 'images/items/blue_keycard.png'
  },
  
  YELLOW_KEYCARD: {
    name: 'YELLOW KEYCARD',
    description: 'Grants access to yellow-locked areas.',
    type: 'key',
    icon: 'images/items/yellow_keycard.png'
  },
  
  // Special items
  UAC_ID_CARD: {
    name: 'UAC ID CARD',
    description: 'Grants access to secure UAC facilities.',
    type: 'key',
    icon: 'images/items/uac_id_card.png'
  },
  
  SECURITY_OVERRIDE: {
    name: 'SECURITY OVERRIDE',
    description: 'Can bypass security systems.',
    type: 'key',
    icon: 'images/items/security_override.png'
  },
  
  /**
   * Get loot table for an enemy type
   * @param {string} enemyType - Enemy type ID
   * @returns {Array} - Array of possible loot items
   */
  getLootTable: function(enemyType) {
    // Default loot table
    const defaultLoot = ['MEDKIT', 'ARMOR_SHARD', 'AMMO_PACK'];
    
    // Enemy-specific loot tables
    const lootTables = {
      IMP: ['MEDKIT', 'AMMO_PACK'],
      DEMON: ['MEDKIT', 'ARMOR_SHARD', 'AMMO_PACK'],
      CACODEMON: ['MEDKIT', 'ARMOR_SHARD', 'AMMO_PACK', 'LARGE_AMMO_PACK'],
      BARON: ['LARGE_MEDKIT', 'ARMOR_VEST', 'LARGE_AMMO_PACK'],
      CYBERDEMON: ['LARGE_MEDKIT', 'ARMOR_VEST', 'LARGE_AMMO_PACK']
    };
    
    return lootTables[enemyType] || defaultLoot;
  }
};
