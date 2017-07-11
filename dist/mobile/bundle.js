
document.addEventListener("DOMContentLoaded",function(event){var toggle,nav,close,scrolled;toggle=document.getElementById("btn--toggle");nav=document.getElementById("nav");close=document.getElementById("close");toggle.addEventListener('click',function(){nav.classList.toggle('nav--active');},false);close.addEventListener('click',function(){nav.classList.toggle('nav--active');},false);menu__link=document.getElementsByClassName("menu__link");var i;for(i=0;i<menu__link.length;i++){menu__link[i].addEventListener('click',function(event){nav.classList.toggle('nav--active');},true);}
var bod=document.getElementsByTagName("body")[0];var FIREFOX=/Firefox/i.test(navigator.userAgent);if(FIREFOX){bod=document.getElementsByTagName("html")[0];}
function animate(opts){var start=new Date(),id=setInterval(function(){var timePassed=new Date()-start,progress=timePassed/opts.duration,delta=opts.delta(progress);if(progress>1){clearInterval(id);}
window.addEventListener('click',function(){clearInterval(id);});opts.step(delta);},1);}
function move(duration,too){animate({duration:duration||1200,delta:quad,step:function(quad){bod.scrollTop=bod.scrollTop+(too-bod.scrollTop)*quad;}});}
function quad(progress){return Math.pow(progress,2);}
function boo(evt){var thehref=this.getAttribute('href').slice(1),idofhref=document.getElementById(thehref),disttotop=idofhref.offsetTop,length=Math.abs(disttotop-bod.scrollTop),timing;if(Math.abs(length)<500){timing=1000;}
if(Math.abs(length)>2500){timing=2500;}else{timing=length;}
move(timing,disttotop);evt.preventDefault();}
var elem=document.getElementsByClassName("scrolled");for(var i=0;i<elem.length;++i){var href=elem[i].getAttribute('href');if(href.indexOf("#")===0){elem[i].addEventListener('click',boo);}}})();