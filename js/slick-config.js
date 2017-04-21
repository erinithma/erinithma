'use strict';

$('#info').slick({
    dots: true,
    infinite: false,
    arrows: false
});

$('#info').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('#fullpage').fullpage.moveTo(nextSlide + 1);
});
