
var map;
var game_data;

$(document).ready(function() {
    init_map();
    sync_canvas_stuff();
    load_config_options();
    show_tiles();
    set_editor_event_handlers();
    show_maps();
});

$(window).load(function() {
    // need to call this again in window.load to wait for all images to load to draw default tiles on canvas
    init_map(); 
});

function init_map() {
    var canvas = document.getElementById('map');

    map = new Map();
    var position;
    for (var top_i=0; top_i < canvas.height/tile_width; top_i++) {
        map.data[top_i] = [];
        for (var left_i=0; left_i < canvas.width/tile_width; left_i++) {
            position = new Position(top_i, left_i);
            add_tile_part(position, tile_path + 'floor_normal.png', 'UP', '');
        }
    }
}

function set_editor_event_handlers() {
    $(".tile").draggable({
        helper: 'clone',
        cursorAt: {left: tile_width/2, top: tile_width/2}
    });

    $('#map_region').droppable({
        drop: function(evt, ui) {
            var map_region = $('#map_region');
            var map_region_top = map_region.position().top;
            var map_region_left = map_region.position().left;
            var map_region_border_width = parseInt(map_region.css('borderLeftWidth'));
 
			var top = ui.position.top - map_region_top + tile_width/2 - map_region_border_width;
			var left = ui.position.left - map_region_left + tile_width/2 - map_region_border_width;

            var canvas = document.getElementById('map');

            var map_width = canvas.width;
            var map_height = canvas.height;

			var map_tile_top = Math.floor(top / tile_width);
			var map_tile_left = Math.floor(left / tile_width);

            var dragged_tile_src = $(ui.draggable).children(':first').attr('src');

            var orientation_input = orientation_input = $('#orientation').val().toUpperCase();
            var color_input = color_input = $('#color').val().toUpperCase();

            var src_filename = dragged_tile_src.split("/").pop();
            var src_input = FileToSource[src_filename];

            var position;
            if (left > map_width || left < 0 || top > map_height || top < 0) {
                if (left < 0) {
                    map_tile_left = 0;
                }
                if (top < 0) {
                    map_tile_top = 0;
                }
                position = new Position(top, left);
                expand_map(position);
            }

            position = new Position(map_tile_top, map_tile_left);
            if (src_input == Source.CLEAR_TILE) {
                clear_tile(position);
            } else {
                add_tile_part(position, dragged_tile_src, orientation_input, color_input);
            }
        }
    });

    $('#button_save_map').click(function() {
        save_map(0);
    });
    $('#button_play_map').click(function() {
        play_map();
    });

}

function set_play_event_handlers() {
    $(document).keydown(function(evt) {
        var key = evt.which;
        switch (key) {
            case 37: move(Direction.LEFT); break;  // Left
            case 38: move(Direction.UP); break;  // Up
            case 39: move(Direction.RIGHT); break;  // Right
            case 40: move(Direction.DOWN); break;  // Down
            default: return false;
        }
        evt.preventDefault();
    });
}

function add_tile_part(position, tile_src, orientation_input, color_input) {
    var map_tile_top = position.top;
    var map_tile_left = position.left;

    var orientation = Orientation[orientation_input];
    var color = Color[color_input];

    var src_filename = tile_src.split("/").pop();
    var src_input = FileToSource[src_filename];

    var tile;
    if (map.data[map_tile_top] && map.data[map_tile_top][map_tile_left]) {
        tile = map.data[map_tile_top][map_tile_left];
    } else {
        tile = new Tile();
    }

    var item;
    if ($.inArray(src_input, Floors) != -1) {
        tile.source = src_filename;  // floor
    } else if ($.inArray(src_input, Items) != -1) {
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

        if ($('#map_region').is(':visible')) {
            // if chip is placed on map, set the start position
            if ($.inArray(src_input, ChipPoses) != -1) {
                // maintain a max of only 1 chip for given map
                if (map.start_position) {
                    alert("There can be only one chip!");
                    return;
                }
                map.start_position = new Position(map_tile_top, map_tile_left);
            }

            // if goal is placed on map, set the goal position
            if (src_input == Source.GOAL) {
                // maintain a max of only 1 goal for given map
                if (map.goal_position) {
                    alert("There can be only one goal!");
                    return;
                }
                map.goal_position = new Position(map_tile_top, map_tile_left);
            }
        }

        tile.items.push(item);
    }

    if (!map.data[map_tile_top]) {
        map.data[map_tile_top] = [];
    }
    map.data[map_tile_top][map_tile_left] = tile;

    draw_tile_part(position, tile_src, orientation_input, color_input);
}

