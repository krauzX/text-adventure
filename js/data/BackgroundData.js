/**
 * Background data for the game
 */
const BackgroundData = {
  // Mars facility areas
  LAB: {
    name: "Research Laboratory",
    description: "A high-tech research facility on Mars.",
    image: "images/backgrounds/lab.jpg",
    defaultImage:
      "https://cdnb.artstation.com/p/assets/images/images/001/068/256/large/emerson-tung-lab.jpg",
  },

  BASE: {
    name: "Mars Base",
    description: "The main UAC facility on Mars.",
    image: "images/backgrounds/base.jpg",
    defaultImage:
      "https://cdnb.artstation.com/p/assets/images/images/025/654/742/large/emerson-tung-mars-base.jpg",
  },

  CORRIDOR: {
    name: "Facility Corridor",
    description: "A dark corridor connecting different parts of the facility.",
    image: "images/backgrounds/corridor.jpg",
    defaultImage:
      "https://cdna.artstation.com/p/assets/images/images/001/068/248/large/emerson-tung-final-battle.jpg",
  },

  SECURITY: {
    name: "Security Center",
    description: "The security monitoring center of the facility.",
    image: "images/backgrounds/security.jpg",
    defaultImage:
      "https://cdnb.artstation.com/p/assets/images/images/001/068/256/large/emerson-tung-lab.jpg",
  },

  // Hell portal and related areas
  HELL_PORTAL: {
    name: "Hell Portal",
    description: "The dimensional gateway to Hell.",
    image: "images/backgrounds/hell_portal.jpg",
    defaultImage:
      "https://cdnb.artstation.com/p/assets/images/images/001/068/453/large/emerson-tung-hell-portal.jpg",
  },

  HELL: {
    name: "Hell",
    description: "The nightmarish dimension of Hell itself.",
    image: "images/backgrounds/hell.jpg",
    defaultImage:
      "https://cdna.artstation.com/p/assets/images/images/001/068/483/large/emerson-tung-hell-environment.jpg",
  },

  // Final areas
  SHUTTLE_BAY: {
    name: "Shuttle Bay",
    description: "The facility's emergency evacuation area.",
    image: "images/backgrounds/shuttle_bay.jpg",
    defaultImage:
      "https://cdnb.artstation.com/p/assets/images/images/025/654/742/large/emerson-tung-mars-base.jpg",
  },

  FINAL: {
    name: "Final Battle",
    description: "The last stand against the demonic invasion.",
    image: "images/backgrounds/final.jpg",
    defaultImage:
      "https://cdna.artstation.com/p/assets/images/images/001/068/248/large/emerson-tung-final-battle.jpg",
  },

  // Get image URL with fallback
  getImageUrl: function (key) {
    const background = this[key];
    if (!background) return null;

    // Use ImageManager to get the URL with fallback
    return ImageManager.getImageUrl(background.image);
  },
};
