'use strict';

//var colors = ['#20ca8c', '#6d4c41', '#fd9444', '#ffb300', '#13aad1', '#b0bec5'];
var colors = ['#20ca8c', '#6d4c41', '#fd9444', '#b0bec5', '#13aad1'];
var anchors = ['','portfolio','portfolio','portfolio', 'about-us', 'prices'];
$(document).ready(function() {
    // initialise slider
    var mySwiper = new Swiper ('#info', {
        direction: 'vertical',
        effect: 'cube',
        speed: 600,
        pagination: '.swiper-pagination',
        paginationHide: false,
        paginationClickable: true,
        onSlideChangeStart: function (mySwiper) {
            $('#fullpage').fullpage.moveTo(mySwiper.activeIndex + info_begin);
        }
    });

    mySwiper.disableMousewheelControl();
    mySwiper.disableKeyboardControl();
    mySwiper.disableTouchControl();

    document.getElementById("background").style.backgroundColor = colors[0];

    // move footer to the end of the slider
    $('*[data-footer="here"]').replaceWith($('.footer'));

    // move `info` from body to the first showcase slide
    var info = $('#info');
    $('#info').remove();
    $('*[data-info="begin"]').append(info);
    var info_begin = $('.section').index($('*[data-info="begin"]')) + 1; //the beginning of the showcase
    var info_end = $('.section').index($('*[data-info="end"]')) + 1; //the end

    $('#fullpage').fullpage({
        dragAndMove: true,
        scrollOverflow: false,
        anchors:['','portfolio','','', 'about-us', 'prices'],
        lockAnchors: false,
        animateAnchor: true,
        fixedElements: '.header',
        bigSectionsDestination: 'top',
        
        onLeave: function (index, nextIndex, direction) {
            document.getElementById("background").style.backgroundColor = colors[nextIndex - 2];

            // active anchors
            $('.pillbox .link').removeClass('active');

            if (anchors[nextIndex-1]) {
                $('.pillbox .link[data-anchor="'+anchors[nextIndex-1]+'"]').addClass('active');
            }

            // scroll `info` according to the showcase slide where we are going
            if (nextIndex >= info_begin && nextIndex <= info_end) {
                mySwiper.slideTo(nextIndex - info_begin);
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

            if (nextIndex < header_begin) {
                $('.header').remove();
                $('*[data-header="begin"]').append(header);
            } else if (nextIndex > header_end) {
                $('.header').remove();
                $('*[data-header="end"]').append(header);
            }

            $('video[data-index="'+index+'"]').each(function (index, element) {
                element.pause();
            });
        },
        afterLoad: function (anchorLink, index) {
            // fix the `info` position when it's need to stay at it's place
            if (index >= info_begin && index <= info_end) {
                $('#info').remove();
                $('main').append(info);
            }

            if (index >= header_begin && index <= header_end) {
                $('.header').remove();
                $('main').append(header);
            }

            // play video on page
            $('video[data-index="'+index+'"]').each(function (index, element) {
                element.play();
            });
        }
    });

    var header = $('.header');
    $('.header').remove();
    $('*[data-header="begin"]').append(header);
    var header_begin = $('.section').index($('*[data-header="begin"]')) + 1;
    var header_end = $('.section').index($('*[data-header="end"]')) + 1;
    

    $('.popup__close').click(function(e){
        $('.popup__bg').toggleClass('popup--active');
        $('.popup').toggleClass('popup--active');
        return false;
    });

    $('.input-text').each(function(){
        if ($(this).val())
            $(this).addClass('used');
    });

    $('.input-text').blur(function() {
        if ($(this).val())
            $(this).addClass('used');
        else
            $(this).removeClass('used');
    });

    
    

    $('#submit').click(function(e){
        console.log('vefore submit');
        e.preventDefault();
        if (validateInput()) {
            console.log('validated');
            $.ajax({
                method: 'POST',
                url: '/mailer.php',
                data: $('#order').serialize(),
                dataType: 'json',
                success: function (json) {
                    console.log(json);
                    if (json['status']) {
                        console.log('success');
                        $('.form__inner').removeClass('active');
                        $('.form__header').addClass('active');
                        $('.form__header').append(json['success']);

                        window.setTimeout(function() {
                            $('.popup__close').trigger('click');
                            $('.form__inner').addClass('active');
                            $('.form__header').removeClass('active');
                            $('.form__header').html('');
                            $('input-text').removeClass('has-error');
                            $('.error').remove();
                            $('.input-text').each(function(){
                                $(this).val('');
                            });
                        }, 2500);
                    } else {
                        console.log('error');
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
            });
        } else {
            console.log('ЕГОГ');
        }
    });

    function validateInput() {
        console.log('validateInput');
        $('input-text').removeClass('has-error');
        $('.error').remove();
        var result=true;
        var name = $('input[name="name"]'),
            phone = $('input[name="phone"]');

        if (!name.val()) {
            name.addClass('has-error');
            name.after('<p class="error">Введите ваше Имя</p>');
            result=false;
        }
        if (!phone.val()) {
            phone.addClass('has-error');
            phone.after('<p class="error">Введите ваш номер телефона</p>');
            result=false;
        }

        return result;
    }

    
});


function showPopup() {
    $('.popup').show();
    $('.popup__bg').toggleClass('popup--active');
    $('.popup').toggleClass('popup--active');
}