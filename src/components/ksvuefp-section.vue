<template lang="html">
  <component :is="$ksvuefp.options.animationType" :options="$ksvuefp.options" :appear="false">
    <tagger :class="['ksvuefp-section',  $ksvuefp.wWidth < $ksvuefp.options.normalScrollWidth ? 'is-ksvuefp-inactive' : null]" :style="{ backgroundImage: backgroundImage || '', backgroundColor: backgroundColor || '' }" v-show="$vnode.data.key === $ksvuefp.currentIndex">
      <span class="ksvuefp-section__overlay" :style="{ background: $ksvuefp.options.overlay || null }" v-if="$ksvuefp.options.overlay"></span>
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
      render (h) {
        return h(this.$ksvuefp.options.sectionTag || 'div', this.$slots.default)
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
  props: ['section', 'backgroundImage', 'backgroundColor']
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
