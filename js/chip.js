
$(document).ready(function() {
    generate_map();
    configure_tiles();
});

function generate_map() {
    var default_tile = 'images/tiles/floor_normal.png';
    var rows = 10;
    var cols = 10;
    var map = '<table id="map" border="1">';
    for (var i=0; i < rows; i++) {
        map += '<tr>';
        for (var j=0; j < cols; j++) {
            map += '<td class="map_tile"><img src="' + default_tile + '"/></td>';
        }
        map += '</tr>';
    }
    map += '</table>';
    $('body').prepend(map);
}

function configure_tiles() {
    var tile_width = 32;
    var tile_height = 32;
    $(".tile").draggable({
        helper: 'clone',
        cursorAt: {left: tile_width/2, top: tile_height/2}
    });
    $(".map_tile").droppable({
        drop: function(event, ui) {
            var dragged_tile_src = $(ui.draggable).children(':first').attr('src');
            var map_tile = $(this).children(':first');
            map_tile.attr('src', dragged_tile_src);
            //console.log(map_tile);
        }
    });
}

