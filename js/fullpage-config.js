'use strict';

var colors = ['#40a9fd', '#20ca8c', '#f24b6b', '#fd9444'];

$(document).ready(function() {

    document.getElementById("background").style.backgroundColor = colors[0];

    // move `info` from body to the first showcase slide
    var info = $('#info');
    $('#info').remove();
    $('*[data-info="begin"]').append(info);

    var info_begin = $('.section').index($('*[data-info="begin"]')) + 1; //the beginning of the showcase
    var info_end = $('.section').index($('*[data-info="end"]')) + 1;   //the end

    $('#fullpage').fullpage({
        dragAndMove: 'true',
        onLeave: function (index, nextIndex, direction) {
            document.getElementById("background").style.backgroundColor = colors[nextIndex - 2];

            // scroll `info` according to the showcase slide where we are going
            if (nextIndex >= info_begin && nextIndex <= info_end) {
                $('#info').slick('slickGoTo', nextIndex - info_begin);
            }

            // move `info` to the first or to the last showcase slide,
            // so it could be scrolled as it needed
            if (nextIndex < info_begin) {
                $('#info').remove();
                $('*[data-info="begin"]').append(info);
            } else if (nextIndex > info_end) {
                $('#info').remove();
                $('*[data-info="end"]').append(info);
            }

        },
        afterLoad: function (anchorLink, index) {
            // fix the `info` position when it's need to stay at it's place
            if (index >= info_begin && index <= info_end) {
                $('#info').remove();
                $('body').append(info);
            }
        }
    });
});
