
$(document).ready(function() {
    var test = $('<input type="text"></input><br />');
    $("body").append(test);

    var blah = $('<a href="">TEST</a>');
    blah.bind("click", function() {
        alert('hi');
        return false;
    });
    console.dir(blah);
    $("body").append(blah);
});
