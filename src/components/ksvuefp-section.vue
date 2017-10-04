<template lang="html">
  <component :is="options.animationType" :options="options" :appear="false">
    <tagger :options="options" :class="['ksvuefp-section',  $ksvuefp.wWidth < options.normalScrollWidth ? 'is-ksvuefp-inactive' : null]" :style="{ backgroundImage: backgroundImage || null, backgroundColor: backgroundColor || null }" v-show="$vnode.data.key === $ksvuefp.currentIndex || $ksvuefp.wWidth < options.normalScrollWidth">
      <span class="ksvuefp-section__overlay" :style="{ background: options.overlay || null }" v-if="options.overlay"></span>
      <div class="ksvuefp-section__content">
        <slot></slot>
      </div>
    </tagger>
  </component>
</template>

<script>
import { slideY, slideX, fade } from '../ksvuefp-animations'
import imagesLoaded from 'imagesloaded'
export default {
  components: {
    slideY,
    slideX,
    fade,
    'tagger': {
      props: ['options'],
      render (h) {
        return h(this.options.sectionTag || 'div', this.$slots.default)
      },
      mounted () {
        const vm = this
        vm.$nextTick(() => {
          setTimeout(() => {
            imagesLoaded(vm.$el, { background: true }, () => {
              vm.$ksvuefp.$emit('ksvuefp-section-loaded', vm.$parent.$vnode.key)
            })
          }, 300)
        })
      }
    }
  },
  props: ['section', 'backgroundImage', 'backgroundColor', 'options'],
  watch: {
    options: {
      handler: function (val, oldVal) {
        console.log(val)
      },
      deep: true
    }
  }
}
</script>

<style lang="css">
.ksvuefp-section {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  padding: 0;
  margin: 0;
  &__overlay {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  &__content {
    width: 100%;
    position: relative;
    z-index: 1;
  }

  &.is-ksvuefp-inactive {
    position: relative;
  }
}
</style>
