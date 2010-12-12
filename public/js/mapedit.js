
$(document).ready(function() {
    var mapEditor = new MapEditor();
    mapEditor.loadData();

    fillWidgetData(mapEditor);
});

function fillWidgetData(mapEditor) {
    // fill in load map select
    var maps = mapEditor.getMaps();
    //console.log(maps);

    var loadMapSelectHTML = '';
    for (var i=0; i < maps.length; i++) {
        var mapName = maps[i].getName();
        loadMapSelectHTML += '<option id="' + mapName + '" class="load_map_select_option">' + mapName + '</option>';
    }
    $('#load_map_select').html(loadMapSelectHTML);

    // fill in tile section
    var tiles = mapEditor.getTiles();
    var tilesFolder = mapEditor.getTilesFolder();

    var tileSectionHTML = '';
    for (var i=0; i < tiles.length; i++) {
        tileSectionHTML += '<img class="tile" src="' + tilesFolder + '" />';
        if (i % MapEditor.TILE_COL_LIMIT == 0) {
            tileSectionHTML 
    }

    bindWidgetEvents(maps, tiles);
}

function bindWidgetEvents(maps, tiles) {
    $('#show_existing_maps').click(function() {
        if (maps.length == 0) {
            alert('No maps to load.');
        } else {
            $("#load_map_section").show();
        }
        return false;
    });
}

/*
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
*/
