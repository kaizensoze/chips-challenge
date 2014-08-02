
LEVEL_MAP_PADDING = 4;
LEVEL_TO_TEST = 2

/** Tiles. */
tiles = {};

// chip
tiles['chipUp'] = {name: 'chipUp', cssClass: 'chip-up', direction: 'up', types: ['chip']};
tiles['chipLeft'] = {name: 'chipLeft', cssClass: 'chip-left', direction: 'left', types: ['chip']};
tiles['chipDown'] = {name: 'chipDown', cssClass: 'chip-down', direction: 'down', types: ['chip']};
tiles['chipRight'] = {name: 'chipRight', cssClass: 'chip-right', direction: 'right', types: ['chip']};
tiles['swimmingChipUp'] = {name: 'swimmingChipUp', cssClass: 'swimming-chip-up'};
tiles['swimmingChipLeft'] = {name: 'swimmingChipLeft', cssClass: 'swimming-chip-left'};
tiles['swimmingChipDown'] = {name: 'swimmingChipDown', cssClass: 'swimming-chip-down'};
tiles['swimmingChipRight'] = {name: 'swimmingChipRight', cssClass: 'swimming-chip-right'};
tiles['drownedChip'] = {name: 'drownedChip', cssClass: 'drowned-chip'};
tiles['burnedChipWithFire'] = {name: 'burnedChipWithFire', cssClass: 'burned-chip-with-fire'};
tiles['burnedChipSmokeOnly'] = {name: 'burnedChipSmokeOnly', cssClass: 'burned-chip-smoke-only'};

// items
tiles['chipItem'] = {name: 'chipItem', cssClass: 'chip-item', types: ['item', 'chipItem']};
tiles['blueKey'] = {name: 'blueKey', cssClass: 'blue-key', color: 'blue', types: ['item', 'key']};
tiles['redKey'] = {name: 'redKey', cssClass: 'red-key', color: 'red', types: ['item', 'key']};
tiles['greenKey'] = {name: 'greenKey', cssClass: 'green-key', color: 'green', types: ['item', 'key']};
tiles['yellowKey'] = {name: 'yellowKey', cssClass: 'yellow-key', color: 'yellow', types: ['item', 'key']};
tiles['flippers'] = {name: 'flippers', cssClass: 'flippers', types: ['item', 'boot']};
tiles['fireBoots'] = {name: 'fireBoots', cssClass: 'fire-boots', types: ['item', 'boot']};
tiles['iceSkates'] = {name: 'iceSkates', cssClass: 'ice-skates', types: ['item', 'boot']};
tiles['suctionBoots'] = {name: '', cssClass: 'suction-boots', types: ['item', 'boot']};

// locks
tiles['blueLock'] = {name: 'blueLock', cssClass: 'blue-lock', types: ['wall', 'lock']};
tiles['redLock'] = {name: 'redLock', cssClass: 'red-lock', types: ['wall', 'lock']};
tiles['greenLock'] = {name: 'greenLock', cssClass: 'green-lock', types: ['wall', 'lock']};
tiles['yellowLock'] = {name: 'yellowLock', cssClass: 'yellow-lock', types: ['wall', 'lock']};

