// Initialize stuff after Document is ready.
$(document).ready(function() {
   
   $('.project').addClass('invis1');
   
   // Useful variables
   var _c = 320,
       _title = $('#title'),
       _tags = $('#tags'),
       _options = $(".options"),
       _footer = $('#footer'),
       clickedOnOptions = false;
   
   // Pack the navigation elements (tag groups)
   $('.nest:not(.nohide)').slice(2).addClass('nosort').addClass("nestInvis");
   $('.nest:not(.nohide)').slice(1).addClass('nestInvis2')
   _tags.show().feedpack({
      itemClass: '.nest:visible:not(.nosort)',
      imageLoad : false,
      animate : true,
      forceWidth : true,
      containerWidthStep : _c
   });
   
   // Navigation tips showing member count for each category.
   // Generates tip html dynamically and then handles visibility on hover.
   $(".tag").each(function() {
      _this=$(this);
      _l=$( '.'+_this.attr('id') ).length;
      if (_l==1) {_sfx=" Item"} else {_sfx=" Items"}
      $('<div id="tip">'+_l+_sfx+'</div>').appendTo(_this);
   });
   
   //Fade out options after some delay...
   _options.data('invis',setTimeout(function() {_options.fadeOut(500)},2600));
   
   // Tag mouseover and mouseout behavior
   $(".tag").mouseenter(function() {
      _this=$(this);
      _id=this.id;
      // Transparent layer
      clearTimeout(_tags.data('actproj'));
      _tags.data('actproj',setTimeout(function() {
      $(".project").not("."+_id).removeClass("projectActive");
      $( "."+_id ).addClass("projectActive");
      },600));
      // Tooltip fadein
      _this.data('tipdelay',setTimeout(function() {_this.find('#tip').fadeIn(200)},800));
      // Expand navigation
      clearTimeout(_tags.data('compacttags'));
      if (_tags.is(".compact")) {
         _tags.data('expandtags',setTimeout(function() {_tags.removeClass("compact").feedpack()},240));
      }
   }).mouseleave(function() {
      _this=$(this);
      // Transparent layer
      clearTimeout(_tags.data('actproj'));
      $(".project").removeClass("projectActive");
      // Tooltip fadeout
      clearTimeout(_this.data('tipdelay'));
      _this.find('#tip').fadeOut(420);
   });
   
   _tags.mouseenter(function() {
      clearTimeout(_options.data('invis'));
      clearTimeout(_tags.data('compacttags'));
      _options.fadeIn(200);
   }).mouseleave(function() {
      clearTimeout(_tags.data('expandtags'));
      if (!_tags.is(".compact")) {
         _tags.data('compacttags',setTimeout(function() {_tags.addClass("compact").feedpack()},800));
      }
      _options.data('invis',setTimeout(function() {_options.fadeOut(500)},800));
   }).click(function() {
      // Expand navigation only if click was outside the options (sorting)
      // area.
      if (!clickedOnOptions) {
         clearTimeout(_tags.data('compacttags'));
         if (_tags.is(".compact")) {
            _tags.data('expandtags',setTimeout(function() {_tags.removeClass("compact").feedpack()},100));
         }
      }
      clickedOnOptions = false;
      _options.fadeIn(200);
   });
   
   $(".options").mouseover(function() {
      clearTimeout(_tags.data('expandtags'));
   }).click(function() {
      clickedOnOptions = true;
   })
   
   // Clicking tags
   $(".tag:not(#project)").click(function(e){
      _this = $(this);
      _id = this.id;
      
      $(".tag").addClass("tagInactive");
      $("."+_id+"-tag").add(_this).removeClass("tagInactive");
      
      $(".nest:not(.nohide)").addClass("nosort").addClass("nestInvis").removeClass("nestInvis2");
      _collection = $("."+_id+"-nest");
      _index = _collection.index(_this.parent())+1;
      _collection.slice(0,_index).add(".parent-is-"+_id).has(".tag").removeClass("nosort").removeClass("nestInvis");
      $(".parent-is-"+_id).addClass("nestInvis2");
      
      $(".project").not("."+_id).not("#control").addClass("nosort").fadeOut(400);
      $( "."+_id ).removeClass("nosort").fadeIn(400);
      
      _tags.feedpack();
      $('#preview-container').feedpack({animate: true, itemClass: '.project:not(.nosort)'});
   });
   
   $("#project").click(function() {
      _this = $(this);
      
      $(".tag").removeClass("tagInactive");
      
      $(".nest:not(.nohide)").addClass("nosort").addClass("nestInvis").removeClass("nestInvis2");
      _this.parent().next().add(_this.parent()).removeClass("nosort").removeClass("nestInvis");
      $(".parent-is-"+_id).addClass("nestInvis2");
      
      $( "."+this.id ).removeClass("nosort").fadeIn(400);
      _tags.feedpack();
      $('#preview-container').feedpack({animate: true, itemClass: '.project:not(.nosort)'});
   });
   
   // Save original element order into a new invisible div and Sort using TinySort
   // http://tinysort.sjeiti.com/
   $('.project').each(function(_i) {
      $(this).prepend("<div class=\"projectCat invis1\">"+_i+"</div>");
   });
   //$('.project').tsort('.projectDate', {order:'desc'});
   
   // Different Sorting Options
   $('#sbd').click(function() {
      $('.project:not(#control)').tsort('.projectDate', {order:'desc'});
      $('#preview-container').feedpack();
   });
   
   $('#sbc').click(function() {
      $('.project:not(#control)').tsort('.projectCat', {order:'asc'});
      $('#preview-container').feedpack({animate: true, itemClass: '.project:not(.nosort)'});
   });
   
   $('#sbr').click(function() {
      $('.project:not(#control)').tsort("",{order:"rand"});
      $('#preview-container').feedpack({animate: true, itemClass: '.project:not(.nosort)'});
   });
   
   // Show/hide project title and summary

   

   
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
         // <clumsy> delay of footer appearance so that it doesn't show initially. </clumsy>
         setTimeout(function() {$('#footer').fadeIn(500)}, 2500);
      }
   }).show();
   
   _title.add(_footer).each(function() {
      var _w = $(window).width(),
          _n = parseInt(_w/_c);
      $(this).width(_n*_c-20);
   });
   
   // Update title width on window resize.
   $(window).resize(function() {
      _title.add(_footer).each(function() {
         var _it = $(this);
         clearTimeout(_it.data("rsz"));
         _it.data("rsz", setTimeout(function() {
            var _w = $(window).width(),
                _n = parseInt(_w/_c);
            _it.width(_n*_c-20);
         }, 200) );
      });
   });
});