$(function() {
	var foodtype = null;
	var food = null;
	var listr = "";
	var productsstr = "";
	var leftlist = $(".menu-left-list");
	var productsList = $(".menu-right");
	$.ajax({
		type: "get",
		url: "../data/food.json",
		async: false,
		success: function(data) {
			food = data;
		}
	});
	$.ajax({
		type: "get",
		url: "../data/foodtype.json",
		async: false,
		success: function(data) {
			foodtype = data;
		}
	});

	if($.cookie("user") == "null" || !$.cookie("shopcar")) {
		var shopcarlist = {};
	} else {
		var shopcarlist = JSON.parse($.cookie("shopcar"))
	}
	
	if(!$.cookie("loginuser")) {
			var loginuser = null;
		} else {
			var loginuser = JSON.parse($.cookie("loginuser"))
		}
	//购物车动画
	$(".shopcar").load("car.html", function() {
		console.log($(".shopcarbgc"))
		$(this).find(".bottom-left").mouseover(function() {
			$(this).stop().animate({
				"opacity": 0.8
			})
		}).mouseout(function() {
			$(this).stop().animate({
				"opacity": 1
			})
		}).click(function() {
			$(".car-top").fadeIn().next().fadeIn();
			$(".shopcar").css("height", $(window).height()).find(".shoplist").css("height", $(window).height() - $(".shopcar").find(".car-bottom").height() - $(".shopcar").find(".car-top").height());
			$(".shopcarbgc").fadeIn();
		});
		$(this).find(".close").click(function() {
			$(".shopcar").find(".car-top").css("display", "none").next().css("display", "none")
				.end().end().css({
					"height": $(".car-bottom").height()
				});
			$(".shopcarbgc").fadeOut();
		})
		var shoplist = $(".shoplist");
		//addshopcar(shoplist,shopcarlist,food);
		
		//未登录隐藏购物车
		
		if(!loginuser) {
			$(".products").find(".botton").html("开始订餐").end().find(".price").fadeOut();
			$(".car-bottom").css("display","none");
		} else {
			$(".products").find(".botton").html("购买").end().find(".price").fadeIn();
			$(".car-bottom").css("display","block");
		}
		
		//清空购物车
		$(this).find(".clear").click(function() {
			shoplist.html("");
			$(".shopcont").html(0).next().find("span").html(0);
			$.cookie("shopcar", null);
		})
		//给购物车添加增加减少少商品功能
		if(!$.isEmptyObject(shopcarlist)) {
			var minus = $(".minus");
			var plus = $(".plus");
			addshopcar(shoplist, shopcarlist, food);
			minus.click(function() {
				dominus(shopcarlist, $(this));
			});
			plus.click(function() {
				doplus(shopcarlist, $(this));
			})
		}
	})
	for(var index in food) {
		listr += "<li foodtype='" + index + "'>" + foodtype[index] + "</li>";
	}
	leftlist.html(listr);
	addproducts(0);
	addorder(leftlist.find("li").eq(0))
	leftlist.find("li").click(function() {
		addorder($(this))
	})

	function addproducts(foodtype) {
		var str = "";
		for(var index in food[foodtype]) {
			str += "<div class='products' foodid='" + index + "'><dl><dt><img foodid='" + index + "' src='" + food[foodtype][index].imgurl + ".jpg' /></dt><dd>" + food[foodtype][index].title + "</dd></dl><div class='hottype'></div><div class='price'>" + food[foodtype][index].price + "元</div><div class='botton' foodid='" + index + "'></div></div>"
		}
		productsList.html(str);
	}
	//orderbox 获取数据
	function addorder(clickli) {
		var foodtype = clickli.attr("foodtype");
		addproducts(foodtype);
		var products = $(".products");
		var imglist = products.find("img");
		var orderbgc = $(".orderbgc");
		var orderbox = $(".order-box");
		var addshop = $(".products").find(".botton");
		var shopcar = $(".shopcar");
		imglist.click(function() {
			orderbox.find("h3").html(food[foodtype][$(this).attr("foodid")].title);
			orderbox.find(".confi").html(food[foodtype][$(this).attr("foodid")].dest);
			orderbox.find(".price").html(food[foodtype][$(this).attr("foodid")].price + "元");
			orderbox.find("img").attr("src", food[foodtype][$(this).attr("foodid")].imgurl + ".jpg");
			orderbox.find(".button").attr("foodid", $(this).attr("foodid"));
			orderbgc.css("display", "block")
			orderbox.css("display", "block")
		})
		if(!loginuser) {
			$(".products").find(".botton").html("开始订餐").end().find(".price").fadeOut();
			$(".car-bottom").fadeOut();
		} else {
			$(".products").find(".botton").html("购买").end().find(".price").fadeIn();
			$(".car-bottom").fadeIn();
		}
		
		addshop.click(function() {
			if(!loginuser){
				$(".loginbox").fadeIn();
				$(".order-box").fadeOut();
			}else{
				clickaddshops($(this))
			}
			
		})
		orderbox.find(".button").click(function() {
			if(!loginuser){
				$(".loginbox").fadeIn();
				$(".order-box").fadeOut();
			}else{
				clickaddshops($(this))
			}
			
		})
	}

	//添加购物车方法，shoplist为要添加的元素，shopcarlist要填得字符串，food为json数据
	function addshopcar(shoplist, shopcarlist, food) {
		var shopcarstr = "";
		var cont = 0;
		var sum = 0;
		for(var i in food) {
			for(var j in food[i]) {
				if(shopcarlist[j]) {
					shopcarstr += "<div class='shops'><img src='" + food[i][j].imgurl + ".jpg' /><div class='desc'><div class='middle'><p class='title'>" + food[i][j].title + "</p><p class='price'>" + food[i][j].price + "元</p></div></div><div class='docar'><p class='minus' foodid='" + j + "'></p><p class='shopnum'>" + shopcarlist[j] + "</p><p class='plus' foodid='" + j + "'></p></div></div>";
					cont += shopcarlist[j];
					sum += parseInt(food[i][j].price) * shopcarlist[j];
				}
			}
		}
		console.log(cont, sum)
		shoplist.html(shopcarstr).next().find(".shopcont").html(cont).end().find(".shopsprice span").html(sum);
	}

	//购物车增加数量删除数量方法
	function doplus(shopcarlist, click) {
		var shopid = click.attr("foodid");
		shopcarlist[shopid] += 1;
		click.prev().html(shopcarlist[shopid]);
		var shopcont = parseInt($(".shopcont").text());
		var sumprice = parseInt($(".shopsprice").find("span").text());
		var shopprice = parseInt(click.parent().prev().find(".price").text());
		$(".shopcont").html(shopcont + 1).next().find("span").html(sumprice + shopprice);
		var str = JSON.stringify(shopcarlist);
		$.cookie("shopcar", str);
	}

	function dominus(shopcarlist, click) {
		var shopid = click.attr("foodid");
		shopcarlist[shopid] -= 1;
		var shopcont = parseInt($(".shopcont").text());
		var sumprice = parseInt($(".shopsprice").find("span").text());
		var shopprice = parseInt(click.parent().prev().find(".price").text());
		console.log(sumprice, shopprice)
		$(".shopcont").html(shopcont - 1).next().find("span").html(sumprice - shopprice);
		click.next().html(shopcarlist[shopid]);
		if(shopcarlist[shopid] == 0) {
			delete shopcarlist[shopid];
			click.parent().parent().remove();
		}
		var str = JSON.stringify(shopcarlist);
		$.cookie("shopcar", str);
	}
	//点击添加商品，保存cookie,参数click为点击的元素
	function clickaddshops(click) {
		var shoplist = $(".shoplist");
		//添加购物车
		//获取cookie,cookie形式：{id:cont}
		if($.cookie("shopcar") == "null" || !$.cookie("shopcar")) {
			var shopcarlist = {};
		} else {
			var shopcarlist = JSON.parse($.cookie("shopcar"))
		}
		var clickid = click.attr("foodid");
		//查找是否已添加商品，已添加数量加1，未添加则添加该商品
		if(shopcarlist[clickid] === undefined) {
			shopcarlist[clickid] = 1;
		} else {
			shopcarlist[clickid] += 1;
		}
		addshopcar(shoplist, shopcarlist, food);
		var str = JSON.stringify(shopcarlist);
		$.cookie("shopcar", str);
		var minus = $(".minus");
		var plus = $(".plus");
		minus.click(function() {
			dominus(shopcarlist, $(this));
		});
		plus.click(function() {
			doplus(shopcarlist, $(this));
		})
	}
})