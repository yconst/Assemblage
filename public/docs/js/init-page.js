// Initialize stuff after Document is ready.
$(document).ready(function() {
   
   // Fix for Chrome bug that messes the display of columns when the min-height
   // property is set.
   if (navigator.userAgent.toLowerCase().match('chrome'))
      document.getElementById('description').className = document.getElementById('description').className.replace(" minh", "");
      
   // Show/hide project title and summary
   $('.projectTitle').hide();
   
   // Mouse enter/leave behavior (show title & summary).
   $('.project').mouseenter(function() {
      $(this).find('.projectTitle').slideDown(80);
   }).mouseleave(function() {
      $(this).find('.projectTitle').slideUp(80);
   }).click(function() {
      $(this).find('.projectTitle').slideUp(80);
   });
   
   // Pack project thumbnails
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