
var MapEditor = function() {
    var maps = {};
    return {
        getMaps : function() {
            $.getJSON('php/mapeditor.php?action=load_maps', function(data) {
                maps = JSON.parse(JSON.stringify(data)); // stringify is required ::shrug::
            });
        }
    }
};

