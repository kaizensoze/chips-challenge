
/** Levels. */
var Levels = new Meteor.Collection('levels');

/**
 * Server startup.
 * @return {[type]} [description]
 */
Meteor.startup(function () {
  // clear levels
  Levels.remove({});

  Levels.insert(filledIn(level1));
  Levels.insert(filledIn(level2));

  var levelNumber = 2;

  Meteor.methods({
    getLevel: function(levelPassword) {
      var password = levelPassword || 'BDHP';
      return Levels.findOne({levelNumber: levelNumber});
    }
  });
});

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

function filledIn(level) {
  var levelCopy = clone(level);

  var levelData = levelCopy.levelData;

  var emptyLevelData = [];

  var padding = 4;

  var numRows = levelData.length;
  var numCols = levelData[0].length;

  // created padded matrix of default floor tiles
  for (var y=0; y < numRows + (2*padding); y++) {
    if (!(y in emptyLevelData)) {
      emptyLevelData[y] = [];
    }

    for (var x=0; x < numCols + (2*padding); x++) {
      emptyLevelData[y][x] = { 'x': x, 'y': y, 'tileStack': [ tiles["floor"] ] };
    }
  }

  // fill in matrix with data we have
  for (var y=0; y < levelData.length; y++) {
    for (var x=0; x < levelData[y].length; x++) {
      emptyLevelData[y+padding][x+padding] = { 'x': x+padding, 'y': y+padding, 'tileStack': levelData[y][x] };
    }
  }
  levelCopy.levelData = emptyLevelData;

  // update start position
  levelCopy.startPosition.x += padding;
  levelCopy.startPosition.y += padding;

  return levelCopy;
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
