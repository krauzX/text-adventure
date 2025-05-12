/**
 * Player class that manages player state and actions
 */
class Player {
  constructor() {
    // DOM Elements
    this.healthBarElement = document.getElementById("health-bar");
    this.healthValueElement = document.getElementById("health-value");
    this.armorBarElement = document.getElementById("armor-bar");
    this.armorValueElement = document.getElementById("armor-value");
    this.ammoValueElement = document.getElementById("ammo-value");
    this.currentWeaponElement = document.getElementById("current-weapon");
    this.inventoryElement = document.getElementById("inventory");
    this.achievementsElement = document.getElementById("achievements-list");

    // Initialize player state
    this.reset();
  }

  /**
   * Reset player to initial state
   */
  reset() {
    this.state = {
      health: 100,
      maxHealth: 100,
      armor: 0,
      maxArmor: 100,
      ammo: 0,
      currentWeapon: "FISTS",
      inventory: [],
      achievements: [],
      killedDemons: 0,
      level: 1,
      experience: 0,
      nextLevelExp: 100,
    };
  }

  /**
   * Update player stats display
   */
  updateStats() {
    if (this.healthBarElement) {
      this.healthBarElement.style.width = `${
        (this.state.health / this.state.maxHealth) * 100
      }%`;
    }

    if (this.healthValueElement) {
      this.healthValueElement.innerText = this.state.health;
    }

    if (this.armorBarElement) {
      this.armorBarElement.style.width = `${
        (this.state.armor / this.state.maxArmor) * 100
      }%`;
    }

    if (this.armorValueElement) {
      this.armorValueElement.innerText = this.state.armor;
    }

    if (this.ammoValueElement) {
      this.ammoValueElement.innerText = this.state.ammo;
    }

    if (this.currentWeaponElement) {
      this.currentWeaponElement.innerText = this.state.currentWeapon;

      // Add weapon icon if available
      const weaponData = WeaponData[this.state.currentWeapon];
      if (weaponData) {
        const weaponIcon = document.createElement("img");
        weaponIcon.alt = weaponData.name;
        weaponIcon.classList.add("weapon-icon");

        // Use ImageManager to set image with fallback
        ImageManager.setImageSrc(weaponIcon, weaponData.icon);

        // Clear previous content and add new icon and text
        this.currentWeaponElement.innerHTML = "";
        this.currentWeaponElement.appendChild(weaponIcon);
        this.currentWeaponElement.appendChild(
          document.createTextNode(weaponData.name)
        );
      }
    }
  }

  /**
   * Update inventory display
   */
  updateInventory() {
    if (!this.inventoryElement) return;

    this.inventoryElement.innerHTML = "";

    // Group items by type
    const groupedItems = {};

    this.state.inventory.forEach((itemId) => {
      if (!groupedItems[itemId]) {
        groupedItems[itemId] = 1;
      } else {
        groupedItems[itemId]++;
      }
    });

    // Create inventory items
    Object.keys(groupedItems).forEach((itemId) => {
      const itemData = ItemData[itemId] || WeaponData[itemId];
      if (!itemData) return;

      const itemElement = document.createElement("div");
      itemElement.classList.add("inventory-item");

      // Add item icon if available
      const itemIcon = document.createElement("img");
      itemIcon.alt = itemData.name;
      itemIcon.classList.add("item-icon");

      // Use ImageManager to set image with fallback
      ImageManager.setImageSrc(itemIcon, itemData.icon);
      itemElement.appendChild(itemIcon);

      // Add item name and count
      const itemName = document.createElement("span");
      itemName.classList.add("item-name");
      itemName.textContent = itemData.name;
      itemElement.appendChild(itemName);

      if (groupedItems[itemId] > 1) {
        const itemCount = document.createElement("span");
        itemCount.classList.add("item-count");
        itemCount.textContent = `x${groupedItems[itemId]}`;
        itemElement.appendChild(itemCount);
      }

      // Add click event
      itemElement.addEventListener("click", () => this.useItem(itemId));

      // Add tooltip
      const tooltip = document.createElement("div");
      tooltip.classList.add("item-tooltip");
      tooltip.textContent = itemData.description || itemData.name;
      itemElement.appendChild(tooltip);

      this.inventoryElement.appendChild(itemElement);
    });
  }

  /**
   * Update player state
   * @param {Object} newState - New state properties
   */
  updateState(newState) {
    // Handle function-based state updates
    const processedState = {};

    Object.keys(newState).forEach((key) => {
      if (typeof newState[key] === "function") {
        processedState[key] = newState[key](this.state);
      } else {
        processedState[key] = newState[key];
      }
    });

    // Update state
    this.state = { ...this.state, ...processedState };

    // Update UI
    this.updateStats();
    this.updateInventory();
  }

