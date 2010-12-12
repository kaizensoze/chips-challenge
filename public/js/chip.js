
var chip = (function($, chip) {
    // Utility functions.
    (function() {
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.substring(1);
        }

        String.prototype.unixHackerToCamelCase = function() {
            // ex: one_two_three -> oneTwoThree
            var result = '';
            var words = this.split('_');
            if (words.length == 1) {
                return this.toString();
            }

            result = result + words[0].toLowerCase();
            for (var i=1; i < words.length; i++) {
                result = result + words[i].capitalize();
            }
            return result;
        }

        String.prototype.isPseudoPrivate = function() {
            // ex: _blah
            return this.charAt(0) == '_';
        }

        String.prototype.isConstant = function() {
            // ex: CONSTANT_VARIABLE
            return this.replace(/_/g, '') == this.toUpperCase();
        }
    })();
    //console.log('_One_two_three'.unixHackerToCamelCase());

    // Generate getters/setters for all objects.
    var generateGetterSetterMethods = function(obj) {
        var props = {};
        var _this = new obj();
        for (var property in _this) {
            if (typeof _this[property] == 'function') {
                continue;
            }
            if (property.isPseudoPrivate() || property.isConstant()) {
                continue;
            }

            var cleanProperty = property.unixHackerToCamelCase().capitalize();
            (function(prop) {
                var property = prop;
                props['get' + cleanProperty] = function() {
                    return this[property];
                };
                props['set' + cleanProperty] = function(val) {
                    this[property] = val;
                };
            })(property);
        }
        $.extend(obj.prototype, props);
        delete _this;

        //console.log(obj.prototype);
    }

    // Orientation (Rotation)
    var Orientation = {
        UP: 0,
        RIGHT: 90,
        DOWN: 180,
        LEFT: -90
    };

    // Direction
    var Direction = {
        UP: 'up',
        RIGHT: 'right',
        DOWN: 'down',
        LEFT: 'left' 
    };

    // Color
    var Color = {
        RED:    '#FF0000',
        BLUE:   '#00FFFF',
        GREEN:  '#00FF00',
        YELLOW: '#FFFF00',
        DBLUE:  '#0000FF',
        BROWN:  '#808000'
    };

    // TileSource
    var TileSource = {
        BLOCK_MUD : 'block mud',
        BLOCK_NORMAL : 'block normal',
        BLOCK_QUESTIONABLE : 'block questionable',
        BLOCK_SWITCHABLE : 'block switchable',
        CHIP_DOWN : 'chip down',
        CHIP_LEFT : 'chip left',
        CHIP_RIGHT : 'chip right',
        CHIP_UP : 'chip up',
        CHIP_ITEM: 'chip item',
        CLEAR : 'clear',
        DASH : 'dash tile',
        DASH_BOOTS : 'dash boots',
        BALL : 'ball enemy',
        BOMB : 'bomb enemy',
        BUG : 'bug enemy',
        FIREBALL : 'fireball enemy',
        GHOST : 'ghost enemy',
        TANK : 'tank enemy',
        FIRE_BOOTS : 'fire boots',
        FIRE : 'fire',
        FIREBALL_GENERATOR : 'fireball generator',
        FLIPPERS : 'flippers',
        FLOOR_MUD : 'mud floor',
        FLOOR_NORMAL : 'normal floor',
        GATE_GOAL : 'goal gate',
        GATE : 'gate',
        GOAL : 'goal',
        HELP : 'help tile',
        ICE_CENTER : 'ice center',
        ICE_CORNER : 'ice corner',
        ICE_SKATES : 'ice skates',
        KEY : 'key',
        SPLASH : 'splash',
        SWITCH_ : 'switch',
        TELEPORTER : 'teleporter',
        TRAP : 'trap',
        CLEAR_TILE : 'clear tile',
        WATER : 'water'
    };

    var FileToSource = {
        'block_mud.png': TileSource.BLOCK_MUD,
        'block_normal.png': TileSource.BLOCK_NORMAL,
        'block_questionable.png': TileSource.BLOCK_QUESTIONABLE, 
        'block_switchable.png' : TileSource.BLOCK_SWITCHABLE,
        'chip_down.png' : TileSource.CHIP_DOWN,
        'chip_left.png' : TileSource.CHIP_LEFT,
        'chip_right.png' : TileSource.CHIP_RIGHT,
        'chip_up.png' : TileSource.CHIP_UP,
        'chip_item.png' : TileSource.CHIP_ITEM,
        'clear.png' : TileSource.CLEAR,
        'clear_tile.png' : TileSource.CLEAR_TILE,
        'dash.png' : TileSource.DASH,
        'dash_boots.png' : TileSource.DASH_BOOTS,
        'ball.png' : TileSource.BALL,
        'bomb.png' : TileSource.BOMB,
        'bug.png' : TileSource.BUG,
        'fireball.png' : TileSource.FIREBALL,
        'ghost.png' : TileSource.GHOST,
        'tank.png' : TileSource.TANK,
        'fire_boots.png' : TileSource.FIRE_BOOTS,
        'fire.png' : TileSource.FIRE,
        'fireball_generator.png' : TileSource.FIREBALL_GENERATOR,
        'flippers.png' : TileSource.FLIPPERS,
        'floor_mud.png' : TileSource.FLOOR_MUD,
        'floor_normal.png' : TileSource.FLOOR_NORMAL,
        'gate_goal.png' : TileSource.GATE_GOAL,
        'gate.png' : TileSource.GATE,
        'goal.png' : TileSource.GOAL,
        'help.png' : TileSource.HELP,
        'ice_center.png' : TileSource.ICE_CENTER,
        'ice_corner.png' : TileSource.ICE_CORNER,
        'ice_skates.png' : TileSource.ICE_SKATES,
        'key.png' : TileSource.KEY,
        'splash.png' : TileSource.SPLASH,
        'switch.png' : TileSource.SWITCH_,
        'teleporter.png' : TileSource.TELEPORTER,
        'trap.png' : TileSource.TRAP,
        'water.png' : TileSource.WATER
    };

    var TileSourceType = {
        CHIP: 'chip person',
        CHIP_ITEM: 'chip item',
        CLEAR_INVENTORY: 'clear inventory',
        CLEAR_TILE_STACK: 'clear tile stack',
        ENEMY: 'enemy',
        ENVIRONMENT: 'environment',
        GATE: 'gate',
        GOAL: 'goal',
        GOAL_GATE: 'goal gate',
        HELP: 'help tile',
        INVENTORY_ITEM: 'inventory item',
        SWITCH_: 'switch',
        TELEPORTER: 'teleporter',
        TRAP: 'trap'
    };

    var SourceToType = {};
    SourceToType[TileSource.BLOCK_MUD] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.BLOCK_NORMAL] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.BLOCK_QUESTIONABLE] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.BLOCK_SWITCHABLE] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.CHIP_DOWN] = TileSourceType.CHIP;
    SourceToType[TileSource.CHIP_LEFT] = TileSourceType.CHIP;
    SourceToType[TileSource.CHIP_RIGHT] = TileSourceType.CHIP;
    SourceToType[TileSource.CHIP_UP] = TileSourceType.CHIP;
    SourceToType[TileSource.CHIP_ITEM] = TileSourceType.CHIP_ITEM;
    SourceToType[TileSource.CLEAR] = TileSourceType.CLEAR_INVENTORY;
    SourceToType[TileSource.DASH] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.DASH_BOOTS] = TileSourceType.INVENTORY_ITEM;
    SourceToType[TileSource.BALL] = TileSourceType.ENEMY;
    SourceToType[TileSource.BOMB] = TileSourceType.ENEMY;
    SourceToType[TileSource.BUG] = TileSourceType.ENEMY;
    SourceToType[TileSource.FIREBALL] = TileSourceType.ENEMY;
    SourceToType[TileSource.GHOST] = TileSourceType.ENEMY;
    SourceToType[TileSource.TANK] = TileSourceType.ENEMY;
    SourceToType[TileSource.FIRE_BOOTS] = TileSourceType.INVENTORY_ITEM;
    SourceToType[TileSource.FIRE] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.FIREBALL_GENERATOR] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.FLIPPERS] = TileSourceType.INVENTORY_ITEM;
    SourceToType[TileSource.FLOOR_MUD] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.FLOOR_NORMAL] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.GATE_GOAL] = TileSourceType.GOAL_GATE;
    SourceToType[TileSource.GATE] = TileSourceType.GATE;
    SourceToType[TileSource.GOAL] = TileSourceType.GOAL;
    SourceToType[TileSource.HELP] = TileSourceType.HELP;
    SourceToType[TileSource.ICE_CENTER] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.ICE_CORNER] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.ICE_SKATES] = TileSourceType.INVENTORY_ITEM;
    SourceToType[TileSource.KEY] = TileSourceType.INVENTORY_ITEM;
    SourceToType[TileSource.SPLASH] = TileSourceType.ENVIRONMENT;
    SourceToType[TileSource.SWITCH_] = TileSourceType.SWITCH_;
    SourceToType[TileSource.TELEPORTER] = TileSourceType.TELEPORTER;
    SourceToType[TileSource.TRAP] = TileSourceType.TRAP;
    SourceToType[TileSource.CLEAR_TILE] = TileSourceType.CLEAR_TILE_STACK;
    SourceToType[TileSource.WATER] = TileSourceType.ENVIRONMENT;

    // Position
    chip.Position = Position = function(_top, _left) {
        this.top = _top || 0;
        this.left = _left || 0;
    }
    generateGetterSetterMethods(Position);

    // Tile
    chip.Tile = Tile = function(_source, _orientation, _color) {
        this.source = _source || TileSource.FLOOR_NORMAL;
        this.type = SourceToType[this.source];
        this.orientation = _orientation || Orientation.UP;
        this.color = _color || Color.WHITE;
    }
    generateGetterSetterMethods(Tile);
    $.extend(Tile.prototype, {
        equals: function(_tile) {
            return _tile.getSource() == this.getSource();
        }
    });

    // TileStack
    chip.TileStack = TileStack = function() {
        var default_ = [ new Tile() ];
        this.tiles = default_;
    }
    generateGetterSetterMethods(TileStack);
    $.extend(TileStack.prototype, {
        push: function(_tile) {
            this.tiles.push(_tile);
        },

        pop: function() {
            return this.tiles.pop();
        },

        peek: function() {
            return (this.tiles.length == 0) ? null : this.tiles[this.tiles.length - 1];
        },

        remove: function(_tile) {
            for (var i=0; i < this.tiles.length; i++) {
                var thisTile = this.tiles[i];
                if (thisTile.equals(_tile)) {
                    return this.tiles.splice(i, 1);
                }
            }
        },

        contains: function(_type) {
            for (var i=0; i < this.tiles.length; i++) {
                var thisTile = this.tiles[i];
                if (_type.getType() == thisTile.getType()) {
                    return true;
                }
            }
            return false;
        }
    });

    // Map
    chip.Map = Map = function(_model) {
        var _this = this;

        Map.WIDTH_IN_TILES = 20;
        Map.HEIGHT_IN_TILES = 20;

        var generateData = function() {
            var defaultData = {};

            /*
            for (var y=0; y < Map.HEIGHT_IN_TILES; y++) {
                defaultData[y] = [];
                for (var x=0; x < Map.WIDTH_IN_TILES; x++) {
                    defaultData[y][x] = new TileStack();
                }
            }
            */

            return defaultData;
        }

        var defaults = {
            'name': 'default',
            'levelNumber': -1,
            'totalChips': 0,
            'time': 0,
            'startPosition': new Position(0, 0),
            'goalPosition': new Position(0, 0),
            'password': 'BLAH',
            'data': generateData()
        };

        var _import = function(_model) {
            for (var property in (_model || defaults)) {
                var val;
                if (_model) {
                    val = _model[property];
                } else {
                    val = defaults[property];
                }
                _this[property.unixHackerToCamelCase()] = val;
            }
        }
        _import(_model);
    }
    generateGetterSetterMethods(Map);

    // Map Editor
    chip.MapEditor = MapEditor = function() {
        MapEditor.TILE_COL_LIMIT = 10;

        this.maps = {};
        this.tiles = {};
        this.tilesFolder = '';
        this.tileDimensions = {};
    }
    generateGetterSetterMethods(MapEditor);
    $.extend(MapEditor.prototype, {
        importMaps: function(_maps) {
            var m;
            var mapName;

            for (var i=0; i < _maps.length; i++) {
                m = new Map(JSON.parse(_maps[i]));
                mapName = m.getName();
                this.maps[mapName] = m;
            }
        },

        importTiles: function(_tiles) {
        },

        loadData: function() {
            var _this = this;
            $.ajax({
                type: 'GET',
                url: '../app/chip.php?action=load_tile_data',
                dataType: 'json',
                success: function(data) {
                    _this.tilesFolder = data['tiles_folder'];
                    _this.tileDimensions = data['tile_dimensions'];

                    _this.importMaps(data['maps']);
                    _this.importTiles(data['tiles']);
                },
                data: {},
                async: false
            });
        },
    });

    return chip;
})(jQuery, chip || {});


