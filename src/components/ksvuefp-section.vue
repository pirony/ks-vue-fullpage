<template lang="html">
  <component :is="options.animationType" :options="options" :appear="false">
    <tagger :sectionIndex="sectionIndex" :options="options" :class="['ksvuefp-section']" :style="{ backgroundImage: backgroundImage || '', backgroundColor: backgroundColor || '' }" v-show="sectionIndex === $ksvuefp.currentIndex">
      <span class="ksvuefp-section__overlay" :style="{ background: options.overlay || 'rgba(0,0,0,0.2)' }" v-if="options.overlay"></span>
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
      props: ['options', 'sectionIndex'],
      render (h) {
        return h(this.options.sectionTag || 'div', this.$slots.default)
      },
      mounted () {
        const vm = this
        vm.$nextTick(() => {
          setTimeout(() => {
            imagesLoaded(vm.$el, { background: true }, () => {
              vm.$ksvuefp.$emit('ksvuefp-section-loaded', vm.sectionIndex)
            })
          }, 300)
        })
      }
    }
  },
  data () {
    return {
      options: this.$ksvuefp.options || []
    }
  },
  props: ['section', 'backgroundImage', 'backgroundColor', 'sectionIndex']
}
</script>

<style>
.ksvuefp-section {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  padding: 0;
  margin: 0;
  background-position: center;
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
