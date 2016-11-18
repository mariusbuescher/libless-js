( function ( root, factory ) {

    if ( typeof define === 'function' && define.amd ) {
        define(['carousel'], factory);
    } else if ( typeof module === 'object' && typeof module.exports ) {
        module.exports = factory(require('carousel'));
    } else {
        root.CarouselNavigation = factory(root.Carousel);
    }

} )( this, function (Carousel) {
    'use strict';

    if (typeof Carousel !== 'function') {
        throw new Error('You must load carousel to get a plugin working.');
    }

    /**
     * Carousel navigation
     *
     * @return {CarouselNavition}
     * @constructor
     */
    var CarouselNavition = function () {
        return this;
    };

    /**
     * Init hook
     *
     * @param carousel
     */
    CarouselNavition.prototype.init = function (carousel) {
        if (!carousel) {
            throw new Error('Pass a carousel instance in the constructor.');
        }

        this.carousel = carousel;
        this.settings = this.carousel.settings.navigation || {};

        var container = document.createElement('div');
        container.classList.add(this.settings.containerClass || 'carousel__nav');

        var prevButton = document.createElement('button'),
            nextButton = document.createElement('button');

        prevButton.classList.add(this.settings.prevButtonClass || 'carousel__nav-prev');
        nextButton.classList.add(this.settings.nextButtonClass || 'carousel__nav-next');

        prevButton.innerText = (typeof this.settings.prevText === 'string') ?
            this.settings.prevText : 'Previous';
        nextButton.innerText = (typeof this.settings.nextText === 'string') ?
            this.settings.nextText : 'Next';

        prevButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            this.carousel.prev();
        }.bind(this));

        nextButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            this.carousel.next();
        }.bind(this));

        container.appendChild(prevButton);
        container.appendChild(nextButton);

        this.carousel.element.appendChild(container);
    };

    return CarouselNavition;
});