// monsters
tiles['bugUp'] = {name: 'bugUp', cssClass: 'bug-up', direction: 'up', types: ['monster']};
tiles['bugLeft'] = {name: 'bugLeft', cssClass: 'bug-left', direction: 'left', types: ['monster']};
tiles['bugDown'] = {name: 'bugDown', cssClass: 'bug-down', direction: 'down', types: ['monster']};
tiles['bugRight'] = {name: 'bugRight', cssClass: 'bug-right', direction: 'right', types: ['monster']};
tiles['fireballUp'] = {name: 'fireballUp', cssClass: 'fireball-up', direction: 'up', types: ['monster']};
tiles['fireballLeft'] = {name: 'fireballLeft', cssClass: 'fireball-left', direction: 'left', types: ['monster']};
tiles['fireballDown'] = {name: 'fireballDown', cssClass: 'fireball-down', direction: 'down', types: ['monster']};
tiles['fireballRight'] = {name: 'fireballRight', cssClass: 'fireball-right', direction: 'right', types: ['monster']};
tiles['pinkBallUp'] = {name: 'pinkBallUp', cssClass: 'pink-ball-up', direction: 'up', types: ['monster']};
tiles['pinkBallLeft'] = {name: 'pinkBallLeft', cssClass: 'pink-ball-left', direction: 'left', types: ['monster']};
tiles['pinkBallDown'] = {name: 'pinkBallDown', cssClass: 'pink-ball-down', direction: 'down', types: ['monster']};
tiles['pinkBallRight'] = {name: 'pinkBallRight', cssClass: 'pink-ball-right', direction: 'right', types: ['monster']};
tiles['tankUp'] = {name: 'tankUp', cssClass: 'tank-up', direction: 'up', types: ['monster']};
tiles['tankLeft'] = {name: 'tankLeft', cssClass: 'tank-left', direction: 'left', types: ['monster']};
tiles['tankDown'] = {name: 'tankDown', cssClass: 'tank-down', direction: 'down', types: ['monster']};
tiles['tankRight'] = {name: 'tankRight', cssClass: 'tank-right', direction: 'right', types: ['monster']};
tiles['gliderUp'] = {name: 'gliderUp', cssClass: 'glider-up', direction: 'up', types: ['monster']};
tiles['gliderLeft'] = {name: 'gliderLeft', cssClass: 'glider-left', direction: 'left', types: ['monster']};
tiles['gliderDown'] = {name: 'gliderDown', cssClass: 'glider-down', direction: 'down', types: ['monster']};
tiles['gliderRight'] = {name: 'gliderRight', cssClass: 'glider-right', direction: 'right', types: ['monster']};
tiles['teethUp'] = {name: 'teethUp', cssClass: 'teeth-up', direction: 'up', types: ['monster']};
tiles['teethLeft'] = {name: 'teethLeft', cssClass: 'teeth-left', direction: 'left', types: ['monster']};
tiles['teethDown'] = {name: 'teethDown', cssClass: 'teeth-down', direction: 'down', types: ['monster']};
tiles['teethRight'] = {name: 'teethRight', cssClass: 'teeth-right', direction: 'right', types: ['monster']};
tiles['walkerUp'] = {name: 'walkerUp', cssClass: 'walker-up', direction: 'up', types: ['monster']};
tiles['walkerLeft'] = {name: 'walkerLeft', cssClass: 'walker-left', direction: 'left', types: ['monster']};
tiles['walkerDown'] = {name: 'walkerDown', cssClass: 'walker-down', direction: 'down', types: ['monster']};
tiles['walkerRight'] = {name: 'walkerRight', cssClass: 'walker-right', direction: 'right', types: ['monster']};
tiles['blobUp'] = {name: 'blobUp', cssClass: 'blob-up', direction: 'up', types: ['monster']};
tiles['blobLeft'] = {name: 'blobLeft', cssClass: 'blob-left', direction: 'left', types: ['monster']};
tiles['blobDown'] = {name: 'blobDown', cssClass: 'blob-down', direction: 'down', types: ['monster']};
tiles['blobRight'] = {name: 'blobRight', cssClass: 'blob-right', direction: 'right', types: ['monster']};
tiles['parameciumUp'] = {name: 'parameciumUp', cssClass: 'paramecium-up', direction: 'up', types: ['monster']};
tiles['parameciumLeft'] = {name: 'parameciumLeft', cssClass: 'paramecium-left', direction: 'left', types: ['monster']};
tiles['parameciumDown'] = {name: 'parameciumDown', cssClass: 'paramecium-down', direction: 'down', types: ['monster']};
tiles['parameciumRight'] = {name: 'parameciumRight', cssClass: 'paramecium-right', direction: 'right', types: ['monster']};
tiles['bomb'] = {name: 'bomb', cssClass: 'bomb'};

// elements
tiles['water'] = {name: 'water', cssClass: 'water', types: ['water']};
tiles['fire'] = {name: 'fire', cssClass: 'fire'};
tiles['ice'] = {name: 'ice', cssClass: 'ice'};
tiles['iceTopLeft'] = {name: 'iceTopLeft', cssClass: 'ice-top-left'};
tiles['iceTopRight'] = {name: 'iceTopRight', cssClass: 'ice-top-right'};
tiles['iceBottomRight'] = {name: 'iceBottomRight', cssClass: 'ice-bottom-right'};
tiles['iceBottomLeft'] = {name: 'iceBottomLeft', cssClass: 'ice-bottom-left'};
tiles['forceFloorUp'] = {name: 'forceFloorUp', cssClass: 'force-floor-up'};
tiles['forceFloorLeft'] = {name: 'forceFloorLeft', cssClass: 'force-floor-left'};
tiles['forceFloorDown'] = {name: 'forceFloorDown', cssClass: 'force-floor-down'};
tiles['forceFloorRight'] = {name: 'forceFloorRight', cssClass: 'force-floor-right'};
tiles['forceFloorRandom'] = {name: 'forceFloorRandom', cssClass: 'force-floor-random'};

// floors
tiles['floor'] = {name: 'floor', cssClass: 'floor'};
tiles['dirt'] = {name: 'dirt', cssClass: 'dirt', types: ['dirt']};
tiles['trap'] = {name: 'trap', cssClass: 'trap'};
tiles['gravel'] = {name: 'gravel', cssClass: 'gravel'};
tiles['spy'] = {name: 'spy', cssClass: 'spy'};
tiles['hint'] = {name: 'hint', cssClass: 'hint'};
tiles['teleport'] = {name: 'teleport', cssClass: 'teleport'};

