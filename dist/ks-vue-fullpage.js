/*!
 * ks-vue-fullpage v1.2.8
 * (c) 2017 pirony
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["KsVueFullpage"] = factory();
	else
		root["KsVueFullpage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  bgOffset: function bgOffset(action, direction, offset) {
    var res = void 0;
    switch (action) {
      case 'enter':
        res = direction === 'up' ? offset || '0.5' : offset * -1 || '-0.5';
        break;
      case 'leave':
        res = direction === 'up' ? offset * -1 || '-0.5' : offset || '0.5';
        break;
    }

    return res;
  },
  getDirection: function getDirection(e, animType) {
    e = e || window.event;
    switch (e.type) {
      case 'mousewheel':
      case 'wheel':
        var delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
        if (delta < 0) return 'up';
        return 'down';
      case 'keydown':
        switch (e.key) {
          case 'ArrowDown':
            if (animType !== 'slideY') return 'none';
            return 'down';
          case 'ArrowUp':
            if (animType !== 'slideY') return 'none';
            return 'up';
          case 'ArrowLeft':
            if (animType !== 'slideX') return 'none';
            return 'up';
          case 'ArrowRight':
            if (animType !== 'slideX') return 'none';
            return 'down';
          default:
            return 'none'; // Quit when this doesn't handle the key event.
        }
      case 'swipeup':
        if (animType === 'slideX') return 'none';
        return 'down';
      case 'swipeleft':
        if (animType !== 'slideX') return 'none';
        return 'down';
      case 'swipedown':
        if (animType === 'slideX') return 'none';
        return 'up';
      case 'swiperight':
        if (animType !== 'slideX') return 'none';
        return 'up';
      case 'navclick':
        if (e.oldIndex < e.nextIndex) {
          return 'down';
        } else {
          return 'up';
        }
      default:
        return 'none';

    }
  },
  getWindowDim: function getWindowDim() {
    if (typeof window === 'undefined') global.window = {};
    return {
      wHeight: window.innerHeight,
      wWidth: window.innerWidth
    };
  },
  getNextIndex: function getNextIndex(i, direction, length, options) {
    switch (direction) {
      case 'down':
        if (i !== length - 1) {
          i++;
        } else {
          if (options.loopBottom) i = 0;
          if (!options.loopBottom) i = 'none';
        }
        break;
      case 'up':
        if (i !== 0) {
          i--;
        } else {
          if (options.loopTop) i = length - 1;
          if (!options.loopTop) i = 'none';
        }
        break;
      default:
    }
    return i;
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dotsAnim = exports.fade = exports.slideY = exports.slideX = undefined;

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get animation params and store it in a constant
 * @param {object} ctx - the context
 * @param el - the element
 * @param {function} done - function to trigger when animation is finished
*/
var getAnimParams = function getAnimParams(ctx, el, done) {
  return {
    easing: ctx.props.options.easing || 'linear',
    duration: ctx.props.options.duration || 1000,
    complete: function complete() {
      // Velocity.hook(el, 'translateX', '0%')
      // Velocity.hook(el, 'backgroundPosition', '0 50%')
      done();
    }
  };
};

