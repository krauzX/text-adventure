/**
 * Main Game class that manages the game state and flow
 */
class Game {
  constructor() {
    // DOM Elements
    this.textElement = document.getElementById("text");
    this.optionButtonsElement = document.getElementById("option-buttons");
    this.sceneImageElement = document.getElementById("scene-image");
    this.enemyContainerElement = document.getElementById("enemy-container");
    this.combatLogElement = document.getElementById("combat-log");
    this.titleScreenElement = document.getElementById("title-screen");
    this.gameContainerElement = document.getElementById("game-container");
    this.miniMapElement = document.getElementById("mini-map");
    this.journalElement = document.getElementById("journal");
    this.journalContentElement = document.getElementById("journal-content");
    this.journalToggleElement = document.getElementById("journal-toggle");
    this.soundToggleElement = document.getElementById("sound-toggle");
    this.difficultySelectElement = document.getElementById("difficulty-select");

    // Game state
    this.player = new Player();
    this.currentEnemy = null;
    this.currentNode = null;
    this.visitedNodes = new Set();
    this.gameStarted = false;
    this.difficulty = "normal";
    this.soundEnabled = true;
    this.journalEntries = [];

    // Initialize event listeners
    this.initEventListeners();
  }

  /**
   * Initialize event listeners for game controls
   */
  initEventListeners() {
    // Journal toggle
    if (this.journalToggleElement) {
      this.journalToggleElement.addEventListener("click", () =>
        this.toggleJournal()
      );
    }

    // Sound toggle
    if (this.soundToggleElement) {
      this.soundToggleElement.addEventListener("click", () =>
        this.toggleSound()
      );
    }

    // Difficulty select
    if (this.difficultySelectElement) {
      this.difficultySelectElement.addEventListener("change", (e) => {
        this.difficulty = e.target.value;
        this.updateDifficulty();
      });
    }
  }

  /**
   * Start the game
   */
  startGame() {
    // Hide title screen if it exists
    if (this.titleScreenElement) {
      this.titleScreenElement.classList.add("hidden");
    }

    // Show game container
    if (this.gameContainerElement) {
      this.gameContainerElement.classList.remove("hidden");
    }

    // Reset player
    this.player.reset();

    // Reset game state
    this.visitedNodes = new Set();
    this.journalEntries = [];
    this.gameStarted = true;

    // Update UI
    this.player.updateStats();
    this.player.updateInventory();

    // Show first node
    this.showTextNode(1);

    // Play background music
    if (this.soundEnabled) {
      AudioManager.playMusic("background");
    }
  }

  /**
   * Show a text node by its ID
   * @param {number} textNodeIndex - The ID of the node to show
   */
  showTextNode(textNodeIndex) {
    // Find the node
    const textNode = StoryData.textNodes.find(
      (node) => node.id === textNodeIndex
    );
    if (!textNode) return;

    this.currentNode = textNode;
    this.visitedNodes.add(textNodeIndex);

    // Set background if specified
    if (textNode.background) {
      this.setBackground(textNode.background);
    }

    // Show enemy if specified
    if (textNode.enemy) {
      this.showEnemy(textNode.enemy);
      this.combatLogElement.innerHTML = "";
      this.combatLogElement.style.display = "block";
    } else {
      this.showEnemy(null);
      this.combatLogElement.style.display = "none";
    }

    // Add to journal if it's a story node
    if (textNode.addToJournal) {
      this.addJournalEntry(textNode.text, textNode.background);
    }

    // Update text
    this.textElement.innerHTML = this.formatText(textNode.text);

    // Update mini-map if available
    this.updateMiniMap();

    // Clear options
    while (this.optionButtonsElement.firstChild) {
      this.optionButtonsElement.removeChild(
        this.optionButtonsElement.firstChild
      );
    }

    // Add options
    textNode.options.forEach((option) => {
      if (this.showOption(option)) {
        const button = document.createElement("button");
        button.innerHTML = this.formatText(option.text);
        button.classList.add("btn");

        // Add special classes if specified
        if (option.buttonClass) {
          button.classList.add(option.buttonClass);
        }

        button.addEventListener("click", () => this.selectOption(option));
        this.optionButtonsElement.appendChild(button);
      }
    });

    // Play node sound if specified
    if (textNode.sound && this.soundEnabled) {
      AudioManager.playSound(textNode.sound);
    }
  }

