$(function() {
	var url = "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/";
	var videoUrl = "music_essay/EF037F34-67CF-471C-B0F6-5EDD191A1EA912.mp4";
	var poster = "music_essay/88034C25-693C-4DDF-814C-1D1F26AFB69D.png";
	$('.video').css({
		"background":"url("+ url+poster+") no-repeat",
		"background-size":"cover",
		"background-position":"center"
	})
	$('.download').click(function() {
		location.href = "http://dwz.cn/2M5IJ4"
	})
})
