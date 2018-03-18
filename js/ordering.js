;$(function(){	
	var lilist = $(".menu-left-list>li");
	var orderbgc = $(".orderbgc");
	var products = $(".products");
	var imglist = products.find("dt");
	var orderbox =  $(".order-box");
	lilist.eq(0).addClass("focus").end().each(function(){
		$(this).click(function(){
			$(this).addClass("focus").siblings().removeClass("focus")
		}).mouseover(function(){
			$(this).addClass("hover").siblings().removeClass("hover")
		})
	})
	orderbgc.css({width:function(){
		return $(document).width()
	},height:function(){
		return $(document).height()
	}});
	orderbox.css({"top":function(){
		return ($(window).height()-orderbox.height())/2
	},"left":function(){
		return ($(window).width()-orderbox.width())/2
	}})
	$(window).scroll(function(){
		orderbox.css("top",$(this).scrollTop()+($(window).height()-orderbox.height())/2)
	})
	//图片点击添加弹窗
	imglist.click(function(){
		orderbgc.css("display","block")
		orderbox.css("display","block")
	})
	
	//关闭弹窗
	orderbox.find(".close").click(function(){
		orderbox.css("display","none")
		orderbgc.css("display","none")
	})
	
})