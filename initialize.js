//var Home = "tv.icloudinn.com";
//
////第一次进入直播间或者从其他直播间跳转过来
//if(typeof(sessionStorage.getItem('roomid')) == 'undefined' || isNaN(sessionStorage.getItem('roomid'))) {
//
//	//连接中没有id
//	if(location.href.indexOf('roomid') != -1) {
//		var searchArr = location.search.split('&'),
//			roomid = null;
//		for(var k in searchArr) {
//			var index = searchArr[k].indexOf('roomid='),
//				indexOf = null;
//			console.log(searchArr[k]);
//			if(index == -1) {
//				continue;
//			}
//			var indexOf = searchArr[k].indexOf('roomid=') + 7;
//
//			roomid = searchArr[k].split(indexOf);
//			break; //不考虑有多个id参数的情况下
//		}
//
//		sessionStorage.setItem('roomid', roomid);
//	}else{
//		
//	}
//
//}

//开始获取用户信息
function send_request(code) {
	var xmlhttp = null;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(xmlhttp != null) {
		serverUrl = './wx.php?code=' + code;
		xmlhttp.open("GET", serverUrl, false);
		xmlhttp.send(null);
		return xmlhttp.responseText
	} else {
		alert("Your browser does not support XMLHTTP.");
	}
};

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	console.log(reg);
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}

var openidUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7c5d202b6c5c830f&redirect_uri=http%3a%2f%2ftv.icloudinn.com?roomid=' + roomid + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

if(localStorage.isLogin != '1' || typeof(localStorage.openid) == 'undefined') {
	localStorage.setItem('isLogin', '1');
	location.href = openidUrl;
}

if(location.href.indexOf('code') != -1) {
	var code = getUrlParam('code');
	var result = send_request(code);
	localStorage.setItem('usrInfo', result);
	localStorage.setItem('openid', JSON.parse(result).openid);
}