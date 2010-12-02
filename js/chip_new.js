
var MapEditorGUI = function(map_editor_param) {
    var TILE_COL_LIMIT = 10;

    var map_editor = map_editor_param;

    var bindWidgets = function() {
        $('#new_map').bind('click', function() {
            // TODO: load_map(m);
        });

        $('#load_map').bind('click', function() {
            var map_name = $('#map_list option:selected').val();
            // TODO: load_map(m, map_name);
        });
    }

    this.loadMaps = function() {
        var map_list = $('#map_list');
        var maps = map_editor.getMaps();
        for (var key in maps) {
            if (maps.hasOwnProperty(key)) {
                var map = maps[key];
                var map_name = map.getName();

                var option = $('<option></option>');
                option.text(map_name);
                option.val(map_name);

                map_list.append(option);
            }
        }
    }

    this.loadTiles = function() {
        var tiles = map_editor.getTiles();
        for (var i=0; i < tiles.length; i++) {
            var tile = tiles[i];

            if (i % TILE_COL_LIMIT == 0 && i > 0) {
                $('#tile_section').append('<br />');
            }
            var tile_div = $('<div></div>');
            tile_div.attr('class', 'tile');

            var tile_img = $('<img />');
            tile_img.attr('src', tile);
            tile_div.append(tile_img);

            $('#tile_section').append(tile_div);
        }
        makeTilesDragAndDrop();
    }

    var makeTilesDragAndDrop = function() {
        var tile_width = map_editor.getTileWidth();

        $(".tile").draggable({
            helper: 'clone',
            cursorAt: {
                left: tile_width/2,
                top: tile_width/2
            }
        });

        $('#map_section').droppable({
            drop: function(evt, ui) {
                // TODO:
                /*
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
                */
            }
        });
    }

    var init = function() {
        bindWidgets();
    }
    init();
}

var MapEditor = function() {
    var TILE_WIDTH, TILE_HEIGHT;

    var maps = new Array();
    var tiles = new Array();

    var importMap = function(mapJSON) {
        return new Map( JSON.parse(mapJSON) );
    }

    var loadMaps = function() {
        $.ajax({
            type: 'GET',
            url: 'php/mapeditor.php?action=load_maps',
            dataType: 'json',
            success: function(data) {
                for (var i=0; i < data.length; i++) {
                    var map_data = data[i];
                    if (map_data == null) {
                        continue;
                    }
                    var map = importMap(map_data);
                    var map_name = map.getName();
                    maps[map_name] = map;
                }
            },
            data: {},
            async: false
        });
    }

    var getTileDimensions = function() {
        $.ajax({
            type: 'GET',
            url: 'php/mapeditor.php?action=get_tile_dimensions',
            dataType: 'json',
            success: function(data) {
                TILE_WIDTH = data[0];
                TILE_HEIGHT = data[1];
            },
            data: {},
            async: false
        });
    }

    var loadTiles = function() {
        $.ajax({
            type: 'GET',
            url: 'php/mapeditor.php?action=load_tiles',
            dataType: 'json',
            success: function(data) {
                for (var i=0; i < data.length; i++) {
                    var tile_data = data[i];
                    if (tile_data == null) {
                        continue;
                    }
                    tiles.push(tile_data);
                }
            },
            data: {},
            async: false
        });
    }

    this.getMaps = function() {
        return maps;
    }

    this.getMap = function(map_name) {
        return maps[map_name];
    }

    this.getTiles = function() {
        return tiles;
    }

    this.getTileWidth = function() {
        return TILE_WIDTH;
    }

    this.getTileHeight = function() {
        return TILE_HEIGHT;
    }

    var init = function() {
        loadMaps();
        getTileDimensions();
        loadTiles();
    }
    init();
};

var Map = function(model_param) {
    var model = model_param;

    this.getTotalChips = function() {
        return model['chips'];
    }

    this.getData = function() {
        return model['data'];
    }

    this.getGoal = function() {
        return model['goal_position'];
    }

    this.getLevelNumber = function() {
        return model['level_number'];
    }

    this.getName = function() {
        return model['name'];
    }

    this.getPassword = function() {
        return model['password'];
    }

    this.getStart = function() {
        return model['start_position'];
    }

    this.getMaxTime = function() {
        return model['time'];
    }

    this.getExport = function() {
        return JSON.stringify(model);
    }

    var generate = function() {
        model = {};
        model['name'] = 'default';
        model['chips'] = 5;
        // TODO: FINISH
    }

    var init = function() {
        if (model == undefined) {
            generate();
        }
    }
    init();
};

