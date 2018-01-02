$(function() {
	var url = "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/";
	var videoUrl = "music_essay/EF037F34-67CF-471C-B0F6-5EDD191A1EA912.mp4";
	var poster = "music_essay/88034C25-693C-4DDF-814C-1D1F26AFB69D.png";
	
	
	 var myPlayer = videojs('my-video',{
	        bigPlayButton : true,
	        textTrackDisplay : true,
	        posterImage: true,
	        errorDisplay : true,
	        controlBar : true,
	        poster: url + poster
	    },function(){
	        console.log(this)
	        this.on('loadedmetadata',function(){
	            console.log('loadedmetadata');
	            //加载到元数据后开始播放视频
	            startVideo();
	        })

	        this.on('ended',function(){
	            console.log('ended')
	        })
	        this.on('firstplay',function(){
	            console.log('firstplay')
	        })
	        this.on('loadstart',function(){
	        //开始加载
	            console.log('loadstart')
	        })
	        this.on('loadeddata',function(){
	            console.log('loadeddata')
	        })
	        this.on('seeking',function(){
	        //正在去拿视频流的路上
	            console.log('seeking')
	        })
	        this.on('seeked',function(){
	        //已经拿到视频流,可以播放
	            console.log('seeked')
	        })
	        this.on('waiting',function(){
	            console.log('waiting')
	        })
	        this.on('pause',function(){
	            console.log('pause')
	        })
	        this.on('play',function(){
	            console.log('play')
	        })

	    });

	    var isVideoBreak;
	    function startVideo() {

	        myPlayer.play();

	       //微信内全屏支持
	        /*document.getElementById('roomVideo').style.width = window.screen.width + "px";
	        document.getElementById('roomVideo').style.height = window.screen.height + "px";*/


	        //判断开始播放视频，移除高斯模糊等待层
	        var isVideoPlaying = setInterval(function(){
	            var currentTime = myPlayer.currentTime();
	            if(currentTime > 0){
	                $('.vjs-poster').remove();
	                clearInterval(isVideoPlaying);
	            }
	        },200)

	        //判断视频是否卡住，卡主3s重新load视频
	        var lastTime = -1,
	            tryTimes = 0;
	        
	        clearInterval(isVideoBreak);
	        isVideoBreak = setInterval(function(){
	            var currentTime = myPlayer.currentTime();
	            console.log('currentTime'+currentTime+'lastTime'+lastTime);

	            if(currentTime == lastTime){
	            	//此时视频已卡主3s
	            	//设置当前播放时间为超时时间，此时videojs会在play()后把currentTime设置为0
	                myPlayer.currentTime(currentTime+10000);
	                myPlayer.play();

	                //尝试5次播放后，如仍未播放成功提示刷新
	                if(++tryTimes > 5){
	                    alert('您的网速有点慢，刷新下试试');
	                    tryTimes = 0;
	                }
	            }else{
	                lastTime = currentTime;
	                tryTimes = 0;
	            }
	        },3000)

	    }
	$('.download').click(function() {
		location.href = "http://dwz.cn/2M5IJ4"
	})
})
