/*!
 * ks-vue-fullpage v1.0.0
 * (c) 2017 pirony
 * Released under the MIT License.
 */

module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
    switch (e.type) {
      case 'mousewheel':
      case 'wheel':
        var delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
        if (delta < 0) return 'up';
        return 'down';
      case 'keyup':
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fade = exports.slideY = exports.slideX = undefined;

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

          Velocity.hook(el, 'backgroundPosition', bgOffset * ctx.parent.$ksvuefp.wWidth + 'px 50%'); // Positionate the background before triggering the animation

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

          Velocity.hook(el, 'backgroundPosition', '0% 50%'); // Positionate the background before triggering the animation

          animObj['backgroundPosition'] = bgOffset * ctx.parent.$ksvuefp.wWidth + 'px 50%'; // Push bgPosition animation to our empty object animObj
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

          Velocity.hook(el, 'backgroundPosition', '50% ' + bgOffset * ctx.parent.$ksvuefp.wHeight + 'px');

          animObj['backgroundPosition'] = '50% 0%';
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

          Velocity.hook(el, 'backgroundPosition', ' 50% 0%');

          animObj['backgroundPosition'] = '50% ' + bgOffset * ctx.parent.$ksvuefp.wHeight + 'px';
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

  // TODO: add prismX and prismY transitions

};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
  __webpack_require__(13)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(19),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "70e5dbc2"
)
Component.options.__file = "C:\\Users\\romai\\ks-node\\vue-plugins\\node_modules\\ks-vue-fullpage\\src\\components\\ksvuefp-section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ksvuefp-section.vue: functional components are not supported with templates, they should use render functions.")}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
  __webpack_require__(10)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(16),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "075510ac"
)
Component.options.__file = "C:\\Users\\romai\\ks-node\\vue-plugins\\node_modules\\ks-vue-fullpage\\src\\components\\ksvuefp.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ksvuefp.vue: functional components are not supported with templates, they should use render functions.")}

module.exports = Component.exports


/***/ }),
/* 5 */
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

exports.default = {
  props: ['sections'],
  methods: {
    click: function click(i) {
      if (i === this.$ksvuefp.currentIndex) return;

      this.$ksvuefp.$emit('ksvuefp-nav-click', { nextIndex: i });
    }
  }
};

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ksvuefpAnimations = __webpack_require__(2);

exports.default = {
  components: {
    slideY: _ksvuefpAnimations.slideY,
    slideX: _ksvuefpAnimations.slideX,
    fade: _ksvuefpAnimations.fade,
    'tagger': {
      functional: true,
      props: ['options'],
      render: function render(h, ctx) {
        return h(ctx.parent.options.sectionTag || 'div', ctx.data, ctx.children);
      }
    }
  },
  props: ['section', 'backgroundImage', 'backgroundColor', 'options']
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _ksvuefpAnimations = __webpack_require__(2);

var _ksvuefpNav = __webpack_require__(14);

var _ksvuefpNav2 = _interopRequireDefault(_ksvuefpNav);

var _ksvuefpPreloader = __webpack_require__(15);

var _ksvuefpPreloader2 = _interopRequireDefault(_ksvuefpPreloader);

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
  props: {
    options: {
      type: Object,
      default: {}
    },
    sections: {
      type: Array,
      default: []
    }
  },
  components: {
    slideY: _ksvuefpAnimations.slideY,
    slideX: _ksvuefpAnimations.slideX,
    fade: _ksvuefpAnimations.fade,
    fpNav: _ksvuefpNav2.default,
    ksvuefpPreloader: _ksvuefpPreloader2.default
  },
  mounted: function mounted() {
    var _this = this;

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
      /**
       * We listen to resize event and then emit on $ksvuefp bus
      */
      window.addEventListener('resize', function () {
        vm.$nextTick(function () {
          vm.$ksvuefp.$emit('ksvuefp-resized');
        });
      });
      /**
       * We set the list of actions we want to trigger the animation with
       * @const {array}
       *
      */
      var actions = ['wheel', 'mousewheel', 'keypress'];
      /**
       * For each action in the above array, trigger changeIndex method
       *
      */
      actions.forEach(function (a) {
        document.addEventListener(a, vm.changeIndex);
      });

      /**
       * trigger changeIndex method when a key is pressed
       *
      */
      document.onkeyup = function (e) {
        vm.changeIndex(e);
      };

      /**
       * When our component is ready, emit ready event on $ksvuefp
       *
      */
      setTimeout(function () {
        vm.$ksvuefp.$emit('ksvuefp-ready');
      }, 300);

      /**
       * trigger changeIndex method on pan with HAMMER.JS if touch is detected
       *
      */
      var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
      if (!isTouch) return;

      var mc = new Hammer(_this.$el);
      mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      mc.on('swipeup swipedown swiperight swipeleft', function (e) {
        vm.changeIndex(e);
      });
    });
  },

  methods: {
    /** trigger the change index event
     * @param Event
     *
    */
    changeIndex: function changeIndex(e) {
      var _this2 = this;

      var vm = this;

      if (vm.$ksvuefp.slidingActive) return; // if last transition is not yet finished, return without doing anything

      var OldIndex = vm.$ksvuefp.currentIndex;
      var Length = vm.sections.length;
      var Options = vm.options;

      /**
       * We get the sliding direction using a custom func getDirection() in utils
       * @const String
       * @return up or down
       *
      */
      var Direction = _utils2.default.getDirection(e, vm.options.animationType);

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
        vm.$ksvuefp.$emit('ksvuefp-change-begin', nextIndex, OldIndex, Direction, _this2.options.animDelay);

        /**
         * Emit change-done event on bus vm when animation is finished
         *
        */
        setTimeout(function () {
          vm.$ksvuefp.$emit('ksvuefp-change-done');
        }, vm.options.duration ? vm.options.duration + vm.options.animDelay + 100 : vm.options.animDelay + 1100);
      });
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
exports.version = exports.ksvuefpSection = exports.ksvuefp = undefined;

