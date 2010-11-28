
var Map = function() {
    var a = 1;

    var privateFunction = function() {
        alert(a);
    }

    return {
        getA : function() {
            return a;
        },
        setA : function(val) {
            a = val;
        }
    }
};

var Level = function(map) {
    var a = 1;

    var privateFunction = function() {
        alert(a);
    }

    return {
        getA : function() {
            return a;
        },
        setA : function(val) {
            a = val;
        }
    }
};
