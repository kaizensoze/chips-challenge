
var m;

/* Map. */
function Map() {
	this.data = [];
    this.tile_width = 32;

	this.level_number;
	this.time;
	this.chips_left;
}

/* Chip. */
function Chip() {
	this.inventory = new Array();
}

/* Enums. */
var Orientation = {
	UP : 0,
	LEFT : 270,
	DOWN : 180,
	RIGHT : 90
};

var Color = {
	RED :    '#FF0000',
	BLUE :   '#00FFFF',
	GREEN :  '#00FF00',
	YELLOW : '#FFFF00',
	DBLUE :  '#0000FF',
	BROWN :  '#808000'
};

var ItemType = {
	ENEMY: 0,
	INVENTORY: 1,
	CHIP: 2 // The item, not the protagonist.
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
	DASH_BOOTS : 35,
	BALL : 11,
	BOMB : 12,
	BUG : 13,
	FIREBALL : 14,
	GHOST : 15,
	TANK : 16,
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
	'block_mud.png' : Source.BLOCK_MUD,
	'block_normal.png' : Source.BLOCK_NORMAL,
	'block_questionable.png' : Source.BLOCK_QUESTIONABLE, 
	'block_switchable.png' : Source.BLOCK_SWITCHABLE,
	'chip_down.png' : Source.CHIP_DOWN,
	'chip_left.png' : Source.CHIP_LEFT,
	'chip_right.png' : Source.CHIP_RIGHT,
	'chip_up.png' : Source.CHIP_UP,
	'chip.png' : Source.CHIP,
	'clear.png' : Source.CLEAR,
	'dash.png' : Source.DASH,
	'dash_boots.png' : Source.DASH_BOOTS,
	'ball.png' : Source.BALL,
	'bomb.png' : Source.BOMB,
	'bug.png' : Source.BUG,
	'fireball.png' : Source.FIREBALL,
	'ghost.png' : Source.GHOST,
	'tank.png' : Source.TANK,
	'fire_boots.png' : Source.FIRE_BOOTS,
	'fire.png' : Source.FIRE,
	'fireball_generator.png' : Source.FIREBALL_GENERATOR,
	'flippers.png' : Source.FLIPPERS,
	'floor_mud.png' : Source.FLOOR_MUD,
	'floor_normal.png' : Source.FLOOR_NORMAL,
	'gate_goal.png' : Source.GATE_GOAL,
	'gate.png' : Source.GATE,
	'goal.png' : Source.GOAL,
	'help.png' : Source.HELP,
	'ice_center.png' : Source.ICE_CENTER,
	'ice_corner.png' : Source.ICE_CORNER,
	'ice_skates.png' : Source.ICE_SKATES,
	'key.png' : Source.KEY,
	'splash.png' : Source.SPLASH,
	'switch.png' : Source.SWITCH_,
	'teleporter.png' : Source.TELEPORTER,
	'trap.png' : Source.TRAP,
};

var Floors = new Array(
	Source.BLOCK_MUD,
	Source.BLOCK_NORMAL,
	Source.BLOCK_QUESTIONABLE,
	Source.BLOCK_SWITCHABLE,
	Source.CLEAR,
	Source.DASH,
	Source.FIRE,
	Source.FIREBALL_GENERATOR,
	Source.FLOOR_MUD,
	Source.FLOOR_NORMAL,
	Source.GOAL,
	Source.HELP,
	Source.ICE_CENTER,
	Source.ICE_CORNER,
	Source.SPLASH,
	Source.SWITCH_,
	Source.TELEPORTER,
	Source.TRAP
);

var Items = new Array(
	Source.CHIP_DOWN,
	Source.CHIP_LEFT,
	Source.CHIP_RIGHT,
	Source.CHIP_UP,
	Source.CHIP,
	Source.DASH_BOOTS,
	Source.BALL,
	Source.BOMB,
	Source.BUG,
	Source.FIREBALL,
	Source.GHOST,
	Source.TANK,
	Source.FIRE_BOOTS,
	Source.FLIPPERS,
	Source.GATE_GOAL,
	Source.GATE,
	Source.ICE_SKATES,
	Source.KEY
);

