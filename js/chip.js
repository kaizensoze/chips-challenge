
$(document).ready(function() {
    configure_tiles();
});

/*
function load_tiles() {
    $.getJSON('php/chip.php?action=tiles', function(data) {
        var tile_cols = 10;
        var tiles = '';
        jQuery.each(data, function(i, val) {
            if (i % tile_cols == 0 && i > 0) {
                tiles += '<br />';
            }
            tiles += '<div class="tile">'
                  +  '  <img src="' + val + '"/>';
                  +  '</div>';
        });
        $('body').append(tiles);
    });
}
*/

function configure_tiles() {
    $(".tile").draggable();
    $("#droppable").droppable({
        drop: function(event, ui) {
            $(this).find('p').html('Dropped!');
        }
    });
}

