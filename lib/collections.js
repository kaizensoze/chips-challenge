
// prevent any duplicate inserts while testing
Meteor.call('clearCollections', function(error, x) {});

/** Keys. */
var keys = [
  {name: "red-key", index: 108},
  {name: "blue-key", index: 107},
  {name: "yellow-key", index: 110},
  {name: "green-key", index: 109}
];

Keys = new Meteor.Collection("keys");
keys.forEach(function(key) {
  Keys.insert(key);
});

/** Boots. */
var boots = [
  {name: "ice-skates", index: 113},
  {name: "suction-boots", index: 114},
  {name: "fire-boots", index: 112},
  {name: "flippers", index: 111}
];

Boots = new Meteor.Collection("boots");
boots.forEach(function(boot) {
  Boots.insert(boot);
});

/** Items. */
Items = new Meteor.Collection("items");
keys.forEach(function(key) {
  Items.insert(key);
});
boots.forEach(function(boot) {
  Items.insert(boot);
});
