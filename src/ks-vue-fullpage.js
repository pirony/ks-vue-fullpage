import utils from './utils.js'
import { KsVueFullpageSlideY, KsVueFullpageSlideX, KsVueFullpageFade } from './ks-vue-fullpage-animations'

export default {
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
  render (h) {
    return h(
      'div',
      {
        class: 'ksVueFpWrapper',
        style: {
          height: window.innerHeight + 'px',
          position: 'relative',
          overflow: 'hidden'
        }
      },
      [
        h(
          this.neededAnimComponent(this.options.animationType || 'slideY'),
          {
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
          },
          this.$slots.default
        ),
        !this.options.hideNav ? h(
          utils.ksVueFpNav,
          {
            props: {
              sections: this.sections
            }
          }
        ) : null
      ]
    )
  },
  data () {
    return {
      slidingActive: false,
      sliderDirection: 'down'
    }
  },
  created () {
    const vm = this
    /**
     * We listen to our custom navclick event on ksvuefp bus
     * @param Event
    */
    vm.$ksvuefp.$on('ksvuefp-nav-click', (e) => {
      e.oldIndex = vm.$ksvuefp.currentIndex
      e.type = 'navclick'
      vm.changeIndex(e)
    })
    /**
     * We listen to resize event and then emit on $ksvuefp bus
    */
    window.addEventListener('resize', function () {
      vm.$nextTick(() => {
        vm.$ksvuefp.$emit('ksvuefp-resized')
      })
    })
  },
  mounted () {
    const vm = this
    vm.$nextTick(() => {
      /**
       * We set the list of actions we want to trigger the animation with
       * @const {array}
       *
      */
      const actions = ['wheel', 'mousewheel', 'keypress']
      /**
       * For each action in the above array, trigger changeIndex method
       *
      */
      actions.forEach((a) => {
        document.addEventListener(a, vm.changeIndex)
      })

      /**
       * trigger changeIndex method when a key is pressed
       *
      */
      document.onkeyup = function (e) {
        vm.changeIndex(e)
      }

      /**
       * When our component is ready, emit ready event on $ksvuefp
       *
      */
      setTimeout(() => {
        vm.$ksvuefp.$emit('ksvuefp-ready')
      }, 300)

      /**
       * trigger changeIndex method on pan with HAMMER.JS if touch is detected
       *
      */
      var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
      if (!isTouch) return

      var mc = new Hammer(this.$el)
      mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

      mc.on('swipeup swipedown swiperight swipeleft', function (e) {
        vm.changeIndex(e)
      })
    })
  },
  methods: {
    /**
     * We Change the <transition> component depending on the animation type defined
     * @param {string} type - the animation type
     * @return {object} needed component datas
     *
    */
    neededAnimComponent (type) {
      switch (type) {
        case 'slideY':
        default:
          return KsVueFullpageSlideY
          break
        case 'slideX':
          return KsVueFullpageSlideX
          break
        case 'fade':
          return KsVueFullpageFade
          break
      }
      return
    },
    /** trigger the change index event
     * @param Event
     *
    */
    changeIndex (e) {
      const vm = this

      if (vm.$ksvuefp.slidingActive) return // if last transition is not yet finished, return without doing anything

      const OldIndex = vm.$ksvuefp.currentIndex
      const Length = vm.sections.length

      /**
       * We get the sliding direction using a custom func getDirection() in utils
       * @const String
       * @return up or down
       *
      */
      const Direction = utils.getDirection(e)

      let nextIndex

      /**
       * Get next index
       * @return index to go to
       *
      */
      switch (e.type) {
        case 'navclick': // if is the event is from a click on navigation item
          nextIndex = e.nextIndex
          break
        default: // else
          nextIndex = utils.getNextIndex(OldIndex, Direction, Length)
          break
      }

      this.$nextTick(() => {  // we wait for our computed datas to be ready
        /**
         * Emit change event on bus vm
         * @param {integer} nextIndex
         * @param {integer} OldIndex
         * @param {String} Direction
         *
        */
        vm.$ksvuefp.$emit('ksvuefp-change-begin', nextIndex, OldIndex, Direction, this.options.animDelay)

        /**
         * Emit change-done event on bus vm when animation is finished
         *
        */
        setTimeout(() => {
          vm.$ksvuefp.$emit('ksvuefp-change-done')
        }, vm.options.duration? vm.options.duration + vm.options.animDelay + 100 : vm.options.animDelay + 1100)
      })
    }
  }
}
