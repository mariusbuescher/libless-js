( function ( root, factory ) {

    if ( typeof define === 'function' && define.amd ) {
        define([], factory);
    } else if ( typeof module === 'object' && typeof module.exports ) {
        module.exports = factory();
    } else {
        root.Carousel = factory();
    }

} )( this, function () {
    'use strict';

    /**
     * Carousel class
     * @param {HTMLElement} element
     * @param {Object} options
     * @return {Carousel}
     * @constructor
     */
    var Carousel = function (element, options) {
        this.element = element;
        this.settings = options || {};

        this.items = [];

        // iterate over items and push into items array
        Array.prototype.forEach.call(this.element.children, function (item) {
            this.items.push(item);
        }.bind(this));

        // create stage
        this.stage = document.createElement('div');
        this.stage.classList.add(this.settings.stageClass || 'carousel__stage');

        // add items to stage
        this.items.forEach(function (item) {
            this.stage.appendChild(item);
        }.bind(this));

        // Add clones
        if (this.settings.loop === true) {
            this.stage.appendChild(
                this.items[0].cloneNode(true)
            );

            this.stage.insertBefore(
                this.items[this.items.length - 1].cloneNode(true),
                this.items[0]
            );
        }

        // set current index to 0 UGH, need refoctor
        this.currentIndex = null;

        this.goTo(this.settings.start || 0);

        // adds stage to element
        this.element.appendChild(this.stage);

        this.plugins = [];

        this.settings.plugins.forEach(function (plugin) {
            plugin.init(this);
            this.plugins.push(plugin);
        }, this);

        // add initialized class
        this.element.classList.add(this.settings.initializedClass || 'carousel--initialized');

        return this;
    };

    /**
     * go to method
     *
     * @param {Number} index
     */
    Carousel.prototype.goTo = function(index) {
        var position = null;

        // check for boundaries
        if (index >= 0 && index < this.items.length && index !== this.currentIndex) {
            position = (this.settings.loop === true) ? index + 1 : index;

            this.stage.style.transform = (position === 0) ? 'translateX(0)' : 'translateX(-' + position * 100 + '%)';
            this.currentIndex = index;
        } else if (this.settings.loop === true && (index === -1 || index === this.items.length)) {
            position = (index === -1) ? 0 : this.items.length + 1;

            var transitionendCb = function (evt) {
                if (evt.propertyName === 'transform' && evt.target === this.stage) {
                    this.stage.removeEventListener('transitionend', transitionendCb);

                    // romove transitions
                    this.stage.style.transition = 'none';

                    index = (index === -1) ? this.items.length - 1 : 0;

                    // wait one frame
                    requestAnimationFrame(function () {

                        // go to real item
                        this.goTo(index);

                        // wait one frame
                        requestAnimationFrame(function () {

                            // turn on transition
                            this.stage.style.transition = null;
                        }.bind(this));
                    }.bind(this));
                }
            }.bind(this);
            this.stage.addEventListener('transitionend', transitionendCb);

            this.stage.style.transform = (position === 0) ? 'translateX(0)' : 'translateX(-' + position * 100 + '%)';
        }
    };

    /**
     * Next slide
     */
    Carousel.prototype.next = function () {
        this.goTo(this.currentIndex + 1);
    };

    /**
     * Previous slide
     */
    Carousel.prototype.prev = function () {
        this.goTo(this.currentIndex - 1);
    };

    return Carousel;

} );
