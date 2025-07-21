// const consoleOutput = document.getElementById("console-output");
// const consoleInput = document.getElementById("console-input");


const readline = require('readline');
let word = "NeoMesozoiKrypton";
let upper = word.toUpperCase();
console.log(upper);


const rooms = {
  street: {
    name: "Corner of Zorkington Street NE and 666 6th Avenue",
    description: "Krytosaurs have come to Earth to terraform . They intend to create NeoMesozoiKrypton!!! They are rampaging through Zorkington . The bank is your only hope!",
    exits: {
      enter: "lobby",
    },
  },
  lobby: {
    name: "Bank Lobby",
    description: "Screams, fire, smoke and half eaten burnt corpses . You see doors to the offices, stairs, and a break room ...",
    exits: {
      left: "offices",
      right: "breakroom",
      down: "stairs",
      out: "street",
    },
  },
  offices: {
    name: "Old Offices",
    description: "Dusty desks, burning paperwork and a large pointed glowing green crystal mounted on the end of a staff . It looks like some ancient spear . Nothing useful here ...",
    exits: {
      right: "lobby",
    },
  },
  breakroom: {
    name: "Break Room",
    description: "There's a melted coffee pot . Pizza still in the packages . Not getting a lead lined vibe here ...",
    exits: {
      left: "lobby",
    },
  },
  stairs: {
    name: "Stone Stairwell",
    description: "Ancient marble stairs leading downward like a Christopher Lee'esk crypt . The heat is following you!! But the deeper you go the cooler it seems to get",
    exits: {
      up: "lobby",
      down: "basement",
    },
  },
  basement: {
    name: "Basement Hallway",
    description: "It is dark and damp . There is a sudden stillness in the air . You feel something is near ...",
    exits: {
      up: "stairs",
      right: "storage",
    },
  },
  storage: {
    name: "Storage Room",
    description: "Boxes, files ... and a suspicious metal wall ...",
    exits: {
      left: "basement",
      secret: "vault",
    },
    hasVault: true,
  },
  vault: {
    name: "Hidden Vault",
    description: "You have found it! Lead-lined walls will shield you from the Krytosaurs . Keeping in mind that you will not survive on NeoMesozoiKrypton but life's little wins right . That's the spirit",
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
  console.log(`${room.name}\n${room.description}\n`);
}

function movePlayer(direction) {
  const room = rooms[currentRoom];
  const nextRoom = room.exits[direction];
  if (nextRoom) {
    currentRoom = nextRoom;
    describeRoom(currentRoom);
    checkGameOver();
  } else {
    console.log("You can’t go that way! The flames are closing in! Run! Now!");
  }
}

function checkGameOver() {
  if (currentRoom === "vault") {
    console.log("You made it just in time! The Krytosaurs can't see you. You will survive only to fall to NeoMesozoiKrypton!!!!");
    gameOver = true;
    readlineInterface.close();
    process.exit();
  }
}

function startTimer() {
  setTimeout(() => {
    if (!gameOver) {
      console.log("You hesitated . You have failed . At least you will not scream for very long");
      readlineInterface.close();
      process.exit();
    }
  }, 399600);
}

async function startGame() {
  const welcomeMessage = `You are standing at 666 6th Avenue. 
There are flashes of light and short sudden screams. 
The Krytosaurs are everywhere. 
You need to hide. 
There is a bank across the street. You need to get inside and find a lead-lined room. 
GO!!`;

  console.log(welcomeMessage);
  await ask("Press [Enter] to begin your escape...");

  describeRoom(currentRoom);
  startTimer();

  while (!gameOver) {
    const command = await ask("Enter direction (enter, left, right, down, up, out, secret) or 'quit': ");
    if (command.toLowerCase() === "quit") {
      console.log("Game Over. The Krytosaurs are terraforming the planet to make it NeoMesozoiKrypton!!!");
      readlineInterface.close();
      break;
    } else {
      movePlayer(command.toLowerCase());
    }
  }
}

startGame();