  /**
   * Use an item from inventory
   * @param {string} itemId - Item ID
   */
  useItem(itemId) {
    // Handle consumable items
    if (itemId === "MEDKIT") {
      const healAmount = 25;
      this.state.health = Math.min(
        this.state.maxHealth,
        this.state.health + healAmount
      );
      this.removeFromInventory(itemId);

      // Play sound
      AudioManager.playSound("heal");

      // Show healing effect
      document.body.classList.add("heal-effect");
      setTimeout(() => {
        document.body.classList.remove("heal-effect");
      }, 500);

      return `Used MEDKIT. +${healAmount} HEALTH`;
    } else if (itemId === "ARMOR_SHARD") {
      const armorAmount = 15;
      this.state.armor = Math.min(
        this.state.maxArmor,
        this.state.armor + armorAmount
      );
      this.removeFromInventory(itemId);

      // Play sound
      AudioManager.playSound("armor");

      return `Used ARMOR SHARD. +${armorAmount} ARMOR`;
    } else if (itemId === "AMMO_PACK") {
      const ammoAmount = 20;
      this.state.ammo += ammoAmount;
      this.removeFromInventory(itemId);

      // Play sound
      AudioManager.playSound("ammo");

      return `Used AMMO PACK. +${ammoAmount} AMMO`;
    }
    // Handle weapons
    else if (WeaponData[itemId]) {
      this.equipWeapon(itemId);

      // Play sound
      AudioManager.playSound("weapon_switch");

      return `Equipped ${WeaponData[itemId].name}`;
    }

    return null;
  }

  /**
   * Add item to inventory
   * @param {string} itemId - Item ID
   */
  addToInventory(itemId) {
    this.state.inventory.push(itemId);
    this.updateInventory();
  }

  /**
   * Remove item from inventory
   * @param {string} itemId - Item ID
   */
  removeFromInventory(itemId) {
    const index = this.state.inventory.indexOf(itemId);
    if (index !== -1) {
      this.state.inventory.splice(index, 1);
      this.updateInventory();
    }
  }

  /**
   * Equip a weapon
   * @param {string} weaponId - Weapon ID
   */
  equipWeapon(weaponId) {
    if (WeaponData[weaponId]) {
      this.state.currentWeapon = weaponId;
      this.updateStats();
    }
  }

  /**
   * Get current weapon data
   * @returns {Object} - Weapon data
   */
  getCurrentWeapon() {
    return WeaponData[this.state.currentWeapon] || WeaponData.FISTS;
  }

  /**
   * Attack an enemy
   * @param {Enemy} enemy - Enemy to attack
   * @returns {number} - Damage dealt
   */
  attack(enemy) {
    const weapon = this.getCurrentWeapon();

    // Calculate damage
    const baseDamage =
      Math.floor(Math.random() * (weapon.damage[1] - weapon.damage[0] + 1)) +
      weapon.damage[0];

    // Apply level bonus
    const levelBonus = (this.state.level - 1) * 0.1; // 10% per level
    const totalDamage = Math.floor(baseDamage * (1 + levelBonus));

    // Use ammo if needed
    if (weapon.requiresAmmo && this.state.ammo > 0) {
      this.state.ammo--;
      this.updateStats();
    }

    // Deal damage to enemy
    enemy.takeDamage(totalDamage);

    // Add experience
    this.addExperience(5);

    return totalDamage;
  }

  /**
   * Take damage from an enemy
   * @param {number} damage - Incoming damage
   * @returns {number} - Actual damage taken
   */
  takeDamage(damage) {
    let actualDamage = damage;

    // Armor absorbs some damage
    if (this.state.armor > 0) {
      const absorbedDamage = Math.min(
        this.state.armor,
        Math.floor(damage * 0.5)
      );
      this.state.armor -= absorbedDamage;
      actualDamage -= absorbedDamage;
    }

    // Take damage
    this.state.health -= actualDamage;

    // Update UI
    this.updateStats();

    return actualDamage;
  }

  /**
   * Add experience points
   * @param {number} exp - Experience points to add
   */
  addExperience(exp) {
    this.state.experience += exp;

    // Check for level up
    if (this.state.experience >= this.state.nextLevelExp) {
      this.levelUp();
    }
  }

  /**
   * Level up the player
   */
  levelUp() {
    this.state.level++;
    this.state.experience -= this.state.nextLevelExp;
    this.state.nextLevelExp = Math.floor(this.state.nextLevelExp * 1.5);

    // Increase max health
    const prevMaxHealth = this.state.maxHealth;
    this.state.maxHealth += 10;
    this.state.health += 10;

    // Show level up notification
    const notification = document.createElement("div");
    notification.classList.add("level-up-notification");
    notification.innerHTML = `
      <div class="level-up-title">Level Up!</div>
      <div class="level-up-level">Level ${this.state.level}</div>
      <div class="level-up-bonus">+10 Max Health</div>
    `;

    document.body.appendChild(notification);

    // Play level up sound
    AudioManager.playSound("level_up");

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);

    // Update UI
    this.updateStats();
  }

  /**
   * Update achievements display
   */
  updateAchievements() {
    if (!this.achievementsElement) return;

    this.achievementsElement.innerHTML = "";

    this.state.achievements.forEach((achievementId) => {
      const achievementData = AchievementData[achievementId];
      if (!achievementData) return;

      const achievementElement = document.createElement("div");
      achievementElement.classList.add("achievement-item");

      const achievementName = document.createElement("div");
      achievementName.classList.add("achievement-name");
      achievementName.textContent = achievementData.name;

      const achievementDesc = document.createElement("div");
      achievementDesc.classList.add("achievement-description");
      achievementDesc.textContent = achievementData.description;

      achievementElement.appendChild(achievementName);
      achievementElement.appendChild(achievementDesc);

      this.achievementsElement.appendChild(achievementElement);
    });
  }
}
