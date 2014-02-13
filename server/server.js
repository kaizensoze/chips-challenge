
/** Levels. */
var Levels = new Meteor.Collection('levels');

/**
 * Server startup.
 * @return {[type]} [description]
 */
Meteor.startup(function () {
  // clear levels
  Levels.remove({});

  // add first level
  var adjustedLevel = autofill(firstLevel);
  Levels.insert(adjustedLevel);

  Meteor.methods({
    getLevel: function(levelPassword) {
      var password;
      if (typeof levelPassword === 'undefined') {
        password = 'BDHP'; // first level
      } else {
        password = levelPassword;
      }

      return Levels.findOne({password: password});
    },
    clearCollections: function() {

    }
  });
});

function autofill(level) {
  var levelDataMatrix = matrixified(level.levelData);

  console.log(levelDataMatrix);
  return level;

  var maxY = _.max(level.levelData, function(mapTile) { return mapTile.y; }).y;
  var minY = _.min(level.levelData, function(mapTile) { return mapTile.y; }).y;

  var maxX = _.max(level.levelData, function(mapTile) { return mapTile.x; }).x;
  var minX = _.min(level.levelData, function(mapTile) { return mapTile.x; }).x;

  // iterate over tiles and fill in any missing tiles with normal floor tile
  for (var y = minY; y < maxY; y++) {
    for (var x = minX; x < maxX; x++) {
      if (!levelDataMatrix[y][x]) {
        level.levelData.push({ "y": y, "x": x, "tileStack": [tiles["floor"]] });
      }
    }
  }

  return level;
}

function matrixified(levelData) {
  var matrix = {};

  levelData.forEach(function(mapTile) {
    var y = mapTile.y.toString();
    var x = mapTile.x.toString();

    if (!matrix[y]) {
      matrix[y] = [];
    }

    matrix[y][x] = mapTile;
  });

  return matrix;
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
