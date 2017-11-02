import ksvuefp from './components/ksvuefp.vue'
import ksvuefpSection from './components/ksvuefp-section.vue'
import utils from './utils'
import options from './defaultOptions'

function plugin (Vue) {
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
    created () {
      const vm = this
      vm.$on('ksvuefp-ready', () => {
        vm.$emit('ksvuefp-resized')
        vm.fpLoaded = true
      })
      vm.$on('ksvuefp-options-changed', (custom) => {
        vm.options = Object.assign({}, options, custom)
      })

      vm.$on('ksvuefp-resized', () => {
        vm.getWindowDim()
      })
      vm.$on('ksvuefp-destroy', () => {
        vm.fpLoaded = false
        vm.currentIndex = 0
        vm.slidingActive = false
        vm.sliderDirection = 'down'
        vm.options = {}
      })

      vm.$on('ksvuefp-change-begin', (nextIndex, oldIndex, direction, delay) => {
        vm.slidingActive = true
        vm.sliderDirection = direction
        vm.$nextTick(() => {
          setTimeout(() => {
            vm.currentIndex = nextIndex
          }, delay || 0)
        })
      })

      vm.$on('ksvuefp-change-done', () => {
        vm.slidingActive = false
      })
    },
    methods: {
      getWindowDim () {
        const vm = this
        const Dimensions = utils.getWindowDim()
        vm.wWidth = Dimensions.wWidth
        vm.wHeight = Dimensions.wHeight
        vm.$nextTick(() => {
          vm.$ksvuefp.$emit('ksvuefp-change-done')
        })
      },
      canAnimContent (index, wait = true) {
        if (index !== this.currentIndex) return
        if (wait) {
          return !this.slidingActive? true : false
        }
        return true
      }
    }
  })
  Vue.component('ksvuefp', ksvuefp)
  Vue.component('ksvuefp-section', ksvuefpSection)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  ksvuefp,
  ksvuefpSection,
  version
}
