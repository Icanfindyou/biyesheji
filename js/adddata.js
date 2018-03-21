$(function(){
	var foodtype = null;
	var food = null;
	var listr = "";
	var productsstr = "";
	var leftlist = $(".menu-left-list");
	var productsList = $(".menu-right");
	$.ajax({
		type:"get",
		url:"../data/food.json",
		async:false,
		success:function(data){
			food = data;
		}
	});
	$.ajax({
		type:"get",
		url:"../data/foodtype.json",
		async:false,
		success:function(data){
			foodtype = data;
		}
	});
	
	for(var index in food){
		listr+="<li foodtype='"+index+"'>"+foodtype[index]+"</li>";
	}
	leftlist.html(listr);
	addproducts(0);
	addorder(leftlist.find("li").eq(0))
	leftlist.find("li").click(function(){
		addorder($(this))
	})		
	function addproducts(foodtype){
		if(!$.cookie("loginuser")){
			var loginuser = null;
		}else{
			var loginuser = JSON.parse($.cookie("loginuser"))
		}
		var str = "";
		for(var index in food[foodtype]){
			str+="<div class='products' foodid='"+index+"'><dl><dt><img foodid='"+index+"' src='"+food[foodtype][index].imgurl+".jpg' /></dt><dd>"+food[foodtype][index].title+"</dd></dl><div class='hottype'></div><div class='price'>"+food[foodtype][index].price+"元</div><div class='botton'></div></div>"
		}
		productsList.html(str);
		if(!loginuser){
			$(".products").find(".botton").html("开始订餐");
		}else{
			$(".products").find(".botton").html("购买");
		}
	}
	
	
	//orderbox 获取数据
	function addorder(clickli){
		var foodtype = clickli.attr("foodtype");
		addproducts(foodtype);		 
		var products = $(".products");
		var imglist = products.find("img");
		var orderbgc = $(".orderbgc");
		var orderbox =  $(".order-box");
		imglist.click(function(){
			orderbox.find("h3").html(food[foodtype][$(this).attr("foodid")].title);
			orderbox.find(".confi").html(food[foodtype][$(this).attr("foodid")].dest);
			orderbox.find(".price").html(food[foodtype][$(this).attr("foodid")].price+"元");
			orderbox.find("img").attr("src",food[foodtype][$(this).attr("foodid")].imgurl+".jpg");
			orderbgc.css("display","block")
			orderbox.css("display","block")
		}) 
	}
})