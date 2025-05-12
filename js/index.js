/**
 * Main entry point for the DOOM Text Adventure game
 *
 * This file initializes the game and creates the global game instance.
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Show loading indicator
  showLoadingIndicator();

  // Initialize audio manager
  if (typeof AudioManager !== "undefined") {
    AudioManager.init();
  }

  // Preload essential images
  preloadGameAssets(() => {
    // Hide loading indicator
    hideLoadingIndicator();

    // Create global game instance
    window.game = new Game();

    // Start the game
    game.startGame();

    // Add event listeners for global UI elements
    setupGlobalEventListeners();
  });
});

/**
 * Preload game assets
 * @param {Function} callback - Function to call when assets are loaded
 */
function preloadGameAssets(callback) {
  // Collect all image paths to preload
  const imagesToPreload = [];

  // Add weapon images
  Object.values(WeaponData).forEach((weapon) => {
    if (weapon.icon) {
      imagesToPreload.push(weapon.icon);
    }
  });

  // Add enemy images
  Object.values(EnemyData).forEach((enemy) => {
    if (enemy.image) {
      imagesToPreload.push(enemy.image);
    }
  });

  // Add item images
  Object.values(ItemData).forEach((item) => {
    if (item.icon) {
      imagesToPreload.push(item.icon);
    }
  });

  // Add background images
  Object.values(BackgroundData).forEach((background) => {
    if (background.image && typeof background.image === "string") {
      imagesToPreload.push(background.image);
    }
  });

  // Preload images
  if (imagesToPreload.length > 0) {
    ImageManager.preloadImages(imagesToPreload, callback);
  } else {
    callback();
  }
}

/**
 * Show loading indicator
 */
function showLoadingIndicator() {
  // Create loading indicator if it doesn't exist
  let loadingIndicator = document.getElementById("loading-indicator");

  if (!loadingIndicator) {
    loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loading-indicator";
    loadingIndicator.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading DOOM: Text Adventure...</div>
    `;
    document.body.appendChild(loadingIndicator);
  }

  loadingIndicator.style.display = "flex";
}

/**
 * Hide loading indicator
 */
function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading-indicator");

  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }
}

/**
 * Set up event listeners for global UI elements
 */
function setupGlobalEventListeners() {
  // Sound toggle
  const soundToggle = document.getElementById("sound-toggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      game.toggleSound();
    });
  }

  // Journal toggle
  const journalToggle = document.getElementById("journal-toggle");
  if (journalToggle) {
    journalToggle.addEventListener("click", () => {
      game.toggleJournal();
    });
  }

  // Mini-map toggle
  const mapToggle = document.getElementById("map-toggle");
  if (mapToggle) {
    mapToggle.addEventListener("click", () => {
      const miniMap = document.getElementById("mini-map");
      if (miniMap) {
        miniMap.classList.toggle("expanded");
        mapToggle.textContent = miniMap.classList.contains("expanded")
          ? "🗺️ Hide Map"
          : "🗺️ Show Map";
      }
    });
  }

  // Achievements toggle
  const achievementsToggle = document.getElementById("achievements-toggle");
  if (achievementsToggle) {
    achievementsToggle.addEventListener("click", () => {
      const achievementsPanel = document.getElementById("achievements-panel");
      if (achievementsPanel) {
        achievementsPanel.classList.toggle("show");
      }
    });
  }

  // Difficulty select
  const difficultySelect = document.getElementById("difficulty-select");
  if (difficultySelect) {
    difficultySelect.addEventListener("change", (e) => {
      game.difficulty = e.target.value;
      game.updateDifficulty();
    });
  }

  // Start button on title screen
  const startButton = document.getElementById("start-button");
  if (startButton) {
    startButton.addEventListener("click", () => {
      game.startGame();
    });
  }

  // Help button
  const helpButton = document.getElementById("help-button");
  if (helpButton) {
    helpButton.addEventListener("click", () => {
      const helpPanel = document.getElementById("help-panel");
      if (helpPanel) {
        helpPanel.classList.toggle("show");
      }
    });
  }

  // Close buttons for panels
  document.querySelectorAll(".close-panel").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest(".panel");
      if (panel) {
        panel.classList.remove("show");
      }
    });
  });
}
