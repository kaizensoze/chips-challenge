
var map;

$(document).ready(function() {
    init_map();
    load_config_options();
    set_event_handlers();
    show_maps();
});

function init_map() {
	var map_canvas = $("#map");
    var ctx = map_canvas[0].getContext('2d');
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.strokeRect(0, 0, tile_width, tile_width);

	map = new Map();
}

function set_event_handlers() {
    $(".tile").draggable({
        helper: 'clone',
        cursorAt: {left: tile_width/2, top: tile_width/2}
    });

    $("#map").droppable({
        drop: function(event, ui) {
			var left = ui.position.left;
			var top = ui.position.top;

			var map_tile_left = Math.floor(left / tile_width);
			var map_tile_top = Math.floor(top / tile_width);

            var dragged_tile_src = $(ui.draggable).children(':first').attr('src');

            var orientation_input = orientation_input = $('#orientation').val().toUpperCase();
            var color_input = color_input = $('#color').val().toUpperCase();

            add_tile_part(map_tile_left, map_tile_top, dragged_tile_src, orientation_input, color_input);
            draw_tile_part(map_tile_left, map_tile_top, dragged_tile_src, orientation_input, color_input);
        }
    });
}

function add_tile_part(map_tile_left, map_tile_top, tile_src, orientation_input, color_input) {
    var orientation_input, orientation;
    var color_input, color;
    var src_filename, src_input;
    var tile, item;

    if (map.data[map_tile_top] && map.data[map_tile_top][map_tile_left]) {
        tile = map.data[map_tile_top][map_tile_left];
    } else {
        tile = new Tile();
    }

    orientation = Orientation[orientation_input];
    color = Color[color_input];

    src_filename = tile_src.split("/").pop();
    src_input = FileToSource[src_filename];

    if ($.inArray(src_input, Floors) != -1) {
        tile.source = src_filename;  // floor
    } else {
        item = new Item();  // item
        item.orientation = orientation_input;
        item.color = color_input;
        item.source = src_filename;
        if ($.inArray(src_input, Enemies) != -1) {
            item.type = ItemType.ENEMY;
        } else if ($.inArray(src_input, InventoryItems) != -1) {
            item.type = ItemType.INVENTORY;
        } else if (src_input == Source.CHIP) {
            item.type = ItemType.CHIP;
        }

        tile.items.push(item);
    }

    if (!map.data[map_tile_top]) {
        map.data[map_tile_top] = [];
    }
    map.data[map_tile_top][map_tile_left] = tile;
}

function draw_tile_part(map_tile_left, map_tile_top, tile_src, orientation_input, color_input) {
    var map_canvas = $("#map");
    var ctx = map_canvas[0].getContext('2d');

    var src_filename, src_input;
    var translate_x, translate_y;
    var base_x, base_y;

    src_filename = tile_src.split("/").pop();
    src_input = FileToSource[src_filename];

    orientation = Orientation[orientation_input];
    color = Color[color_input];
    
    ctx.save();

    /* Rotate. */
    translate_x = map_tile_left * tile_width + tile_width/2;
    translate_y = map_tile_top * tile_width + tile_width/2;

    ctx.translate(translate_x, translate_y);
    ctx.rotate(orientation * Math.PI / 180);

    /* Color. */
    if (color) {
        ctx.fillStyle = color;
        if (src_input == Source.KEY) {
            base_x = map_tile_left * tile_width;
            base_y = map_tile_top * tile_width;

            color_key(ctx, base_x, base_y, translate_x, translate_y);
        } else {
            ctx.fillRect(map_tile_left * tile_width - translate_x, map_tile_top * tile_width - translate_y, tile_width, tile_width);
        }
    }

    var img = new Image();
    img.src = tile_src;

    ctx.drawImage(img, -tile_width/2, -tile_width/2, tile_width, tile_width);
    ctx.restore();
}

function draw_tile(left, top, tile) {
    draw_tile_part(left, top, tile_path + tile.source);
    for (var i=0; i < tile.items.length; i++) {
        item = tile.items[i];
        draw_tile_part(left, top, tile_path + item.source, item.orientation, item.color);
    }
}

