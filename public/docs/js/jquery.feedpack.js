//  Copyright (c) 2010-2011, Ioannis (Yiannis) Chatzikonstantinou, All rights reserved.
//  http://www.yconst.com
//  http://www.volatileprototypes.com
// 
//  Redistribution and use in source and binary forms, with or without modification, 
//  are permitted provided that the following conditions are met:
//  	- Redistributions of source code must retain the above copyright 
//  notice, this list of conditions and the following disclaimer.
//  	- Redistributions in binary form must reproduce the above copyright 
//  notice, this list of conditions and the following disclaimer in the documentation 
//  and/or other materials provided with the distribution.
//  
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
//  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
//  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
//  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
//  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
//  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
//  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
//  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
//  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY 
//  OF SUCH DAMAGE.

(function($) {
  
  $.fn.feedpack = function(options) {
	
	var _container,_cdata,_o,_elements,_l;
	
	_container = this;
	_cdata = _container.data('fdpk');
	_o = $.extend(true,
	  {},
	  $.fn.feedpack.defaults,
	  _cdata,
	  $.fn.feedpack.reset,
	  options
	);
	_elements = _o.itemClass === undefined ? _container.children() : _container.children(_o.itemClass);
	_l = _elements.length;
	
	// Just return the container if it's empty.
	if (_l < 1) {return(_container)}
	
	return _container.each(function() {
	  
	  var _colWidth,_columns,_currentTop,_disp, _vis;
	  
	  // Store position-related values
	  _disp=_container.css('display');
	  _vis=_container.css('visibility');
	  // Hide the container so that we can do all sorts of tricks to it...
	  _container.css({ display: 'block', width: '', visibility: 'hidden' });
	  _colWidth = _o.columnWidth === undefined ? _elements.outerWidth(true) : _o.columnWidth;
	  _columns = Math.floor(_container.width() / _colWidth);
	  
	  _currentTop = [];
	  for (i = _columns;i-->0;) {_currentTop.push(0)}
	
	  var _this, _span, _range, tempTop, _values, _top, _left, _idx, _newH;
	  
      // Position each element.
      _elements.each(function(_i) {
          
          // Well now..
          _this=$(this);
          
          // Find out how many columns the element spans.
          _span = Math.min(_columns, Math.ceil( _this.outerWidth(true) / _colWidth ));
          
          // Index possible element positions.			/	inspired by jQuery.Masonry
          _range = _columns - _span + 1;
          _tempTop = [];
          for (i=0; i<_range; i++) {
            _values = _currentTop.slice(i,i + _span);
            _tempTop.push(Math.max.apply(Math, _values));
          }
          
          // If snapHeight is defined, 'snap' to the next multiple of snapHeight
		  // only for elements belonging to the snapClass selector.
          _top = _o.snapHeight === undefined || !_this.hasClass(_o.snapClass) ?
          Math.min.apply(Math, _tempTop) :
          Math.floor(Math.min.apply(Math, _tempTop)/_o.snapHeight + 0.9999)*_o.snapHeight;
          
          // The column closest to the left <=minY value.
          for (i = _columns;i-->0;) {if (_tempTop[i] <= _top) {_idx = i}}
          _left = _idx * _colWidth;
          
		  //Add the callback function to animationOptions if it is the last element.
		  if (_i>=_l-1) {_o.animationOptions.complete = _o.callback}
		  
		  //Position the element.
		  // The following was a cause for "Too Much Recursion(Firefox)/Rangeerror(Safari).
		  // Apparently a jQuery 1.3.2 bug, workaround found at
		  // http://bugs.jquery.com/ticket/3583 :
		  // "options.old (set in $.speed for queueing purpose) seems to store
		  // too much recursive call and freeze the browser when called more
		  // than x times"
		  if (!_this.hasClass('noanim') && _o.animate && _cdata) {
			_this.animate({left: _idx * _colWidth + 'px', top: _top + 'px'}, $.extend( true, {}, _o.animationOptions));
		  } else {
			_this.css({left: _idx * _colWidth + 'px', top: _top + 'px'});
		  }
		  
          // Increase values in the currentTop array depending on the
          // span of the current element(_span)
          _newH = _top + _this.outerHeight(true);
          for (i=0;i<_span;i++) {_currentTop[_idx+i] = _newH}
      });

	  // Define container-specific CSS and force width if forceWidth is true,
	  // taking into account containerWidthStep if present, to specify a different
	  // step than the width of the elements.
	  // Also restore original position information.
	  _ccss={display: _disp, visibility: _vis};
	  if (_o.forceWidth) {
		_ccss.width=_o.containerWidthStep? _o.containerWidthStep*(parseInt(_container.width()/_o.containerWidthStep)) : _columns*_colWidth;
	  }
	  _container.css(_ccss);
	  _ccss={height: Math.max.apply(Math, _currentTop)};
      if (_o.animate && _cdata) {_container.animate(_ccss, $.extend( true, {}, _o.animationOptions))} else {_container.css(_ccss);}
	  
	  // Set position of items to absolute. http://bit.ly/hpo7Nv
	  _elements.css({position: 'absolute'});
	  
	  // Trigger callback if we are not animating or if it is the first time.
	  if (!_o.animate || !_cdata) {setTimeout(_o.callback,1)}
	  
	  if (!_cdata) {

		// Bind to image load.							/	Inspired by jQuery.vgrid.
		if (_o.imageLoad) {
		  _container.find("img").load(function() {
			clearTimeout(_container.data("imglt"));
			_container.data("imglt", setTimeout(function() {_container.feedpack()}, 200) );
		  });
		}
		
		// Bind to window resize.						/	Inspired by jQuery.vgrid.
		if (_o.containerResize) {
		  $(window).resize(function() {
			clearTimeout(_container.data("rszt"));
			_container.data("rszt", setTimeout(function() {_container.feedpack()}, 200) );
		  });
		}
	  }
	  _container.data('fdpk', _o);
    });
  };
  
  // Defaults
  $.fn.feedpack.defaults = {
	itemClass : undefined,
	columnWidth : undefined,
	snapHeight : undefined,
	snapClass : undefined,
	animate : false,
	imageLoad : true,
	containerResize : true,
	forceWidth : false,
	containerWidthStep : undefined
  }
  
  // Overriding options.
  $.fn.feedpack.reset = {
	animationOptions : { complete: function() {} },
	callback : function() {}
  }
  
})(jQuery);