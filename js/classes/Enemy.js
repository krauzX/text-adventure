/**
 * Enemy class that manages enemy state and actions
 */
class Enemy {
  /**
   * Create a new enemy
   * @param {string} type - Enemy type ID
   * @param {Object} data - Enemy data
   */
  constructor(type, data) {
    this.type = type;
    this.name = data.name;
    this.health = data.health;
    this.maxHealth = data.health;
    this.damage = data.damage;
    this.image = data.image;
    this.abilities = data.abilities || [];
    this.weaknesses = data.weaknesses || [];
    this.resistances = data.resistances || [];
  }
  
  /**
   * Take damage from player
   * @param {number} damage - Incoming damage
   * @returns {number} - Actual damage taken
   */
  takeDamage(damage) {
    let actualDamage = damage;
    
    // Apply resistances
    this.resistances.forEach(resistance => {
      if (resistance.type === 'weapon' && game.player.state.currentWeapon === resistance.value) {
        actualDamage = Math.floor(actualDamage * resistance.multiplier);
      }
    });
    
    // Apply weaknesses
    this.weaknesses.forEach(weakness => {
      if (weakness.type === 'weapon' && game.player.state.currentWeapon === weakness.value) {
        actualDamage = Math.floor(actualDamage * weakness.multiplier);
      }
    });
    
    // Apply damage
    this.health = Math.max(0, this.health - actualDamage);
    
    return actualDamage;
  }
  
  /**
   * Attack the player
   * @returns {number} - Damage dealt
   */
  attack() {
    // Basic attack
    const baseDamage = Math.floor(
      Math.random() * (this.damage[1] - this.damage[0] + 1)
    ) + this.damage[0];
    
    // Check for special abilities
    let totalDamage = baseDamage;
    let usedSpecialAttack = false;
    
    // Chance to use special ability
    if (this.abilities.length > 0 && Math.random() < 0.3) {
      const randomAbility = this.abilities[Math.floor(Math.random() * this.abilities.length)];
      
      if (randomAbility.type === 'damage_multiplier') {
        totalDamage = Math.floor(baseDamage * randomAbility.value);
        usedSpecialAttack = true;
        
        // Add special attack message to combat log
        if (game.combatLogElement) {
          game.addToCombatLog(`[RED]${this.name} uses ${randomAbility.name}![/RED]`);
        }
      }
    }
    
    return totalDamage;
  }
  
  /**
   * Check if enemy is dead
   * @returns {boolean} - Whether the enemy is dead
   */
  isDead() {
    return this.health <= 0;
  }
  
  /**
   * Get health percentage
   * @returns {number} - Health percentage (0-100)
   */
  getHealthPercentage() {
    return (this.health / this.maxHealth) * 100;
  }
}
