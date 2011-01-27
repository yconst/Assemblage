// Initialize stuff after Document is ready.
$(document).ready(function() {
   
    
});

$(window).load(function() {
	
	//Nav arrow (top left) behavior & show.
   $('#navbutton').click(function() {
      _this=$(this);
      _chld=_this.find("img");
      _tags.slideToggle(200, function() {
         if (_tags.is(':visible')) {
            _chld.attr("src", _chld.attr("src").match(/[^\.]+/) + "_up.png");
         } else {
            _chld.attr("src", _chld.attr("src").replace("_up", ""));
         }
      });
   }).fadeIn(500).removeClass('invis').css('display','');

});