Cookie = {
	getCookie: function(name){
		var flag = document.cookie.indexOf(name + '=');
		if (flag != -1) {
			flag += name.length + 1
			end = document.cookie.indexOf(';', flag)
			if (end == -1) end = document.cookie.length
			var CookieValue = unescape(document.cookie.substring(flag, end));
			if (CookieValue == undefined || CookieValue == 'undefined') {
				CookieValue = '';
			}
		} else {
			CookieValue = '';
		}
		return CookieValue;
	},
	
	setCookie: function(name, value, expiredays, close){
		var todayDate = new Date();
		var expiredate;

		if(expiredays) {
			todayDate.setDate(todayDate.getDate() + expiredays);
			expiredate = todayDate.toGMTString();
		} else expiredate = "";

		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expiredate;

		switch(close){
			case "L": $("#"+name).fadeOut(); break;
			case "W": window.close(); break;
		}
	},
	
	openPopupCheck: function(cid){
		var strCookie=Cookie.getCookie(cid);
		if(strCookie == "Y") $("#"+cid).hide();
	},

	closeLayer: function(cname){  
		$("#"+cname).fadeOut();
	}
}
