var path = '/ArtAppInst2';
//var path2 = 'https://www.artapp.cn';
var sUrl = {
	'getSign':path + '/app/getSign', //微信参数
	
}

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
		}
		/*error : function( jqXHR, textStatus ) {
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
		}*/
	});

};

function sercicebackdat(sUrl, callback, calbackdat, strdat) {
	$.ajax({
		url : sUrl,
		cache : false,
		data : strdat,
		type : 'post',
		dataType : 'json',
		success : function(data) {
			if (data) {
				callback(data, calbackdat);
			}
		},
		error : function( jqXHR, textStatus ) {
			debugger
		}
	});

};

function sercicebackdat2(sUrl, callback, calbackdat1, calbackdat2, calbackdat3, calbackdat4, calbackdat5, strdat) {
	$.ajax({
		url : sUrl,
		cache : false,
		data : strdat,
		type : 'post',
		dataType : 'json',
		success : function(data) {
			if (data) {
				callback(data, calbackdat1, calbackdat2, calbackdat3,calbackdat4, calbackdat5);
			}
		},
		error : function( jqXHR, textStatus ) {
			debugger
		}
	});

};

function getToken() {
	return getParametersOnUrl("token");
};

function getParametersOnUrl(parament) {
	var reg = new RegExp("(^|&)" + parament + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}

function common(dat) {
	alert(dat.msg);
}


//显示加载框
function loading(mess){
	top.$.jBox.tip.mess = null;
	top.$.jBox.tip(mess,'loading',{opacity:0});
}

// 确认对话框
function confirmx(mess, href){
	top.$.jBox.confirm(mess,'系统提示',function(v,h,f){
		if(v=='ok'){
			loading('正在提交，请稍等...');
			location = href;
		}
	},{buttonsFocus:1});
	top.$('.jbox-body .jbox-icon').css('top','55px');
	return false;
}

/* ==========================================================================
 * ArtApp Application
 * Version: 1.0.0
 * ---------------------------------------------------------------------------
 * Author: artapp
 * Website: https://www.artapp.cn
 * Email: jianxiong0322@gmail.com
 * ========================================================================== */

var Artapp = App = function(){
	
    return {
    	
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
        	$(document).click(function(){
        		var $dropdownList = top.$('.dropdown-toggle');
        		$dropdownList.each(function(index,dropdown){
        			var $dropdown = top.$(dropdown);
                    var parent = $dropdown.parent();
                    var isActive = parent.hasClass("open");
                    if ( isActive ) {
                    	$dropdown.dropdown('toggle');
                    }	
        		})
        	})
        },
        
        /**
         * 执行apply，扩展LS对象函数isUndefined。
         * isUndefined method.
         * @method isUndefined
         * @param {Object} e 变量
         * @return {Boolean} true/false
         **/
		isUndefined : function(e) {
			try {
				return e === void 0;
			} catch (ex) {
				return typeof e === 'undefined';
			}
		},
		
        /**
         * 执行apply，扩展LS对象函数isDefined.
         * isDefined method.
         * @method isDefined
         * @param {Object} e JS 变量
         * @return {Boolean} true/false
         **/    			
		isDefined : function(e) {
			return typeof e !== "undefined"
		},
    	
    	/**
    	 * APP.alert
    	 */
    	alert: function( options ,callback ) {
			try {
				swal;
			} catch (ex) {
				return ;
			}
    		// 默认配置
    		settings = {
    			title: "系统提示"
    		}
    		
    		
        	if ( $.isPlainObject( options ) ) {
        		$.extend( true, settings, options );
        		callback = callback || function(){};
        		swal(settings, callback);
        	}
        	else if ( arguments.length > 1) {
        		settings.title =  arguments[0] || "系统提示";
        		settings.text = arguments[1] || '';
        		settings.type = arguments[2] || '';
        		swal(settings);
        	}
        	else {
        		settings.title = "系统提示";
        		settings.text = arguments[0] || '';
        		settings.type = arguments[1] || '';
        		swal(settings);
        	}
    	}
    }
	
}();

Artapp.init();
