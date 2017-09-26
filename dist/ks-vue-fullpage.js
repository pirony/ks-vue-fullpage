/*!
 * ks-vue-fullpage v0.3.1
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ksVueFpNav: {
    props: ['sections'],
    render: function render(h, ctx) {
      var sections = this.sections;
      return h('ul', { class: 'ksVueFpNav' }, sections.map(function (item, index) {
        return h('item', { props: { item: item, index: index }, key: index });
      }));
    },

    components: {
      item: {
        props: ['item', 'index'],
        functional: true,
        render: function render(h, ctx) {
          var clickEv = function clickEv() {
            ctx.parent.$ksvuefp.$emit('ksvuefp-nav-click', { nextIndex: ctx.props.index });
          };
          return h('li', [h('span', {
            class: ['dot', ctx.props.index === ctx.parent.$ksvuefp.currentIndex ? 'active' : ''],
            attrs: {
              href: '#',
              'data-index': ctx.props.index
            },
            on: {
              click: clickEv
            }
          })]);
        }
      }
    }
  },
  ksVueFpSection: {
    props: ['section', 'backgroundImage', 'backgroundColor', 'options', 'index'],
    functional: true,
    render: function render(h, ctx) {
      return h('section', {
        style: {
          backgroundImage: ctx.props.backgroundImage || null,
          backgroundColor: ctx.props.backgroundColor || null
        },
        class: ctx.data.staticClass + ' ksVueFpSection',
        key: ctx.data.key,
        props: {
          options: ctx.props.options,
          sliderDirection: ctx.parent.$ksvuefp.sliderDirection,
          slidingActive: ctx.parent.$ksvuefp.slidingActive,
          tag: 'div',
          appear: false,
          index: ctx.data.key
        },
        directives: ctx.data.directives
      }, [h('div', {
        class: 'ksVueFpSectionContent',
        style: {
          position: 'relative',
          zIndex: 1
        }
      }, ctx.children)]);
    }
  },
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
        break;
      case 'keyup':
        switch (e.key) {
          case "ArrowDown":
            if (animType !== 'slideY') return 'none';
            return 'down';
            break;
          case "ArrowUp":
            if (animType !== 'slideY') return 'none';
            return 'up';
            break;
          case "ArrowLeft":
            if (animType !== 'slideX') return 'none';
            return 'down';
            break;
          case "ArrowRight":
            if (animType !== 'slideX') return 'none';
            return 'up';
            break;
          default:
            return 'none'; // Quit when this doesn't handle the key event.
        }
        break;
      case 'swipeup':
        if (animType == 'slideX') return 'none';
        return 'down';
        break;
      case 'swipeleft':
        if (animType !== 'slideX') return 'none';
        return 'down';
        break;
      case 'swipedown':
        if (animType == 'slideX') return 'none';
        return 'up';
        break;
      case 'swiperight':
        if (animType !== 'slideX') return 'none';
        return 'up';
        break;
      case 'navclick':
        if (e.oldIndex < e.nextIndex) {
          return 'down';
        } else {
          return 'up';
        }
        break;
      default:
        return 'none';

    }
  },
  setWindowDim: function setWindowDim(vm) {
    vm.wWidth = window.innerWidth;
    vm.wHeight = window.innerHeight;
    vm.$nextTick(function () {
      vm.$ksvuefp.$emit('ksvuefp-change-done');
    });
  },
  getNextIndex: function getNextIndex(i, direction, length) {
    switch (direction) {
      case 'down':
        if (i !== length - 1) {
          i++;
        } else {
          i = 0;
        }
        break;
      case 'up':
        if (i !== 0) {
          i--;
        } else {
          i = length - 1;
        }
        break;
      default:
    }
    return i;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _ksVueFullpageAnimations = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    options: {
      type: Object,
      default: {}
    },
    sections: {
      type: Array,
      default: {}
    },
    animDelay: {
      type: Number,
      default: 0
    }
  },
  render: function render(h) {
    return h('div', {
      class: ['ksVueFpWrapper', this.$ksvuefp.wWidth < this.options.normalScrollWidth ? 'ksVueFpDisabled' : null],
      style: {
        height: this.$ksvuefp.wHeight + 'px',
        position: 'relative',
        overflow: 'hidden'
      }
    }, [h(this.neededAnimComponent(this.options.animationType || 'slideY'), {
      class: 'ksVueFpSections',
      props: {
        currentIndex: this.$ksvuefp.currentIndex,
        tag: 'div',
        options: this.options,
        slidingActive: this.$ksvuefp.slidingActive,
        sliderDirection: this.$ksvuefp.sliderDirection
      },
      attrs: {
        appear: false
      }
    }, this.$slots.default), !this.options.hideNav ? h(_utils2.default.ksVueFpNav, {
      props: {
        sections: this.sections
      }
    }) : null]);
  },
  data: function data() {
    return {
      slidingActive: false,
      sliderDirection: 'down'
    };
  },
  created: function created() {
    var vm = this;
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
  },
  mounted: function mounted() {
    var _this = this;

    var vm = this;
    vm.$nextTick(function () {
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
    /**
     * We Change the <transition> component depending on the animation type defined
     * @param {string} type - the animation type
     * @return {object} needed component datas
     *
    */
    neededAnimComponent: function neededAnimComponent(type) {
      switch (type) {
        case 'slideY':
        default:
          return _ksVueFullpageAnimations.KsVueFullpageSlideY;
          break;
        case 'slideX':
          return _ksVueFullpageAnimations.KsVueFullpageSlideX;
          break;
        case 'fade':
          return _ksVueFullpageAnimations.KsVueFullpageFade;
          break;
        case 'prismX':
          return _ksVueFullpageAnimations.KsVueFullpagePrismX;
          break;
      }
      return;
    },

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
          nextIndex = _utils2.default.getNextIndex(OldIndex, Direction, Length);
          break;
      }

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.KsVueFpSection = exports.KsVueFullpage = undefined;

