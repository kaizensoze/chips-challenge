
/** Keys. */
var keys = [
  {name: "red-key", index: 108},
  {name: "blue-key", index: 107},
  {name: "yellow-key", index: 110},
  {name: "green-key", index: 109}
];

Keys = new Meteor.Collection("keys");
if (Keys.find().count() === 0) {
  keys.forEach(function(key) {
    Keys.insert(key);
  });
}

// /** Boots. */
// Boots = new Meteor.Collection("boots");
// Boots.insert({name: "ice-skates", index: 113});
// Boots.insert({name: "suction-boots", index: 114});
// Boots.insert({name: "fire-boots", index: 112});
// Boots.insert({name: "flippers", index: 111});

// /** Items. */
// Items = new Meteor.Collection("items");

// Keys.find().forEach(function(key) {
//   Items.insert(key);
// });

// Boots.find().forEach(function(boot) {
//   Items.insert(boot);
// });

// console.log(Items);

console.log('collections');
