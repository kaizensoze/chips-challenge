
/**
 * Store levels local for now.
 * TODO: Store levels in mongodb.
 * @type {Object}
 */
var levels = {
  1: {
    level_number: 1,
    time_remaining: 100,
    chips_left: 11
  }
};

/**
 * Server startup.
 * @return {[type]} [description]
 */
Meteor.startup(function () {
  console.log('server');
  Meteor.methods({
    getLevel: function(level_number) {
      return levels[level_number];
    }
  });
});
