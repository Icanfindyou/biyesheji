$(function(){
	var lilist = $(".menu-left-list>li");
	lilist.eq(0).addClass("focus").end().each(function(){
		$(this).click(function(){
			$(this).addClass("focus").siblings().removeClass("focus")
		}).mouseover(function(){
			$(this).addClass("hover").siblings().removeClass("hover")
		})
	})
})