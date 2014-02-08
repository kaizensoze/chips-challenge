
/** Display types (Level, Time, Chips Left) */
var display_types = ["level", "time", "chips-left"];

/** Low digit thresholds for each display type. */
var LOW_DIGIT_THRESHOLDS = {
  "time": 15,
  "chips-left": 0
};

/** Level timer. */
var level_timer;

/** Inventory. */
var inventory;

/**
 * Client startup.
 * @return {[type]} [description]
 */
Meteor.startup(function () {
  // default to level 1
  if (!Session.get("level")) {
    setLevel(1);
  }
  startLevel();
});

/**
 * Set the level.
 * @param {[type]} level_number [description]
 */
function setLevel(level_number) {
  Meteor.call('getLevel', level_number, function(error, level) {
    if (!error) {
      Session.set("level", level);
    }
  });
}

/**
 * Start the current level.
 * @return {[type]} [description]
 */
function startLevel() {
  inventory = [];
  startLevelTimer();
}

/**
 * Start the level timer.
 * @return {[type]} [description]
 */
function startLevelTimer() {
  // update time remaining
  level_timer = Meteor.setInterval(updateTimeRemaining, 1000);
}

/**
 * Update time remaining for current level.
 * @return {[type]} [description]
 */
function updateTimeRemaining() {
  if (!Session.get("level")) {
    return;
  }

  var level = Session.get("level");
  level.time_remaining--;
  Session.set("level", level);

  if (level.time_remaining <= 0) {
    Meteor.clearInterval(level_timer);
  }
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
 * Display template.
 */
Template.displays.displayTypes = display_types;
Template.displays.digits = function() {
  if (!Session.get("level")) {
    return;
  }

  // get display value for given display type
  var display_type = String(this);
  var display_value;
  switch (display_type) {
    case "level":
      display_value = Session.get("level").level_number;
      break;
    case "time":
      display_value = Session.get("level").time_remaining;
      break;
    case "chips-left":
      display_value = Session.get("level").chips_left;
      break;
  }

  var padded_value_string = pad(display_value, 3, '-');
  var digits = padded_value_string.split('').map(function(digit) {
    if (digit === "-") {
      return "none";
    } else {
      return digit;
    }
  });

  var low = "";
  if (LOW_DIGIT_THRESHOLDS[display_type]) {
    if (display_value <= LOW_DIGIT_THRESHOLDS[display_type]) {
      low = " low";
    }
  }

  return Template.digits({digits: digits, low: low});
};

/**
 * Inventory template.
 */
// TODO

