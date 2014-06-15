
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

/** Current level. */
var currentLevel;

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
    if (!error && typeof level !== 'undefined') {
      // store in session
      Session.set('currentPosition', level.startPosition);
      Session.set('currentLevel', level);
      currentLevel = Session.get('currentLevel');

      startLevel();
    } else {
      console.log('No level found.');
    }
  });
}

/**
 * Start the current level.
 * @return {[type]} [description]
 */
function startLevel() {
  // center chip
  centerChip();

  // initialize session data
  Session.set('inventory', []);
  Session.set('timeRemaining', Session.get('currentLevel').timeLimit);
  Session.set('chipsLeft', Session.get('currentLevel').chipsRequired);
  Session.set('greenLocksLeft', Session.get('currentLevel').numGreenLocks);

  // start level timer
  startLevelTimer();

  // test picking up items
  // pickupItem(null, tiles['redKey']);
  // pickupItem(null, tiles['blueKey']);
  // pickupItem(null, tiles['yellowKey']);
  // pickupItem(null, tiles['greenKey']);
  // pickupItem(null, tiles['iceSkates']);
  // pickupItem(null, tiles['suctionBoots']);
  // pickupItem(null, tiles['fireBoots']);
  // pickupItem(null, tiles['flippers']);

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
function pickupItem(tile, item) {
  // remove item from tile
  removeTileFromStack(tile.tileStack, item);

  // if chip item, decrement 'chips left'
  if (_.isEqual(item, tiles['chipItem'])) {
    var chipsLeft = Session.get('chipsLeft');
    chipsLeft--;
    Session.set('chipsLeft', chipsLeft);
  } else {
    // add non-chip item to inventory
    var inv = Session.get('inventory');
    inv.push(item);
    Session.set('inventory', inv);
  }
}

/**
 * Remove an item.
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
function removeItem(item) {
  var inv = Session.get('inventory');

  var itemToRemove = _.find(inv, function(_item) {
    return _.isEqual(_item, item);
  });
  var itemIndex = _.indexOf(inv, itemToRemove);
  inv.splice(itemIndex, 1);
  Session.set('inventory', inv);
}

function unlockLock(tile, lock) {
  var unlockSucceeded = false;

  var inv = Session.get('inventory');

  // check for required key. if we have it, unlock the lock.
  var requiredKey = _.find(inv, function(item) {
    return item.name === lock.name.replace('Lock', '') + 'Key';
  });

  var haveKey = _.find(inv, function(item) {
    return _.isEqual(item, requiredKey);
  });

  if (haveKey) {
    // remove lock from tile
    removeTileFromStack(tile.tileStack, lock);

    // NOTE: Green key is a special case in that you only need one of it
    //       to open all green locks. As a result, we need to check if we're
    //       about to unlock the last green lock on the map. If so, we remove
    //       the key from chip's inventory.
    var unlockingLastGreenLock = false;
    if (lock.name === 'greenLock') {
      var greenLocksLeft = Session.get('greenLocksLeft');
      greenLocksLeft--;
      Session.set('greenLocksLeft', greenLocksLeft);
      if (greenLocksLeft === 0) {
        unlockingLastGreenLock = true;
      }
    }

    // remove key from inventory
    if (requiredKey.name !== 'greenKey' || (requiredKey.name === 'greenKey' && unlockingLastGreenLock)) {
      removeItem(requiredKey);
    }
    
    unlockSucceeded = true;
  }

  return unlockSucceeded;
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

  // old tile
  var currentTile = getTileAtPosition(currentPosition);

  // adjust chip's direction
  updateChipTile(currentTile, currentTile, direction);

  // new tile
  var newTile = getTileAtPosition(newPosition);

  // interact with new tile
  if (tileContainsType(newTile, 'wall')) {
    if (tileContainsType(newTile, 'lock')) {
      var lock = getTileOfType(newTile, 'lock');
      var unlocked = unlockLock(newTile, lock);
      if (!unlocked) {
        return;
      }
    } else if (tileContainsType(newTile, 'socket')) {
      if (Session.get('chipsLeft') === 0) {
        var socket = getTileOfType(newTile, 'socket');
        removeTileFromStack(newTile.tileStack, socket);
      } else {
        return;
      }
    } else if (tileContainsTile(newTile, 'block')) {
      console.log('block');
    } else {
      return;
    }
  } else if (tileContainsType(newTile, 'item')) {
    var item = getTileOfType(newTile, 'item');
    pickupItem(newTile, item);
  } else if (tileContainsType(newTile, 'exit')) {
    // advance to next level
  }

  // adjust chip's position
  updateChipTile(currentTile, newTile, direction);
}

/**
 * Update chip tile.
 */
function updateChipTile(currentTile, newTile, direction) {
  // remove chip from old tile
  var chip = getTileOfType(currentTile, 'chip');
  removeTileFromStack(currentTile.tileStack, chip);

  // add chip to new tile
  newTile.tileStack.push(tiles['chip' + DIRECTION_LABELS[direction]]);

  // update current position
  Session.set('currentPosition', {'x':newTile.x, 'y':newTile.y});

  // update level data
  updateLevelData();

  // center chip
  centerChip();
}

/**
 * Update level data.
 */
function updateLevelData() {
  Session.set('currentLevel', currentLevel);
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

function tileContainsType(tile, type) {
  var tile = _.find(tile.tileStack, function(tile) {
    return 'types' in tile && _.contains(tile.types, type);
  });
  return typeof tile !== 'undefined';
}

function tileContainsTile(tile, name) {
  var tile = _.find(tile.tileStack, function(tile) {
    return tile.name === name;
  });
  return tile;
}

function getTileAtPosition(position) {
  var tile = currentLevel.levelData[position.y][position.x];
  return tile;
}

function getTileOfType(tile, type) {
  var tile = _.find(tile.tileStack, function(tile) {
    return 'types' in tile && _.contains(tile.types, type);
  });
  return tile;
}

function removeTileFromStack(tileStack, tileToRemove) {
  var tileIndex = _.indexOf(tileStack, tileToRemove);
  tileStack.splice(tileIndex, 1);
}

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

  var mapTiles = _.flatten(Session.get('currentLevel').levelData);
  return mapTiles;
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
