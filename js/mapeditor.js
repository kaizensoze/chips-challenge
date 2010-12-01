
$(document).ready(function() {
    var m = new MapEditor();
    var maps = m.getMaps();
    loadMaps(maps);

    /*
    $('#load_map').bind('click', function() {
        var map_to_load = $('#map_list option:selected').val();
        load_map(map_to_load);
    });
    generate_map();
    */
});

function loadMaps(maps) {
    var map_list = $('#map_list');
    for (var i=0; i < maps.length; i++) {
        var map = maps[i];
        var map_name = map.getName();

        var option = $('<option></option>');
        option.text(map_name);
        option.val(map_name);

        map_list.append(option);
    }
}

