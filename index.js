const readline = require('readline');

const rooms = {
  street: {
    name: "Corner of Zorkington Street and 666 6th Avenue",
    description: "Krytosaurs are rampaging. The bank is your only hope!",
    exits: {
      enter: "lobby",
    },
  },
  lobby: {
    name: "Bank Lobby",
    description: "Screams, fire, smoke and half eaten burnt corpses. You see doors to the offices, stairs, and a break room.",
    exits: {
      left: "offices",
      right: "breakroom",
      down: "stairs",
      out: "street",
    },
  },
  offices: {
    name: "Old Offices",
    description: "Dusty desks and burning paperwork. Glowing green crystals scattered around. Nothing useful here.",
    exits: {
      right: "lobby",
    },
  },
  breakroom: {
    name: "Break Room",
    description: "There's a melted coffee pot. Not getting a lead lined vibe here.",
    exits: {
      left: "lobby",
    },
  },
  stairs: {
    name: "Stone Stairwell",
    description: "Ancient stairs leading downward. The heat is following you!",
    exits: {
      up: "lobby",
      down: "basement",
    },
  },
  basement: {
    name: "Basement Hallway",
    description: "It is dark and damp. You feel something is near...",
    exits: {
      up: "stairs",
      right: "storage",
    },
  },
  storage: {
    name: "Storage Room",
    description: "Boxes, files... and a suspicious metal wall...",
    exits: {
      left: "basement",
      secret: "vault",
    },
    hasVault: true,
  },
  vault: {
    name: "Hidden Vault",
    description: "You found it! Lead-lined walls shield you from the Krytosaurs.",
    exits: {},
    isSafeZone: true,
  },
};

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) {
  return new Promise((resolve) => {
    readlineInterface.question(questionText, resolve);
  });
}

let currentRoom = "street";
let gameOver = false;

function describeRoom(roomKey) {
  const room = rooms[roomKey];
  console.log(`\n🧭 ${room.name}\n${room.description}\n`);
}

function movePlayer(direction) {
  const room = rooms[currentRoom];
  const nextRoom = room.exits[direction];
  if (nextRoom) {
    currentRoom = nextRoom;
    describeRoom(currentRoom);
    checkGameOver();
  } else {
    console.log("🔥 You can’t go that way! The flames are closing in!");
  }
}

function checkGameOver() {
  if (currentRoom === "vault") {
    console.log("✅ You made it just in time! The Krytosaurs can't see you. You survive!");
    gameOver = true;
    readlineInterface.close();
    process.exit();
  }
}

function startTimer() {
  setTimeout(() => {
    if (!gameOver) {
      console.log("\n🔥 You hesitated too long... The Krytosaurs have turned you into a crispy kebab.");
      readlineInterface.close();
      process.exit();
    }
  }, 6660); // 6.66 seconds
}

async function startGame() {
  const welcomeMessage = `You are standing at 666 6th Avenue. 
There are flashes of light and short sudden screams. 
The Krytosaurs are everywhere. 
You need to hide. 
There’s a bank across the street. You need to get inside and find a lead-lined room. 
GO!!`;

  console.log(welcomeMessage);
  await ask("Press [Enter] to begin your escape...");

  describeRoom(currentRoom);
  startTimer(); // start 6.66 second countdown

  while (!gameOver) {
    const command = await ask("Enter direction (enter, left, right, down, up, out, secret) or 'quit': ");
    if (command.toLowerCase() === "quit") {
      console.log("👋 Game Over. The Krytosaurs say goodbye with lasers.");
      readlineInterface.close();
      break;
    } else {
      movePlayer(command.toLowerCase());
    }
  }
}

startGame();

