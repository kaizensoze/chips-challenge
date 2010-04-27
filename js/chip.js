
$(document).ready(function() {
    load_tiles();
    configure_tiles();
});

/*
    TODO: fix so that the generated html is valid
*/
function load_tiles() {
    $.getJSON('php/chip.php?action=tiles', function(data) {
        var tile_cols = 10;
        var tile_section = $('#tile_section');
        var tile_subsection = '';
        jQuery.each(data, function(i, val) {
            if (i % tile_cols == 0) {
                tile_subsection += '<br />';
            }
            tile_subsection += '<div class="tile"><img src="' + val + '"/></div>';
        });
        $(tile_section).append(tile_subsection);
    });
}

function configure_tiles() {
    $(".tile").draggable();
    $("#droppable").droppable({
        drop: function(event, ui) {
            $(this).find('p').html('Dropped!');
        }
    });
}

