const mazes = {
  level_0: {
    map: [
      [0, 0]
    ],
    player: {
      x: 0,
      y: 0
    },
    goal: {
      x: 0,
      y: 1
    }
  },
  level_1: {
    map: [
      [0, 1],
      [0, 0]
    ],
    player: {
      x: 0,
      y: 0
    },
    goal: {
      x: 1,
      y: 1
    }
  },
  level_2: {
    map: [
      [0, 0, 1],
      [0, 0, 0],
      [0, 1, 0]
    ],
    player: {
      x: 0,
      y: 0
    },
    goal: {
      x: 2,
      y: 2
    }
  },
  level_3: {
    map: [
      [0,0,0,0],
      [0,1,1,0],
      [0,0,0,0],
      [0,1,1,0]
    ],
    player: {
      x: 0,
      y: 0
    },
    goal: {
      x:2,
      y:3
    }
  },
  level_4: {
    map: [
      [0,0,0,0,1],
      [0,1,1,0,0],
      [0,0,0,0,1],
      [0,1,1,0,1],
      [0,1,1,0,0]
    ],
    player: {
      x: 0,
      y: 0
    },
    goal: {
      x:4,
      y:4
    }
  },
  level_5: {
    map: [
      [0,0,1,1,1,0],
      [0,1,1,0,0,0],
      [0,0,0,0,1,1],
      [0,1,1,0,0,0],
      [1,0,0,1,0,0],
      [1,0,0,0,0,0]
    ],
    player: {
      x: 0,
      y: 0
    },
    goal: {
      x:5,
      y:5
    }
  },
  level_6: {
    map: [
      [0,1,0,1,1,0,0],
      [0,0,1,1,0,0,0],
      [0,0,0,0,1,1,1],
      [0,1,0,1,0,0,1],
      [1,0,0,0,0,0,1],
      [0,1,0,1,0,0,0],
      [0,1,0,1,0,0,0]
    ],
    player: {
      x: 0,
      y: 0
    },
    goal: {
      x:6,
      y:6
    }
  },
  level_7: {
    map: [
      [0,1,0,1,1,0,0,0],
      [0,0,1,1,0,0,0,1],
      [0,0,0,0,1,1,1,0],
      [0,1,0,1,0,0,1,1],
      [1,0,0,0,0,0,1,1],
      [0,1,0,1,0,0,0,1],
      [0,1,0,1,0,0,0,0],
      [1,0,1,1,1,1,0,0]
    ],
    player: {
      x: 0,
      y: 0
    },
    goal: {
      x:7,
      y:7
    }
  }
};




var started = false;
var mazeListSize = Object.keys(mazes).length;
var playerPosition = undefined;
var goalPosition = undefined;
var mazeColumns = undefined;
var mazeRows = undefined;
var mazeMap = undefined;
var level = -1;

$("#start").click(function() {
  if (!started && level + 1 < mazeListSize) {
    level += 1;
    var randomMaze = Math.floor(Math.random() * mazeListSize);
    started = true;
    console.log("level_"+randomMaze);
    $("#fish_thank").attr("src", "")
    setBoard("level_"+level);
    $("#title").text("Help Me Reach The Pond!");
    $("#level").text("Level-" + Number(level+1));
    document.getElementById('controls').style.display = "block";
  }
});


function moveup() {
  if (!started) {
    $("#title").text("Press Start Button To Start")
    return;
  }
  var x = playerPosition["x"];
  var y = playerPosition["y"];

  if ( x - 1 >= 0 && mazeMap[x-1][y] != 1) {
    clearOldPosition(x, y);
    playerPosition["x"] = x-1;
    updatePlayerPosition(x-1, y);
  }
  gameEnds(playerPosition, goalPosition);
}

function movedown() {
  if (!started) {
    $("#title").text("Press Start Button To Start")
    return;
  }
  var x = playerPosition["x"];
  var y = playerPosition["y"];

  if ( x + 1 < mazeRows && mazeMap[x+1][y] != 1) {
    clearOldPosition(x, y);
    playerPosition["x"] = x+1;
    updatePlayerPosition(x+1, y);
  }
  gameEnds(playerPosition, goalPosition);
}

function moveleft() {
  if (!started) {
    $("#title").text("Press Start Button To Start")
    return;
  }
  var x = playerPosition["x"];
  var y = playerPosition["y"];

  if ( y - 1 >= 0 && mazeMap[x][y-1] != 1) {
    clearOldPosition(x, y);
    playerPosition["y"] = y-1;
    updatePlayerPosition(x, y-1);
  }
  gameEnds(playerPosition, goalPosition);
}

function moveright() {
  if (!started) {
    $("#title").text("Press Start Button To Start")
    return;
  }
  var x = playerPosition["x"];
  var y = playerPosition["y"];

  if ( y + 1 < mazeColumns && mazeMap[x][y+1] != 1) {
    clearOldPosition(x, y);
    playerPosition["y"] = y+1;
    updatePlayerPosition(x, y+1);
  }
  gameEnds(playerPosition, goalPosition);
}

function updatePlayerPosition(x, y) {
  var element = document.getElementsByClassName('row')[x].childNodes[y];
  element.classList.add("start");
}

function clearOldPosition(x, y) {
  var element = document.getElementsByClassName('row')[x].childNodes[y];
  element.classList.remove("start");
  element.classList.add("green");
}

function setBoard(mazeLevel) {
  console.log("setboard called");
  mazeMap = mazes[mazeLevel]["map"];
  playerPosition = mazes[mazeLevel]["player"]
  console.log(playerPosition);
  goalPosition = mazes[mazeLevel]["goal"]

  mazeRows = mazeMap.length;
  mazeColumns = mazeMap[0].length;
  setRows(mazeRows);
  setColumns(mazeColumns, mazeRows, playerPosition, goalPosition, mazeMap);
}

function setRows(mazeRows) {
  for (var i = 0; i < mazeRows; i++) {
    document.getElementById('container').innerHTML = document.getElementById('container').innerHTML + `<div class="row"></div>`;
  }
}

function setColumns(mazeColumns, mazeRows, playerPosition, goalPosition, mazeMap) {
  for (var i = 0; i < mazeRows; i++) {
    for (var j = 0; j < mazeColumns; j++) {
      if (i == playerPosition["x"] && j == playerPosition["y"]) {
        document.getElementsByClassName('row')[i].innerHTML = document.getElementsByClassName('row')[i].innerHTML + `<div class="btn start"></div>`
      } else if (i == goalPosition["x"] && j == goalPosition["y"]) {
        document.getElementsByClassName('row')[i].innerHTML = document.getElementsByClassName('row')[i].innerHTML + `<div class="btn goal"></div>`
      } else if (mazeMap[i][j] == 1) {
        document.getElementsByClassName('row')[i].innerHTML = document.getElementsByClassName('row')[i].innerHTML + `<div class="btn grey"></div>`
      } else {
        document.getElementsByClassName('row')[i].innerHTML = document.getElementsByClassName('row')[i].innerHTML + `<div class="btn white"></div>`
      }
    }
  }
}

function gameEnds(playerPosition, goalPosition) {
  if (playerPosition["x"] == goalPosition["x"] && playerPosition["y"]==goalPosition["y"]) {
    document.getElementById('container').innerHTML = "";
    $("#title").text("Congratulation! You Have Solved the Maze")
    $("#fish_thank").attr("src", "./images/fish_thank.gif")
    $("#level").text('');
    document.getElementById('controls').style.display = "none";
    started = false;
  }
}
