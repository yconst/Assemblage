// Initialize stuff after Document is ready.
$(document).ready(function() {
   
   $('.project').addClass('invis1');
   
   // Useful variables
   var _tags=$('#tags');
   var _home=$('#project').find('img');
   
   // Pack the navigation elements (tag groups)
   $('.nest:not(.nohide)').addClass('nosort').hide();
   _tags.feedpack({
      itemClass: '.nest:not(.nosort)',
      imageLoad : false,
      forceWidth : true,
      snapHeight : 64,
      snapClass : "nest"
   });
   
   // Set an interval for bouncing the navigation arrow.
   var _interval = setInterval(function() {
      $('#slidebutton').animate({top:"-=3px"},40)
                     .animate({top:"+=6px"},80)
                     .animate({top:"-=5px"},100)
                     .animate({top:"+=4px"},120)
                     .animate({top:"-=3px"},150)
                     .animate({top:"+=2px"},200)
                     .animate({top:"-=1px"},120)
   }, 3000);
   
   // Nav arrow (top left) behavior & show.
   $('#slidebutton').click(function() {
      _this=$(this);
      _child=_this.find("img");
      _tags.slideToggle(200, function() {
         if (_tags.is(':visible')) {
            _child.attr("src", _child.attr("src").replace("arrow", "arrow_up"));
         } else {
            _child.attr("src", _child.attr("src").replace("arrow_up", "arrow"));
         }
         // Clear the bouncing arrow interval, it shouldn't become
         // a pain in the ass.
      clearInterval(_interval);
      });
   }).fadeIn(500);
   
   // Navigation tips showing member count for each category.
   // Generates tip html dynamically and then handles visibility on hover.
   $(".tag").each(function() {
      _this=$(this);
      _l=$( '.'+_this.attr('id') ).length;
      if (_l==1) {_sfx=" Item"} else {_sfx=" Items"}
      $('<div id="tip">'+_l+_sfx+'</div>').appendTo(_this);
   }).mouseover(function() {
      _this=$(this);
      _this.data('tipdelay',setTimeout(function() {_this.find('#tip').fadeIn(200)},800));
   }).mouseout(function() {
      _this=$(this);
      clearTimeout(_this.data('tipdelay'));
      _this.find('#tip').fadeOut(420);
   });
   
   // Category selection, tree highlighting and object filtering.
   $(".tag").mouseover(function(){
      $(".project").not("."+this.id).not("#control").removeClass("projectActive");
      $( "."+this.id ).addClass("projectActive");
   });
   
   // Moving mouse out of tag element
   $(".tag").mouseout(function(){
      $(".project").removeClass("projectActive");
   });
   
   // Clicking tags
   $(".tag").click(function(e){
      _this = $(this);
      
      $(".tag").addClass("tagInactive");
      $("."+this.id+"-tag").add(_this).removeClass("tagInactive");
      
      $(".nest:not(.nohide)").addClass("nosort").hide();
      $("."+this.id+"-nest").has(".tag").removeClass("nosort").show();
      
      $(".project").not("."+this.id).not("#control").addClass("nosort").fadeOut(400);
      $( "."+this.id ).removeClass("nosort").fadeIn(400);
      _tags.feedpack();
      $('#container').feedpack({animate: true, itemClass: '.project:not(.nosort)'});
      
   });
   
   // Clicking on "Home" tag behavior
   $(".home-tag").click(function(e){
      _this = $(this);
      $(".tag").removeClass("tagInactive");
      $(".project").removeClass("nosort").fadeIn(400);
      $('#container').feedpack({animate: true, itemClass: '.project:not(.nosort)'});
   });
   
   // Save original element order into a new invisible div and Sort using TinySort
   // http://tinysort.sjeiti.com/
   $('.project:not(#control)').each(function(_i) {
      $(this).prepend("<div class=\"projectCat invis1\">"+_i+"</div>");
   });
   //$('.project:not(#control)').tsort('.projectDate', {order:'desc'});
   
   $('#sbd').click(function() {
      $('.project:not(#control)').tsort('.projectDate', {order:'desc'});
      $('#container').feedpack();
   });
   
   $('#sbc').click(function() {
      $('.project:not(#control)').tsort('.projectCat', {order:'asc'});
      $('#container').feedpack({animate: true, itemClass: '.project:not(.nosort)'});
   });
   
   // Pack project thumbnails
   $('#container').feedpack({
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
         // <clumsy> delay of footer appearance so that it doesn't show initially. </clumsy>
         setTimeout(function() {$('#footer').fadeIn(500)}, 2500);
      }
   }).show();
});