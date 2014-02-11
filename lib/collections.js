
// prevent any duplicate inserts while testing
Meteor.call('clearCollections', function(error, x) {});

/** Tiles. */
tiles = {};
tiles["floor"] = {name: "floor"};
tiles["wall"] = {name: "wall"};
tiles["chip-item"] = {name: "chip-item"};
tiles["water"] = {name: "water"};
tiles["fire"] = {name: "fire"};
tiles["thin-wall-top"] = {name: "thin-wall-top"};
tiles["thin-wall-left"] = {name: "thin-wall-left"};
tiles["thin-wall-bottom"] = {name: "thin-wall-bottom"};
tiles["thin-wall-right"] = {name: "thin-wall-right"};
tiles["block"] = {name: "block"};
tiles["dirt"] = {name: "dirt"};
tiles["ice"] = {name: "ice"};
tiles["force-floor-down"] = {name: "force-floor-down"};
tiles["clone-block-up"] = {name: "clone-block-up"};
tiles["clone-block-left"] = {name: "clone-block-left"};
tiles["clone-block-down"] = {name: "clone-block-down"};
tiles["clone-block-right"] = {name: "clone-block-right"};
tiles["force-floor-up"] = {name: "force-floor-up"};
tiles["force-floor-right"] = {name: "force-floor-right"};
tiles["force-floor-left"] = {name: "force-floor-left"};
tiles["exit"] = {name: "exit"};
tiles["blue-lock"] = {name: "blue-lock"};
tiles["red-lock"] = {name: "red-lock"};
tiles["green-lock"] = {name: "green-lock"};
tiles["yellow-lock"] = {name: "yellow-lock"};
tiles["ice-top-left"] = {name: "ice-top-left"};
tiles["ice-top-right"] = {name: "ice-top-right"};
tiles["ice-bottom-right"] = {name: "ice-bottom-right"};
tiles["ice-bottom-left"] = {name: "ice-bottom-left"};
tiles["fake-blue-wall"] = {name: "fake-blue-wall"};
tiles["real-blue-wall"] = {name: "real-blue-wall"};
tiles["spy"] = {name: "spy"};
tiles["socket"] = {name: "socket"};
tiles["green-button"] = {name: "green-button"};
tiles["red-button"] = {name: "red-button"};
tiles["closed-toggle-wall"] = {name: "closed-toggle-wall"};
tiles["open-toggle-wall"] = {name: "open-toggle-wall"};
tiles["brown-switch"] = {name: "brown-switch"};
tiles["blue-switch"] = {name: "blue-switch"};
tiles["teleport"] = {name: "teleport"};
tiles["bomb"] = {name: "bomb"};
tiles["trap"] = {name: "trap"};
tiles["hidden-wall"] = {name: "hidden-wall"};
tiles["gravel"] = {name: "gravel"};
tiles["recessed-wall"] = {name: "recessed-wall"};
tiles["hint"] = {name: "hint"};
tiles["thin-wall-bottom-right"] = {name: "thin-wall-bottom-right"};
tiles["clone-machine"] = {name: "clone-machine"};
tiles["force-floor-random"] = {name: "force-floor-random"};
tiles["drowned-chip"] = {name: "drowned-chip"};
tiles["burned-chip-with-fire"] = {name: "burned-chip-with-fire"};
tiles["burned-chip-smoke-only"] = {name: "burned-chip-smoke-only"};
tiles["fake-exit-chip-in-exit"] = {name: "fake-exit-chip-in-exit"};
tiles["fake-exit-dark-blue-border"] = {name: "fake-exit-dark-blue-border"};
tiles["fake-exit-light-blue-border"] = {name: "fake-exit-light-blue-border"};
tiles["swimming-chip-up"] = {name: "swimming-chip-up"};
tiles["swimming-chip-left"] = {name: "swimming-chip-left"};
tiles["swimming-chip-down"] = {name: "swimming-chip-down"};
tiles["swimming-chip-right"] = {name: "swimming-chip-right"};
tiles["bug-up"] = {name: "bug-up"};
tiles["bug-left"] = {name: "bug-left"};
tiles["bug-down"] = {name: "bug-down"};
tiles["bug-right"] = {name: "bug-right"};
tiles["fireball-up"] = {name: "fireball-up"};
tiles["fireball-left"] = {name: "fireball-left"};
tiles["fireball-down"] = {name: "fireball-down"};
tiles["fireball-right"] = {name: "fireball-right"};
tiles["pink-ball-up"] = {name: "pink-ball-up"};
tiles["pink-ball-left"] = {name: "pink-ball-left"};
tiles["pink-ball-down"] = {name: "pink-ball-down"};
tiles["pink-ball-right"] = {name: "pink-ball-right"};
tiles["tank-up"] = {name: "tank-up"};
tiles["tank-left"] = {name: "tank-left"};
tiles["tank-down"] = {name: "tank-down"};
tiles["tank-right"] = {name: "tank-right"};
tiles["glider-up"] = {name: "glider-up"};
tiles["glider-left"] = {name: "glider-left"};
tiles["glider-down"] = {name: "glider-down"};
tiles["glider-right"] = {name: "glider-right"};
tiles["teeth-up"] = {name: "teeth-up"};
tiles["teeth-left"] = {name: "teeth-left"};
tiles["teeth-down"] = {name: "teeth-down"};
tiles["teeth-right"] = {name: "teeth-right"};
tiles["walker-up"] = {name: "walker-up"};
tiles["walker-left"] = {name: "walker-left"};
tiles["walker-down"] = {name: "walker-down"};
tiles["walker-right"] = {name: "walker-right"};
tiles["blob-up"] = {name: "blob-up"};
tiles["blob-left"] = {name: "blob-left"};
tiles["blob-down"] = {name: "blob-down"};
tiles["blob-right"] = {name: "blob-right"};
tiles["paramecium-up"] = {name: "paramecium-up"};
tiles["paramecium-left"] = {name: "paramecium-left"};
tiles["paramecium-down"] = {name: "paramecium-down"};
tiles["paramecium-right"] = {name: "paramecium-right"};
tiles["blue-key"] = {name: "blue-key"};
tiles["red-key"] = {name: "red-key"};
tiles["green-key"] = {name: "green-key"};
tiles["yellow-key"] = {name: "yellow-key"};
tiles["flippers"] = {name: "flippers"};
tiles["fire-boots"] = {name: "fire-boots"};
tiles["ice-skates"] = {name: "ice-skates"};
tiles["suction-boots"] = {name: "suction-boots"};

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
