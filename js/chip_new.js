
var MapEditor = function() {
    // TODO: change this to array of Map objects
    var maps = {};
    return {
        getMaps : function() {
            $.getJSON('php/mapeditor.php?action=load_maps', function(data) {
                // TODO: iterate over json, stuff each into Map object, add to array of Map objects
                //       don't use associative array; store both name, level in json
                maps = JSON.parse(JSON.stringify(data)); // stringify is required ::shrug::
            });
        }
    }
};

