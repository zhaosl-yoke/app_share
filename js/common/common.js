function sercice(sUrl, callback, strdat) {
    window.httpStatusCode = {
    	"Continue" : { status : 100, error  : "指示客户端可能继续其请求！" },
    	"OK" : { status : 200, error  : "请求成功！" },
    	"Redirect" : { status : 302, error  : "页面重定向异常！" },
    	"Unauthorized" : { status : 401, error  : "资源没有认证或会话超时，请认证资源或尝试退出重新登录！" },
    	"Forbidden" : { status : 403, error  : "该页面没有访问权限！" },
    	"Bad Request" : { status : 400, error  : "请求无效！" },
    	"Not Found" : { status : 404, error  : "页面没找到！" },
    	"Internal Server Error" : { status : 500, error  : "服务器内部错误!" }
    };
	
	return $.ajax({
		url : sUrl,
		cache : false,
		data : strdat,
		type : 'post',
		dataType : 'json',
		success : function(data) {
			if (data) {
				callback(data);
			}
		},
		error : function( jqXHR, textStatus ) {
			if ( $(jqXHR.responseText).eq(3).text() === "登录" ) {
				var token = getToken();
				window.location = path + "/user/logout?token=" + token;
			}
			else if ( jqXHR.status != 0  ) {
				alert("服务器内部异常，请联系管理员！");
			}
			else if ( this.url.indexOf("selectReportAccount") != -1 ) {
				alert("操作过于频繁，请稍后再试！");
			}
			else {
				
			}
		}
	});
};
function getParametersOnUrl(parament) {
	var reg = new RegExp("(^|&)" + parament + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}
function showDate(now){  
	var   time = new Date(now)
    var   year = time.getFullYear();     
    var   month = time.getMonth()+1;     
    var   date = time.getDate();     
    var   hour = time.getHours();     
    var   minute = time.getMinutes();     
    var   second = time.getSeconds(); 
    if (month < 10) {
    	month = "0" + month;
    }
    if (date < 10) {
    	date = "0" + date;
    }
    return year+"-"+month+"-"+date;     
} 
function showTime(now){  
	var   time = new Date(now)
    var   year = time.getFullYear();     
    var   month = time.getMonth()+1;     
    var   date = time.getDate();     
    var   hour = time.getHours();     
    var   minute = time.getMinutes();     
    var   second = time.getSeconds(); 
    if (hour < 10) {
    	hour = "0" + hour;
    }
    if (minute < 10) {
    	minute = "0" + minute;
    }
    return hour+":"+minute;    
} 