  /**
   * Format text with HTML and special formatting
   * @param {string} text - The text to format
   * @returns {string} - Formatted HTML
   */
  formatText(text) {
    // Replace [RED]text[/RED] with <span class="text-red">text</span>
    text = text.replace(
      /\[RED\](.*?)\[\/RED\]/g,
      '<span class="text-red">$1</span>'
    );

    // Replace [YELLOW]text[/YELLOW] with <span class="text-yellow">text</span>
    text = text.replace(
      /\[YELLOW\](.*?)\[\/YELLOW\]/g,
      '<span class="text-yellow">$1</span>'
    );

    // Replace [GREEN]text[/GREEN] with <span class="text-green">text</span>
    text = text.replace(
      /\[GREEN\](.*?)\[\/GREEN\]/g,
      '<span class="text-green">$1</span>'
    );

    // Replace [BLUE]text[/BLUE] with <span class="text-blue">text</span>
    text = text.replace(
      /\[BLUE\](.*?)\[\/BLUE\]/g,
      '<span class="text-blue">$1</span>'
    );

    // Replace [BOLD]text[/BOLD] with <strong>text</strong>
    text = text.replace(/\[BOLD\](.*?)\[\/BOLD\]/g, "<strong>$1</strong>");

    // Replace [ITALIC]text[/ITALIC] with <em>text</em>
    text = text.replace(/\[ITALIC\](.*?)\[\/ITALIC\]/g, "<em>$1</em>");

    return text;
  }

  /**
   * Set the background image
   * @param {string} scene - The scene key from BackgroundData
   */
  setBackground(scene) {
    const background = BackgroundData[scene];
    if (background) {
      // Use ImageManager to set background with fallback
      ImageManager.setBackgroundImage(this.sceneImageElement, background.image);
    }
  }

  /**
   * Show an enemy on screen
   * @param {string} enemyType - The enemy type key from EnemyData
   */
  showEnemy(enemyType) {
    if (!enemyType) {
      this.enemyContainerElement.innerHTML = "";
      this.currentEnemy = null;
      return;
    }

    const enemyData = EnemyData[enemyType];
    if (!enemyData) return;

    // Create enemy instance
    this.currentEnemy = new Enemy(enemyType, enemyData);

    // Update enemy display
    this.enemyContainerElement.innerHTML = "";
    const enemyImage = document.createElement("img");
    enemyImage.alt = enemyData.name;
    enemyImage.classList.add("enemy-image");

    // Use ImageManager to set image with fallback
    ImageManager.setImageSrc(enemyImage, enemyData.image);

    // Add health bar for enemy
    const enemyHealthContainer = document.createElement("div");
    enemyHealthContainer.classList.add("enemy-health-container");

    const enemyHealthBar = document.createElement("div");
    enemyHealthBar.classList.add("enemy-health-bar");
    enemyHealthBar.style.width = "100%";

    const enemyHealthText = document.createElement("div");
    enemyHealthText.classList.add("enemy-health-text");
    enemyHealthText.textContent = `${enemyData.name}: ${this.currentEnemy.health}`;

    enemyHealthContainer.appendChild(enemyHealthBar);
    enemyHealthContainer.appendChild(enemyHealthText);

    this.enemyContainerElement.appendChild(enemyImage);
    this.enemyContainerElement.appendChild(enemyHealthContainer);
  }

  /**
   * Check if an option should be shown
   * @param {Object} option - The option object
   * @returns {boolean} - Whether the option should be shown
   */
  showOption(option) {
    return (
      option.requiredState == null || option.requiredState(this.player.state)
    );
  }

  /**
   * Handle option selection
   * @param {Object} option - The selected option
   */
  selectOption(option) {
    // Handle combat if there's an enemy
    if (this.currentEnemy) {
      const combatResult = this.combat(option);

      if (combatResult === "DEAD") {
        return this.showTextNode(99); // Game over node
      }

      if (combatResult === false) {
        return; // Combat continues
      }
    }

    // Process state changes
    if (option.setState) {
      this.player.updateState(option.setState);
    }

    // Play option sound if specified
    if (option.sound && this.soundEnabled) {
      AudioManager.playSound(option.sound);
    }

    // Go to next text node
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
      return this.startGame();
    }

