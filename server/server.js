
// levels
var levels = {
  1: {
    level_number: 1,
    time_remaining: 100,
    chips_left: 11
  }
};

Meteor.startup(function () {
  Meteor.methods({
    getLevel: function(level_number) {
      return levels[level_number];
    }
  });
});
