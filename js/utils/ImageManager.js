/**
 * Image Manager for handling game images with fallbacks
 */
class ImageManagerClass {
  constructor() {
    this.images = {};
    this.fallbacks = {
      // Weapon fallbacks
      'images/weapons/fists.png': 'https://static.wikia.nocookie.net/doom/images/c/c8/Fist.png',
      'images/weapons/pistol.png': 'https://static.wikia.nocookie.net/doom/images/6/6a/Pistol.png',
      'images/weapons/shotgun.png': 'https://static.wikia.nocookie.net/doom/images/5/5d/Shotgun.png',
      'images/weapons/chainsaw.png': 'https://static.wikia.nocookie.net/doom/images/8/85/Chainsaw.png',
      'images/weapons/bfg.png': 'https://static.wikia.nocookie.net/doom/images/d/d9/BFG9000.png',
      
      // Enemy fallbacks
      'images/enemies/imp.png': 'https://static.wikia.nocookie.net/doom/images/1/1f/Imp_idle.png',
      'images/enemies/demon.png': 'https://static.wikia.nocookie.net/doom/images/8/8e/Pinky_idle.png',
      'images/enemies/cacodemon.png': 'https://static.wikia.nocookie.net/doom/images/9/9c/Caco_idle.png',
      'images/enemies/baron.png': 'https://static.wikia.nocookie.net/doom/images/5/53/Baron_idle.png',
      'images/enemies/cyberdemon.png': 'https://static.wikia.nocookie.net/doom/images/e/e3/Cyberdemon_idle.png',
      
      // Item fallbacks
      'images/items/medkit.png': 'https://static.wikia.nocookie.net/doom/images/0/05/Medikit.png',
      'images/items/large_medkit.png': 'https://static.wikia.nocookie.net/doom/images/b/b2/Soulsphere.png',
      'images/items/armor_shard.png': 'https://static.wikia.nocookie.net/doom/images/7/7d/Armor_bonus.png',
      'images/items/armor_vest.png': 'https://static.wikia.nocookie.net/doom/images/3/31/Green_armor.png',
      'images/items/ammo_pack.png': 'https://static.wikia.nocookie.net/doom/images/c/c0/Clip.png',
      'images/items/large_ammo_pack.png': 'https://static.wikia.nocookie.net/doom/images/7/75/Ammo_box.png',
      
      // Background fallbacks
      'images/backgrounds/lab.jpg': 'https://cdnb.artstation.com/p/assets/images/images/001/068/256/large/emerson-tung-lab.jpg',
      'images/backgrounds/base.jpg': 'https://cdnb.artstation.com/p/assets/images/images/025/654/742/large/emerson-tung-mars-base.jpg',
      'images/backgrounds/corridor.jpg': 'https://cdna.artstation.com/p/assets/images/images/001/068/248/large/emerson-tung-final-battle.jpg',
      'images/backgrounds/hell_portal.jpg': 'https://cdnb.artstation.com/p/assets/images/images/001/068/453/large/emerson-tung-hell-portal.jpg',
      'images/backgrounds/hell.jpg': 'https://cdna.artstation.com/p/assets/images/images/001/068/483/large/emerson-tung-hell-environment.jpg',
      'images/backgrounds/final.jpg': 'https://cdna.artstation.com/p/assets/images/images/001/068/248/large/emerson-tung-final-battle.jpg'
    };
    
    // Default placeholder for missing images
    this.defaultPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAA30lEQVR4nO3bMQ7CMBAAQYz4/5ehpUCyYu9MHXTaXJzLEwAAAAAAAAAA4OXW7gFfuq7r9gzs9vl+1+4Bf7XGqDFqjBqjxqgxaowao8aoMWqMGqPGqDFqjBqjxqgxaowao8aoMWqMGqPGqDFqjBqjxqgxaowao8aoMWqMGqPGqDFqjBqjxqgxaowao8aoMWqMGqPGqDFqjBqjxqgxaowao8aoMWqMGqPGqDFqjBqjxqgxaowao8aoMWqMGqPGqDFqjBqjxqgxaowao8aoMWqMGqPGqDFqjBqjxqgxaowao8YAAAAAAAAAAADgMG9cVgvTdVaoJAAAAABJRU5ErkJggg==';
  }
  
  /**
   * Get image URL with fallback
   * @param {string} path - Image path
   * @returns {string} - Image URL (local or fallback)
   */
  getImageUrl(path) {
    // Check if we already processed this image
    if (this.images[path]) {
      return this.images[path];
    }
    
    // Try to load the local image
    const img = new Image();
    img.src = path;
    
    // If image exists locally, use it
    if (img.complete && img.naturalWidth !== 0) {
      this.images[path] = path;
      return path;
    }
    
    // Otherwise use fallback if available
    if (this.fallbacks[path]) {
      this.images[path] = this.fallbacks[path];
      return this.fallbacks[path];
    }
    
    // Last resort: use default placeholder
    this.images[path] = this.defaultPlaceholder;
    console.warn(`Image not found: ${path}, using placeholder`);
    return this.defaultPlaceholder;
  }
  
  /**
   * Preload images
   * @param {Array} paths - Array of image paths to preload
   * @param {Function} callback - Callback function when all images are loaded
   */
  preloadImages(paths, callback) {
    let loadedCount = 0;
    const totalImages = paths.length;
    
    // If no images to preload, call callback immediately
    if (totalImages === 0) {
      if (callback) callback();
      return;
    }
    
    // Load each image
    paths.forEach(path => {
      const img = new Image();
      
      img.onload = () => {
        this.images[path] = path;
        loadedCount++;
        
        if (loadedCount === totalImages && callback) {
          callback();
        }
      };
      
      img.onerror = () => {
        // Use fallback on error
        if (this.fallbacks[path]) {
          this.images[path] = this.fallbacks[path];
        } else {
          this.images[path] = this.defaultPlaceholder;
          console.warn(`Failed to load image: ${path}, using placeholder`);
        }
        
        loadedCount++;
        
        if (loadedCount === totalImages && callback) {
          callback();
        }
      };
      
      img.src = path;
    });
  }
  
  /**
   * Set image source with fallback
   * @param {HTMLImageElement} imgElement - Image element
   * @param {string} path - Image path
   */
  setImageSrc(imgElement, path) {
    if (!imgElement) return;
    
    const url = this.getImageUrl(path);
    imgElement.src = url;
    
    // Add error handler in case the fallback also fails
    imgElement.onerror = () => {
      console.warn(`Failed to load image: ${url}, using placeholder`);
      imgElement.src = this.defaultPlaceholder;
    };
  }
  
  /**
   * Set background image with fallback
   * @param {HTMLElement} element - Element to set background on
   * @param {string} path - Image path
   */
  setBackgroundImage(element, path) {
    if (!element) return;
    
    const url = this.getImageUrl(path);
    element.style.backgroundImage = `url('${url}')`;
  }
}

// Create singleton instance
const ImageManager = new ImageManagerClass();