// component datas for slideX option
var slideX = exports.slideX = {

  props: ['options', 'slidingActive', 'sliderDirection'],
  functional: true,
  render: function render(h, ctx) {
    if (!ctx.parent.$ksvuefp.fpLoaded) return h('transition', ctx.data, ctx.children); // don't animate until the plugin is fully loaded

    ctx.data.on = {
      enter: function enter(el, done) {
        var animObj = {}; // empty object where we'll push animations

        if (ctx.props.options.parallax) {
          // if parallax is activated
          /**
           * Get section background's offset and store it in a constant
           * @param {string} action - enter or leave
           * @param {string} direction - up or down
           * @param {float} offset - the parallax offset defined in options
          */
          var bgOffset = _utils2.default.bgOffset('enter', ctx.parent.$ksvuefp.sliderDirection, ctx.props.options.parallaxOffset);

          Velocity.hook(el, 'backgroundPositionX', bgOffset * ctx.parent.$ksvuefp.wWidth + 'px'); // Positionate the background before triggering the animation

          animObj['backgroundPosition'] = '0% 50%'; // Push bgPosition animation to our empty object animObj
        }

        var start = ctx.parent.$ksvuefp.sliderDirection === 'up' ? '-100%' : '100%'; // Define the full section's translate animation starting offset
        Velocity.hook(el, 'translateX', start); // Positionate the full section before triggering the animation
        Velocity.hook(el, 'translateY', '0%'); // Positionate the full section before triggering the animation
        Velocity.hook(el, 'opacity', 1);

        animObj['translateX'] = '0%';
        animObj['translateZ'] = 0; // Force 3d rendering

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        var animParams = getAnimParams(ctx, el, done);

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(el, animObj, animParams);
      },
      leave: function leave(el, done) {
        var animObj = {}; // empty object where we'll push animations
        if (ctx.props.options.parallax) {
          // if parallax is activated
          /**
           * Get section background's offset and store it in a constant
           * @param {string} action - enter or leave
           * @param {string} direction - up or down
           * @param {float} offset - the parallax offset defined in options
          */
          var bgOffset = _utils2.default.bgOffset('leave', ctx.parent.$ksvuefp.sliderDirection, ctx.props.options.parallaxOffset);

          animObj['backgroundPositionX'] = bgOffset * ctx.parent.$ksvuefp.wWidth + 'px'; // Push bgPosition animation to our empty object animObj
        }

        var end = ctx.parent.$ksvuefp.sliderDirection === 'up' ? '100%' : '-100%'; // Define the full section's translate animation starting offset
        Velocity.hook(el, 'translateX', '0%'); // Positionate the full section before triggering the animation
        Velocity.hook(el, 'translateY', '0%'); // Positionate the full section before triggering the animation
        Velocity.hook(el, 'opacity', 1);

        animObj['translateX'] = end; // Push translate animation to our object animObj
        animObj['translateZ'] = 0; // Force 3d rendering

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        var animParams = getAnimParams(ctx, el, done);

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(el, animObj, animParams);
      },
      afterLeave: function afterLeave(el) {
        Velocity.hook(el, 'backgroundPosition', '50% 50%');
      }
    };

    return h('transition', ctx.data, ctx.children);
  }

  // component datas for slideY option
};var slideY = exports.slideY = {
  props: ['options'],
  functional: true,
  render: function render(h, ctx) {
    if (!ctx.parent.$ksvuefp.fpLoaded) return h('transition', ctx.data, ctx.children); // If the plugin is not fully loaded, don't animate and return h() directly
    ctx.data.on = {
      enter: function enter(el, done) {
        var animObj = {};

        if (ctx.props.options.parallax) {
          /**
           * Get section background's offset and store it in a constant
           * @param {string} action - enter or leave
           * @param {string} direction - up or down
           * @param {float} offset - the parallax offset defined in options
          */
          var bgOffset = _utils2.default.bgOffset('enter', ctx.parent.$ksvuefp.sliderDirection, ctx.props.options.parallaxOffset);

          Velocity.hook(el, 'backgroundPositionY', bgOffset * ctx.parent.$ksvuefp.wHeight + 'px');

          animObj['backgroundPositionY'] = '0%';
        }

        var start = ctx.parent.$ksvuefp.sliderDirection === 'up' ? '-100%' : '100%';
        Velocity.hook(el, 'translateY', start);
        Velocity.hook(el, 'translateX', '0%');
        Velocity.hook(el, 'opacity', 1);

        animObj['translateY'] = '0%';
        animObj['translateZ'] = 0; // Force 3d rendering

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        var animParams = getAnimParams(ctx, el, done);

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(el, animObj, animParams);
      },
      leave: function leave(el, done) {
        var animObj = {};

        if (ctx.props.options.parallax) {
          /**
           * Get section background's offset and store it in a constant
           * @param {string} action - enter or leave
           * @param {string} direction - up or down
           * @param {float} offset - the parallax offset defined in options
          */
          var bgOffset = _utils2.default.bgOffset('leave', ctx.parent.$ksvuefp.sliderDirection, ctx.props.options.parallaxOffset);

          animObj['backgroundPositionY'] = bgOffset * ctx.parent.$ksvuefp.wHeight + 'px';
        }

        var end = ctx.parent.$ksvuefp.sliderDirection === 'up' ? '100%' : '-100%';
        Velocity.hook(el, 'translateY', '0%');
        Velocity.hook(el, 'translateX', '0%');
        Velocity.hook(el, 'opacity', 1);

        animObj['translateY'] = end;
        animObj['translateZ'] = 0; // Force 3d rendering

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        var animParams = getAnimParams(ctx, el, done);
        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(el, animObj, animParams);
      },
      afterLeave: function afterLeave(el) {
        Velocity.hook(el, 'backgroundPosition', '50% 50%');
      }
    };
    return h('transition', ctx.data, ctx.children);
  }

  // component datas for fade option
};var fade = exports.fade = {
  props: ['options'],
  functional: true,
  render: function render(h, ctx) {
    ctx.data.on = {
      enter: function enter(el, done) {
        Velocity.hook(el, 'translateX', '0%'); // Positionate the full section before triggering the animation
        Velocity.hook(el, 'translateY', '0%'); // Positionate the full section before triggering the animation
        Velocity.hook(el, 'opacity', 0);

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        var animParams = getAnimParams(ctx, el, done);

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(el, {
          opacity: 1
        }, animParams);
      },
      leave: function leave(el, done) {
        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        var animParams = getAnimParams(ctx, el, done);

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(el, {
          opacity: 0
        }, animParams);
      }
    };

    return h('transition', ctx.data, ctx.children);
  }

  // component datas for slideX option
};var dotsAnim = exports.dotsAnim = {
  functional: true,
  render: function render(h, ctx) {
    ctx.props.name = 'dots-anim';
    ctx.data.attrs['appear'] = true;
    ctx.data.on = {
      enter: function enter(el, done) {
        var animObj = {};
        switch (ctx.props.currentPos) {
          case 'top':
            Velocity.hook(el, 'translateY', '-200px');
            animObj['translateY'] = '0px';
            break;
          case 'bottom':
            Velocity.hook(el, 'translateY', '200px');
            animObj['translateY'] = '0px';
            break;
          case 'left':
            Velocity.hook(el, 'translateX', '-200px');
            animObj['translateX'] = '0px';
            break;
          case 'right':
            Velocity.hook(el, 'translateX', '200px');
            animObj['translateX'] = '0px';
            break;
        }
        Velocity(el, animObj, {
          delay: el.dataset.index * 40,
          complete: done
        });
      },
      leave: function leave(el, done) {
        done();
      }
    };
    return h('transition-group', ctx.data, ctx.children);
  }

  // TODO: add prismX and prismY transitions

};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  /**
   * Html params
   * @property {String} sectionTag - The tag used to wrap each vsvuefp-section component.
  */
  sectionTag: 'div',
  /**
   * Animation params
   * @property {String} animationType - Transition effect between 2 screens. Should be one of 'slideY', 'slideX', or 'fade'
   * @property {Number} duration - Duration of transition between 2 screens, in ms
   * @property {String} easing - Easing of the transition between 2 screens. Can be all easings supported by Velocity, including bezier curves. ex: [0.2, 0.5, 0.2, 0.5]
   * @property {Number} animDelay - Content animation delay. Help you define timing between screens transition and content animations
  */
  animationType: 'slideY',
  duration: 1000,
  easing: 'easeInOutQuad',
  animDelay: 0,
  /**
   * Preloading params
   * @property {Boolean} preloaderEnabled - Add a fullscreen preloading overlay with loading animation
   * @property {String} preloaderBgColor - Background color for the preloader overlay.
   * @property {String} preloaderColor - Preloader icon and text color
   * @property {String} preloaderText - The text that will appear under the icon animation during loading
   * @property {Boolean} waitForBackgrounds - Wait for sections background images to be fully loaded before triggering $ksvuefp-ready event
  */
  preloaderEnabled: true,
  preloaderBgColor: '#fff',
  preloaderColor: '#212121',
  preloaderText: 'Loading...',
  waitForBackgrounds: true,
  /**
   * Navigation params
   * @property {Boolean} dotNavEnabled - Add a dot navigation
   * @property {String} dotNavPosition - Change dotNav position. Should be one of top, bottom, left or right
   * @property {String} dotNavColor - Change dotNav color
   * @property {Boolean} loopBottom - Go to first section on scroll down while watching last section
   * @property {Boolean} loopTop - Go to last section on scroll up while watching first section
  */
  dotNavEnabled: true,
  dotNavColor: '#fff',
  loopBottom: false,
  loopTop: false,
  /**
   * Design params
   * @property {Boolean - String} overlay - Insert a fullsize div between background and content, and set its background property. Must be a valid css background rule
   * @property {Boolean} parallax - Enable parallax effect on section's background
   * @property {Float} parallaxOffset - Parallax offset amount, default to 0.5. Should be between 0 and 1. 0 gives no parallax effect, 1 gives a "stacking effect" (the old section remains fixed during transition while the next one slides above it).
  */
  overlay: 'rgba(0, 0, 0, 0.2)',
  parallax: false,
  parallaxOffset: 0.5
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(15)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(22),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\Users\\romai\\ks-node\\vue-plugins\\node_modules\\ks-vue-fullpage\\src\\components\\ksvuefp-section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ksvuefp-section.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7096caf6", Component.options)
  } else {
    hotAPI.reload("data-v-7096caf6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(19),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\Users\\romai\\ks-node\\vue-plugins\\node_modules\\ks-vue-fullpage\\src\\components\\ksvuefp.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ksvuefp.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28c4a96d", Component.options)
  } else {
    hotAPI.reload("data-v-28c4a96d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ksvuefpAnimations = __webpack_require__(2);

exports.default = {
  components: {
    dotsAnim: _ksvuefpAnimations.dotsAnim
  },
  props: ['sections', 'options'],
  data: function data() {
    return {
      navPosList: ['top', 'left', 'right', 'bottom'],
      keys: []
    };
  },

  computed: {
    currentPos: function currentPos() {
      if (this.options.dotNavPosition) return this.options.dotNavPosition;
      switch (this.options.animationType) {
        case 'slideX':
          return 'bottom';
        default:
          return 'right';
      }
    }
  },
  methods: {
    click: function click(nextIndex) {
      if (nextIndex === this.$ksvuefp.currentIndex) return;
      this.$ksvuefp.$emit('ksvuefp-nav-click', { nextIndex: nextIndex });
    }
  }
}; //
//
//
//
//
//
//
//
//

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ksvuefpPreloader',
  props: ['backgroundColor', 'preloaderColor', 'preloaderText']
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ksvuefpAnimations = __webpack_require__(2);

var _imagesloaded = __webpack_require__(16);

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: {
    slideY: _ksvuefpAnimations.slideY,
    slideX: _ksvuefpAnimations.slideX,
    fade: _ksvuefpAnimations.fade,
    'tagger': {
      props: ['options', 'sectionIndex'],
      render: function render(h) {
        return h(this.options.sectionTag || 'div', this.$slots.default);
      },
      mounted: function mounted() {
        var vm = this;
        vm.$nextTick(function () {
          setTimeout(function () {
            (0, _imagesloaded2.default)(vm.$el, { background: true }, function () {
              vm.$ksvuefp.$emit('ksvuefp-section-loaded', vm.sectionIndex);
            });
          }, 300);
        });
      }
    }
  },
  props: ['section', 'backgroundImage', 'backgroundColor', 'sectionIndex', 'sectionOverlay'],
  computed: {
    showSection: function showSection() {
      return this.sectionIndex === this.$ksvuefp.currentIndex;
    }
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _ksvuefpNav = __webpack_require__(17);

var _ksvuefpNav2 = _interopRequireDefault(_ksvuefpNav);

var _ksvuefpPreloader = __webpack_require__(18);

var _ksvuefpPreloader2 = _interopRequireDefault(_ksvuefpPreloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    options: {
      type: Object,
      default: function _default() {}
    },
    sections: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  components: {
    fpNav: _ksvuefpNav2.default,
    ksvuefpPreloader: _ksvuefpPreloader2.default
  },
  created: function created() {
    this.$ksvuefp.$emit('ksvuefp-options-changed', this.options);
  },
  mounted: function mounted() {
    var vm = this;
    vm.$nextTick(function () {
      /**
       * We listen to our custom navclick event on ksvuefp bus
       * @param Event
      */
      vm.$ksvuefp.$on('ksvuefp-nav-click', function (e) {
        e.oldIndex = vm.$ksvuefp.currentIndex;
        e.type = 'navclick';
        vm.changeIndex(e);
      });

      vm.$ksvuefp.$on('ksvuefp-section-loaded', function (i) {
        if (i !== vm.sections.length - 1) return;
        setTimeout(function () {
          vm.$ksvuefp.$emit('ksvuefp-ready');
        }, 300);
      });
      /**
       * We listen to resize event and then emit on $ksvuefp bus
      */
      window.addEventListener('resize', function () {
        vm.$ksvuefp.$emit('ksvuefp-resized');
      });
      /**
       * We set the list of actions we want to trigger the animation with
       * @const {array}
       *
      */
      var actions = ['wheel', 'mousewheel', 'keydown'];
      /**
       * For each action in the above array, trigger changeIndex method
       *
      */
      actions.forEach(function (a) {
        document.addEventListener(a, vm.changeIndex);
      });

      vm.$ksvuefp.$emit('ksvuefp-options-changed', vm.options);

      /**
       * trigger changeIndex method on swipe with HAMMER.JS if touch is detected
       *
      */
      var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
      if (!isTouch) return;

      var mc = new Hammer(vm.$el);
      mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      mc.on('swipeup swipedown swiperight swipeleft', function (e) {
        vm.changeIndex(e);
      });
    });
  },

  computed: {
    ksvuefpStyles: function ksvuefpStyles() {
      return {
        height: this.$ksvuefp.wHeight + 'px'
      };
    }
  },
  methods: {
    /** trigger the change index event
     * @param Event
     *
    */
    changeIndex: function changeIndex(e) {
      if (e.defaultPrevented) {
        return; // Should do nothing if the key event was already consumed.
      }
      var vm = this;

      if (vm.$ksvuefp.slidingActive) return; // if last transition is not yet finished, return without doing anything

      var OldIndex = vm.$ksvuefp.currentIndex;
      var Length = vm.sections.length;
      var Options = vm.$ksvuefp.options;

      /**
       * We get the sliding direction using a custom func getDirection() in utils
       * @const String
       * @return up or down
       *
      */
      var Direction = _utils2.default.getDirection(e, vm.$ksvuefp.options.animationType);

      if (Direction === 'none' || Direction === undefined) return;

      var nextIndex = void 0;

      /**
       * Get next index
       * @return index to go to
       *
      */
      switch (e.type) {
        case 'navclick':
          // if is the event is from a click on navigation item
          nextIndex = e.nextIndex;
          break;
        default:
          // else
          nextIndex = _utils2.default.getNextIndex(OldIndex, Direction, Length, Options);
          break;
      }

      if (nextIndex === 'none') return;

      this.$nextTick(function () {
        // we wait for our computed datas to be ready
        /**
         * Emit change event on bus vm
         * @param {integer} nextIndex
         * @param {integer} OldIndex
         * @param {String} Direction
         *
        */
        vm.$ksvuefp.$emit('ksvuefp-change-begin', nextIndex, OldIndex, Direction, vm.$ksvuefp.options.animDelay);

        /**
         * Emit change-done event on bus vm when animation is finished
         *
        */
        setTimeout(function () {
          vm.$ksvuefp.$emit('ksvuefp-change-done');
        }, vm.$ksvuefp.options.duration ? vm.$ksvuefp.options.duration + vm.$ksvuefp.options.animDelay + 100 : vm.$ksvuefp.options.animDelay + 1100);
      });
    }
  },
  watch: {
    options: {
      deep: true,
      handler: function handler(val) {
        this.$ksvuefp.$emit('ksvuefp-options-changed', val);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    var vm = this;
    /**
     * We set the list of actions we want to trigger the animation with
     * @const {array}
     *
    */
    var actions = ['wheel', 'mousewheel', 'keydown'];
    /**
     * For each action in the above array, trigger changeIndex method
     *
    */
    actions.forEach(function (a) {
      document.removeEventListener(a, vm.changeIndex);
    });
    window.addEventListener('resize', function () {
      vm.$ksvuefp.$emit('ksvuefp-resized');
    });
    this.$off();
    this.$ksvuefp.$emit('ksvuefp-destroy');
  }
}; //
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.ksvuefpSection = exports.ksvuefp = undefined;

var _ksvuefp = __webpack_require__(5);

var _ksvuefp2 = _interopRequireDefault(_ksvuefp);

var _ksvuefpSection = __webpack_require__(4);

var _ksvuefpSection2 = _interopRequireDefault(_ksvuefpSection);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _defaultOptions = __webpack_require__(3);

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(Vue) {
  Vue.prototype.$ksvuefp = new Vue({
    data: {
      fpLoaded: false,
      currentIndex: 0,
      slidingActive: false,
      sliderDirection: 'down',
      wWidth: 0,
      wHeight: 0,
      options: {}
    },
    created: function created() {
      var vm = this;
      vm.$on('ksvuefp-ready', function () {
        vm.$emit('ksvuefp-resized');
        vm.fpLoaded = true;
      });
      vm.$on('ksvuefp-options-changed', function (custom) {
        vm.options = Object.assign({}, _defaultOptions2.default, custom);
      });

      vm.$on('ksvuefp-resized', function () {
        vm.getWindowDim();
      });
      vm.$on('ksvuefp-destroy', function () {
        vm.fpLoaded = false;
        vm.currentIndex = 0;
        vm.slidingActive = false;
        vm.sliderDirection = 'down';
        vm.options = {};
      });

      vm.$on('ksvuefp-change-begin', function (nextIndex, oldIndex, direction, delay) {
        vm.slidingActive = true;
        vm.sliderDirection = direction;
        vm.$nextTick(function () {
          setTimeout(function () {
            vm.currentIndex = nextIndex;
          }, delay || 0);
        });
      });

      vm.$on('ksvuefp-change-done', function () {
        vm.slidingActive = false;
      });
    },

    methods: {
      getWindowDim: function getWindowDim() {
        var vm = this;
        var Dimensions = _utils2.default.getWindowDim();
        vm.wWidth = Dimensions.wWidth;
        vm.wHeight = Dimensions.wHeight;
        vm.$nextTick(function () {
          vm.$ksvuefp.$emit('ksvuefp-change-done');
        });
      },
      canAnimContent: function canAnimContent(index) {
        var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (index !== this.currentIndex) return;
        if (wait) {
          return !this.slidingActive ? true : false;
        }
        return true;
      }
    }
  });
  Vue.component('ksvuefp', _ksvuefp2.default);
  Vue.component('ksvuefp-section', _ksvuefpSection2.default);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

exports.default = plugin;

var version = '__VERSION__';
// Export all components too
exports.ksvuefp = _ksvuefp2.default;
exports.ksvuefpSection = _ksvuefpSection2.default;
exports.version = version;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * imagesLoaded v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(11)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( EvEmitter ) {
      return factory( window, EvEmitter );
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  if ( typeof elem == 'string' ) {
    elem = document.querySelectorAll( elem );
  }

  this.elements = makeArray( elem );
  this.options = extend( {}, this.options );

  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( function() {
    this.check();
  }.bind( this ));
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  return this.img.complete && this.img.naturalWidth !== undefined;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(14)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(21),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\Users\\romai\\ks-node\\vue-plugins\\node_modules\\ks-vue-fullpage\\src\\components\\ksvuefp-nav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ksvuefp-nav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a1a79c3", Component.options)
  } else {
    hotAPI.reload("data-v-4a1a79c3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(13)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(20),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\Users\\romai\\ks-node\\vue-plugins\\node_modules\\ks-vue-fullpage\\src\\components\\ksvuefp-preloader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ksvuefp-preloader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-367f74d4", Component.options)
  } else {
    hotAPI.reload("data-v-367f74d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['ksvuefp', _vm.$ksvuefp.wWidth < _vm.$ksvuefp.options.normalScrollWidth ? 'is-ksvuefp-inactive' : null],
    style: (_vm.ksvuefpStyles)
  }, [_c('div', {
    staticClass: "ksvuefp-sections"
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.$ksvuefp.options.preloaderEnabled) ? _c('transition', {
    attrs: {
      "name": _vm.$ksvuefp.options.preloaderTransitionName || 'fade-out'
    }
  }, [(!_vm.$ksvuefp.fpLoaded) ? _c('ksvuefp-preloader', {
    attrs: {
      "backgroundColor": _vm.$ksvuefp.options.preloaderBgColor || '',
      "preloaderColor": _vm.$ksvuefp.options.preloaderColor || '',
      "preloaderText": _vm.$ksvuefp.options.preloaderText
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), (_vm.$ksvuefp.options.dotNavEnabled) ? _c('fp-nav', {
    attrs: {
      "sections": _vm.sections,
      "options": _vm.$ksvuefp.options
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-28c4a96d", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ksvuefp-preloader",
    style: ({
      backgroundColor: _vm.backgroundColor || '#fff'
    })
  }, [_c('div', [_c('div', {
    staticClass: "ksvuefp-preloader__wrapper"
  }, _vm._l((4), function(n) {
    return _c('div', {
      class: ['square' + n, 'square']
    }, [_c('span', {
      style: ({
        backgroundColor: _vm.preloaderColor || '#333'
      })
    })])
  })), _vm._v(" "), _c('p', {
    staticClass: "ksvuefp-preloader__text",
    style: ({
      color: _vm.preloaderColor || '#333'
    })
  }, [_vm._v(_vm._s(_vm.preloaderText || 'loading...'))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-367f74d4", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.navPosList), function(pos) {
    return (_vm.currentPos === pos && _vm.$ksvuefp.fpLoaded) ? _c('dots-anim', {
      key: pos,
      class: ['ksvuefp-nav', 'is-' + _vm.currentPos],
      attrs: {
        "tag": "ul",
        "appear": "",
        "currentPos": _vm.currentPos
      }
    }, _vm._l((_vm.sections), function(s, index) {
      return _c('li', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (_vm.currentPos === pos),
          expression: "currentPos === pos"
        }],
        key: index,
        staticClass: "ksvuefp-nav__item",
        attrs: {
          "data-index": index
        }
      }, [_c('span', {
        class: ['ksvuefp-nav__dot', index === _vm.$ksvuefp.currentIndex ? 'active' : ''],
        style: ({
          backgroundColor: _vm.options.dotNavColor
        }),
        on: {
          "click": function($event) {
            _vm.click(index)
          }
        }
      })])
    })) : _vm._e()
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4a1a79c3", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.$ksvuefp.options.animationType, {
    tag: "component",
    attrs: {
      "options": _vm.$ksvuefp.options,
      "appear": false
    }
  }, [_c('tagger', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showSection),
      expression: "showSection"
    }],
    class: ['ksvuefp-section'],
    style: ({
      backgroundImage: _vm.backgroundImage || '',
      backgroundColor: _vm.backgroundColor || ''
    }),
    attrs: {
      "sectionIndex": _vm.sectionIndex,
      "options": _vm.$ksvuefp.options
    }
  }, [(_vm.$ksvuefp.options.overlay || _vm.sectionOverlay) ? _c('span', {
    staticClass: "ksvuefp-section__overlay",
    style: ({
      background: _vm.sectionOverlay ? _vm.sectionOverlay : _vm.$ksvuefp.options.overlay || 'rgba(0,0,0,0.2)'
    })
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "ksvuefp-section__content"
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7096caf6", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});