// walls
tiles['wall'] = {name: 'wall', cssClass: 'wall', types: ['wall']};
tiles['fakeBlueWall'] = {name: 'fakeBlueWall', cssClass: 'fake-blue-wall', types: ['wall']};
tiles['realBlueWall'] = {name: 'realBlueWall', cssClass: 'real-blue-wall', types: ['wall']};
tiles['hiddenWall'] = {name: 'hiddenWall', cssClass: 'hidden-wall', types: ['wall']};
tiles['invisibleWall'] = {name: 'invisibleWall', cssClass: 'invisible-wall', types: ['wall']};
tiles['thinWallTop'] = {name: 'thinWallTop', cssClass: 'thin-wall-top', types: ['wall']};
tiles['thinWallLeft'] = {name: 'thinWallLeft', cssClass: 'thin-wall-left', types: ['wall']};
tiles['thinWallBottom'] = {name: 'thinWallBottom', cssClass: 'thin-wall-bottom', types: ['wall']};
tiles['thinWallRight'] = {name: 'thinWallRight', cssClass: 'thin-wall-right', types: ['wall']};
tiles['thinWallBottomRight'] = {name: 'thinWallBottomRight', cssClass: 'thin-wall-bottom-right', types: ['wall']};
tiles['recessedWall'] = {name: 'recessedWall', cssClass: 'recessed-wall', types: ['wall']};
tiles['closedToggleWall'] = {name: 'closedToggleWall', cssClass: 'closed-toggle-wall', types: ['wall']};
tiles['openToggleWall'] = {name: 'openToggleWall', cssClass: 'open-toggle-wall', types: ['wall']};
tiles['cloneMachine'] = {name: 'cloneMachine', cssClass: 'clone-machine', types: ['wall']};
tiles['cloneBlockUp'] = {name: 'cloneBlockUp', cssClass: 'clone-block-up', types: ['wall', 'block']};
tiles['cloneBlockLeft'] = {name: 'cloneBlockLeft', cssClass: 'clone-block-left', types: ['wall', 'block']};
tiles['cloneBlockDown'] = {name: 'cloneBlockDown', cssClass: 'clone-block-down', types: ['wall', 'block']};
tiles['cloneBlockRight'] = {name: 'cloneBlockRight', cssClass: 'clone-block-right', types: ['wall', 'block']};
tiles['socket'] = {name: 'socket', cssClass: 'socket', types: ['wall', 'socket']};
tiles['block'] = {name: 'block', cssClass: 'block', types: ['wall', 'block']};

// buttons
tiles['greenButton'] = {name: 'greenButton', cssClass: 'green-button'};
tiles['redButton'] = {name: 'redButton', cssClass: 'red-button'};
tiles['brownButton'] = {name: 'brownButton', cssClass: 'brown-button'};
tiles['blueButton'] = {name: 'blueButton', cssClass: 'blue-button'};

// exit
tiles['exit'] = {name: 'exit', cssClass: 'exit', types: ['exit']};
tiles['fakeExitChipInExit'] = {name: 'fakeExitChipInExit', cssClass: 'fake-exit-chip-in-exit'};
tiles['fakeExitDarkBlueBorder'] = {name: 'fakeExitDarkBlueBorder', cssClass: 'fake-exit-dark-blue-border'};
tiles['fakeExitLightBlueBorder'] = {name: 'fakeExitLightBlueBorder', cssClass: 'fake-exit-light-blue-border'};

level1 = {
  "levelSet": "Chip's Challenge 1",
  "levelNumber": 1,
  "password": "BDHP",
  "hint": "Collect chips to get past the chip socket. Use keys to open doors.",
  "chipsRequired": 11,
  "chipsAvailable": 11,
  "timeLimit": 100,
  "startPosition": {"x": 7, "y": 6},
  "numGreenLocks": 2,
  "levelData": [
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ]
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["exit"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["greenLock"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["socket"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["greenLock"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["yellowKey"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["blueLock"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["redLock"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["yellowKey"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["blueKey"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["hint"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["redKey"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipDown"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["blueKey"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["redKey"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["redLock"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["blueLock"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["yellowLock"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["yellowLock"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["greenKey"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ]
  ]
};

level2 = {
  "levelSet": "Chip's Challenge 1",
  "levelNumber": 2,
  "password": "JXMJ",
  "hint": "Push blocks into water to make dirt. Watch out for monsters.",
  "chipsRequired": 4,
  "chipsAvailable": 4,
  "timeLimit": 100,
  "startPosition": {"x": 14, "y": 5}, // 14, 5
  "numGreenLocks": 0,
  "levelData": [
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["bugUp"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["water"] ],
      [ tiles["floor"], tiles["water"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["exit"] ],
      [ tiles["floor"], tiles["socket"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["bugUp"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["water"] ],
      [ tiles["floor"], tiles["water"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["block"] ],
      [ tiles["floor"], tiles["block"] ],
      [ tiles["floor"], tiles["chipDown"] ],
      [ tiles["floor"], tiles["hint"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["bugUp"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["water"] ],
      [ tiles["floor"], tiles["water"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["chipItem"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
    [
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"], tiles["wall"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
      [ tiles["floor"] ],
    ],
  ]
};
