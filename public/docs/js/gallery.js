// Original in Stacey Distribution
// http://staceyapp.com
//
// Some modifications made for use in the Assemblage Template
// by Yiannis Chatzikonstantinou
// http://yconst.com/web/assemblage

Gallery = {
  currentImage: 0,
  imageHolder: null,
  imageWrapper: null,
  imageCountHolder: null,
  maxCount: null,
  nextButton: null,
  prevButoon: null,
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
    $(imageHolder).find('img').each(function() {
        var img = $(this)[0];
        $('<img/>').attr('src', $(img).attr('src')).load(function() {
          $(img).css({
            'width': '100%',
            'max-width': this.width,
            'height': 'auto'
          });
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
    // write next/prev functions
    this.nextButton.click(function() {
      Gallery.next();
      this.blur();
      return false;
    });
    this.prevButton.click(function() {
      Gallery.previous();
      this.blur();
      return false;
    });
    // Bind to window resize. Debounced style.
    var _this = this;
    var _wrapper = $(this.imageWrapper);
    $(window).resize(function() {
      clearTimeout(_wrapper.data("resize-event"));
      _wrapper.data("resize-event", setTimeout(function() {
        _wrapper.find(".image").animate({'width' : _wrapper.width()}, 600);
        _this.gotoImage(_this.currentImage);
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
    
    // skip attempt to animate description holder if it does not exist
    if(!this.descriptionHolder) return;
    
    this.descriptionHolder.animate({
      marginLeft: (num * this.descriptionWidth) * -1 + "px"
    }, { duration: 600, queue: false });
  }
}