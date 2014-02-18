
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
  Levels.insert(firstLevel);

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
