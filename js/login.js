$(function() {
	$(".loginbox").load("login.html",function(){
		$(this).css({width:function(){
			return $(document).width()
		},height:function(){
			return $(document).height()
		}});
		var login = $(".loginbox .login");
		var enroll = $(".loginbox .enroll");
		enroll.css("display", "none");
		login.find(".login-normal").css("display", "none")
		login.css({
			"top": 100,
			"left": function() {
				return($(window).width() - login.width()) / 2
			}
		})
		enroll.css({
			"top": 100,
			"left": function() {
				return($(window).width() - enroll.width()) / 2
			}
		})
		
		enroll.find(".error").css("display","none")
		$(".login-yanzheng .check-number").html(addrandom()).click(function(){
			$(this).html(addrandom());
		})
		//点击切换登录方式
		login.find(".login-top").children("p").eq(0).css("color", "#ed5f56")
			.end().click(function() {
				$(this).css("color", "#ed5f56").siblings().css("color", "#9999b2");
				if($(this).index()==0){
					$(".login-yanzheng").css("display","block").next().css("display","none");
				}else{
					$(".login-normal").css("display","block").prev().css("display","none")
				}
			})
			
		//点击切换注册
		login.find(".login-bottom").children("p").click(function(){
			login.css("display","none").next().css("display","block")
		})
		
		//记住密码
		$(".login .checkbox").attr("checked",false).next().addClass("unchecked").click(function(){

			$(this).prev().prop("checked",!$(this).prev().prop("checked"));
			if($(this).prev().prop("checked")){
				$(this).addClass("checked").removeClass("unchecked");
			}else{
				$(this).addClass("unchecked").removeClass("checked");
			}
		});
		
		//选择性别
		enroll.find(".sex").children(".male").addClass("click")
		.end().find("p").click(function(){
			$(this).addClass("click").siblings().removeClass("click");
		});
		enroll.find(".check-number").css("cursor","pointer").html(addrandom()).click(function(){
			$(this).html(addrandom())
		})
		
		//关闭login
		$(this).find(".login-close").click(function(){
			$(".loginbox").css("display","none")
		})
		
		//协议
		$(".enroll .checkbox").attr("checked",false).next().click(function(){

			$(this).prev().prop("checked",!$(this).prev().prop("checked"));
			if($(this).prev().prop("checked")){
				$(this).attr("src","../img/customerImg/icon-agree.png");
			}else{
				$(this).attr("src","../img/customerImg/icon-noagree.png");
			}
		});
		
		function addrandom(){
			var random = Math.floor(Math.random()*10000);
			if(random<10){
				random = "000"+random;
			}
			if(random<100){
				random = "00"+random;
			}
			if(random<1000){
				random = "0"+random;
			}
			return random;
		}
		
		
	})
	
})