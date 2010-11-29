
var MapEditor = function() {
    var maps = new Array();

    var importMap = function(mapJSON) {
        return new Map( JSON.parse(mapJSON) );
    }

    var exportMap = 

    this.getMaps = function() {
        $.getJSON('php/mapeditor.php?action=load_maps', function(data) {
            for (var i=0; i < data.length; i++) {
                var map = importMap(data[i]);
                maps.push(map);
            }
            console.log(maps[0].exportMap());
        });
    }
};

var Map = function(model_param) {
    var model = model_param;

    this.getTotalChips = function() {
        return model['chips'];
    }

    this.getData = function() {
        return model['data'];
    }

    this.getGoal = function() {
        return model['goal_position'];
    }

    this.getLevelNumber = function() {
        return model['level_number'];
    }

    this.getName = function() {
        return model['name'];
    }

    this.getPassword = function() {
        return model['password'];
    }

    this.getStart = function() {
        return model['start_position'];
    }

    this.getMaxTime = function() {
        return model['time'];
    }

    this.exportMap = function() {
        return JSON.stringify(model);
    }
};

