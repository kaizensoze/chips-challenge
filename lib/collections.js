
// prevent any duplicate inserts while testing
Meteor.call('clearCollections', function(error, x) {});

/** Tiles. */
tiles = {};
tiles["floor"] = {name: "floor"};
tiles["wall"] = {name: "wall"};
tiles["chip-item"] = {name: "chip-item"};
tiles["chip-item"] = {name: "chip-item"};

Tiles = new Meteor.Collection("tiles");
Tiles.insert({name: "floor"});
Tiles.insert({name: "wall"});
Tiles.insert({name: "chip-item"});
Tiles.insert({name: "water"});
Tiles.insert({name: "fire"});
Tiles.insert({name: "thin-wall-top"});
Tiles.insert({name: "thin-wall-left"});
Tiles.insert({name: "thin-wall-bottom"});
Tiles.insert({name: "thin-wall-right"});
Tiles.insert({name: "block"});
Tiles.insert({name: "dirt"});
Tiles.insert({name: "ice"});
Tiles.insert({name: "force-floor-down"});
Tiles.insert({name: "clone-block-up"});
Tiles.insert({name: "clone-block-left"});
Tiles.insert({name: "clone-block-down"});
Tiles.insert({name: "clone-block-right"});
Tiles.insert({name: "force-floor-up"});
Tiles.insert({name: "force-floor-right"});
Tiles.insert({name: "force-floor-left"});
Tiles.insert({name: "exit"});
Tiles.insert({name: "blue-lock"});
Tiles.insert({name: "red-lock"});
Tiles.insert({name: "green-lock"});
Tiles.insert({name: "yellow-lock"});
Tiles.insert({name: "ice-top-left"});
Tiles.insert({name: "ice-top-right"});
Tiles.insert({name: "ice-bottom-right"});
Tiles.insert({name: "ice-bottom-left"});
Tiles.insert({name: "fake-blue-wall"});
Tiles.insert({name: "real-blue-wall"});
Tiles.insert({name: "spy"});
Tiles.insert({name: "socket"});
Tiles.insert({name: "green-button"});
Tiles.insert({name: "red-button"});
Tiles.insert({name: "closed-toggle-wall"});
Tiles.insert({name: "open-toggle-wall"});
Tiles.insert({name: "brown-switch"});
Tiles.insert({name: "blue-switch"});
Tiles.insert({name: "teleport"});
Tiles.insert({name: "bomb"});
Tiles.insert({name: "trap"});
Tiles.insert({name: "hidden-wall"});
Tiles.insert({name: "gravel"});
Tiles.insert({name: "recessed-wall"});
Tiles.insert({name: "hint"});
Tiles.insert({name: "thin-wall-bottom-right"});
Tiles.insert({name: "clone-machine"});
Tiles.insert({name: "force-floor-random"});
Tiles.insert({name: "drowned-chip"});
Tiles.insert({name: "burned-chip-with-fire"});
Tiles.insert({name: "burned-chip-smoke-only"});
Tiles.insert({name: "fake-exit-chip-in-exit"});
Tiles.insert({name: "fake-exit-dark-blue-border"});
Tiles.insert({name: "fake-exit-light-blue-border"});
Tiles.insert({name: "swimming-chip-up"});
Tiles.insert({name: "swimming-chip-left"});
Tiles.insert({name: "swimming-chip-down"});
Tiles.insert({name: "swimming-chip-right"});
Tiles.insert({name: "bug-up"});
Tiles.insert({name: "bug-left"});
Tiles.insert({name: "bug-down"});
Tiles.insert({name: "bug-right"});
Tiles.insert({name: "fireball-up"});
Tiles.insert({name: "fireball-left"});
Tiles.insert({name: "fireball-down"});
Tiles.insert({name: "fireball-right"});
Tiles.insert({name: "pink-ball-up"});
Tiles.insert({name: "pink-ball-left"});
Tiles.insert({name: "pink-ball-down"});
Tiles.insert({name: "pink-ball-right"});
Tiles.insert({name: "tank-up"});
Tiles.insert({name: "tank-left"});
Tiles.insert({name: "tank-down"});
Tiles.insert({name: "tank-right"});
Tiles.insert({name: "glider-up"});
Tiles.insert({name: "glider-left"});
Tiles.insert({name: "glider-down"});
Tiles.insert({name: "glider-right"});
Tiles.insert({name: "teeth-up"});
Tiles.insert({name: "teeth-left"});
Tiles.insert({name: "teeth-down"});
Tiles.insert({name: "teeth-right"});
Tiles.insert({name: "walker-up"});
Tiles.insert({name: "walker-left"});
Tiles.insert({name: "walker-down"});
Tiles.insert({name: "walker-right"});
Tiles.insert({name: "blob-up"});
Tiles.insert({name: "blob-left"});
Tiles.insert({name: "blob-down"});
Tiles.insert({name: "blob-right"});
Tiles.insert({name: "paramecium-up"});
Tiles.insert({name: "paramecium-left"});
Tiles.insert({name: "paramecium-down"});
Tiles.insert({name: "paramecium-right"});
Tiles.insert({name: "blue-key"});
Tiles.insert({name: "red-key"});
Tiles.insert({name: "green-key"});
Tiles.insert({name: "yellow-key"});
Tiles.insert({name: "flippers"});
Tiles.insert({name: "fire-boots"});
Tiles.insert({name: "ice-skates"});
Tiles.insert({name: "suction-boots"});

/** Keys. */
keys = [
  tiles["red-key"],
  tiles["blue-key"],
  tiles["yellow-key"],
  tiles["green-key"]
];

/** Boots. */
boots = [
  tiles["ice-skates"],
  tiles["suction-boots"],
  tiles["fire-boots"],
  tiles["flippers"]
];

/** Items. */
items = [];

keys.forEach(function(key) {
  items.push(key);
});

boots.forEach(function(boot) {
  items.push(boot);
});