    this.showTextNode(nextTextNodeId);
  }

  /**
   * Handle combat
   * @param {Object} option - The selected option
   * @returns {boolean|string} - Combat result
   */
  combat(option) {
    if (!this.currentEnemy) return true;

    // Get player weapon
    const weapon = this.player.getCurrentWeapon();

    // Check if player has ammo for weapon
    if (
      weapon.requiresAmmo &&
      this.player.state.ammo <= 0 &&
      weapon.name !== "FISTS"
    ) {
      this.addToCombatLog("OUT OF AMMO! Switched to FISTS");
      this.player.equipWeapon("FISTS");
      return false;
    }

    // Player attacks enemy
    const playerDamage = this.player.attack(this.currentEnemy);

    // Add combat log
    this.addToCombatLog(
      `You hit ${this.currentEnemy.name} with ${weapon.name} for ${playerDamage} damage!`
    );

    // Update enemy health display
    const enemyHealthBar = document.querySelector(".enemy-health-bar");
    const enemyHealthText = document.querySelector(".enemy-health-text");

    if (enemyHealthBar && enemyHealthText) {
      const healthPercent =
        (this.currentEnemy.health / this.currentEnemy.maxHealth) * 100;
      enemyHealthBar.style.width = `${healthPercent}%`;
      enemyHealthText.textContent = `${this.currentEnemy.name}: ${this.currentEnemy.health}`;
    }

    // Enemy defeated
    if (this.currentEnemy.health <= 0) {
      this.addToCombatLog(`${this.currentEnemy.name} defeated!`);
      this.player.state.killedDemons++;

      // Play death sound
      if (this.soundEnabled) {
        AudioManager.playSound("enemy_death");
      }

      // Random loot
      this.generateLoot();

      // Check for achievements
      this.checkAchievements();

      return true;
    }

    // Enemy attacks player
    const enemyDamage = this.currentEnemy.attack();

    // Player takes damage
    const actualDamage = this.player.takeDamage(enemyDamage);

    // Add combat log
    this.addToCombatLog(
      `${this.currentEnemy.name} hits you for ${actualDamage} damage!`
    );

    // Apply damage effect
    document.body.classList.add("damage-effect");
    setTimeout(() => {
      document.body.classList.remove("damage-effect");
    }, 300);

    // Check if player is dead
    if (this.player.state.health <= 0) {
      this.addToCombatLog("YOU DIED!");

      // Play death sound
      if (this.soundEnabled) {
        AudioManager.playSound("player_death");
      }

      return "DEAD";
    }

    return false;
  }

  /**
   * Generate random loot after defeating an enemy
   */
  generateLoot() {
    const lootChance = Math.random();
    const lootThreshold =
      this.difficulty === "easy"
        ? 0.5
        : this.difficulty === "normal"
        ? 0.7
        : 0.8;

    if (lootChance > lootThreshold) {
      const lootTable = ItemData.getLootTable(this.currentEnemy.type);
      const randomLoot =
        lootTable[Math.floor(Math.random() * lootTable.length)];

      this.player.addToInventory(randomLoot);
      this.addToCombatLog(`Found: ${ItemData[randomLoot].name}`);

      // Play loot sound
      if (this.soundEnabled) {
        AudioManager.playSound("item_pickup");
      }
    }
  }

  /**
   * Add message to combat log
   * @param {string} message - The message to add
   */
  addToCombatLog(message) {
    this.combatLogElement.style.display = "block";
    const logEntry = document.createElement("div");
    logEntry.innerHTML = this.formatText(message);
    this.combatLogElement.appendChild(logEntry);
    this.combatLogElement.scrollTop = this.combatLogElement.scrollHeight;
  }

  /**
   * Add entry to journal
   * @param {string} text - The journal entry text
   * @param {string} background - The background image key
   */
  addJournalEntry(text, background) {
    const entry = {
      text,
      background,
      timestamp: new Date().toLocaleTimeString(),
    };

    this.journalEntries.push(entry);
    this.updateJournal();

    // Show journal notification
    const notification = document.createElement("div");
    notification.classList.add("journal-notification");
    notification.textContent = "New Journal Entry";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  }

  /**
   * Update journal display
   */
  updateJournal() {
    if (!this.journalContentElement) return;

    this.journalContentElement.innerHTML = "";

    this.journalEntries.forEach((entry, index) => {
      const entryElement = document.createElement("div");
      entryElement.classList.add("journal-entry");

      const entryHeader = document.createElement("div");
      entryHeader.classList.add("journal-entry-header");
      entryHeader.textContent = `Entry #${index + 1} - ${entry.timestamp}`;

      const entryContent = document.createElement("div");
      entryContent.classList.add("journal-entry-content");
      entryContent.innerHTML = this.formatText(entry.text);

      entryElement.appendChild(entryHeader);
      entryElement.appendChild(entryContent);

      this.journalContentElement.appendChild(entryElement);
    });
  }

  /**
   * Toggle journal visibility
   */
  toggleJournal() {
    if (!this.journalElement) return;

    this.journalElement.classList.toggle("show");

    // Update journal content when opened
    if (this.journalElement.classList.contains("show")) {
      this.updateJournal();
    }
  }

  /**
   * Toggle sound on/off
   */
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;

    if (this.soundToggleElement) {
      this.soundToggleElement.textContent = this.soundEnabled ? "🔊" : "🔇";
    }

    if (this.soundEnabled) {
      AudioManager.unmute();
      AudioManager.playMusic("background");
    } else {
      AudioManager.mute();
    }
  }

  /**
   * Update mini-map display
   */
  updateMiniMap() {
    if (!this.miniMapElement) return;

    this.miniMapElement.innerHTML = "";

    // Create mini-map nodes
    StoryData.textNodes.forEach((node) => {
      // Only show nodes that are visible on the map
      if (node.showOnMap) {
        const nodeElement = document.createElement("div");
        nodeElement.classList.add("map-node");

        // Add classes based on node type
        if (node.nodeType) {
          nodeElement.classList.add(`map-node-${node.nodeType}`);
        }

        // Mark visited nodes
        if (this.visitedNodes.has(node.id)) {
          nodeElement.classList.add("visited");
        }

        // Mark current node
        if (this.currentNode && this.currentNode.id === node.id) {
          nodeElement.classList.add("current");
        }

        // Position node on map
        if (node.mapPosition) {
          nodeElement.style.left = `${node.mapPosition.x}%`;
          nodeElement.style.top = `${node.mapPosition.y}%`;
        }

        // Add tooltip
        if (this.visitedNodes.has(node.id)) {
          const tooltip = document.createElement("div");
          tooltip.classList.add("map-tooltip");
          tooltip.textContent = node.mapName || `Node ${node.id}`;
          nodeElement.appendChild(tooltip);
        }

        this.miniMapElement.appendChild(nodeElement);
      }
    });

    // Draw connections between nodes
    StoryData.mapConnections.forEach((connection) => {
      // Only show connections if at least one node is visited
      if (
        this.visitedNodes.has(connection.from) ||
        this.visitedNodes.has(connection.to)
      ) {
        const lineElement = document.createElement("div");
        lineElement.classList.add("map-connection");

        // Calculate line position and rotation
        const fromNode = StoryData.textNodes.find(
          (node) => node.id === connection.from
        );
        const toNode = StoryData.textNodes.find(
          (node) => node.id === connection.to
        );

        if (fromNode && toNode && fromNode.mapPosition && toNode.mapPosition) {
          const x1 = fromNode.mapPosition.x;
          const y1 = fromNode.mapPosition.y;
          const x2 = toNode.mapPosition.x;
          const y2 = toNode.mapPosition.y;

          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

          lineElement.style.width = `${length}%`;
          lineElement.style.left = `${x1}%`;
          lineElement.style.top = `${y1}%`;
          lineElement.style.transform = `rotate(${angle}deg)`;
          lineElement.style.transformOrigin = "left center";

          this.miniMapElement.appendChild(lineElement);
        }
      }
    });
  }

  /**
   * Update game difficulty
   */
  updateDifficulty() {
    switch (this.difficulty) {
      case "easy":
        this.player.state.maxHealth = 150;
        this.player.state.health = Math.min(this.player.state.health, 150);
        break;
      case "normal":
        this.player.state.maxHealth = 100;
        this.player.state.health = Math.min(this.player.state.health, 100);
        break;
      case "hard":
        this.player.state.maxHealth = 75;
        this.player.state.health = Math.min(this.player.state.health, 75);
        break;
    }

    this.player.updateStats();
  }

  /**
   * Check for achievements
   */
  checkAchievements() {
    // Check kill count achievements
    if (
      this.player.state.killedDemons >= 5 &&
      !this.player.state.achievements.includes("DEMON_SLAYER")
    ) {
      this.unlockAchievement("DEMON_SLAYER", "Demon Slayer", "Kill 5 demons");
    }

    if (
      this.player.state.killedDemons >= 10 &&
      !this.player.state.achievements.includes("DOOM_SLAYER")
    ) {
      this.unlockAchievement("DOOM_SLAYER", "DOOM Slayer", "Kill 10 demons");
    }

    // Check weapon achievements
    if (
      this.player.state.inventory.includes("BFG") &&
      !this.player.state.achievements.includes("BFG_DIVISION")
    ) {
      this.unlockAchievement("BFG_DIVISION", "BFG Division", "Acquire the BFG");
    }
  }

  /**
   * Unlock an achievement
   * @param {string} id - Achievement ID
   * @param {string} name - Achievement name
   * @param {string} description - Achievement description
   */
  unlockAchievement(id, name, description) {
    this.player.state.achievements.push(id);

    // Show achievement notification
    const notification = document.createElement("div");
    notification.classList.add("achievement-notification");

    const achievementTitle = document.createElement("div");
    achievementTitle.classList.add("achievement-title");
    achievementTitle.textContent = "Achievement Unlocked!";

    const achievementName = document.createElement("div");
    achievementName.classList.add("achievement-name");
    achievementName.textContent = name;

    const achievementDesc = document.createElement("div");
    achievementDesc.classList.add("achievement-description");
    achievementDesc.textContent = description;

    notification.appendChild(achievementTitle);
    notification.appendChild(achievementName);
    notification.appendChild(achievementDesc);

    document.body.appendChild(notification);

    // Play achievement sound
    if (this.soundEnabled) {
      AudioManager.playSound("achievement");
    }

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 5000);
  }
}
