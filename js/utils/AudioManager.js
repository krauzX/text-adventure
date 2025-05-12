/**
 * Audio Manager for handling game sounds and music
 */
class AudioManagerClass {
  constructor() {
    this.sounds = {};
    this.music = {};
    this.currentMusic = null;
    this.muted = false;
    this.volume = 0.5;
    this.musicVolume = 0.3;
    this.audioAvailable = this.checkAudioAvailability();
  }

  /**
   * Check if audio is available in the browser
   * @returns {boolean} - Whether audio is available
   */
  checkAudioAvailability() {
    try {
      const audio = new Audio();
      return typeof audio.canPlayType === "function";
    } catch (e) {
      console.warn("Audio not supported in this browser");
      return false;
    }
  }

  /**
   * Initialize audio manager
   */
  init() {
    if (!this.audioAvailable) {
      console.warn("Audio not initialized due to lack of browser support");
      return;
    }

    try {
      // Load sound effects
      this.loadSound("player_damage", "audio/player_damage.mp3");
      this.loadSound("player_death", "audio/player_death.mp3");
      this.loadSound("enemy_damage", "audio/enemy_damage.mp3");
      this.loadSound("enemy_death", "audio/enemy_death.mp3");
      this.loadSound("weapon_switch", "audio/weapon_switch.mp3");
      this.loadSound("item_pickup", "audio/item_pickup.mp3");
      this.loadSound("heal", "audio/heal.mp3");
      this.loadSound("armor", "audio/armor.mp3");
      this.loadSound("ammo", "audio/ammo.mp3");
      this.loadSound("level_up", "audio/level_up.mp3");
      this.loadSound("achievement", "audio/achievement.mp3");
      this.loadSound("button_click", "audio/button_click.mp3");

      // Load weapon sounds
      this.loadSound("pistol", "audio/pistol.mp3");
      this.loadSound("shotgun", "audio/shotgun.mp3");
      this.loadSound("chainsaw", "audio/chainsaw.mp3");
      this.loadSound("bfg", "audio/bfg.mp3");

      // Load music
      this.loadMusic("title", "audio/title.mp3");
      this.loadMusic("background", "audio/background.mp3");
      this.loadMusic("combat", "audio/combat.mp3");
      this.loadMusic("boss", "audio/boss.mp3");
      this.loadMusic("victory", "audio/victory.mp3");
      this.loadMusic("game_over", "audio/game_over.mp3");
    } catch (e) {
      console.error("Error initializing audio:", e);
    }
  }

  /**
   * Load a sound effect
   * @param {string} id - Sound ID
   * @param {string} path - Sound file path
   */
  loadSound(id, path) {
    // Create audio element
    const audio = new Audio();
    audio.src = path;
    audio.preload = "auto";

    // Store in sounds object
    this.sounds[id] = audio;
  }

  /**
   * Load background music
   * @param {string} id - Music ID
   * @param {string} path - Music file path
   */
  loadMusic(id, path) {
    // Create audio element
    const audio = new Audio();
    audio.src = path;
    audio.preload = "auto";
    audio.loop = true;

    // Store in music object
    this.music[id] = audio;
  }

  /**
   * Play a sound effect
   * @param {string} id - Sound ID
   */
  playSound(id) {
    if (this.muted) return;

    const sound = this.sounds[id];
    if (!sound) return;

    // Create a clone to allow overlapping sounds
    const soundClone = sound.cloneNode();
    soundClone.volume = this.volume;
    soundClone.play();
  }

  /**
   * Play background music
   * @param {string} id - Music ID
   */
  playMusic(id) {
    if (this.muted) return;

    // Stop current music
    this.stopMusic();

    const music = this.music[id];
    if (!music) return;

    // Play new music
    music.volume = this.musicVolume;
    music.play();
    this.currentMusic = id;
  }

  /**
   * Stop current background music
   */
  stopMusic() {
    if (this.currentMusic && this.music[this.currentMusic]) {
      this.music[this.currentMusic].pause();
      this.music[this.currentMusic].currentTime = 0;
    }

    this.currentMusic = null;
  }

  /**
   * Set master volume
   * @param {number} volume - Volume level (0-1)
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Set music volume
   * @param {number} volume - Volume level (0-1)
   */
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));

    // Update current music volume
    if (this.currentMusic && this.music[this.currentMusic]) {
      this.music[this.currentMusic].volume = this.musicVolume;
    }
  }

  /**
   * Mute all audio
   */
  mute() {
    this.muted = true;

    // Pause current music
    if (this.currentMusic && this.music[this.currentMusic]) {
      this.music[this.currentMusic].pause();
    }
  }

  /**
   * Unmute all audio
   */
  unmute() {
    this.muted = false;

    // Resume current music
    if (this.currentMusic && this.music[this.currentMusic]) {
      this.music[this.currentMusic].play();
    }
  }

  /**
   * Toggle mute state
   */
  toggleMute() {
    if (this.muted) {
      this.unmute();
    } else {
      this.mute();
    }
  }
}

// Create singleton instance
const AudioManager = new AudioManagerClass();
