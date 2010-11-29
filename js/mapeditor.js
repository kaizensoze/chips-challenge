
$(document).ready(function() {
    var m = new MapEditor();
    m.loadMaps();
    var maps = m.getMaps();
    console.log(maps.length);
    //loadMaps(maps);

    /*
    $('#load_map').bind('click', function() {
        var map_to_load = $('#map_list option:selected').val();
        load_map(map_to_load);
    });
    generate_map();
    */
});

function loadMaps(maps) {
    console.log(maps.length);
    /*
    var map_list = $('#map_list');
    for (var i=0; i < maps.length; i++) {
        console.log(i);
        /*
        var map = maps[i];
        console.log(map);
        var map_name = map_file.split(".")[0];

        var option = $('<option></option>');
        option.text(map_name);
        option.val(map_name);

        map_list.append(option);
    }
    */
}

