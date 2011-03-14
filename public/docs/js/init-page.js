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

   // Pack project thumbnails beneath current project.
   $('#preview-container').feedpack({
      itemClass: '.project:not(.nosort)',
      animate : true,
      forceWidth : true,
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