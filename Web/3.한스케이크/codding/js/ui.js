var mql = window.matchMedia('screen and (max-width: 640px)');

UI = {
	load: function(){

		UI.gnbAction();
		UI.lnbMobileAction();
		UI.backGroundwide();		
		UI.newsActive();
		UI.faqActive();

		var sub_cake_slider = $('.product_view_wrap .slider_wrap .slider');
		sub_cake_slider.cycle({
			fx : "scrollHorz",
			easing: "easeOutQuart",
			speed: 1000,
			timeout: 5000,
			swipe: true,
			autoHeight : 'container',
			pager : ".product_view_wrap .slider_wrap .slide_page",
			slides : "> span"
		});


		$(window).load(function(){
			// UI.mainActive();	
		});
	},

	SV : { 
		//Static Value
		_screenFlagMobile : mql.matches,
		_gnbFlag : true
	},

	backGroundwide : function (){
		//$('.sub_visual_box').yjBgResize();
		$('.story_visual_box').yjBgResize();
		$('.story_bottom_visual1').yjBgResize();
		$('.story_bottom_visual2').yjBgResize();
		$('.main_visual_wrap .slider .s1').yjBgResize();
		$('.main_visual_wrap .slider .s2').yjBgResize();
		$('.main_visual_wrap .slider .s3').yjBgResize();
	},

	gnbAction: function(){	
		var gnb_wrap_obj = $('.gnb_wrap');
		var gnb_obj = $('#gnb');
		var gnb_child_obj = gnb_obj.children();
		var gnb_child_opener = gnb_obj.find('.btn_depth1');
		var all_menu = $('#all_menu');

		gnb_child_obj.bind('mouseover focusin',function(){
			if (UI.SV._screenFlagMobile){return;}

			gnb_child_obj.removeClass('on');
			$(this).addClass('on');
		});

		gnb_child_obj.bind('mouseleave focusout',function(){
			if (UI.SV._screenFlagMobile){return;}

			gnb_child_obj.removeClass('on');
		});


		gnb_child_opener.bind('click',function(){
			if (!UI.SV._screenFlagMobile){return;}

			var this_parent = $(this).parent();
			if (this_parent.hasClass('on')){
				this_parent.removeClass('on');
			}else {
				gnb_child_obj.removeClass('on');
				this_parent.addClass('on');
			}
		});

		all_menu.bind('click',function(){
			if (!UI.SV._screenFlagMobile){return;}
			
			if (UI.SV._gnbFlag){
				$('#blank').css({'opacity':'0','display':'block'}).stop().animate({'opacity':'0.5'});
				gnb_wrap_obj.stop().animate({'height':gnb_obj.height()},500,'easeOutExpo',function (){
					gnb_wrap_obj.css({'height':'auto'});
				});
				UI.SV._gnbFlag = false;
			}else {
				$('#blank').stop().animate({'opacity':'0'},function (){
					$(this).css({'opacity':'0','display':'none'})
				});
				gnb_wrap_obj.stop().animate({'height':0},400,'easeOutExpo',function (){
					gnb_child_obj.removeClass('on');
				});
				UI.SV._gnbFlag = true;
			}
		});

		var gnb_resize = function (){
			// gnb respond reset
			
			if (UI.SV._screenFlagMobile){
				$('#header .inner_header').css({'height':''});
			}else {
				$('#header .gnb_wrap').css({'height':''});
			}
			UI.SV._gnbFlag = true;
		};

		$(window).resize(function(){
			if (UI.SV._screenFlagMobile == mql.matches){ return; }				
			UI.SV._screenFlagMobile = mql.matches;
			
			gnb_resize();
		});
	},

	lnbMobileAction : function (){
		var obj = $('.lnb_area1');
		var opener = obj.find('.tit');
		var layer = obj.find('.lnb_inner_box');

		opener.bind('click',function(){
			if (!mql.matches){ return; }
			
			if ( obj.hasClass('open_lnb') ){
				obj.removeClass('open_lnb');
				layer.stop().animate({'height': 0 });
			}else {
				obj.addClass('open_lnb');
				layer.stop().animate({'height': layer.find('>ul').height() });
			}
		});

		$(window).resize(function(){
			UI.SV._screenFlagMobile = mql.matches;
			if (mql.matches){
				layer.css({'height':'0'});
				obj.removeClass('open_lnb');
			}else {
				layer.css({'height':'auto'});
				obj.removeClass('open_lnb');
			}
		});
	},
	
	mainActive : function (){
		var main_visual_tabs = $('.main_contents .main_visual_wrap .slider_tabs li');
		var main_visual_slider = $('.main_contents .main_visual_wrap .slider');
		main_visual_slider.cycle({
			fx : "scrollHorz",
			easing: "easeOutQuart",
			speed: 1000,
			timeout: 5000,
			swipe: true,
			autoHeight : 'container',
			pager : ".main_contents .main_visual_wrap .slider_page",
			slides : "> a"
		});

		main_visual_slider.on( 'cycle-before', function( event, forwardFlag ){						
			main_visual_tabs.removeClass('on');
			main_visual_tabs.eq(forwardFlag.nextSlide).addClass('on');;
		});

		main_visual_tabs.each(function(i){this.num = i});
		main_visual_tabs.bind('click',function(){
			main_visual_slider.cycle('goto', this.num);
		});
	},

	subActive : function(){
		var main_product_slider = $('.main_contents .main_product_wrap .slider');
		main_product_slider.cycle({
			fx : "scrollHorz",
			easing: "easeOutQuart",
			speed: 1000,
			timeout: 5000,
			swipe: true,
			autoHeight : 'container',
			slides : "> li",
			prev : ".main_contents .main_product_wrap .prev",
			next : ".main_contents .main_product_wrap .next"
		});
		main_product_slider.cycle('pause');
		setTimeout(function(){
			main_product_slider.cycle('resume');
		},2500);
	},
	
	specialActive : function(){
		var special_product_slider = $('.sub_special .special_product_wrap .slider');
		special_product_slider.cycle({
			fx : "scrollHorz",
			easing: "easeOutQuart",
			speed: 1000,
			timeout: 5000,
			swipe: true,
			autoHeight : 'container',
			slides : "> li",
			prev : ".sub_special .special_product_wrap .prev",
			next : ".sub_special .special_product_wrap .next"
		});
		special_product_slider.cycle('pause');
		setTimeout(function(){
			special_product_slider.cycle('resume');
		},2500);
	},

	newsActive : function (){
		var obj = $('.news_list_wrap li');
		obj.bind('click',function(){
			if ( $(this).hasClass('on') ){
				$(this).removeClass('on');
			}else {
				obj.removeClass('on');
				$(this).addClass('on');
			}
		});
	},

	faqActive : function (){
		var obj = $('.faq_list_wrap li');
		obj.bind('click',function(){
			if ( $(this).hasClass('on') ){
				$(this).removeClass('on');
			}else {
				obj.removeClass('on');
				$(this).addClass('on');
			}
		});
	},

	layerPopup: function(_target, type){
		var this_layer	= $(_target),
			layer_wrap	= this_layer.find('.layer_wrap'),
			layer_black	= this_layer.find('.layer_black');

		switch(type){
			case 'open':
				this_layer.show();
				layer_black.fadeIn(200);
				layer_wrap.fadeIn(300);
				break;
			case 'close':
				this_layer.fadeOut(300, function(){
					layer_black.hide();
					layer_wrap.hide();
				});
				break;
			default:;
		}
	},

	tabAction: function(_tab, _con){
		var tab = $(_tab).children();
		var con = $(_con).children();

		tab.each(function(i){this.num = i});

		tab.click(function(){
			$(this).siblings().removeClass('on');
			$(this).addClass('on');
			con.eq(this.num).siblings().removeClass('on');
			con.eq(this.num).addClass('on');
		});
	}

}

$(document).ready(function(){
	UI.load();
	Cookie.openPopupCheck('layer_popup');
});