function load_config_options() {
	for (var color in Color) {
		$('#color').append($("<option></option>").attr("value", color).text(color));
	}
	$('#color').prepend($("<option></option>").attr("value", "").text(""));

	for (var orientation in Orientation) {
		$('#orientation').append($("<option></option>").attr("value", orientation).text(orientation));
	}
}

function color_key(ctx, base_x, base_y, translate_x, translate_y) {
    ctx.beginPath();
    ctx.moveTo(base_x+16-translate_x, base_y+16-translate_y);
    ctx.lineTo(base_x+26-translate_x, base_y+23-translate_y);
    ctx.lineTo(base_x+26-translate_x, base_y+26-translate_y);
    ctx.lineTo(base_x+23-translate_x, base_y+26-translate_y);
    ctx.lineTo(base_x+14-translate_x, base_y+17-translate_y);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(base_x+20-translate_x, base_y+23-translate_y);
    ctx.lineTo(base_x+23-translate_x, base_y+20-translate_y);
    ctx.lineTo(base_x+25-translate_x, base_y+22-translate_y);
    ctx.lineTo(base_x+22-translate_x, base_y+24-translate_y);
    ctx.closePath();
    ctx.fill();

    // ring
    ctx.beginPath();
    ctx.moveTo(base_x+13-translate_x, base_y+14-translate_y);
    ctx.lineTo(base_x+16-translate_x, base_y+14-translate_y);
    ctx.lineTo(base_x+16-translate_x, base_y+17-translate_y);
    ctx.lineTo(base_x+13-translate_x, base_y+17-translate_y);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(base_x+14-translate_x, base_y+9-translate_y);
    ctx.lineTo(base_x+17-translate_x, base_y+9-translate_y);
    ctx.lineTo(base_x+17-translate_x, base_y+15-translate_y);
    ctx.lineTo(base_x+14-translate_x, base_y+15-translate_y);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(base_x+8-translate_x, base_y+7-translate_y);
    ctx.lineTo(base_x+15-translate_x, base_y+7-translate_y);
    ctx.lineTo(base_x+15-translate_x, base_y+10-translate_y);
    ctx.lineTo(base_x+8-translate_x, base_y+10-translate_y);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(base_x+6-translate_x, base_y+9-translate_y);
    ctx.lineTo(base_x+9-translate_x, base_y+9-translate_y);
    ctx.lineTo(base_x+9-translate_x, base_y+15-translate_y);
    ctx.lineTo(base_x+6-translate_x, base_y+15-translate_y);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(base_x+7-translate_x, base_y+15-translate_y);
    ctx.lineTo(base_x+13-translate_x, base_y+15-translate_y);
    ctx.lineTo(base_x+13-translate_x, base_y+18-translate_y);
    ctx.lineTo(base_x+7-translate_x, base_y+18-translate_y);
    ctx.closePath();
    ctx.fill();
}

function show_maps() {
    $.getJSON('http://localhost/chip/php/chip.php?action=show_maps', function(res) {
        var list = '<ul>';
        for (var i in res) {
            var searchResult = res[i];
            var name = searchResult.split(".")[0];
            list += '<li><a href="" onclick="load_map('+name+'); return false;">' + name + '</a></li>';
        }
        list += '</ul>';
        $('#maps').append(list);
    });
}

function save_map(overwrite) {
    var dataString = JSON.stringify(map);
    var level_number = $('#level_number').val();
    map.level_number = level_number;
    $.post('http://localhost/chip/php/chip.php', {action: 'save_map', map: dataString, level: map.level_number, overwrite: overwrite},
            function(res) {
                if (res.indexOf('exists') != -1) {
                    if (confirm("Map already exists. Overwrite?")) {
                        save_map(1);
                    }
                }
            }
    );
}

function load_map(map_to_load) {
    $.getJSON('http://localhost/chip/php/chip.php?action=load_map&map='+escape(map_to_load), function(res) {
        var loaded_map = res;
        map = JSON.parse(loaded_map);
        draw_map(map);
    });
}

function draw_map(loaded_map) {
    var map_canvas = $("#map");
    var ctx = map_canvas[0].getContext('2d');
    
    for (var i=0; i < map.data.length; i++) {
        for (var j=0; j < map.data[i].length; j++) {
            tile = map.data[i][j];
            draw_tile(j, i, tile);
        }
    }
}

