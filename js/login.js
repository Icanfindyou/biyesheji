$(function() {
	$(".loginbox").load("login.html",function(){
		var flag = false;
		var loginflag = false;
		var oinp = $(".enroll input[type='text']");
		var ologininp = $(".login input[type='text']");
		var loginpsw = $(".login input[type='password']")
		var eerror = $(".enroll .error");
		var lerror = $(".login .error");
		var enrollconfi = {};		
		if($.cookie("user") == "null"){
			var user = {};
		}else{
			var user = JSON.parse($.cookie("user"))
		}
		if($.cookie("remberpsw") == "null"){
			var remberpsw = {};
		}else{
			var remberpsw= JSON.parse($.cookie("remberpsw"))
		}
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
					$(".login-yanzheng").next().find("input[type='text']").val("").end()
					.find(".error").css("display","none")
					loginpsw.val("");
				}else{
					$(".login-normal").css("display","block").prev().css("display","none");
					$(".login-normal").prev().find("input[type='text']").val("")
					.end().find(".error").css("display","none");
					
				}
			})
			
		//点击切换注册
		login.find(".login-bottom").children("p").click(function(){
			login.css("display","none").next().css("display","block")
		})
		
		$(".login .remberme").addClass("unchecked")
		//记住密码
		if(!$.isEmptyObject(remberpsw)){
			ologininp.eq(2).val(remberpsw.username)
			loginpsw.val(remberpsw.password)
			console.log($(".login .checkbox").prop("checked"))
			$(".login .checkbox").prop("checked",true).next().addClass("checked")
		}
		//记住密码
		$(".login .remberme").click(function(){

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
			.find(".login").css("display","block")
			.find(".login-yanzheng").css("display","block")
			.next().css("display","none")
			.end().end().next().css("display","none");
			login.find(".login-top").children("p").eq(0).css("color", "#ed5f56")
			.siblings().css("color", "#9999b2");
			oinp.val("");
			ologininp.val("");
			loginpsw.val("");
			eerror.css("display","none");
			lerror.css("display","none");
			enroll.find(".checkbox").prop("checked",false);
			flag = false;
			loginflag = false;
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
		
		//正则
		
		//注册正则
		oinp.eq(0).blur(function(){
			str = /^1[34578]\d{9}$/;
			if(str.test($(this).val())){
				if(!user[$(this).val()]){
					$(this).next().css("display","none");
				}else{
					$(this).next().css("display","block").html("用户重名");
				}
				
			}else{
				$(this).next().css("display","block").html("用户名填写错误");
				flag = true;
			}
		})
		
		oinp.eq(1).blur(function(){
			if($(this).val().toString() == $(this).next().html()){
				$(this).next().next().css("display","none");
				enrollconfi.password = $(this).val();
			}else{
				$(this).next().next().css("display","block");
				flag = true;
			}
		})
		
		oinp.eq(2).blur(function(){
			str = /^[0-9A-Za-z]{6,12}$/;
			if(str.test($(this).val())){
				$(this).next().css("display","none");
				enrollconfi.password = $(this).val();
			}else{
				$(this).next().css("display","block");
				flag = true;
			}	
		})
		
		oinp.eq(3).blur(function(){
			str = /^[\u4E00-\u9FA5A-Za-z]+$/;
			if(str.test($(this).val())){
				$(this).next().css("display","none");
				enrollconfi.address = $(this).val();
			}else{
				$(this).next().css("display","block");
				flag = true;
			}
		})
		oinp.eq(4).blur(function(){
			str =  /^[\u4E00-\u9FA5A-Za-z]+$/;
			if(str.test($(this).val())){
				$(this).next().next().css("display","none");
				enrollconfi.name = $(this).val();
				$(".sex").find("p").each(function(){
					if($(this).hasClass("click")){
						enrollconfi.sex = $(this).html();
					}
				})
			}else{
				$(this).next().next().css("display","block");
				flag = true;
			}	
		})
		
		//登录判断
		ologininp.eq(0).blur(function(){
			if(!user[$(this).val()]){
				ologininp.eq(1).next().next().css("display","block");
				loginflag = true;
			}else{
				ologininp.eq(1).next().next().css("display","none");
			}
		})
		ologininp.eq(1).blur(function(){
			if($(this).val().toString() == $(this).next().html()){
				$(this).next().next().css("display","none");
			}else{
				$(this).next().next().css("display","block");
				loginflag = true;
			}
		})
		ologininp.eq(2).blur(function(){
			if(!user[$(this).val()]){
				$(this).next().css("display","block");
				loginflag = true;
			}else{
				$(this).next().css("display","none");
			}
		})
		loginpsw.blur(function(){
			if(user[ologininp.eq(2).val()]){
				ologininp.eq(2).next().css("display","none");
				if(user[ologininp.eq(2).val()].password==$(this).val()){
					$(this).next().css("display","none");
				}else{
					$(this).next().css("display","block");
				}					
			}else{
				ologininp.eq(2).next().css("display","block");				
			}
		})
		

		//点击判断登录
		var ssss = {};
		$(".login-button").click(function(){
			if(!loginflag){
				var ischeck = $(".login-normal").find(".checkbox").prop("checked");
				if(ologininp.eq(0).val()==""){
					$.cookie("loginuser",ologininp.eq(2).val());
				}else{
					$.cookie("loginuser",ologininp.eq(0).val());
				}
				//判断是否记住密码
				if(ischeck){
					remberpsw.username = ologininp.eq(2).val();
					remberpsw.password = loginpsw.val();
					var str = JSON.stringify(remberpsw);
					$.cookie("remberpsw",str);
				}else{
					$.cookie("remberpsw",null);
				}
				window.location.reload();
			}
		})
		
		//点击判断注册
		$(".enroll-button").click(function(){
			var inpflag = $(".enroll .checkbox").prop("checked");			
			user[oinp.eq(0).val()] = enrollconfi;
			var jsonstr = JSON.stringify(user);
			if(eerror.css("display")=="none"){
				flag = false;
			}
			if(!flag&&inpflag&&oinp.val()){
				$.cookie("user",jsonstr);
			}else{
				alert("请正确填写信息")
			}
		})
	})
	
})

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

