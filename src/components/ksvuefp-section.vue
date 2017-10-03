<template lang="html">
  <component :is="options.animationType" :options="options" :appear="false">
    <tagger :options="options" :class="['ksvuefp-section',  $ksvuefp.wWidth < options.normalScrollWidth ? 'is-ksvuefp-inactive' : null]" v-show="$vnode.data.key === $ksvuefp.currentIndex || $ksvuefp.wWidth < options.normalScrollWidth">
      <span class="ksvuefp-section__overlay" :style="{ background: options.overlay || null }" v-if="options.overlay"></span>
      <div class="ksvuefp-section__content">
        <slot></slot>
      </div>
    </tagger>
  </component>
</template>

<script>
import { slideY, slideX, fade } from '../ksvuefp-animations'
export default {
  components: {
    slideY,
    slideX,
    fade,
    'tagger': {
      functional: true,
      props: ['options'],
      render (h, ctx) {
        return h(ctx.parent.options.sectionTag || 'div', ctx.data, ctx.children)
      }
    }
  },
  props: ['section', 'backgroundImage', 'backgroundColor', 'options']
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
