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


} );
