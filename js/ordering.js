;$(function(){	
	var lilist = $(".menu-left-list>li");
	var orderbgc = $(".orderbgc");
	var products = $(".products");
	var imglist = products.find("dt");
	lilist.eq(0).addClass("focus").end().each(function(){
		$(this).click(function(){
			$(this).addClass("focus").siblings().removeClass("focus")
		}).mouseover(function(){
			$(this).addClass("hover").siblings().removeClass("hover")
		})
	})
	orderbgc.css({width:function(){
		return $(window).width() -21
	},height:function(){
		return $(window).height()
	}}).find(".order-box").css({"top":function(){
		return (orderbgc.height()-400)/2
	},"left":function(){
		return (orderbgc.width()-orderbgc.find(".order-box").width())/2
	}})
	$(window).scroll(function(){
		orderbgc.css("top",$(this).scrollTop())
	})
	//图片点击添加弹窗
	imglist.click(function(){
		orderbgc.css("display","block")
	})
	
	//关闭弹窗
	orderbgc.find(".close").click(function(){
		orderbgc.css("display","none")
	})
	
})