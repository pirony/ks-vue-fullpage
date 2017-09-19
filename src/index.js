import KsVueFullpage from './ks-vue-fullpage'
import utils from './utils.js'

const KsVueFpSection = utils.ksVueFpSection

function plugin (Vue) {
  const ksvuefpBus = new Vue({
    data: {
      fpLoaded: false,
      currentIndex: 0,
      slidingActive: false,
      sliderDirection: 'down',
      wWidth: '',
      wHeight: ''
    },
    created () {
      console.log(this);
      const vm = this

      utils.setWindowDim(vm)

      vm.$on('ksvuefp-ready', () => {
        vm.fpLoaded = true
      })

      vm.$on('ksvuefp-resized', () => {
        utils.setWindowDim(vm)
      })

      vm.$on('ksvuefp-change-begin', (nextIndex, oldIndex, direction) => {
        vm.slidingActive = true
        vm.sliderDirection = direction
        vm.$nextTick(() => {
          vm.currentIndex = nextIndex
        })
      })

      vm.$on('ksvuefp-change-done', () => {
        vm.slidingActive = false
      })
    }
  })

  Object.defineProperties(Vue.prototype, {
    $ksvuefp: {
      get: function () {
        return ksvuefpBus
      }
    }
  })

  Vue.component('ks-vuefp', KsVueFullpage)
  Vue.component('ks-vuefp-section', KsVueFpSection)
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
