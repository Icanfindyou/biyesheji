;$(function(){
       $("header").load("header.html", function() {
               $(this).find(".menu-left").mouseover(function() {
                       $(this).addClass("mouseover")
               }).mouseleave(function() {
                       $(this).removeClass("mouseover")
               }).click(function(){
                       menucont = 1;
               });

               $(this).find(".menu-right").mouseover(function() {
                       $(this).addClass("mouseover")
               }).mouseleave(function() {
                       $(this).removeClass("mouseover")
               }).click(function(){
                       menucont = 2;
               });

               $(this).find(".logo-right").mouseover(function() {
                       $(this).stop().animate({
                               opacity: 0.8
                       }, 500)
               }).mouseleave(function() {
                       $(this).stop().animate({
                               opacity: 1
                       }, 500)
               })

              var href = window.location.href;
               var lefthref = $(".menu-left>a").attr("href");
               var righthref = $(".menu-right>a").attr("href");
               islefthref = href.substring(href.length-lefthref.length)
               isrighthref = href.substring(href.length-righthref.length);
               if(islefthref==lefthref){
                       $(".menu-left").addClass("on")
               }
               if(isrighthref == righthref){
                       $(".menu-right").addClass("on")
               }
       });

       $("footer").load("footer.html");
})
