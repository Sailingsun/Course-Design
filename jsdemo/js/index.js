/**
 * 
 * @authors Your Name (Dtyctrl@example.org)
 * @date    2017-12-25
 * @version $Id$
 */
 	/*全屏滚动部分*/
 	var flag = 0;
	var num = 0;
	var countScroll = [];
	var _goodCou = new Array(10);
	_goodCou.fill(0);
	var priceSum = 0.0;
	function MouseScroll(){
		this.currentPage = 1;
		this.targetPage = 1;
	}
	MouseScroll.prototype = {
		init:function(){					//初始化
			if(flag == 0){
				this.addMouseWheelListener();
			}
		},
		scrollFunc:function(e){				//滚轴事件
			flag = 1;
			e = e || window.event;
			if(e.wheelDelta){				//判断IE，谷歌浏览器滑轮事件
				countScroll.push(e.wheelDelta);
				console.log(countScroll);
				if(e.wheelDelta > 0){
					/*由于鼠标滚轴会触发两次，屏蔽掉一次*/
					if (countScroll.length % 2 == 0) {
						this.targetPage--;
						if(this.targetPage <= 0){
							this.targetPage = 5;
						}
						// console.log("鼠标轴向上滚动");
						$("#page"+this.currentPage).fadeOut(500,function(){
							window.location.href = "#page" + this.targetPage;
						}.bind(this)).siblings("#page"+this.targetPage).fadeIn(800);
						this.currentPage = this.targetPage;
					}
				}
				else{
					if (countScroll.length % 2 == 0) {
						this.targetPage++;
						if(this.targetPage > 5){
							this.targetPage = 1;
						}
						//console.log("鼠标轴向下滚动");
						$("#page"+this.currentPage).fadeOut(500,function(){
							window.location.href = "#page" + this.targetPage;
						}.bind(this)).siblings("#page"+this.targetPage).fadeIn(800);
						this.currentPage = this.targetPage;
					}
				}
				if(this.targetPage == 3){
					vmp4.play(); 
				}
				else{
					vmp4.currentTime = 0;
					vmp4.pause();
				}
				if(this.targetPage == 4){
					setTimeout(function(){
						document.getElementById("outbox").style.visibility = 'visible';
					},500);
				}
				else{
					setTimeout(function(){
						document.getElementById("outbox").style.visibility = 'hidden';
					},500);
				}
				if(this.targetPage == 5){
					chioce();
					$('.left_arrow').click(function(){
						$(".box").find('img').removeAttr("style");
						if(num == 0)
							num += 4;
						num--;
						$(".box").eq(num%4).fadeIn().siblings("div").fadeOut();
						chioce();
					});
					$('.right_arrow').click(function(){
						$(".box").find('img').removeAttr("style");
						num++;
						$(".box").eq(num%4).fadeIn().siblings("div").fadeOut();
						chioce();
					});
				}
				document.getElementById("panelBody").style.visibility = 'visible';
				console.log("当前页面:"+this.currentPage);
			}
			else if(e.detail){				//判断Firefox浏览器滑轮事件
				if(e.detail > 0){
					console.log('鼠标轴向上滚动-firefox');
				}
				else{
					console.log('鼠标轴向下滚动-firefox');
				}
			}
			flag = 0;
		},
		addMouseWheelListener:function(){	//添加事件
			/*使用bind(this)指向原来对象，防止原来对象丢失*/
			window.onmousewheel = document.onmousewheel = this.scrollFunc.bind(this);
			if(document.addEventListener){  //兼容firefox
				document.addEventListener('DOMMouseScroll',this.scrollFunc.bind(this),false);
			}
			else{						    //兼容谷歌，IE
				document.attachEvent('onmousewheel',scrollFunc.bind(this));
			}
		}
	};
	var mousescroll = new MouseScroll();
	mousescroll.init();
	/*--------------------------*/
	$(function () { $("[data-toggle='tooltip']").tooltip(); });
	/*$(function () { $('.tooltip-show').on('show.bs.tooltip', function () {
		
	})});*/
	/*购物车部分*/
	$(document).ready(function(e) {
	var flag = 0;
	$(".Box-button span").click(function(){	
		if(flag == 0){
			$(".Box").animate({"right":"220px"},500);
			$(".a_Box").animate({"width":"220px"},500);
			flag = 1;
		}
		else{
			$(".Box").animate({"right":"0px"},500);
			$(".a_Box").animate({"width":"0px"},500);
			flag = 0;
		}
	});
	
	$(".Product ul li button").click(function(){
			var _goodid = $(this).parent().parent().attr("id");
			var _src = $(this).parent().parent().find("img").attr("src");
			var _tit = $(this).parent().parent().find("p.title").html();
			var _pir = $(this).parent().parent().find("p font").html();
			_goodCou[_goodid]++;
			if(_goodCou[_goodid] > 1){
				$(".a_Box div[id="+_goodid+"]").remove();
				priceSum -= parseFloat(_pir.replace("￥",''));
			}
			_pir = _goodCou[_goodid] * _pir.replace("￥",'');
			_pir = _pir.toFixed(2);
			$("#goodPanel").append("<div id="+_goodid+"><dl><dt class='a_Box-pic'><img src='"+_src+"'></dt><dd class='a_Box-title'>"+_tit
				+"</dd><dd class='a_Box-pirce'><span id='count'>"+_goodCou[_goodid]+"</span>￥"+_pir+"</dd></dl><hr><div>");
			addProduct(event);
			console.log(_goodCou);
			priceSum += parseFloat(_pir);
			console.log(priceSum);
			$("#priceSum").html(priceSum.toFixed(2));
	})
	
	
});

	function addProduct(event){
		var _this = $(event.target);  //js中事件是会冒泡的，所以this是可以变化的，
		//但event.target不会变化，它永远是直接接受事件的目标DOM元素；
		var offset = $(".Box-button").offset();
		var src = _this.parent().parent().find("img").attr("src");
		var flyer = $("<img src='"+src+"' class='fly'/>");
			
		flyer.fly({
			start:{
				left:event.clientX,
				top:event.clientY
			},
			end:{
				left:offset.left,
				top:offset.top,
				width:20,
				height:20
			},
			onEnd:function(){
				flyer.fadeOut("slow",function(){
					$(this).remove();	
				})
			}
		})
	}
	/*--------------------------*/
	/*flash广告部分*/
	function chioce(){
		var arrayList = [[{left:"25px",opacity:1},{left:"25px",opacity:1},{right:"0px",opacity:1}],
						[{top:"60px",opacity:1},{top:"180px",opacity:1},{bottom:"-110px",opacity:1}],
						[{left:"320px",opacity:"1"},{top:"200px",opacity:"1"},{opacity:"1"}],
						[{top:"0px",opacity:"1"},{opacity:"1"},{top:"220",opacity:"1"}]];

		$(".box").eq(Math.abs(num%4)).find('img').eq(0).animate(arrayList[num%4][0],1000,function(){
			$(".box").eq(num%4).find('img').eq(1).animate(arrayList[num%4][1],900,function(){
				$(".box").eq(num%4).find('img').eq(2).animate(arrayList[num%4][2],900);
			});
		});
	}
	/*--------------------------*/
	function identifyMsg(){
		var msgSend = document.getElementsByClassName("mess-send")[0];
		var inputMsg = document.getElementsByTagName("input");
		var targetMan = document.getElementById("targetMan");
		var yourname = inputMsg[0];
		var youremail = inputMsg[1];
		var entermail = inputMsg[2];
		var regex = /\w+@[a-z0-9]+\.[a-z]{2,4}/g;
		if(!regex.test(youremail.value)){				//这里需要将验证邮箱放在前边,减少用户的无效操作
			alert("您输入的邮箱格式不正确，请重输！");
			return false;
		}
		if(youremail.value != entermail.value){
			alert("您输入的确认邮箱与邮箱不同，请重输！");
			return false;
		}
		targetMan.action = (targetMan.action).replace(/yourname/g, yourname.value);
		targetMan.action = (targetMan.action).replace(/youremail/g, youremail.value);
		console.log(targetMan.action);
	}

	window.onload = window.onresize = function(){
		var _screenWidth,_screenHeight;
		var scrollFunc;
		var page = document.getElementsByClassName("wholePage");
		var showBlock = document.getElementsByClassName("show-block");
		var msgSend = document.getElementsByClassName("mess-send")[0];
		var picoutlook = document.getElementById("picoutlook");
		var vmp4 = document.getElementById("vmp4");
		var lgpic = document.getElementById("lgpic");
		$("#page1").fadeIn();
		if(window.innerWidth){
			_screenWidth = window.innerWidth;
			_screenHeight = window.innerHeight;
		}
		else{
			_screenWidth = $(window).width();
			_screenHeight = $(window).height();
		}
		for (var i = 0; i < page.length; i++) {
			page[i].style.width = _screenWidth + "px";
			page[i].style.height = _screenHeight + "px";
		}
		page1.style.lineHeight = (_screenHeight - 60) + "px";
		picoutlook.style.height = (_screenHeight-20) + "px";
		//console.log(_screenWidth+"~~~"+_screenHeight+"~~"+page1.style.width);
		for (var i = 0; i < showBlock.length; i++) {
			showBlock[i].onmouseover = function(){
				this.style.cursor = 'pointer';
				this.style.backgroundColor = 'rgb(197,102,38)';
				this.getElementsByTagName("b")[0].style.color = "white";
			}
			showBlock[i].onmouseout = function(){
				this.style.backgroundColor = 'rgb(70,70,70)';
				this.getElementsByTagName("b")[0].style.color = "rgb(197,102,38)";
			}
			showBlock[i].onclick = function(){
				//lgpic.src = this.getElementsByTagName("img")[0].src;
				var temp = this.getElementsByTagName("img")[0];
				$("#lgpic").animate({opacity:0.3},500);
				setTimeout(function(){
					lgpic.src = temp.src;
				}, 500);
				$("#lgpic").animate({opacity:1},500);
			}
		}
	}