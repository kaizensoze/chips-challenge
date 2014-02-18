
/** Tile dimensions. */
var TILE_HEIGHT = 32;
var TILE_WIDTH = 32;

var DirectionEnum = {
  UP: 0,
  LEFT: 1,
  DOWN: 2,
  RIGHT: 3
}

var DIRECTION_KEY_CODES = {
  38: DirectionEnum.UP,
  37: DirectionEnum.LEFT,
  40: DirectionEnum.DOWN,
  39: DirectionEnum.RIGHT
}

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
      // store in session
      Session.set('currentPosition', level.startPosition);
      Session.set('currentLevel', level);

      startLevel();
    }
  });
}

/**
 * Start the current level.
 * @return {[type]} [description]
 */
function startLevel() {
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
  var newPosition = currentPosition;

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
  
  Session.set('currentPosition', newPosition);

  // set random variable just to trigger map data re-render for now
  var currentLevel = Session.get('currentLevel');
  currentLevel.blah = Math.random();
  Session.set('currentLevel', currentLevel);
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

  // Session.get('currentLevel').levelData.forEach(function(mapTile) {
  //   console.log(mapTile);
  // });

  return Session.get('currentLevel').levelData;
};

Template.levelMap.mapTilePositionCSS = function(x, y) {
  return "top: " + (y * TILE_HEIGHT) + "px; left: " + (x * TILE_WIDTH) + "px";
};

Template.levelMap.rendered = function() {
  if (!Session.get('currentLevel')) {
    return;
  }

  var position = Session.get("currentPosition");

  var left = 33 + (-1 * (position.x - 4) * TILE_WIDTH);
  var top = 32 + (-1 * (position.y - 4) * TILE_HEIGHT);

  var map = document.getElementById('level-map');
  map.style.left = left + "px";
  map.style.top = top + "px";
}

/**
 * Display template.
 */
Template.displays.displayTypes = DISPLAY_TYPES;
Template.displays.digits = function() {
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

  return Template.digits({digits: digits, low: low});
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
