/*! made in 2013 by rodrigo brancher (http://nudesign.com.br)
 * and released as open source software
 *
 * Version: 0.0.1
 */

(function ( $, window, document, undefined ) {
    var pluginName = "centralize",
        defaults = {
          adjustable_attr: 'margin',
          ref_container: $(window),
          use_data: false,
          centralize_width: true,
          centralize_height: true,
          allow_negative_adjustment: false
        };

    function Centralize( element, options ) {
      this.element = element;
      this.options = $.extend( {}, defaults, options );

      this._defaults = defaults;
      this._name = pluginName;

      this.init();
    }

    Centralize.prototype = {
      init: function () {
        this.nulifyElementAdjustmentAttr();
        this.setElementAdjustment();
      },

      getRefContainerBoundaries: function () {
        return {'width': this.options.ref_container.width(), 'height': this.options.ref_container.height()};
      },

      getElementDimensions: function () {
        var width = 0,
            height = 0;

        if (this.options.use_data === true) {
          width = $(this.element).data('width');
          height = $(this.element).data('height');
        } else {
          width = $(this.element).width();
          height = $(this.element).height();
        }

        return {'width': width, 'height': height};
      },

      getAdjustmentValues: function () {
        var eD = this.getElementDimensions(),
            eW = eD['width'],
            eH = eD['height'],

            rD = this.getRefContainerBoundaries(),
            rW = rD['width'],
            rH = rD['height'],
            
            aW = Math.floor((rW - eW) / 2),
            aH = Math.floor((rH - eH) / 2);

            if (this.options.allow_negative_adjustment !== true) {
              if (eW > rW) {
                aW = 0;
              }

              if (eH > rH) {
                aH = 0;
              }
            }

            return {'width': aW, 'height': aH};
      },

      nulifyElementAdjustmentAttr: function () {
        if (this.options.adjustable_attr === 'margin') {
          $(this.element).css('margin', 0);

        } else if (this.options.adjustable_attr === 'position') {
          $(this.element).css({'left': 0, 'top': 0});
        }
      },

      setElementAdjustment: function () {
        var adjust = this.getAdjustmentValues();

        if (this.options.adjustable_attr === 'margin') {
          if (this.options.centralize_width === true) {
            $(this.element).css('margin-left', adjust['width']);
          }
          if (this.options.centralize_height === true) {
            $(this.element).css('margin-top', adjust['height']);
          }

        } else if (this.options.adjustable_attr === 'position') {
          if (this.options.centralize_width === true) {
            $(this.element).css('left', adjust['width']);
          }
          if (this.options.centralize_height === true) {
            $(this.element).css('top', adjust['height']);
          }
        }
      }
    };

    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Centralize( this, options ));
        }
      });
    };

})( jQuery, window, document );
