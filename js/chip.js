
var map;

$(document).ready(function() {
    vals = init_map();
    map = vals[0];
    ctx = vals[1];
    configure(map, ctx);
    show_maps();
});


/* Methods. */
function init_map() {
	map = new Map();

	var map_canvas = $("#map");
    var ctx = map_canvas[0].getContext('2d');
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.strokeRect(0, 0, tile_width, tile_width);

    return [map, ctx];
}

function configure(map, ctx) {
    load_config_options();

    $(".tile").draggable({
        helper: 'clone',
        cursorAt: {left: tile_width/2, top: tile_width/2}
    });

    $("#map").droppable({
        drop: function(event, ui) {
			var top = ui.position.top;
			var left = ui.position.left;
			var map_tile_top = Math.floor(top / tile_width);
			var map_tile_left = Math.floor(left / tile_width);

            var dragged_tile_src = $(ui.draggable).children(':first').attr('src');
			var img = new Image();
			img.src = dragged_tile_src;

			src_filename = img.src.split("/").pop();
			src_input = FileToSource[src_filename];

			/* Configure tile. */
			var tile;
			if (map.data[map_tile_top] && map.data[map_tile_top][map_tile_left]) {
				tile = map.data[map_tile_top][map_tile_left];
			} else {
				tile = new Tile();
			}

			/* Read item[/floor] configuration. */
			orientation_input = $('#orientation').val().toUpperCase();
			orientation = Orientation[orientation_input];

			color_input = $('#color').val().toUpperCase();
			color = Color[color_input];

			if ($.inArray(src_input, Floors) != -1) {
				/* Set floor. */
				tile.source = src_input;
			} else {
				/* Configure and add item to tile. */
				item = new Item();
				item.orientation = orientation;
				item.color = color;
				item.source = src_input;
				if ($.inArray(src_input, Enemies) != -1) {
					item.type = ItemType.ENEMY;
				} else if ($.inArray(src_input, InventoryItems) != -1) {
					item.type = ItemType.INVENTORY;
				} else if (src_input == Source.CHIP) {
					item.type = ItemType.CHIP;
				}

				tile.items.push(item);
			}

            ctx.save();

			/* Rotate. */
            translate_x = map_tile_left * tile_width + tile_width/2;
            translate_y = map_tile_top * tile_width + tile_width/2;

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
				base_x = map_tile_left * tile_width;
				base_y = map_tile_top * tile_width;

                color_key(ctx, base_x, base_y, translate_x, translate_y, go_color);
			} else {
				if (go_color) {
					ctx.fillRect(map_tile_left * tile_width - translate_x, map_tile_top * tile_width - translate_y, tile_width, tile_width);
				}
			}

			ctx.drawImage(img, -tile_width/2, -tile_width/2, tile_width, tile_width);

			ctx.restore();

			if (!map.data[map_tile_top]) {
				map.data[map_tile_top] = [];
			}
			map.data[map_tile_top][map_tile_left] = tile;
        }
    });
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

function color_key(ctx, base_x, base_y, translate_x, translate_y, go_color) {
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
    console.log(loaded_map);
}
