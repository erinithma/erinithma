'use strict';

var colors = ['#40a9fd', '#20ca8c', '#f24b6b'];

$(document).ready(function() {

    document.getElementById("background").style.backgroundColor = colors[0];

    $('#fullpage').fullpage({
        dragAndMove: 'true',
        onLeave: function (index, nextIndex, direction) {
            document.getElementById("background").style.backgroundColor = colors[nextIndex - 1];
        }
    });
});
