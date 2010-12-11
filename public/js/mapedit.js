
$(document).ready(function() {
    var mapEditor = new MapEditor();
    mapEditor.loadData();

    fillWidgetData(mapEditor);
    bindWidgetEvents(mapEditor);
});

function fillWidgetData(mapEditor) {
    //var maps = mapEditor.getMaps();
    //console.log(maps);
    //console.log(MapEditor.TILE_COL_LIMIT);
}

function bindWidgetEvents(mapEditor) {
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
