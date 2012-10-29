// Original in Stacey Distribution
// http://staceyapp.com
//
// Some modifications made for use in the Assemblage Template
// by Yiannis Chatzikonstantinou
// http://yconst.com/web/assemblage

Gallery = function() {
    return {
        currentImage: 0,
        imageHolder: '',
        imageWrapper: '',
        imageCountHolder: '',
        maxCount: '',
        nextButton: '',
        prevButoon: '',
        init: function(imageHolder, imageWrapper, imageCountHolder, nextButton, prevButton, descriptionHolder, descriptionWidth) {
          // set custom variables
          this.imageHolder = imageHolder;
          this.imageWrapper = imageWrapper;
          this.imageCountHolder = imageCountHolder;
          this.maxCount = $("img", imageHolder).length;
          this.nextButton = nextButton;
          this.prevButton = prevButton;
          this.descriptionHolder = descriptionHolder;
          this.descriptionWidth = descriptionWidth;
          
          $(imageHolder).find(".image").width($(imageWrapper).width());
          // check if a specific image has been specified in the URL
          if(document.URL.match(/#[0-9]+/)) {
            this.gotoImage(new Number(new String(document.URL.match(/#[0-9]+/)).replace("#", "")) - 1);
          } else {
            // write maxCount
            this.updateCount(0);
          } 
          // Set max-width of each image to the actual image width
          // by loading that image to a new image object and catching
          // it's 'load' event.
          // http://stackoverflow.com/questions/318630/get-real-image-width-and-height-with-javascript-in-safari-chrome
          // What a mess.
          // Not only that, but make also make sure that the height
          // of the container is properly set after all images have
          // loaded and according to the current image's height.
          var _this = this;
          $(imageHolder).find('img').each(function(i) {
              var img = $(this)[0];
              var index = i;
              $('<img/>').attr('src', $(img).attr('src')).load(function() {
                $(img).css({
                  'width': '100%',
                  'max-width': this.width,
                  'height': 'auto'
                });
                if (index == _this.currentImage) {
                  _this.imageWrapper.css({height: img.height + "px"});
                }
              });
              var src = img.src; 
              // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
              // data uri bypasses webkit log warning (thx doug jones)
              img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
              img.src = src; 
          });
          // Continue attaching events as normal..
          this.attachEvents();
        },
        attachEvents: function() {
            var _this = this,
                _wrapper = this.imageWrapper,
                _holder = this.imageHolder;
            // write next/prev functions
            this.nextButton.click(function() {
                _this.next();
                this.blur();
                return false;
            });
            this.prevButton.click(function() {
                _this.previous();
                this.blur();
                return false;
            });
            _holder.find('.image').click(function() {
                _this.next();
                this.blur();
                return false;
            });
            // Bind to window resize. Debounced style.
            $(window).resize(function() {
                clearTimeout(_wrapper.data("resize-event"));
                _wrapper.data("resize-event", setTimeout(function() {
                  _wrapper.find(".image").css({'width' : _wrapper.width()}, 600);
                  _holder.css({marginLeft: (_this.currentImage * _wrapper.width()) * -1 + "px"});
                  _wrapper.animate({height: _holder.find('img')[_this.currentImage].height + "px"}, { duration: 400, queue: false });
                }, 200) );
            });
        },
        next: function() {
            // show next image
            this.gotoImage(this.currentImage + 1);
        },
        previous: function() {
            // show previous image
            this.gotoImage(this.currentImage - 1);
        },
        updateCount: function(newCount) {
            // set current image
            this.currentImage = newCount;
            // update current image display
            this.imageCountHolder.innerHTML = (newCount + 1) + "/" + this.maxCount;
            // update url hash
            //window.location.hash = (newCount + 1);
        },
        gotoImage: function(num) {
            // if not too high
            if(num >= this.maxCount) {
              num = 0;
            } else if(num < 0) {
              num = this.maxCount - 1;
            }
            //animate
            this.animateContainers(num);
            // update count
            this.updateCount(num);
        },
        animateContainers: function(num) {
            this.imageHolder.animate({
              marginLeft: (num * this.imageWrapper.width()) * -1 + "px"
            }, { duration: 600, queue: false });
            this.imageWrapper.animate({
              height: this.imageHolder.find('img')[num].height + "px"
            }, { duration: 400, queue: false });
            // skip attempt to animate description holder if it does not exist
            if(!this.descriptionHolder) return;
            
            this.descriptionHolder.animate({
              marginLeft: (num * this.descriptionWidth) * -1 + "px"
            }, { duration: 600, queue: false });
        }
    }
}