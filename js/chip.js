
// Map.
function Map() {
	this.rows = 20;
    this.cols = 20;
	this.data;

    this.tile_width = 32;
	this.viewport_width = 9*tile_width + .5*tile_width;

	this.level_number;
	this.time;
	this.chips_left;
}

// Chip.
function Chip() {
	this.inventory = new Array();
}

// Enums.
var Orientation = {
	UP : 0,
	LEFT : 90,
	DOWN : 180,
	RIGHT : 270
};

var Color = {
	RED : '#FF0000',
	TURQUOISE : '#00FFFF',
	DARK_BLUE : '#0000FF',
	GREEN : '#00FF00'
};

var ItemType = {
	ENEMY: 0,
	INVENTORY: 1,
	CHIP: 2
};

var SourceType = {
	FLOOR : 0,
	ITEM : 1
};

var Source = {
	BLOCK_MUD : 0,
	BLOCK_NORMAL : 1,
	BLOCK_QUESTIONABLE : 2,
	BLOCK_SWITCHABLE : 3,
	CHIP_DOWN : 4,
	CHIP_LEFT : 5,
	CHIP_RIGHT : 6,
	CHIP_UP : 7,
	CHIP : 8,
	CLEAR : 9,
	DASH : 10,
	ENEMY_BALL : 11,
	ENEMY_BOMB : 12,
	ENEMY_BUG : 13,
	ENEMY_FIREBALL : 14,
	ENEMY_GHOST : 15,
	ENEMY_TANK : 16,
	FIRE_BOOTS : 17,
	FIRE : 18,
	FIREBALL_GENERATOR : 19,
	FLIPPERS : 20,
	FLOOR_MUD : 21,
	FLOOR_NORMAL : 22,
	GATE_GOAL : 23,
	GATE : 24,
	GOAL : 25,
	HELP : 26,
	ICE_CENTER : 27,
	ICE_CORNER : 28,
	ICE_SKATES : 29,
	KEY : 30,
	SPLASH : 31,
	SWITCH_ : 32,
	TELEPORTER : 33,
	TRAP : 34
};

var FileToSource = {
	'block_mud.png' : BLOCK_MUD,
	'block_normal.png' : BLOCK_NORMAL,
	'block_questionable.png' : BLOCK_QUESTIONABLE, 
	'block_switchable.png' : BLOCK_SWITCHABLE,
	'chip_down.png' : CHIP_DOWN,
	'chip_left.png' : CHIP_LEFT,
	'chip_right.png' : CHIP_RIGHT,
	'chip_up.png' : CHIP_UP,
	'chip.png' : CHIP,
	'clear.png' : CLEAR,
	'dash.png' : DASH,
	'enemy_ball.png' : ENEMY_BALL,
	'enemy_bomb.png' : ENEMY_BOMB,
	'enemy_bug.png' : ENEMY_BUG,
	'enemy_fireball.png' : ENEMY_FIREBALL,
	'enemy_ghost.png' : ENEMY_GHOST,
	'enemy_tank.png' : ENEMY_TANK,
	'fire_boots.png' : FIRE_BOOTS,
	'fire.png' : FIRE,
	'fireball_generator.png' : FIREBALL_GENERATOR,
	'flippers.png' : FLIPPERS,
	'floor_mud.png' : FLOOR_MUD,
	'floor_normal.png' : FLOOR_NORMAL,
	'gate_goal.png' : GATE_GOAL,
	'gate.png' : GATE,
	'goal.png' : GOAL,
	'help.png' : HELP,
	'ice_center.png' : ICE_CENTER,
	'ice_corner.png' : ICE_CORNER,
	'ice_skates.png' : ICE_SKATES,
	'key.png' : KEY,
	'splash.png' : SPLASH,
	'switch.png' : SWITCH_,
	'teleporter.png' : TELEPORTER,
	'trap.png' : TRAP,
};

var Floors = new Array(
	BLOCK_MUD,
	BLOCK_NORMAL,
	BLOCK_QUESTIONABLE,
	BLOCK_SWITCHABLE,
	CLEAR,
	DASH,
	FIRE,
	FIREBALL_GENERATOR,
	FLOOR_MUD,
	FLOOR_NORMAL,
	GOAL,
	HELP,
	ICE_CENTER,
	ICE_CORNER,
	SPLASH,
	SWITCH_,
	TELEPORTER,
	TRAP
);

var Items = new Array(
	CHIP_DOWN,
	CHIP_LEFT,
	CHIP_RIGHT,
	CHIP_UP,
	CHIP,
	ENEMY_BALL,
	ENEMY_BOMB,
	ENEMY_BUG,
	ENEMY_FIREBALL,
	ENEMY_GHOST,
	ENEMY_TANK,
	FIRE_BOOTS,
	FLIPPERS,
	GATE_GOAL,
	GATE,
	ICE_SKATES,
	KEY
);


// Objects.
function Item() {
	this.orientation = Orientation.UP;
	this.color;
	this.source;
	this.type;
}

function Tile() {
	this.source = Source.FLOOR_NORMAL;
	this.items = new Array();
	this.effect_target = []; // map location of effect
}


// On load.
$(document).ready(function() {
    generate_map();
    configure_tiles();
});


// Methods.
function generate_map() {
    var default_tile = 'images/tiles/floor_normal.png';
    var map = '<!--<div style="height:'+viewport_width+'; width:'+viewport_width+'; overflow:auto;">--><table id="map">';
    for (var i=0; i < rows; i++) {
        map += '<tr>';
        for (var j=0; j < cols; j++) {
            map += '<td class="map_tile"><img src="' + default_tile + '"/></td>';
        }
        map += '</tr>';
    }
    map += '</table><!--</div>-->';
    $('body').prepend(map);
}

function configure_tiles() {
    $(".tile").draggable({
        helper: 'clone',
        cursorAt: {left: tile_width/2, top: tile_width/2}
    });

    $(".map_tile").droppable({
        drop: function(event, ui) {
            var dragged_tile_src = $(ui.draggable).children(':first').attr('src');
            var map_tile = $(this).children(':first');
            map_tile.attr('src', dragged_tile_src);
            //console.log(map_tile);
        }
    });
}

function save_map() {
}

/*
var canvas = document.getElementById("map_output");
var context = canvas.getContext('2d');
canvas.width = cols * tile_width;
canvas.height = rows * tile_width; 

$('#map td').each(function() {
	var col = $(this).parent().children().index($(this));
	var row = $(this).parent().parent().children().index($(this).parent());
	var img = new Image();
	img.src = $(this).find("img").attr("src");
	context.drawImage(img, col*tile_width, row*tile_width);
});
Canvas2Image.saveAsPNG(canvas);
*/