/*
// CHIP_DATA.JS

function Chip() {
	this.inventory = new Array();
    this.orientation = Direction.UP;
    this.position;
}

function GameData(map) {
    this.chip = new Chip();
    this.chip.position = map.start_position;

    this.chips_left = map.chips;
    this.time_remaining = map.time;

    this.outcome;
    this.outcome_msg;
}

//Originally, this was inside the Position object, but
//the object's "type" gets lost in the mix in the JSON
//serialization.

function equals(a, b) {
    return a.top == b.top && a.left == b.left;
}


// CHIP_NEW.JS
var MapEditorGUI = function(map_editor_param) {
    TILE_COL_LIMIT = 10;

    var map_editor;
    var map_canvas;

    var bindWidgets = function() {
        $('#new_map').bind('click', function() {
            var m = new Map();
            loadCanvas(m);
        });

        $('#load_map').bind('click', function() {
            var map_name = $('#map_list option:selected').val();
            var m = map_editor.getMap(map_name);
            loadCanvas(m);
        });
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
            tile_img.attr('src', tile.getSrc());
            tile_div.append(tile_img);

            $('#tile_section').append(tile_div);
        }
        makeTilesDragAndDrop();
    }

    var makeTilesDragAndDrop = function() {
        $(".tile").draggable({
            helper: 'clone',
            cursorAt: {
                left: MapEditor.TILE_WIDTH/2,
                top: MapEditor.TILE_HEIGHT/2
            }
        });

        $('#map_section').droppable({
            drop: function(evt, ui) {
                // TODO: <loaded MapCanvas>.add(
                //var map_region = $('#map_region');
                //var map_region_top = map_region.position().top;
                //var map_region_left = map_region.position().left;
                //var map_region_border_width = parseInt(map_region.css('borderLeftWidth'));
     
                //var top = ui.position.top - map_region_top + tile_width/2 - map_region_border_width;
                //var left = ui.position.left - map_region_left + tile_width/2 - map_region_border_width;

                //var canvas = document.getElementById('map');

                //var map_width = canvas.width;
                //var map_height = canvas.height;

                //var map_tile_top = Math.floor(top / tile_width);
                //var map_tile_left = Math.floor(left / tile_width);

                //var dragged_tile_src = $(ui.draggable).children(':first').attr('src');

                //var orientation_input = orientation_input = $('#orientation').val().toUpperCase();
                //var color_input = color_input = $('#color').val().toUpperCase();

                //var src_filename = dragged_tile_src.split("/").pop();
                //var src_input = FileToSource[src_filename];

                //var position;
                //if (left > map_width || left < 0 || top > map_height || top < 0) {
                //    if (left < 0) {
                //        map_tile_left = 0;
                //    }
                //    if (top < 0) {
                //        map_tile_top = 0;
                //    }
                //    position = new Position(top, left);
                //    expand_map(position);
                //}

                //position = new Position(map_tile_top, map_tile_left);
                //if (src_input == TileSource.CLEAR_TILE) {
                //    clear_tile(position);
                //} else {
                //    add_tile_part(position, dragged_tile_src, orientation_input, color_input);
                //}
            }
        });
    }

    var loadCanvas = function(map) {
        // TODO
        map.log();
        //map_canvas = new MapCanvas(map);
    }

    var init = function() {
        map_editor = map_editor_param;
        bindWidgets();
    }
    init();
}

var MapEditor = function() {
    MapEditor.TILE_WIDTH = 0;
    MapEditor.TILE_HEIGHT = 0;

    var maps = new Array();
    var tiles = new Array();

    var importMap = function(mapJSON) {
        return new Map( JSON.parse(mapJSON) );
    }

    var loadTiles = function() {
        $.ajax({
            type: 'GET',
            url: 'php/mapeditor.php?action=load_tiles',
            dataType: 'json',
            success: function(data) {
                for (var i=0; i < data.length; i++) {
                    var tile_src = data[i];
                    if (tile_src == null) {
                        continue;
                    }
                    var tile = new Tile(tile_src);
                    tiles.push(tile);
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

    var init = function() {
        loadMaps();
        getTileDimensions();
        loadTiles();
    }
    init();
};


// CHIP_OLD.JS
var map;
var game_data;

$(document).ready(function() {
    sync_canvas_stuff();
    load_config_options();
    show_maps();
    init_event_handlers();
    load_tiles();
});

$(window).load(function() {
    init_map();  // IMPORTANT: the draw part of init only works using window.load()
});

function init_event_handlers() {
    $('#save_map_button').click(function() {
        save_map(0);
    });

    $('#play_map_button').click(function() {
        play_map();
    });

    $('#goto_level_button').click(function() {
        goto_level(1);
    });
}

function load_tiles() {
    $.getJSON('php/chip.php?action=load_tiles', function(res) {
        var col_limit = 10;
        for (var i=0; i < res.length; i++) {
            if (i % col_limit == 0 && i > 0) {
                $('#tile_section').append('<br />');
            }
            var tile = $('<div></div>');
            tile.attr('class', 'tile');

            var tile_img = $('<img />');
            tile_img.attr('src', res[i]);
            tile.append(tile_img);

            $('#tile_section').append(tile);
        }
        set_editor_event_handlers();
    });
}

function init_map() {
    var canvas = document.getElementById('map');

	map = new Map();
    var position;
    for (var top=0; top < canvas.height/tile_width; top++) {
        map.data[top] = [];
        for (var left=0; left < canvas.width/tile_width; left++) {
            position = new Position(top, left);
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
            if (src_input == TileSource.CLEAR_TILE) {
                clear_tile(position);
            } else {
                add_tile_part(position, dragged_tile_src, orientation_input, color_input);
            }
        }
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
        } else if (src_input == TileSource.CHIP) {
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
            if (src_input == TileSource.GOAL) {
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
            for (var top=0; top < canvas.height/tile_width; top++) {
                position = new Position(top, (canvas.width/tile_width)-1);
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
            for (var top=(canvas.height/tile_width)-1; top >= 0; top--) {
                for (var left=(canvas.width/tile_width)-1; left > 0; left--) {
                    var tile_to_be_shifted = map.data[top][left-1];
                    map.data[top][left] = tile_to_be_shifted;

                    // update map's unique tiles if they're being affected by shift
                    var position_to_shift = new Position(top, left-1);
                    var position = new Position(top, left);

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
            for (var top=0; top < canvas.height/tile_width; top++) {
                position = new Position(top, 0);
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
            for (var left=0; left < canvas.width/tile_width; left++) {
                position = new Position((canvas.height/tile_width)-1, left);
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
            for (var top=(canvas.height/tile_width)-1; top > 0; top--) {
                for (var left=(canvas.width/tile_width)-1; left >= 0; left--) {
                    var tile_to_be_shifted = map.data[top-1][left];
                    map.data[top][left] = tile_to_be_shifted;

                    // update map's unique tiles if they're being affected by shift
                    var position_to_shift = new Position(top-1, left);
                    var position = new Position(top, left);

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
            for (var left=0; left < canvas.width/tile_width; left++) {
                position = new Position(0, left);
                clear_tile(position);
            }
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

    // rotate
    var translate_x = map_tile_left * tile_width + tile_width/2;
    var translate_y = map_tile_top * tile_width + tile_width/2;

    ctx.translate(translate_x, translate_y);
    ctx.rotate(orientation * Math.PI / 180);

    // color
    if (color) {
        ctx.fillStyle = color;
        if (src_input == TileSource.KEY) {
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
        if (source == TileSource.GOAL) {
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

function show_maps() {
    $.getJSON('php/chip.php?action=show_maps', function(res) {
        var list = $('<ul></ul>');
        list.attr('id', 'map_list');

        for (var i in res) {
            var searchResult = res[i];
            var name = searchResult.split(".")[0];

            var list_entry = $('<li></li>');
            list.append(list_entry);

            var link = $('<a href=""></a>');
            link.html(name);

            list_entry.append(link);
        }
        $('#maps').append(list);

        $('#map_list a').bind("click", function(a) {
            var name = $(this).html();
            load_map(name);
            return false;
        });
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
                goto_level(map.level_number + 1);
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
        if (item_source == TileSource.CHIP) {
            items_to_remove.push(item);
            game_data.chips_left--;
        }

        // if enemy, chip dies
        if ($.inArray(item_source, Enemies) != -1) {
            game_data.outcome = "DEAD";
            game_data.outcome_msg = "DEAD";
        }

        // if gate, check for key
        if (item_source == TileSource.GATE) {
            var gate_color = item.color;

            var has_key = false;
            var inventory = chip.inventory;
            for (var inventory_item_index in inventory) {
                inventory_item = inventory[inventory_item_index];
                if (FileToSource[inventory_item.source] == TileSource.KEY && inventory_item.color == gate_color) {
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
        if (item_source == TileSource.HELP) {
            // TODO: show help msg
        }

        // if obstacle that should prevent chip from moving
        if (item_source == TileSource.BLOCK_NORMAL) {
            return;
        }

        // if goal gate
        if (item_source == TileSource.GATE_GOAL) {
            if (game_data.chips_left > 0) {
                return;
            } else {
                // remove goal gate
                for (var item_index in items) {
                    var item = items[item_index];
                    if (FileToSource[item.source] == TileSource.GATE_GOAL) {
                        items_to_remove.push(item);
                    }
                }
            }
        }

        // TODO: if goal, advance to next level
        if (item_source == TileSource.GOAL) {
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

    console.log(game_data);

    sx = (game_data.chip.position.left - 4) * tile_width;
    sy = (game_data.chip.position.top - 4) * tile_width;
    s_width = viewport.width;
    s_height = viewport.height;
    d_width = s_width;
    d_height = s_height;

    viewport_ctx.drawImage(map_canvas, sx, sy, s_width, s_height, 0, 0, d_width, d_height);
}

*/