var _ksVueFullpage = __webpack_require__(1);

var _ksVueFullpage2 = _interopRequireDefault(_ksVueFullpage);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KsVueFpSection = _utils2.default.ksVueFpSection;

function plugin(Vue) {
  var ksvuefpBus = new Vue({
    data: {
      fpLoaded: false,
      currentIndex: 0,
      slidingActive: false,
      sliderDirection: 'down',
      wWidth: '',
      wHeight: ''
    },
    created: function created() {
      console.log(this);
      var vm = this;

      _utils2.default.setWindowDim(vm);

      vm.$on('ksvuefp-ready', function () {
        vm.fpLoaded = true;
      });

      vm.$on('ksvuefp-resized', function () {
        _utils2.default.setWindowDim(vm);
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
    }
  });

  Object.defineProperties(Vue.prototype, {
    $ksvuefp: {
      get: function get() {
        return ksvuefpBus;
      }
    }
  });

  Vue.component('ks-vuefp', _ksVueFullpage2.default);
  Vue.component('ks-vuefp-section', KsVueFpSection);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

exports.default = plugin;

var version = '__VERSION__';
// Export all components too
exports.KsVueFullpage = _ksVueFullpage2.default;
exports.KsVueFpSection = KsVueFpSection;
exports.version = version;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KsVueFullpagePrismX = exports.KsVueFullpageFade = exports.KsVueFullpageSlideY = exports.KsVueFullpageSlideX = undefined;

var _utils = __webpack_require__(0);

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
var KsVueFullpageSlideX = exports.KsVueFullpageSlideX = {

  props: ['options', 'slidingActive', 'sliderDirection'],
  functional: true,
  render: function render(h, ctx) {
    if (!ctx.parent.$ksvuefp.fpLoaded) return h('transition-group', ctx.data, ctx.children); // don't animate until the plugin is fully loaded

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

    return h('transition-group', ctx.data, ctx.children);
  }

  // component datas for slideY option
};var KsVueFullpageSlideY = exports.KsVueFullpageSlideY = {
  props: ['options', 'slidingActive', 'sliderDirection'],
  functional: true,
  render: function render(h, ctx) {
    if (!ctx.parent.$ksvuefp.fpLoaded) return h('transition-group', ctx.data, ctx.children); // If the plugin is not fully loaded, don't animate and return h() directly

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
    return h('transition-group', ctx.data, ctx.children);
  }

  // component datas for fade option
};var KsVueFullpageFade = exports.KsVueFullpageFade = {
  props: ['options', 'slidingActive', 'sliderDirection'],
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

    return h('transition-group', ctx.data, ctx.children);
  }

  // TODO: add prismX and prismY transitions

  // component datas for prismX option
};var KsVueFullpagePrismX = exports.KsVueFullpagePrismX = {
  render: function render(h) {
    return h('transition-group',
    // { attrs: { name: 'prismX' }, props: { tag: 'div' }},
    null, this.$slots.default);
  }
};

/***/ })
/******/ ]);
});