function expand_map(position) {
    var top = position.top;
    var left = position.left;

    var canvas = document.getElementById('map');
    var ctx = canvas.getContext('2d');

    var temp = document.getElementById('temp');
    var temp_ctx = temp.getContext('2d');

    var map_width = canvas.width;
    var map_height = canvas.height;

    var div_width = $('#map_region').width();
    var div_height = $('#map_region').height();

    var map_tile_left = Math.floor(left / tile_width);
    var map_tile_top = Math.floor(top / tile_width);

    if (left < 0 || left > map_width) {
        // resize temp
        $('#temp_region').width(div_width + tile_width);
        temp.width = map_width + tile_width;

        // copy canvas to temp before resize (necessary for both < 0 and > max cases)
        temp_ctx.drawImage(canvas, 0, 0, map_width, map_height, 0, 0, map_width, map_height);

        // resize
        $('#map_region').width(div_width + tile_width);  // add col to div
        canvas.width = map_width + tile_width;  // add col to canvas

        if (left > map_width) {
            ctx.drawImage(temp, 0, 0, map_width, map_height, 0, 0, map_width, map_height);
            // add new prefilled col
            var position;
            for (var top_i=0; top_i < canvas.height/tile_width; top_i++) {
                position = new Position(top_i, (canvas.width/tile_width)-1);
                add_tile_part(position, tile_path + 'floor_normal.png', 'UP', '');
            }
        }

        if (left < 0) {
            // shift everything right one tile
            sx = 0;
            sy = 0;
            s_width = map_width;
            s_height = map_height;
            dx = tile_width;
            dy = 0;
            d_width = s_width;
            d_height = s_height;

            ctx.drawImage(temp, 0, 0, map_width, map_height, 0, 0, map_width, map_height);
            ctx.clearRect(0, 0, tile_width, map_height);  // clear col
            ctx.drawImage(temp, sx, sy, s_width, s_height, dx, dy, d_width, d_height);

            // update map data structure as result of shift
            for (var top_i=(canvas.height/tile_width)-1; top_i >= 0; top_i--) {
                for (var left_i=(canvas.width/tile_width)-1; left_i > 0; left_i--) {
                    var tile_to_be_shifted = map.data[top_i][left_i-1];
                    map.data[top_i][left_i] = tile_to_be_shifted;

                    // update map's unique tiles if they're being affected by shift
                    var position_to_shift = new Position(top_i, left_i-1);
                    var position = new Position(top_i, left_i);

                    // start position
                    if (map.start_position && equals(map.start_position, position_to_shift)) {
                        map.start_position = position;
                    }

                    // goal position
                    if (map.goal_position && equals(map.goal_position, position_to_shift)) {
                        map.goal_position = position;
                    }
                }
            }

            // add new prefilled col
            var position;
            for (var top_i=0; top_i < canvas.height/tile_width; top_i++) {
                position = new Position(top_i, 0);
                clear_tile(position);
            }
        }
    }

    if (top < 0 || top > map_height) {
        $('#temp_region').height(div_height + tile_width);
        temp.height = map_height + tile_width;

        // copy canvas to temp before resize (necessary for both < 0 and > max cases)
        temp_ctx.drawImage(canvas, 0, 0, map_width, map_height, 0, 0, map_width, map_height);

        // resize
        $('#map_region').height(div_height + tile_width);  // add col to div
        canvas.height = map_height + tile_width;  // add col to canvas

        // add new row to map data structure if necessary
        if (!map.data[(canvas.height/tile_width)-1]) {
            map.data[(canvas.height/tile_width)-1] = [];
        }

        if (top > map_height) {
            ctx.drawImage(temp, 0, 0, map_width, map_height, 0, 0, map_width, map_height);
            // add new prefilled row
            var position;
            for (var left_i=0; left_i < canvas.width/tile_width; left_i++) {
                position = new Position((canvas.height/tile_width)-1, left_i);
                add_tile_part(position, tile_path + 'floor_normal.png', 'UP', '');
            }
        }

        if (top < 0) {
            // shift everything down one tile
            sx = 0
            sy = 0;
            s_width = map_width;
            s_height = map_height;
            dx = 0;
            dy = tile_width;
            d_width = s_width;
            d_height = s_height;

            ctx.drawImage(temp, 0, 0, map_width, map_height, 0, 0, map_width, map_height);
            ctx.clearRect(0, 0, map_width, tile_width);  // clear row
            ctx.drawImage(temp, sx, sy, s_width, s_height, dx, dy, d_width, d_height);

            // update map data structure as result of shift
            for (var top_i=(canvas.height/tile_width)-1; top_i > 0; top_i--) {
                for (var left_i=(canvas.width/tile_width)-1; left_i >= 0; left_i--) {
                    var tile_to_be_shifted = map.data[top_i-1][left_i];
                    map.data[top_i][left_i] = tile_to_be_shifted;

                    // update map's unique tiles if they're being affected by shift
                    var position_to_shift = new Position(top_i-1, left_i);
                    var position = new Position(top_i, left_i);

                    // start position
                    if (map.start_position && equals(map.start_position, position_to_shift)) {
                        map.start_position = position;
                    }

                    // goal position
                    if (map.goal_position && equals(map.goal_position, position_to_shift)) {
                        map.goal_position = position;
                    }
                }
            }

            // add new prefilled row
            var position;
            for (var left_i=0; left_i < canvas.width/tile_width; left_i++) {
                position = new Position(0, left_i);
                clear_tile(position);
            }
        }
    }

    if (left > map_width && top > map_height) {
        ctx.drawImage(temp, 0, 0, map_width, map_height, 0, 0, map_width, map_height);
        // add new prefilled col
        var position;
        for (var top_i=0; top_i < canvas.height/tile_width; top_i++) {
            position = new Position(top_i, (canvas.width/tile_width)-1);
            add_tile_part(position, tile_path + 'floor_normal.png', 'UP', '');
        }

        ctx.drawImage(temp, 0, 0, map_width, map_height, 0, 0, map_width, map_height);
        // add new prefilled row
        var position;
        for (var left_i=0; left_i < canvas.width/tile_width; left_i++) {
            position = new Position((canvas.height/tile_width)-1, left_i);
            add_tile_part(position, tile_path + 'floor_normal.png', 'UP', '');
        }
    }
}