var InventoryItems = new Array(
	Source.DASH_BOOTS,
	Source.FIRE_BOOTS,
	Source.FLIPPERS,
	Source.ICE_SKATES,
	Source.KEY
)

var Enemies = new Array(
	Source.BALL,
	Source.BOMB,
	Source.BUG,
	Source.FIREBALL,
	Source.GHOST,
	Source.TANK
);

/* Objects. */
function Item() {
	this.orientation = Orientation.UP;
	this.color;
	this.source;
	this.type;
}

function Tile() {
	this.source = Source.FLOOR_NORMAL;
	this.items = new Array();
}


$(document).ready(function() {
	m = new Map();
	var map = $("#map");
    var ctx = map[0].getContext('2d');
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.strokeRect(0, 0, m.tile_width, m.tile_width);
    configure(m, ctx);
    show_maps();
});


/* Methods. */
function configure(m, ctx) {
	for (var color in Color) {
		$('#color').append($("<option></option>").attr("value", color).text(color));
	}
	$('#color').prepend($("<option></option>").attr("value", "").text(""));

	for (var orientation in Orientation) {
		$('#orientation').append($("<option></option>").attr("value", orientation).text(orientation));
	}

    $(".tile").draggable({
        helper: 'clone',
        cursorAt: {left: m.tile_width/2, top: m.tile_width/2}
    });

    $("#map").droppable({
        drop: function(event, ui) {
			var top = ui.position.top;
			var left = ui.position.left;
			var map_tile_top = Math.floor(top / m.tile_width);
			var map_tile_left = Math.floor(left / m.tile_width);

            var dragged_tile_src = $(ui.draggable).children(':first').attr('src');
			var img = new Image();
			img.src = dragged_tile_src;

			src_filename = img.src.split("/").pop();
			src_input = FileToSource[src_filename];

			/* Configure tile. */
			var t;
			if (m.data[map_tile_top] && m.data[map_tile_top][map_tile_left]) {
				t = m.data[map_tile_top][map_tile_left];
			} else {
				t = new Tile();
			}

			/* Read item[/floor] configuration. */
			orientation_input = $('#orientation').val().toUpperCase();
			orientation = Orientation[orientation_input];

			color_input = $('#color').val().toUpperCase();
			color = Color[color_input];

			if ($.inArray(src_input, Floors) != -1) {
				/* Set floor. */
				t.source = src_input;
			} else {
				/* Configure and add item to tile. */
				i = new Item();
				i.orientation = orientation;
				i.color = color;
				i.source = src_input;
				if ($.inArray(src_input, Enemies) != -1) {
					i.type = ItemType.ENEMY;
				} else if ($.inArray(src_input, InventoryItems) != -1) {
					i.type = ItemType.INVENTORY;
				} else if (src_input == Source.CHIP) {
					i.type = ItemType.CHIP;
				}

				t.items.push(i);
			}

            ctx.save();

			/* Rotate. */
            translate_x = map_tile_left * m.tile_width + m.tile_width/2;
            translate_y = map_tile_top * m.tile_width + m.tile_width/2;

			ctx.translate(translate_x, translate_y);
			ctx.rotate(orientation * Math.PI / 180);

			/* Color. */
			var go_color = false;
			for (var color_check in Color) {
				if (color == Color[color_check]) {
					go_color = true;
					ctx.fillStyle = color;
				}
			}

			if (src_input == Source.KEY) {
				base_x = map_tile_left * m.tile_width;
				base_y = map_tile_top * m.tile_width;

				ctx.beginPath();
				ctx.moveTo(base_x+16-translate_x, base_y+16-translate_y);
				ctx.lineTo(base_x+26-translate_x, base_y+23-translate_y);
				ctx.lineTo(base_x+26-translate_x, base_y+26-translate_y);
				ctx.lineTo(base_x+23-translate_x, base_y+26-translate_y);
				ctx.lineTo(base_x+14-translate_x, base_y+17-translate_y);
				ctx.closePath();
				if (go_color) {
					ctx.fill();
				}

				ctx.beginPath();
				ctx.moveTo(base_x+20-translate_x, base_y+23-translate_y);
				ctx.lineTo(base_x+23-translate_x, base_y+20-translate_y);
				ctx.lineTo(base_x+25-translate_x, base_y+22-translate_y);
				ctx.lineTo(base_x+22-translate_x, base_y+24-translate_y);
				ctx.closePath();
				if (go_color) {
					ctx.fill();
				}

				// ring
				ctx.beginPath();
				ctx.moveTo(base_x+13-translate_x, base_y+14-translate_y);
				ctx.lineTo(base_x+16-translate_x, base_y+14-translate_y);
				ctx.lineTo(base_x+16-translate_x, base_y+17-translate_y);
				ctx.lineTo(base_x+13-translate_x, base_y+17-translate_y);
				ctx.closePath();
				if (go_color) {
					ctx.fill();
				}
				ctx.beginPath();
				ctx.moveTo(base_x+14-translate_x, base_y+9-translate_y);
				ctx.lineTo(base_x+17-translate_x, base_y+9-translate_y);
				ctx.lineTo(base_x+17-translate_x, base_y+15-translate_y);
				ctx.lineTo(base_x+14-translate_x, base_y+15-translate_y);
				ctx.closePath();
				if (go_color) {
					ctx.fill();
				}
				ctx.beginPath();
				ctx.moveTo(base_x+8-translate_x, base_y+7-translate_y);
				ctx.lineTo(base_x+15-translate_x, base_y+7-translate_y);
				ctx.lineTo(base_x+15-translate_x, base_y+10-translate_y);
				ctx.lineTo(base_x+8-translate_x, base_y+10-translate_y);
				ctx.closePath();
				if (go_color) {
					ctx.fill();
				}
				ctx.beginPath();
				ctx.moveTo(base_x+6-translate_x, base_y+9-translate_y);
				ctx.lineTo(base_x+9-translate_x, base_y+9-translate_y);
				ctx.lineTo(base_x+9-translate_x, base_y+15-translate_y);
				ctx.lineTo(base_x+6-translate_x, base_y+15-translate_y);
				ctx.closePath();
				if (go_color) {
					ctx.fill();
				}
				ctx.beginPath();
				ctx.moveTo(base_x+7-translate_x, base_y+15-translate_y);
				ctx.lineTo(base_x+13-translate_x, base_y+15-translate_y);
				ctx.lineTo(base_x+13-translate_x, base_y+18-translate_y);
				ctx.lineTo(base_x+7-translate_x, base_y+18-translate_y);
				ctx.closePath();
				if (go_color) {
					ctx.fill();
				}
			} else {
				if (go_color) {
					ctx.fillRect(map_tile_left * m.tile_width - translate_x, map_tile_top * m.tile_width - translate_y, m.tile_width, m.tile_width);
				}
			}

			ctx.drawImage(img, -m.tile_width/2, -m.tile_width/2, m.tile_width, m.tile_width);

			ctx.restore();

			if (!m.data[map_tile_top]) {
				m.data[map_tile_top] = [];
			}
			m.data[map_tile_top][map_tile_left] = t;
        }
    });
}

function show_maps() {
    $.getJSON('http://localhost/chip/php/chip.php?action=show_maps', function(res) {
        console.log(res);
        var list = '<ul>';
        for (var i in res) {
            var searchResult = res[i];
            alert(searchResult);
        }
        */
    });
}

function save_map(overwrite) {
    var dataString = JSON.stringify(m);
    var level_number = $('#level_number').val();
    m.level_number = level_number;
    $.post('http://localhost/chip/php/chip.php', {action: 'save_map', map: dataString, level: m.level_number, overwrite: overwrite},
            function(res) {
                if (res.indexOf('exists') != -1) {
                    if (confirm("Map already exists. Overwrite?")) {
                        save_map(1);
                    }
                }
            }
    );
}

function load_map() {
}
