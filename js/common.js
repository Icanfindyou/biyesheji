;
$(function() {
	$("header").load("header.html", function() {
		if(!$.cookie("loginuser")){
			var loginuser = null;
		}else{
			var loginuser = JSON.parse($.cookie("loginuser"))
		}
		
		//判断是否登录
		if(!loginuser){
			$(".logo-right").css("display","block").next().css("display","none")
			$(".customer-home").find(".button").html("登录｜注册");
		}else{
			if($.cookie("user")){
				var user = JSON.parse($.cookie("user"))
			}else{
				var user = {};
			}
			var str =null;
			for(var attr in user){
				if(user[loginuser]){
					str = user[loginuser].name;
				}
			}			
			$(".logo-right").css("display","none").next().css("display","block").find(".username").html(str);
			$(".customer-home").find(".button").html(str);
		}
		$(this).find(".menu-left").mouseover(function() {
			$(this).addClass("mouseover")
		}).mouseleave(function() {
			$(this).removeClass("mouseover")
		});

		$(this).find(".menu-right").mouseover(function() {
			$(this).addClass("mouseover")
		}).mouseleave(function() {
			$(this).removeClass("mouseover")
		});

		$(this).find(".logo-right").mouseover(function() {
			$(this).stop().animate({
				opacity: 0.8
			}, 500)
		}).mouseleave(function() {
			$(this).stop().animate({
				opacity: 1
			}, 500)
		}).click(function() {
			$(".loginbox").css("display", "block")
		})

		var href = window.location.href;
		var lefthref = $(".menu-left>a").attr("href");
		var righthref = $(".menu-right>a").attr("href");
		islefthref = href.substring(href.length - lefthref.length)
		isrighthref = href.substring(href.length - righthref.length);
		if(islefthref == lefthref) {
			$(".menu-left").addClass("on")
		}
		if(isrighthref == righthref) {
			$(".menu-right").addClass("on")
		}
		
		$(".user-right").mouseover(function(){
			$(this).find("ul").stop().fadeIn()
			.end().find(".arrow").addClass("hover");
		}).mouseout(function(){
			$(this).find("ul").stop().fadeOut().find("li").removeClass("red-hover");
			$(this).find(".arrow").removeClass("hover");
		}).find("li").mouseover(function(){
			$(this).addClass("red-hover").siblings().removeClass("red-hover")
		}).eq(2).click(function(){
			$.cookie("loginuser",null);
			window.location.reload();
		});
		
	});

	$("footer").load("footer.html");
})