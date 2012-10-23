/*
TextFit, a simple plugin that decreases the font-size to fit an element.
@author: Everton Fraga http://github.com/evertonfraga/TextFit
*/
    
(function($){
    
    $.fn.textFit = function(options) {
        
        var defaults = { lines: 1, minFontSize: 28, action: 'shrink', clearHeight: false};
        options = $.extend(defaults, options);
    
        var shrinkText = function(el) {
            var $el = $(el),
                checkHeight = function() {
                    lineHeight = parseInt($el.css('line-height'), 10);
                    height = parseInt($el.height(), 10);
                    // if (!lineHeight && console) console.warn('Elemento sem line-height.', $el);
                    // if (!height && console) console.warn('Elemento sem height, com display inline ou oculto.', $el);
                    return height > lineHeight * options.lines;
                },
                checkFontLimit = function() {
                    fontSize = parseInt($el.css('font-size'), 10);
                    return fontSize > options.minFontSize;
                };
    
            while (checkHeight() && checkFontLimit()) {
                $el.css('font-size', --fontSize);
                height = parseInt($el.height(), 10);
            }
        };
    
        var ellipsis = function(el) {
            var $el = $(el);
            var text = $el.html();
            var hiddenNode = $(el.cloneNode(true)).css({
                'display': 'none',
                'position': 'absolute',
                'overflow': 'visible',
                'height': 'auto',
                'width': $el.width
            });
    
            $el.after(hiddenNode);
    
            while (text.length > 0 && (hiddenNode.height() > $el.height())) {
                text = text.substr(0, text.length - 1);
                hiddenNode.html(text + "...");
            }
    
            if (($el.html() == hiddenNode.html()) && (options.clearHeight)) {
                $el.css('height','auto');
            }
    
            $el.html(hiddenNode.html());
            hiddenNode.remove();
        };
    
        $(this).each(function(i, el){
            if (options.action=='ellipsis') {
                ellipsis(el);
            } else {
                shrinkText(el);
            }
        });
    };
    
})(jQuery);
