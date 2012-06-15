// Gallery init.
$(function() {

  // Gallery above text
  // don't init gallery if it consists of a single photo
  if($("div.a-image").length > 1) {
    // wrap images
    $("div.a-image").wrapAll("<div id='a-image-wrapper'><div id='a-image-holder'></div></div>");
    $("div.a-image").show();
    
    // init gallery: Gallery.init(imageHolder, imageWrapperWidth, imageCountHolder, nextButton, prevButton)
    var g1 = Gallery();
    g1.init($("div#a-image-holder"), $("div#a-image-wrapper"), $("span#a-gallery-count")[0], $("a#next-a-image"), $("a#previous-a-image"));
    
    // better to show than to hide... (';
    $(".a-gal-nav").show();
  }
  
  // Gallery below text
  // don't init gallery if it consists of a single photo
  if($("div.b-image").length > 1) {
    // wrap images
    $("div.b-image").wrapAll("<div id='b-image-wrapper'><div id='b-image-holder'></div></div>");
    $("div.b-image").show();
    
    // init gallery: Gallery.init(imageHolder, imageWrapperWidth, imageCountHolder, nextButton, prevButton)
    var g2 = Gallery();
    g2.init($("div#b-image-holder"), $("div#b-image-wrapper"), $("span#b-gallery-count")[0], $("a#next-b-image"), $("a#previous-b-image"));

    // better to show than to hide... (';
    $(".b-gal-nav").show();
  }
  
  // Video... not sure if this works yet..
  if($("div.video").length > 1) {
    // wrap images
    $("div.video").wrapAll("<div id='video-wrapper'><div id='video-holder'></div></div>");
    $("div.video").show();
    
    var g2 = Gallery();
    g2.init($("div#video-holder"), $("div#video-wrapper"), $("span#video-gallery-count")[0], $("a#next-video"), $("a#previous-video"));

    // better to show than to hide... (';
    $(".video-gal-nav").show();
  }
});

// Initialize stuff after Document is ready.
$(document).ready(function() {
   
   // Fix for Chrome bug that messes the display of columns when the min-height
   // property is set.
   if (navigator.userAgent.toLowerCase().match('chrome'))
      document.getElementById('description').className = document.getElementById('description').className.replace(" minh", "");
   
   // Fade in and out for short url
   $('.shorturllabel').css({opacity : 0});
   $('.shorturl').mouseover(function() {
      clearTimeout($(this).data('time-mouseout'));
      $(this).children('.shorturllabel').show().animate({left : '10px', opacity : 1}, 400);
   }).mouseout(function() {
      var _this = $(this),
          _child = _this.children('.shorturllabel');
      clearTimeout($(this).data('time-mouseout'));
      _this.data('time-mouseout', setTimeout(function() {
         _child.animate({left : '0px', opacity : 0}, 400, function() {_child.hide()});
      }, 500));
   });

   // Initial sorting

   $('#preview-container.sort-date .project').tsort('.projectDate', {order:'desc'});
   $('#preview-container.sort-random .project').tsort("",{order:"rand"});

   // Pack project thumbnails beneath current project.
   $('#preview-container').freetile({
      selector: '.project:not(.nosort)',
      animate : true,
      forceWidth : true,
      containerWidthStep: 320,
      callback : function() {
         $('.project').each(function(i) {
            // Sequential fade in effect. Be aware: the display property is used here to enable animation
            // because the removeClass() alone won't animate display changes. But display should be
            // unset at the object level in the end to enable the object to show/hide (eg for filtering)
            var _this = $(this);
            setTimeout(function() {_this.fadeIn(360).removeClass('invis1').css('display','')}, 40*i );
         });
      }
   }).show();
});