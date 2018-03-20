$(function(){
	var lilist =  $(".customer-left li");
	var divlist = $(".customer-right>div");
	divlist.css("display","none").eq(0).css("display","block");
	lilist.eq(0).addClass("click").css("border-bottom","1px solid #efeee9")
	.end().eq(3).css("border-bottom","1px solid #efeee9");
	lilist.click(function(){
		$(this).addClass("click").siblings().removeClass("click");
		divlist.eq($(this).index()).css("display","block").siblings().css("display","none");
	})
	
})