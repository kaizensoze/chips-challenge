
$(document).ready(function() {
    $('#load_map').bind('click', function() {
        var map_to_load = $('#map_list option:selected').val();
        load_map(map_to_load);
    });
    generate_map();
    load_map_list();
    var m = new Map();
    m.setA(5);
    console.log(m.getA());
});

function generate_map() {
}

function load_map_list() {
    $.getJSON('php/mapeditor.php?action=load_map_list', function(data) {
        var map_list = $('#map_list');
        for (var i=0; i < data.length; i++) {
            var map_file = data[i];
            var map_name = map_file.split(".")[0];

            var option = $('<option></option>');
            option.text(map_name);
            option.val(map_name);

            map_list.append(option);
        }
    });
}

function load_map(map_to_load) {
    if (map_to_load == undefined) {
        return;
    }
    $.getJSON('php/chip.php?action=load_map&map='+encodeURIComponent(map_to_load), function(data) {
        var map_to_import = JSON.parse(data);
        console.log(map_to_import);
    });
}

