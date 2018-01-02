$(function() {
	var url = "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/";
	var mySwiper = new Swiper ('#swiper', {
	    loop: true,
	    paginationClickable: true,
	   	observer:true,//修改swiper自己或子元素时，自动初始化swiper
    	observeParents:true,//修改swiper的父元素时，自动初始化swiper
	    //分页器
	   	pagination: '.swiper-pagination',
  	}) 
  	var isClick;
  	var $wrapper = $('.swiper-wrapper');
  	var $slide = '';
  	$.ajax({
  		type:"get",
  		url:"data/data.json",
  		async:true,
  		success:function(data) {
  			console.log(data);
  			if (data.success) {
  				var listMyVideos = data.body.listMyVideos;
  				if (listMyVideos.length) {
  					for (var i = 0;i < listMyVideos.length; i++) {
  						var photoPath = url + listMyVideos[i].photoPath;
  						var id = listMyVideos[i].id;
  						var desc = listMyVideos[i].id;
  						$slide += '<a  class="swiper-slide" data-med="'+ photoPath +'" data-size="1600x1600" data-med-size="1024x1024"><img src="'+ photoPath +'" style="width: 100%;"></a>'
  					}
  					$wrapper.append($slide);
  					var imgss= $(".swiper-slide img");
					$(".swiper-slide img").each(function() {
						var imgs = new Image();
						imgs.src=$(this).attr("src");
						var w = imgs.width,
						h =imgs.height;
						$(this).parent("a").attr("data-size","").attr("data-size",w+"x"+h);
					})
					initPhotoSwipeFromDOM('.demo-gallery');
  					setTimeout(function() {
  						$(".swiper-slide img").each(function() {
							var imgs = new Image();
							imgs.src=$(this).attr("src");
							var w = imgs.width,
							h =imgs.height;
							$(this).parent("a").attr("data-size","").attr("data-size",w+"x"+h);
							$(this).parent("a").attr("data-med-size","").attr("data-med-size",w+"x"+h);
						})
  					},1000)
  				}
  			}
  		}
  	});
  	$('.download').click(function() {
		location.href = "http://dwz.cn/2M5IJ4"
	})
  	var initPhotoSwipeFromDOM = function(gallerySelector) {
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    el,
                    childElements,
                    thumbnailEl,
                    size,
                    item;
            for(var i = 0; i < numNodes; i++) {
                el = thumbElements[i];

                // include only element nodes
                if(el.nodeType !== 1) {
                    continue;
                }

                childElements = el.children;

                size = el.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: el.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    author: el.getAttribute('data-author')
                };

                item.el = el; // save link to element for getThumbBoundsFn

                if(childElements.length > 0) {
                    item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                    if(childElements.length > 1) {
                        item.title = childElements[1].innerHTML; // caption (contents of figure)
                    }
                }


                var mediumSrc = el.getAttribute('data-med');
                if(mediumSrc) {
                    size = el.getAttribute('data-med-size').split('x');
                    // "medium-sized" image
                    item.m = {
                        src: mediumSrc,
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };
                }
                // original image
                item.o = {
                    src: item.src,
                    w: item.w,
                    h: item.h
                };

                items.push(item);
            }
			//console.log(items)
            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            var clickedListItem = closest(eTarget, function(el) {
                return el.tagName === 'A';
            });

            if(!clickedListItem) {
                return;
            }

            var clickedGallery = clickedListItem.parentNode;

            var childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;

            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) {
                    continue;
                }

                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if(index >= 0) {
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                    params = {};

            if(hash.length < 5) { // pid=1
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if(pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;
            items = parseThumbnailElements(galleryElement);
            // define options (if needed)
            options = {
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    // See Options->getThumbBoundsFn section of docs for more info
                    var thumbnail = items[index].el.children[0],
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                },
                addCaptionHTMLFn: function(item, captionEl, isFake) {
                    if(!item.title) {
                        captionEl.children[0].innerText = '';
                        return false;
                    }
                    captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
                    return true;
                }

            };
            // options for control bar
            options.shareEl = false;
            options.fullscreenEl = false;
            if(fromURL) {
                if(options.galleryPIDs) {
                    // parse real index when custom PIDs are used
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }
            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            // see: http://photoswipe.com/documentation/responsive-images.html
            var realViewportWidth,
                    useLargeImages = false,
                    firstResize = true,
                    imageSrcWillChange;

            gallery.listen('beforeResize', function() {
                var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                dpiRatio = Math.min(dpiRatio, 2.5);
                realViewportWidth = gallery.viewportSize.x * dpiRatio;
                if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
                    if(!useLargeImages) {
                        useLargeImages = true;
                        imageSrcWillChange = true;
                    }
                } else {
                    if(useLargeImages) {
                        useLargeImages = false;
                        imageSrcWillChange = true;
                    }
                }
                if(imageSrcWillChange && !firstResize) {
                    gallery.invalidateCurrItems();
                }
                if(firstResize) {
                    firstResize = false;
                }
                imageSrcWillChange = false;
            });
            gallery.listen('gettingData', function(index, item) {
                if( useLargeImages ) {
                    item.src = item.o.src;
                    item.w = item.o.w;
                    item.h = item.o.h;
                } else {
                    item.src = item.m.src;
                    item.w = item.m.w;
                    item.h = item.m.h;
                }
            });
            gallery.init();
        };
        // select all gallery elements
        var galleryElements = document.querySelectorAll( gallerySelector );
        console.log(galleryElements)
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        console.log(hashData)
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };		  	
})
