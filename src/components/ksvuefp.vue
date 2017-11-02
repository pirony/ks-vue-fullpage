<template>
  <div :class="['ksvuefp', $ksvuefp.wWidth < $ksvuefp.options.normalScrollWidth ? 'is-ksvuefp-inactive' : null]" :style="ksvuefpStyles">
    <div class="ksvuefp-sections">
      <slot></slot>
    </div>
    <transition :name="$ksvuefp.options.preloaderTransitionName || 'fade-out'" v-if="$ksvuefp.options.preloaderEnabled">
      <ksvuefp-preloader v-if="!$ksvuefp.fpLoaded" :backgroundColor="$ksvuefp.options.preloaderBgColor || ''" :preloaderColor="$ksvuefp.options.preloaderColor || ''" :preloaderText="$ksvuefp.options.preloaderText"/>
    </transition>
    <fp-nav v-if="$ksvuefp.options.dotNavEnabled" :sections="sections" :options="$ksvuefp.options"/>
  </div>
</template>
<script>
import utils from '../utils.js'
import fpNav from './ksvuefp-nav.vue'
import ksvuefpPreloader from './ksvuefp-preloader.vue'
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    sections: {
      type: Array,
      default: () => []
    }
  },
  components: {
    fpNav,
    ksvuefpPreloader
  },
  created () {
    this.$ksvuefp.$emit('ksvuefp-options-changed', this.options)
  },
  mounted () {
    const vm = this
    vm.$nextTick(() => {
      /**
       * We listen to our custom navclick event on ksvuefp bus
       * @param Event
      */
      vm.$ksvuefp.$on('ksvuefp-nav-click', (e) => {
        e.oldIndex = vm.$ksvuefp.currentIndex
        e.type = 'navclick'
        vm.changeIndex(e)
      })

      vm.$ksvuefp.$on('ksvuefp-section-loaded', (i) => {
        if (i !== vm.sections.length - 1) return
        setTimeout(() => {
          vm.$ksvuefp.$emit('ksvuefp-ready')
        }, 300)
      })
      /**
       * We listen to resize event and then emit on $ksvuefp bus
      */
      window.addEventListener('resize', function () {
        vm.$ksvuefp.$emit('ksvuefp-resized')
      })
      /**
       * We set the list of actions we want to trigger the animation with
       * @const {array}
       *
      */
      const actions = ['wheel', 'mousewheel', 'keydown']
      /**
       * For each action in the above array, trigger changeIndex method
       *
      */
      actions.forEach((a) => {
        document.addEventListener(a, vm.changeIndex)
      })

      vm.$ksvuefp.$emit('ksvuefp-options-changed', vm.options)

      /**
       * trigger changeIndex method on swipe with HAMMER.JS if touch is detected
       *
      */
      var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
      if (!isTouch) return

      var mc = new Hammer(vm.$el)
      mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

      mc.on('swipeup swipedown swiperight swipeleft', function (e) {
        vm.changeIndex(e)
      })
    })
  },
  computed: {
    ksvuefpStyles () {
      return {
        height: this.$ksvuefp.wHeight + 'px'
      }
    }
  },
  methods: {
    /** trigger the change index event
     * @param Event
     *
    */
    changeIndex (e) {
      if (e.defaultPrevented) {
        return; // Should do nothing if the key event was already consumed.
      }
      const vm = this

      if (vm.$ksvuefp.slidingActive) return // if last transition is not yet finished, return without doing anything

      const OldIndex = vm.$ksvuefp.currentIndex
      const Length = vm.sections.length
      const Options = vm.$ksvuefp.options

      /**
       * We get the sliding direction using a custom func getDirection() in utils
       * @const String
       * @return up or down
       *
      */
      const Direction = utils.getDirection(e, vm.$ksvuefp.options.animationType)

      if (Direction === 'none' || Direction === undefined) return

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
          nextIndex = utils.getNextIndex(OldIndex, Direction, Length, Options)
          break
      }

      if (nextIndex === 'none') return

      this.$nextTick(() => {  // we wait for our computed datas to be ready
        /**
         * Emit change event on bus vm
         * @param {integer} nextIndex
         * @param {integer} OldIndex
         * @param {String} Direction
         *
        */
        vm.$ksvuefp.$emit('ksvuefp-change-begin', nextIndex, OldIndex, Direction, vm.$ksvuefp.options.animDelay)

        /**
         * Emit change-done event on bus vm when animation is finished
         *
        */
        setTimeout(() => {
          vm.$ksvuefp.$emit('ksvuefp-change-done')
        }, vm.$ksvuefp.options.duration ? vm.$ksvuefp.options.duration + vm.$ksvuefp.options.animDelay + 100 : vm.$ksvuefp.options.animDelay + 1100)
      })
    }
  },
  watch: {
    options: {
      deep: true,
      handler (val) {
        this.$ksvuefp.$emit('ksvuefp-options-changed', val)
      }
    }
  },
  beforeDestroy () {
    const vm = this
    /**
     * We set the list of actions we want to trigger the animation with
     * @const {array}
     *
    */
    const actions = ['wheel', 'mousewheel', 'keydown']
    /**
     * For each action in the above array, trigger changeIndex method
     *
    */
    actions.forEach((a) => {
      document.removeEventListener(a, vm.changeIndex)
    })
    window.addEventListener('resize', function () {
      vm.$ksvuefp.$emit('ksvuefp-resized')
    })
    this.$off()
    this.$ksvuefp.$emit('ksvuefp-destroy')

  }
}
</script>
<style>
  .ksvuefp {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    &.is-ksvuefp-inactive {
      overflow: auto;
    }
    &-sections {
      position: relative;
      height: 100%;
      width: 100%;
      display: block;
      z-index: 1;
    }
  }

  .fade-out-enter-active,
  .fade-out-leave-active {
    transition: all 0.3s;
    opacity: 1;
    transition-delay: 0.3s;
  }

  .fade-out-enter,
  .fade-out-leave-active {
    opacity: 0;
  }
</style>
