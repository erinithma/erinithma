
'use strict';var colors=['#20ca8c','#6d4c41','#fd9444','#ffb300','#13aad1','#b0bec5'];$(document).ready(function(){var mySwiper=new Swiper('#info',{direction:'vertical',effect:'cube',speed:600,pagination:'.swiper-pagination',paginationHide:false,paginationClickable:true,onSlideChangeStart:function(mySwiper){$('#fullpage').fullpage.moveTo(mySwiper.activeIndex+info_begin);}});mySwiper.disableMousewheelControl();mySwiper.disableKeyboardControl();mySwiper.disableTouchControl();document.getElementById("background").style.backgroundColor=colors[0];$('*[data-footer="here"]').replaceWith($('.footer'));var info=$('#info');$('#info').remove();$('*[data-info="begin"]').append(info);var info_begin=$('.section').index($('*[data-info="begin"]'))+1;var info_end=$('.section').index($('*[data-info="end"]'))+1;var header=$('.header');$('.header').remove();$('*[data-header="begin"]').append(header);var header_begin=$('.section').index($('*[data-header="begin"]'))+1;var header_end=$('.section').index($('*[data-header="end"]'))+1;$('#fullpage').fullpage({dragAndMove:true,scrollOverflow:false,onLeave:function(index,nextIndex,direction){document.getElementById("background").style.backgroundColor=colors[nextIndex-2];if(nextIndex>=info_begin&&nextIndex<=info_end){mySwiper.slideTo(nextIndex-info_begin);}
if(nextIndex<info_begin){$('#info').remove();$('*[data-info="begin"]').append(info);}else if(nextIndex>info_end){$('#info').remove();$('*[data-info="end"]').append(info);}
if(nextIndex<header_begin){$('.header').remove();$('*[data-header="begin"]').append(header);}else if(nextIndex>header_end){$('.header').remove();$('*[data-header="end"]').append(header);}},afterLoad:function(anchorLink,index){if(index>=info_begin&&index<=info_end){$('#info').remove();$('main').append(info);}
if(index>=header_begin&&index<=header_end){$('.header').remove();$('main').append(header);}
setTimeout(function(){$('video').each(function(index,element){element.play();});},200);}});});var p=document.createElement("div");p.innerHTML="<div style='z-index:100000' id='owlreporter-preloader'><div id='loader'></div><div class='loader-section section-left'></div><div class='loader-section section-right'></div></div>";document.body.insertBefore(p,document.body.firstChild);function pageload(){var e=(new Date).getTime(),t=(e-before)/1e3,n=document.getElementById("loadingtime");n.innerHTML="Page load: "+t+" seconds."}window.onload=function(){pageload()},setTimeout(function(){document.body.className+=" loaded"},1500),document.addEventListener?document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,!1),domReady()},!1):document.attachEvent&&document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",arguments.callee),domReady())});