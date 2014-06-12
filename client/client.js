
/** Tile dimensions. */
var TILE_HEIGHT = 32;
var TILE_WIDTH = 32;

var DirectionEnum = {
  UP: 0,
  LEFT: 1,
  DOWN: 2,
  RIGHT: 3
};

var DIRECTION_LABELS = {
  0: 'Up',
  1: 'Left',
  2: 'Down',
  3: 'Right'
};

var DIRECTION_KEY_CODES = {
  38: DirectionEnum.UP,
  37: DirectionEnum.LEFT,
  40: DirectionEnum.DOWN,
  39: DirectionEnum.RIGHT
};

/** Display types (Level, Time, Chips Left) */
var DISPLAY_TYPES = ['level', 'time', 'chipsLeft'];

/** Low digit thresholds for each display type. */
var LOW_DIGIT_THRESHOLDS = {
  'time': 15,
  'chipsLeft': 0
};

/** Level timer. */
var levelTimer;

/**
 * Client startup.
 * @return {[type]} [description]
 */
Meteor.startup(function () {
  setLevel();
});

/**
 * Set the level.
 * @param {[type]} levelPassword [description]
 */
function setLevel(levelPassword) {
  Meteor.call('getLevel', function(error, level) {
    if (!error) {
      // pad the map
      var adjustedLevel = levelWithPaddedMap(level);

      // store in session
      Session.set('currentPosition', adjustedLevel.startPosition);
      Session.set('currentLevel', adjustedLevel);

      startLevel();
    }
  });
}

/**
 * Take level data, pad the map, and adjust start position.
 * @return padded map
 */
function levelWithPaddedMap(levelData) {
  var padding = 4;

  // get map dimensions
  var xVals = levelData.levelData.map(function(tile) { return tile.x; });
  var numCols = Math.max.apply(null, xVals) + 1;

  var yVals = levelData.levelData.map(function(tile) { return tile.y; });
  var numRows = Math.max.apply(null, yVals) + 1;

  // adjust positions of existing map tiles
  for (var tileIndex in levelData.levelData) {
    levelData.levelData[tileIndex].x += padding;
    levelData.levelData[tileIndex].y += padding;
  }

  // add new tiles
  for (var i=0; i < padding; i++) {
    for (var j=padding; j < padding+numCols; j++) {
      // top padding
      levelData.levelData.push({ "y": i, "x": j, "tileStack": [tiles["floor"]] });

      // bottom padding
      levelData.levelData.push({ "y": padding+numRows+i, "x": j, "tileStack": [tiles["floor"]] });
    }
  }

  for (var i=0; i < numRows+(2*padding); i++) {
    for (var j=0; j < padding; j++) {
      // left padding
      levelData.levelData.push({ "y": i, "x": j, "tileStack": [tiles["floor"]] });

      // right padding
      levelData.levelData.push({ "y": i, "x": padding+numCols+j, "tileStack": [tiles["floor"]] });
    }
  }

  // adjust start position
  levelData.startPosition.x += padding;
  levelData.startPosition.y += padding;

  return levelData;
}

/**
 * Start the current level.
 * @return {[type]} [description]
 */
function startLevel() {
  // center chip
  centerChip();

  // clear inventory
  Session.set('inventory', {});

  // initialize session data for time remaining, chipsLeft
  Session.set('timeRemaining', Session.get('currentLevel').timeLimit);
  Session.set('chipsLeft', Session.get('currentLevel').chipsRequired);

  // start level timer
  startLevelTimer();

  // test picking up items
  // pickUpItem(tiles['redKey']);
  // pickUpItem(tiles['blueKey']);
  // pickUpItem(tiles['yellowKey']);
  // pickUpItem(tiles['greenKey']);
  // pickUpItem(tiles['iceSkates']);
  // pickUpItem(tiles['suctionBoots']);
  // pickUpItem(tiles['fireBoots']);
  // pickUpItem(tiles['flippers']);

  // removeItem(tiles['blueKey']);
  // removeItem(tiles['iceSkates']);
}

/**
 * Start the level timer.
 * @return {[type]} [description]
 */
function startLevelTimer() {
  // update time remaining
  levelTimer = Meteor.setInterval(updateTimeRemaining, 1000);
}

/**
 * Update time remaining for current level.
 * @return {[type]} [description]
 */
function updateTimeRemaining() {
  if (!Session.get('currentLevel')) {
    return;
  }

  // decrement time remaining by 1
  var timeRemaining = Session.get('timeRemaining');
  timeRemaining--;
  Session.set('timeRemaining', timeRemaining);

  if (timeRemaining <= 0) {
    Meteor.clearInterval(levelTimer);
  }
}