var _ksvuefp = __webpack_require__(4);

var _ksvuefp2 = _interopRequireDefault(_ksvuefp);

var _ksvuefpSection = __webpack_require__(3);

var _ksvuefpSection2 = _interopRequireDefault(_ksvuefpSection);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(Vue) {
  Vue.prototype.$ksvuefp = new Vue({
    data: {
      fpLoaded: false,
      currentIndex: 0,
      slidingActive: false,
      sliderDirection: 'down',
      wWidth: '',
      wHeight: ''
    },
    created: function created() {
      var vm = this;

      vm.getWindowDim();

      vm.$on('ksvuefp-ready', function () {
        vm.fpLoaded = true;
      });

      vm.$on('ksvuefp-resized', function () {
        vm.getWindowDim();
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
/* 10 */
/***/ (function(module, exports) {

// empty (null-loader)

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// empty (null-loader)

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// empty (null-loader)

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// empty (null-loader)

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
  __webpack_require__(12)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(18),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "2fefe180"
)
Component.options.__file = "C:\\Users\\romai\\ks-node\\vue-plugins\\node_modules\\ks-vue-fullpage\\src\\components\\ksvuefp-nav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ksvuefp-nav.vue: functional components are not supported with templates, they should use render functions.")}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
var i
  __webpack_require__(11)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(17),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  "06a62b93"
)
Component.options.__file = "C:\\Users\\romai\\ks-node\\vue-plugins\\node_modules\\ks-vue-fullpage\\src\\components\\ksvuefp-preloader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ksvuefp-preloader.vue: functional components are not supported with templates, they should use render functions.")}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['ksvuefp', _vm.$ksvuefp.wWidth < _vm.options.normalScrollWidth ? 'is-ksvuefp-inactive' : null],
    style: ({
      height: _vm.$ksvuefp.wHeight + 'px'
    })
  }, [_vm._ssrNode("<div class=\"ksvuefp-sections\">", "</div>", [_vm._t("default")], 2), _vm._ssrNode(" "), _c('transition', {
    attrs: {
      "name": _vm.options.preloader.transitionName || 'fade-out'
    }
  }, [(_vm.options.preloader && !_vm.$ksvuefp.fpLoaded) ? _c('ksvuefp-preloader', {
    attrs: {
      "backgroundColor": _vm.options.preloader.backgroundColor || '',
      "preloaderColor": _vm.options.preloader.preloaderColor || '',
      "preloaderText": _vm.options.preloader.preloaderText || ''
    }
  }) : _vm._e()], 1), _vm._ssrNode(" "), (!_vm.options.hideNav) ? _c('fp-nav', {
    attrs: {
      "sections": _vm.sections
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ksvuefp-preloader",
    style: ({
      backgroundColor: _vm.backgroundColor || '#fff'
    })
  }, [_vm._ssrNode("<div><div class=\"ksvuefp-preloader__wrapper\">" + (_vm._ssrList((4), function(n) {
    return ("<div" + (_vm._ssrClass(null, ['square' + n, 'square'])) + "><span" + (_vm._ssrStyle(null, {
      backgroundColor: _vm.preloaderColor || '#333'
    }, null)) + "></span></div>")
  })) + "</div> <p class=\"ksvuefp-preloader__text\"" + (_vm._ssrStyle(null, {
    color: _vm.preloaderColor || '#333'
  }, null)) + ">" + _vm._ssrEscape(_vm._s(_vm.preloaderText || 'loading...')) + "</p></div>")])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "ksvuefp-nav"
  }, [_vm._ssrNode((_vm._ssrList((_vm.sections), function(s, index) {
    return ("<li><span" + (_vm._ssrClass(null, ['ksvuefp-nav__dot', index === _vm.$ksvuefp.currentIndex ? 'active' : ''])) + "></span></li>")
  })))])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.options.animationType, {
    tag: "component",
    attrs: {
      "options": _vm.options,
      "appear": false
    }
  }, [_c('tagger', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.$vnode.data.key === _vm.$ksvuefp.currentIndex || _vm.$ksvuefp.wWidth < _vm.options.normalScrollWidth),
      expression: "$vnode.data.key === $ksvuefp.currentIndex || $ksvuefp.wWidth < options.normalScrollWidth"
    }],
    class: ['ksvuefp-section', _vm.$ksvuefp.wWidth < _vm.options.normalScrollWidth ? 'is-ksvuefp-inactive' : null],
    attrs: {
      "options": _vm.options
    }
  }, [(_vm.options.overlay) ? _c('span', {
    staticClass: "ksvuefp-section__overlay",
    style: ({
      background: _vm.options.overlay || null
    })
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "ksvuefp-section__content"
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);