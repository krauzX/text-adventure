/**
 * Story data for the game
 */
const StoryData = {
  // Text nodes for the game
  textNodes: [
    // Introduction
    {
      id: 1,
      background: 'LAB',
      text: `[YELLOW]MARS RESEARCH FACILITY - 2145[/YELLOW]
      
      You are [BOLD]Dr. Alex Morgan[/BOLD], a UAC security specialist stationed at the Mars Research Facility. You wake up to blaring alarms and flickering lights. Your head is pounding, and you can't remember what happened.
      
      The facility intercom crackles: "[RED]Warning! Containment breach in Dimensional Research. All personnel evacuate immediately.[/RED]"`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'start',
      mapName: 'Research Lab',
      mapPosition: { x: 10, y: 50 },
      options: [
        {
          text: 'Check your personal terminal',
          setState: { hasInfo: true },
          nextText: 2,
          sound: 'button_click'
        },
        {
          text: 'Look for a weapon',
          setState: { currentWeapon: 'PISTOL', ammo: 15, inventory: ['PISTOL'] },
          nextText: 3,
          sound: 'button_click'
        }
      ]
    },
    
    // Information path
    {
      id: 2,
      background: 'LAB',
      text: `Your terminal shows a series of urgent messages:
      
      [GREEN]FROM: Dr. Olivia Pierce, Research Director
      SUBJECT: PROJECT LAZARUS SUCCESS
      
      "We've done it! The portal is stable. We've established contact with the other side. This will revolutionize dimensional travel and energy production. Preparing for first physical transport test."[/GREEN]
      
      [RED]FROM: Security Chief Samuel Hayden
      SUBJECT: EMERGENCY LOCKDOWN
      
      "Pierce has gone too far. Something came through the portal. Multiple hostiles. Security teams overwhelmed. Implementing facility-wide lockdown. All personnel arm yourselves and evacuate to emergency shuttles."[/RED]
      
      The last entry is a system notification: "[RED]SELF-DESTRUCT SEQUENCE INITIATED. T-MINUS 60 MINUTES.[/RED]"`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'info',
      mapName: 'Terminal',
      mapPosition: { x: 20, y: 40 },
      options: [
        {
          text: 'Look for a weapon now',
          setState: { currentWeapon: 'PISTOL', ammo: 15, inventory: ['PISTOL'] },
          nextText: 3,
          sound: 'button_click'
        }
      ]
    },
    
    // First weapon
    {
      id: 3,
      background: 'LAB',
      text: `You find your standard-issue UAC pistol in your locker, along with 15 rounds of ammunition. As you check the weapon, you hear an inhuman growl from the corridor outside.
      
      Your security training kicks in, and memories start to return. The dimensional research team was experimenting with interdimensional travel. They opened a portal to... somewhere else. Somewhere that shouldn't have been disturbed.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'item',
      mapName: 'Locker Room',
      mapPosition: { x: 30, y: 50 },
      options: [
        {
          text: 'Investigate the sound',
          nextText: 4,
          sound: 'button_click'
        },
        {
          text: 'Look for more supplies first',
          setState: { inventory: state => [...state.inventory, 'MEDKIT'] },
          nextText: 4,
          sound: 'button_click'
        }
      ]
    },
    
    // First enemy encounter
    {
      id: 4,
      background: 'CORRIDOR',
      enemy: 'IMP',
      text: `You step into the corridor and come face to face with a horrifying creature. It's humanoid but clearly not human - reddish-brown skin, glowing eyes, and claws that could tear through metal.
      
      It's an Imp - you recognize it from the security briefings about Project Lazarus. These demons were only supposed to exist in theoretical research files, but now one is right in front of you, very real and very deadly.
      
      The Imp snarls and prepares to attack!`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'combat',
      mapName: 'Corridor',
      mapPosition: { x: 40, y: 45 },
      options: [
        {
          text: 'Attack with your weapon',
          buttonClass: 'combat-btn',
          nextText: 5,
          sound: 'pistol'
        },
        {
          text: 'Try to run past it',
          nextText: 99,
          sound: 'button_click'
        }
      ]
    },
    
    // After first combat
    {
      id: 5,
      background: 'CORRIDOR',
      text: `The Imp falls to the ground, its body dissolving into a puddle of gore. Your heart is racing, but you've survived your first encounter with these hellish creatures.
      
      The corridor ahead leads to the central hub of the facility. From there, you should be able to reach the emergency shuttles. But first, you need to find out what happened to the rest of the security team.
      
      The facility's emergency lights cast an eerie red glow on the blood-splattered walls. Whatever came through that portal has already caused significant casualties.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'path',
      mapName: 'After Combat',
      mapPosition: { x: 50, y: 50 },
      options: [
        {
          text: 'Head to the central hub',
          nextText: 6,
          sound: 'button_click'
        }
      ]
    },
    
    // Central hub
    {
      id: 6,
      background: 'BASE',
      text: `The central hub is a scene of carnage. Bodies of scientists and security personnel are scattered around, their faces frozen in expressions of terror. Consoles spark and flicker, and emergency sirens continue to wail.
      
      On a nearby security officer's body, you spot a shotgun. It would be more effective against these creatures than your pistol.
      
      A large display on the wall shows the facility map with emergency routes highlighted. The nearest shuttle bay is in the east wing, but to get there, you'll need to pass through the dimensional research lab - the epicenter of this nightmare.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'hub',
      mapName: 'Central Hub',
      mapPosition: { x: 60, y: 50 },
      options: [
        {
          text: 'Take the shotgun',
          setState: { 
            inventory: state => [...state.inventory, 'SHOTGUN'], 
            ammo: state => state.ammo + 10 
          },
          nextText: 7,
          sound: 'weapon_switch'
        },
        {
          text: 'Ignore it and continue',
          nextText: 7,
          sound: 'button_click'
        }
      ]
    },
    
    // Second enemy encounter
    {
      id: 7,
      background: 'BASE',
      enemy: 'DEMON',
      text: `As you examine the facility map, you hear heavy footsteps and a guttural growl. A bulky, pink-skinned demon with massive jaws charges at you from the shadows!
      
      This is a Pinky Demon - faster and more aggressive than the Imp you encountered earlier. It's built like a tank and twice as mean.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'combat',
      mapName: 'Demon Attack',
      mapPosition: { x: 65, y: 55 },
      options: [
        {
          text: 'Fight the Demon',
          buttonClass: 'combat-btn',
          nextText: 8,
          sound: 'shotgun'
        }
      ]
    },
    
    // Self-destruct information
    {
      id: 8,
      background: 'BASE',
      text: `With the demon defeated, you catch your breath and check a nearby security terminal. It confirms your fears: the facility's self-destruct sequence has indeed been initiated. You have less than 45 minutes to escape.
      
      The terminal also shows security footage from around the facility. The situation is dire - demons have overrun most areas, and surviving personnel are few and far between.
      
      You notice that the dimensional research lab's access requires a security clearance you don't have. You'll need to find another way through or locate someone with higher clearance.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'info',
      mapName: 'Security Terminal',
      mapPosition: { x: 70, y: 50 },
      options: [
        {
          text: 'Look for an alternate route',
          nextText: 9,
          sound: 'button_click'
        },
        {
          text: 'Try to override the security',
          requiredState: (currentState) => currentState.hasInfo,
          nextText: 10,
          sound: 'button_click'
        }
      ]
    },
    
    // Alternate route
    {
      id: 9,
      background: 'CORRIDOR',
      text: `You find a maintenance tunnel that bypasses the main research lab. It's dark and cramped, but it should lead you closer to the shuttle bay.
      
      As you crawl through the tunnel, you hear screams and inhuman roars echoing through the ventilation system. The whole facility has become a slaughterhouse.
      
      You emerge in a storage area near the dimensional portal chamber. To reach the shuttle bay, you'll still need to pass through the chamber itself - there's no way around it.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'path',
      mapName: 'Maintenance Tunnel',
      mapPosition: { x: 75, y: 45 },
      options: [
        {
          text: 'Continue to the portal chamber',
          nextText: 11,
          sound: 'button_click'
        }
      ]
    },
    
    // Security override
    {
      id: 10,
      background: 'SECURITY',
      text: `Using your knowledge of UAC security systems, you attempt to override the access controls. After a tense few minutes, you succeed in granting yourself temporary access to the research lab.
      
      You also manage to access more detailed information about Project Lazarus. It was an attempt to harness energy from another dimension - a dimension that the ancient texts referred to as "Hell."
      
      Dr. Pierce's notes reveal a disturbing obsession with the power this dimension could provide, and hints that she may have deliberately weakened the containment protocols.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'success',
      mapName: 'Security Override',
      mapPosition: { x: 75, y: 55 },
      options: [
        {
          text: 'Head to the portal chamber',
          nextText: 11,
          sound: 'button_click'
        }
      ]
    },
    
    // Portal chamber approach
    {
      id: 11,
      background: 'HELL_PORTAL',
      text: `The dimensional portal chamber is a massive circular room dominated by the portal itself - a swirling vortex of red energy that pulses with malevolent power.
      
      Bodies of researchers are scattered around the control consoles, and strange symbols have been drawn on the walls in blood. The portal is clearly unstable, fluctuating in size and intensity.
      
      On a workbench near the entrance, you spot a chainsaw. It's not standard UAC equipment, but it could be effective against these demons at close range.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'danger',
      mapName: 'Portal Chamber',
      mapPosition: { x: 80, y: 50 },
      options: [
        {
          text: 'Take the chainsaw',
          setState: { inventory: state => [...state.inventory, 'CHAINSAW'] },
          nextText: 12,
          sound: 'chainsaw'
        },
        {
          text: 'Ignore the chainsaw and proceed',
          nextText: 12,
          sound: 'button_click'
        }
      ]
    },
    
    // Cacodemon encounter
    {
      id: 12,
      background: 'HELL_PORTAL',
      enemy: 'CACODEMON',
      text: `As you approach the portal, a floating monstrosity emerges from the swirling vortex. It's a Cacodemon - a floating spherical demon with a single eye and a maw filled with razor-sharp teeth.
      
      It hovers menacingly, its eye fixed on you as it prepares to attack. More demons are coming through the portal - you need to deal with this threat quickly!`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'combat',
      mapName: 'Cacodemon',
      mapPosition: { x: 85, y: 45 },
      options: [
        {
          text: 'Fight the Cacodemon',
          buttonClass: 'combat-btn',
          nextText: 13,
          sound: 'shotgun'
        }
      ]
    },
    
    // Portal decision
    {
      id: 13,
      background: 'HELL_PORTAL',
      text: `With the Cacodemon defeated, you have a moment to assess the situation. The portal is the source of the demonic invasion, but it's also highly unstable. You could try to shut it down, but that might trigger an immediate reaction.
      
      Alternatively, you could try to bypass it and continue to the shuttle bay. The self-destruct sequence will eventually destroy the portal anyway, but more demons will come through in the meantime.
      
      Your security training tells you that stopping the invasion at its source is the right call, but your survival instincts urge you to escape while you can.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'choice',
      mapName: 'Portal Decision',
      mapPosition: { x: 85, y: 55 },
      options: [
        {
          text: 'Try to shut down the portal',
          nextText: 14,
          sound: 'button_click'
        },
        {
          text: 'Head to the shuttle bay',
          nextText: 16,
          sound: 'button_click'
        }
      ]
    },
    
    // Shutdown attempt
    {
      id: 14,
      background: 'HELL_PORTAL',
      text: `You approach the portal controls, stepping over the bodies of the research team. The system is complex, but your security clearance gives you basic access.
      
      You initiate the emergency shutdown sequence, but a warning flashes on the screen: "[RED]WARNING: PORTAL INSTABILITY CRITICAL. SHUTDOWN MAY TRIGGER DIMENSIONAL COLLAPSE.[/RED]"
      
      The portal begins to fluctuate more violently as the shutdown progresses. Energy arcs from the portal to the surrounding equipment, and the ground trembles beneath your feet.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'danger',
      mapName: 'Portal Shutdown',
      mapPosition: { x: 90, y: 60 },
      options: [
        {
          text: 'Continue the shutdown sequence',
          nextText: 15,
          sound: 'button_click'
        },
        {
          text: 'Abort and head to the shuttle bay',
          nextText: 16,
          sound: 'button_click'
        }
      ]
    },
    
    // Baron of Hell
    {
      id: 15,
      background: 'HELL_PORTAL',
      enemy: 'BARON',
      text: `As the shutdown sequence nears completion, the portal flares with blinding intensity. A massive figure steps through - a towering demon with horns and glowing eyes, its muscular body covered in spikes and armor-like skin.
      
      It's a Baron of Hell - one of the most powerful demons in the hierarchy. It roars with fury, recognizing you as the one trying to close its gateway to your world.
      
      The shutdown sequence is at 90% - you just need to hold off this monster for a little longer!`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'boss',
      mapName: 'Baron of Hell',
      mapPosition: { x: 95, y: 65 },
      options: [
        {
          text: 'Fight the Baron of Hell',
          buttonClass: 'combat-btn',
          nextText: 16,
          sound: 'shotgun'
        }
      ]
    },
    
    // Shuttle bay approach
    {
      id: 16,
      background: 'CORRIDOR',
      text: `You make it through the portal chamber and into the corridor leading to the shuttle bay. The facility's self-destruct countdown continues - you have less than 15 minutes left.
      
      The corridor shows signs of a desperate last stand. Barricades have been erected, and spent ammunition casings litter the floor. Whatever happened here, it doesn't look like anyone survived.
      
      In a locked weapons cabinet, you spot the ultimate UAC weapon prototype - the BFG. The cabinet's security lock has been damaged, and you might be able to force it open.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'item',
      mapName: 'Shuttle Corridor',
      mapPosition: { x: 90, y: 50 },
      options: [
        {
          text: 'Try to get the BFG',
          setState: { 
            inventory: state => [...state.inventory, 'BFG'], 
            ammo: state => state.ammo + 5 
          },
          nextText: 17,
          sound: 'weapon_switch'
        },
        {
          text: 'Ignore it and hurry to the shuttle',
          nextText: 17,
          sound: 'button_click'
        }
      ]
    },
    
    // Final boss
    {
      id: 17,
      background: 'FINAL',
      enemy: 'CYBERDEMON',
      text: `You reach the shuttle bay, but your heart sinks at what you find. Most of the shuttles have been destroyed, and the bay is in ruins. Only one shuttle remains intact, but standing between you and freedom is the most terrifying demon yet.
      
      The Cyberdemon - a massive fusion of demon flesh and mechanical parts, armed with a rocket launcher where its right arm should be. It must have been sent specifically to prevent any escape.
      
      The facility's automated voice announces: "[RED]SELF-DESTRUCT SEQUENCE: T-MINUS 5 MINUTES.[/RED]"
      
      This is your final obstacle. Defeat it, and you might just survive this nightmare.`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'boss',
      mapName: 'Cyberdemon',
      mapPosition: { x: 95, y: 50 },
      options: [
        {
          text: 'Fight the Cyberdemon',
          buttonClass: 'combat-btn',
          nextText: 18,
          sound: 'bfg'
        }
      ]
    },
    
    // Escape
    {
      id: 18,
      background: 'FINAL',
      text: `The Cyberdemon falls with a ground-shaking crash. You don't waste time celebrating - the countdown is in its final minutes.
      
      You rush to the shuttle, powering it up as quickly as possible. The engines roar to life just as the facility begins to break apart around you.
      
      With seconds to spare, you launch the shuttle, blasting away from the doomed research facility. Through the viewport, you watch as the entire complex is consumed in a massive explosion.
      
      You've survived, but as your adrenaline fades, troubling questions arise. How many demons escaped before you closed the portal? Where is Dr. Pierce? And why do you feel like this is just the beginning of something much worse?`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'success',
      mapName: 'Escape',
      mapPosition: { x: 100, y: 50 },
      options: [
        {
          text: 'Continue to epilogue',
          nextText: 19,
          sound: 'button_click'
        }
      ]
    },
    
    // Epilogue
    {
      id: 19,
      background: 'HELL',
      text: `As your shuttle enters Earth's orbit, you receive a transmission. It's garbled, but you can make out a few words: "[RED]...demons on Earth... major cities fallen... need your help...[/RED]"
      
      The transmission cuts to a video feed showing scenes of horror - demons rampaging through streets, buildings in flames, and civilians running in terror.
      
      You realize the truth: the Mars incident was just the beginning. Somehow, the demons have found another way to Earth. Your fight isn't over - it's just beginning.
      
      As you set course for Earth, you check your weapons one last time. The nightmare continues, but this time, you're ready for them.
      
      [BOLD][YELLOW]THE END... FOR NOW[/YELLOW][/BOLD]`,
      addToJournal: true,
      showOnMap: true,
      nodeType: 'end',
      mapName: 'Epilogue',
      mapPosition: { x: 100, y: 45 },
      options: [
        {
          text: 'CONGRATULATIONS! You survived... for now. Play Again?',
          nextText: -1,
          sound: 'button_click'
        }
      ]
    },
    
    // Game over
    {
      id: 99,
      background: 'BASE',
      text: `[RED][BOLD]GAME OVER[/BOLD][/RED]
      
      Your attempt to survive the demonic invasion has failed. Your body joins the countless others scattered throughout the Mars facility.
      
      With no one left to stop them, the demons continue to pour through the portal. Soon, they find a way to Earth, and humanity's extinction begins.
      
      The UAC's ambition to harness Hell's energy has doomed us all.`,
      showOnMap: false,
      options: [
        {
          text: 'Try Again',
          nextText: -1,
          sound: 'button_click'
        }
      ]
    }
  ],
  
  // Map connections for mini-map
  mapConnections: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    { from: 8, to: 10 },
    { from: 9, to: 11 },
    { from: 10, to: 11 },
    { from: 11, to: 12 },
    { from: 12, to: 13 },
    { from: 13, to: 14 },
    { from: 13, to: 16 },
    { from: 14, to: 15 },
    { from: 14, to: 16 },
    { from: 15, to: 16 },
    { from: 16, to: 17 },
    { from: 17, to: 18 },
    { from: 18, to: 19 }
  ]
};