/**
 * Pick up an item.
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
function pickUpItem(item) {
  var inv = Session.get('inventory');
  inv[item.name] = item;
  Session.set('inventory', inv);
}

/**
 * Remove an item.
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
function removeItem(item) {
  var inv = Session.get('inventory');
  delete inv[item.name];
  Session.set('inventory', inv);
}

/**
 * Move chip.
 */
function move(keyCode) {
  var direction = DIRECTION_KEY_CODES[keyCode];

  if (typeof direction === 'undefined') {
    return;
  }

  var currentPosition = Session.get('currentPosition');
  var newPosition = clone(currentPosition);

  switch(direction) {
    case DirectionEnum.UP:
      newPosition.y--;
      break;
    case DirectionEnum.LEFT:
      newPosition.x--;
      break;
    case DirectionEnum.DOWN:
      newPosition.y++;
      break;
    case DirectionEnum.RIGHT:
      newPosition.x++;
      break;
  }

  // TODO: check if move allowed
  
  var currentLevel = Session.get('currentLevel');

  // remove old chip position
  var currentTile = _.find(currentLevel.levelData, function(mapTile) {
    return mapTile.x == currentPosition.x && mapTile.y == currentPosition.y;
  });

  var currentChipTile = _.find(currentTile.tileStack, function(tile) {
    return typeof tile.types !== 'undefined' && tile.types.indexOf('chip') !== -1;
  });

  var currentChipTileIndex = currentTile.tileStack.indexOf(currentChipTile);
  currentTile.tileStack.splice(currentChipTileIndex, 1);
  
  // add new chip position
  var newTile = _.find(currentLevel.levelData, function(mapTile) {
    return mapTile.x == newPosition.x && mapTile.y == newPosition.y;
  });

  newTile.tileStack.push(tiles['chip' + DIRECTION_LABELS[direction]]);

  // update map data and chip position
  Session.set('currentLevel', currentLevel);

  Session.set('currentPosition', newPosition);
  centerChip();
}

/**
 * Center chip.
 */
function centerChip() {
  if (!Session.get('currentLevel')) {
    return;
  }

  var position = Session.get("currentPosition");

  var xOffset = 33;
  var yOffset = 32;

  var left = xOffset + (-1 * (position.x - 4) * TILE_WIDTH);
  var top = yOffset + (-1 * (position.y - 4) * TILE_HEIGHT);

  var map = document.getElementById('level-map');
  map.style.left = left + "px";
  map.style.top = top + "px";
}

/**
 * Game template.
 */
Template.game.created = function() {
  $('body').on('keydown', function(event) {
    move(event.keyCode);
  });
};

/**
 * Menu template.
 */


/**
 * Map template.
 */
Template.levelMap.mapTiles = function() {
  if (!Session.get('currentLevel')) {
    return;
  }

  return Session.get('currentLevel').levelData;
};

Template.levelMap.mapTilePositionCSS = function(x, y) {
  return "top: " + (y * TILE_HEIGHT) + "px; left: " + (x * TILE_WIDTH) + "px";
};

Template.levelMap.rendered = function() {
}

/**
 * Display template.
 */
Template.displays.displayTypes = DISPLAY_TYPES;
Template.displays.digits = function() {
  return Template['digits'];
};
Template.displays.digitsData = function() {
  if (!Session.get('currentLevel')) {
    return;
  }

  // get display value for given display type
  var displayType = String(this);
  var displayValue;
  switch (displayType) {
    case 'level':
      displayValue = Session.get('currentLevel').levelNumber;
      break;
    case 'time':
      displayValue = Session.get('timeRemaining');
      break;
    case 'chipsLeft':
      displayValue = Session.get('chipsLeft');
      break;
  }

  var paddedValueString = pad(displayValue, 3, '-');
  var digits = paddedValueString.split('').map(function(digit) {
    if (digit === '-') {
      return 'none';
    } else {
      return digit;
    }
  });

  var low = '';
  if (LOW_DIGIT_THRESHOLDS[displayType]) {
    if (displayValue <= LOW_DIGIT_THRESHOLDS[displayType]) {
      low = ' low';
    }
  }

  return {digits: digits, low: low};
};

/**
 * Inventory template.
 */
Template.inventory.inventoryItems = function() {
  var inv = Session.get('inventory');
  if (typeof inv === 'undefined') {
    return [];
  } else {
    return Object.keys(inv).map(function(key, index) {
      return inv[key];
    });
  }
};

/**
 * Tile check template.
 */
Template.tilecheck.tiles = function() {
  return Object.keys(tiles).map(function(key, index) {
    return tiles[key];
  });
};

/**
 * Pad number.
 * @param  {[type]} n     [description]
 * @param  {[type]} width [description]
 * @param  {[type]} z     [description]
 * @return {[type]}       [description]
 */
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/**
 * Clone. Does a deep clone.
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
