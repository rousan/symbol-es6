/*!
 * Symbol-ES6 v0.1.0
 * Provides Symbol implementation of ES6 in pure ES5 for older browsers
 * and JS engines.
 *
 * @license Copyright (c) 2017 Ariyan Khan, MIT License
 *
 * Codebase: https://github.com/ariyankhan/symbol-es6
 * Date: Jun 13, 2017
 */


(function (global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        // For the environment like NodeJS, CommonJS etc where module or
        // module.exports objects are available
        module.exports = factory(global);
    } else {
        // For browser context, where global object is window
        factory(global);
    }

    /* window is for browser environment and global is for NodeJS environment */
})(typeof window !== "undefined" ? window : global, function (global) {




});