function draw_tile_part(position, tile_src, orientation_input, color_input) {
    var map_tile_top = position.top;
    var map_tile_left = position.left;

    var canvas = document.getElementById('map');
    var ctx = canvas.getContext('2d');

    var src_filename = tile_src.split("/").pop();
    var src_input = FileToSource[src_filename];

    var orientation = Orientation[orientation_input];
    var color = Color[color_input];
    
    ctx.save();

    /* Rotate. */
    var translate_x = map_tile_left * tile_width + tile_width/2;
    var translate_y = map_tile_top * tile_width + tile_width/2;

    ctx.translate(translate_x, translate_y);
    ctx.rotate(orientation * Math.PI / 180);

    /* Color. */
    if (color) {
        ctx.fillStyle = color;
        if (src_input == Source.KEY) {
            var base_x = map_tile_left * tile_width;
            var base_y = map_tile_top * tile_width;

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

function draw_tile(position, tile) {
    if (!tile) {
        return;
    }

    draw_tile_part(position, tile_path + tile.source, 'UP', '');
    for (var i=0; i < tile.items.length; i++) {
        item = tile.items[i];
        draw_tile_part(position, tile_path + item.source, item.orientation, item.color);
    }
}

function clear_tile(position) {
	var canvas = document.getElementById('map');
    var ctx = canvas.getContext('2d');

    var top = position.top;
    var left = position.left;

	ctx.clearRect(left * tile_width, top * tile_width, tile_width, tile_width);
    tile = map.data[top][left];

    // if tile being cleared contains one of map's unique tiles/attributes, set to null
    var source;
    for (var i=0; i < tile.items.length; i++) {
        item = tile.items[i];
        source = FileToSource[item.source];

        // start position
        if ($.inArray(source, ChipPoses) != -1) {
            map.start_position = null;
        }

        // goal position
        if (source == Source.GOAL) {
            map.goal_position = null;
        }
    }
    map.data[top][left] = null;
    add_tile_part(position, tile_path + 'floor_normal.png', 'UP', '');
}

function sync_canvas_stuff() {
    var default_map_colsrows = 9;

    var proper_width, proper_height;
    if (map) {
        proper_width = map.data[0].length * tile_width;
        proper_height = map.data.length * tile_width;
    } else {
        proper_width = default_map_colsrows * tile_width;
        proper_height = default_map_colsrows * tile_width;
    }

    // update canvas size to reflect underlying data structure
    var canvas = document.getElementById('map');
    var canvas_ctx = canvas.getContext('2d');
    var temp = document.getElementById('temp');
    var temp_ctx = temp.getContext('2d');

    // resize temp canvas
    temp.width = proper_width;
    temp.height = proper_height;

    // copy canvas to temp, resize canvas, copy temp back to canvas
    temp_ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, proper_width, proper_height);
    canvas.width = proper_width;
    canvas.height = proper_height;
    canvas_ctx.drawImage(temp, 0, 0, proper_width, proper_height, 0, 0, proper_width, proper_height);

    // store the updated width, height into variables
    var map_width = canvas.width;
    var map_height = canvas.height;

    // fit map div to map canvas
    var map_region = $('#map_region');
    map_region.width(map_width);
    map_region.height(map_height);

    // fit temp div to temp canvas
    var temp_region = $('#temp_region');
    temp_region.width(map_width);
    temp_region.height(map_height);
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

function show_tiles() {
    $.ajax({
        url: 'php/chip.php?action=show_tiles',
        async: false,
        success: function(res) {
            var col_limit = 10;
            var i = 0;
            $('#tile_section').html(res);
        }
    });
}

function show_maps() {
    $.getJSON('php/chip.php?action=show_maps', function(res) {
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
    var level_number = $('#level_number').val();
    var chips = $('#chips').val();
    var time = $('#time').val();
    var password = $('#password').val();

    map.level_number = level_number;
    map.chips = chips;
    map.time = time;
    map.password = password;

    var dataString = JSON.stringify(map);

    $.post('php/chip.php', {action: 'save_map', map: dataString, level: map.level_number, overwrite: overwrite},
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
    $.getJSON('php/chip.php?action=load_map&map='+escape(map_to_load), function(res) {
        var loaded_map = res;
        map = JSON.parse(loaded_map);

        $('#level_number').val(map.level_number);
        $('#chips').val(map.chips);
        $('#time').val(map.time);
        $('#password').val(map.password);

        sync_canvas_stuff();
        draw_map(map);
    });
}

// go to given level
function goto_level(level) {
    load_map(level);
    play_map();
}

function clear_map() {
    var canvas = document.getElementById('map');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw_map(loaded_map) {
    clear_map();

    var position;
    for (var top=0; top < map.data.length; top++) {
        for (var left=0; left < map.data[top].length; left++) {
            tile = map.data[top][left];
            position = new Position(top, left);
            draw_tile(position, tile);
        }
    }
}

function play_map() {
    sync_canvas_stuff();
    set_play_event_handlers();

    $('#map_region').hide();
    $('#temp_region').hide();

    $('#viewport').show();
    $('#viewport').focus();

    var canvas = document.getElementById('map');

    // pad map by 4 on all sides (to prevent viewport from showing out-of-bounds map region
    for (var i=0; i < 4; i++) {
        expand_map(new Position(0, -1)); // left
        expand_map(new Position(-1, 0));  // top
        expand_map(new Position(0, canvas.width + 1));  // right
        expand_map(new Position(canvas.height + 1, 0));  // down
    }

    game_data = new GameData(map);
    update_viewport();
}

function move(direction) {
    update_chip(direction);
    update_viewport();

    // check game outcome
    if (game_data.outcome) {
        alert(game_data.outcome_msg);

        switch (game_data.outcome) {
            case "DEAD":
                goto_level(map.level_number);
                break;
            case "LEVEL_COMPLETE":
                //goto_level(map.level_number + 1);
                break;
            default:
                alert("BLAH");
        }
    }
}

function update_chip(direction) {
    var chip = game_data.chip;
    var position_old = new Position(chip.position.top, chip.position.left);

    interact(direction);

    // remove chip from position he was at, redraw tile
    var old_tile = map.data[position_old.top][position_old.left];
    old_tile.items.pop();
    draw_tile(position_old, old_tile);

    // add updated chip to new position
    var position_new = new Position(chip.position.top, chip.position.left);
    add_tile_part(position_new, tile_path + DirectionToFile[direction], 'UP', '');
}

function interact(direction) {
    var chip = game_data.chip;
    var top, left;
    switch (direction) {
        case Direction.LEFT:
            left = chip.position.left - 1;
            top = chip.position.top;
            break;
        case Direction.UP:
            left = chip.position.left;
            top = chip.position.top - 1;
            break;
        case Direction.RIGHT: 
            left = chip.position.left + 1;
            top = chip.position.top;
            break;
        case Direction.DOWN:
            left = chip.position.left;
            top = chip.position.top + 1;
            break;
        default: return;
    }

    var tile_to_check;
    if (top > 0 && top < map.data.length && left > 0 && left < map.data[top].length) {  // check if in bounds
        tile_to_check = map.data[top][left];
    } else {
        return;
    }

    // iterate over items and see what [type] each one is
    items = tile_to_check.items;
    var items_to_remove = new Array();
    for (var item_index in items) {
        item = tile_to_check.items[item_index];
        item_source = FileToSource[item.source];

        // if inventory, add to chip's inventory and remove from tile
        if ($.inArray(item_source, InventoryItems) != -1) {
            chip.inventory.push(item);
            items_to_remove.push(item);
        }

        // if chip, chips_remaining--; if 0, remove goal gate
        if (item_source == Source.CHIP) {
            items_to_remove.push(item);
            game_data.chips_left--;
        }

        // if enemy, chip dies
        if ($.inArray(item_source, Enemies) != -1) {
            game_data.outcome = "DEAD";
            game_data.outcome_msg = "DEAD";
        }

        // if gate, check for key
        if (item_source == Source.GATE) {
            var gate_color = item.color;

            var has_key = false;
            var inventory = chip.inventory;
            for (var inventory_item_index in inventory) {
                inventory_item = inventory[inventory_item_index];
                if (FileToSource[inventory_item.source] == Source.KEY && inventory_item.color == gate_color) {
                    has_key = true;
                    items_to_remove.push(item);
                    inventory.splice(inventory.indexOf(inventory_item), 1);
                    break;
                }
            }
            if (!has_key) {
                return;
            }
        }

        // if help, show help msg
        if (item_source == Source.HELP) {
            // TODO: show help msg
        }

        // if obstacle that should prevent chip from moving
        if (item_source == Source.BLOCK_NORMAL) {
            return;
        }

        // if goal gate
        if (item_source == Source.GATE_GOAL) {
            if (game_data.chips_left > 0) {
                return;
            } else {
                // remove goal gate
                for (var item_index in items) {
                    var item = items[item_index];
                    if (FileToSource[item.source] == Source.GATE_GOAL) {
                        items_to_remove.push(item);
                    }
                }
            }
        }

        // TODO: if goal, advance to next level
        if (item_source == Source.GOAL) {
            game_data.outcome = "LEVEL_COMPLETE";
            game_data.outcome_msg = "LEVEL_COMPLETE";
        }
    }

    // remove whatever items were to be removed in the loop
    for (var i in items_to_remove) {
        items.splice(items.indexOf(items_to_remove[i]), 1);
    }

    // update the game tile
    map.data[top][left] = tile_to_check;

    var position = new Position(top, left);
    draw_tile(position, tile_to_check);

    // update chip's position
    chip.position = position;
}

function update_viewport() {
    var viewport = document.getElementById('viewport');
    var viewport_ctx = viewport.getContext('2d');
    var map_canvas = document.getElementById('map');
    var map_ctx = map_canvas.getContext('2d');

    sx = (game_data.chip.position.left - 4) * tile_width;
    sy = (game_data.chip.position.top - 4) * tile_width;
    s_width = viewport.width;
    s_height = viewport.height;
    d_width = s_width;
    d_height = s_height;

    viewport_ctx.drawImage(map_canvas, sx, sy, s_width, s_height, 0, 0, d_width, d_height);
}

