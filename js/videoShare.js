$(function() {
	var url = "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/";
	var videoUrl = "music_essay/EF037F34-67CF-471C-B0F6-5EDD191A1EA912.mp4";
	var poster = "music_essay/88034C25-693C-4DDF-814C-1D1F26AFB69D.png";
	
	var ua = navigator.userAgent,
    isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua),
  	isIpad = /(iPad).*OS\s([\d_]+)/.test(ua),
  	isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua),
  	isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua),
  	isWechat = /micromessenger/i.test(ua);
	if ( isWechat&&isIphone ) {
		audioAutoPlay();
	} else {
		videoPlay();
	}		
	$('.video').css({
		"background":"url("+ url+poster +") no-repeat",
		"background-size":"cover",
		"background-position":"center"
	})
	$('.play').click(function() {
		$('#video').show();
		$('.play').hide();
		$('.video').css({
			"background":"#000",
		})
		if ( isWechat&&isIphone ) {
			audioAutoPlay();
		} else {
			videoPlay();
		}	
	})
	$('#video')[0].addEventListener("pause",function() {
		$('#video').hide();
		$('.play').show();
		$('.video').css({
			"background":"url("+ url+poster +") no-repeat",
			"background-size":"cover",
			"background-position":"center"
		})
	})
	function videoPlay() {
		$('#video').attr("src",url+videoUrl);
		$('#video').attr("poster",url+poster);
		$('#video')[0].play();
	}
	function audioAutoPlay() {
		document.addEventListener("WeixinJSBridgeReady", function () {
			$('#video').attr("src",url+videoUrl);
			$('#video').attr("poster",url+poster);
			$('#video')[0].play();
		},false)
	}
	$('.download').click(function() {
		location.href = "http://dwz.cn/2M5IJ4";
	})
})
