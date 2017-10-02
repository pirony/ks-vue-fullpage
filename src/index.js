import KsVueFullpage from './components/ksvuefp-wrapper.vue'
import KsVueFpSection from './components/ksvuefp-section.vue'
import utils from './utils'


function plugin (Vue) {
  Vue.prototype.$ksvuefp = new Vue({
    data: {
      fpLoaded: false,
      currentIndex: 0,
      slidingActive: false,
      sliderDirection: 'down',
      wWidth: '',
      wHeight: ''
    },
    created () {
      const vm = this

      vm.getWindowDim()

      vm.$on('ksvuefp-ready', () => {
        vm.fpLoaded = true
      })

      vm.$on('ksvuefp-resized', () => {
        vm.getWindowDim()
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
      }
    }
  })
  Vue.component('ksvuefp-wrapper', KsVueFullpage)
  Vue.component('ksvuefp-section', KsVueFpSection)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  KsVueFullpage,
  KsVueFpSection,
  version
}
