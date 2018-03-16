;$(function( ) {
       //banner 轮播图实现
       (function() {
               var cont = 0;
               var obanner = $(".banner");
               var imglist = $(".banner .bannerlist>li");
               var bannernav = obanner.find(".bannernav");
               var navlist = bannernav.find("li");
               var focusleft = obanner.children(".focus-left");
               var focusright = focusleft.next();
               obanner.children(".Customer-service").mouseover(function(e){
                       e.stopPropagation();
                       focusleft.hide().next().hide()
               })
               bannernav.css({
                       "left": 538,
                       "top": 365
               })
               var timer = null;
               navlist.each(function(index) {
                       if(index % 2 == 0) {
                               $(this).addClass("odd");
                       } else {
                               $(this).addClass("even")
                       }
               });
               navlist.eq(0).addClass("odd-on");
               imglist.eq(0).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
               navlist.mouseover(function() {
                       cont = $(this).index();
                       banner(cont);
               });
               obanner.mouseover(function() {
                       clearInterval(timer);
                       focusleft.show().next().show();
                       if(cont==0){
                               focusleft.hide()
                       }
                       if(cont == imglist.length-1){
                               focusleft.next().hide()
                       }
               }).mouseleave(function() {
                       focusleft.hide().next().hide();
                       timer = setInterval(function() {
                               cont++;
                               if(cont == imglist.length) {
                                       cont = 0;
                               }
                               banner(cont);
                       }, 5000)
               })

               focusleft.click(function(){
                       cont--;
                       banner(cont);
                       if(cont ==0){
                               $(this).hide();
                       }else{
                               $(this).show().next().show();
                       }

               }).next().click(function(){
                       cont++;
                       banner(cont);
                       if(cont>=imglist.length-1){
                               $(this).hide()
                       }else{
                               $(this).show().prev().show();
                       }

               })
               timer = setInterval(function() {
                       cont++;
                       if(cont >= imglist.length) {
                               cont = 0;
                       }
                       banner(cont);
               }, 5000)
               function banner(cont) {
                       imglist.eq(cont).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
                       if(cont % 2 == 0) {
                               navlist.eq(cont).addClass("odd-on")
                       } else {
                               navlist.eq(cont).addClass("even-on")
                       }
                       navlist.eq(cont).siblings().each(function() {
                               if($(this).hasClass("odd")) {
                                       $(this).removeClass("odd-on")
                               } else {
                                       $(this).removeClass("even-on")
                               }
                       })
               }
       })();
})
