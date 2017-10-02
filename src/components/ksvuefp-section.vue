<template lang="html">
  <component :is="options.animationType" :options="options">
    <tagger :options="options" class="ksvuefp-section" :style="{ backgroundImage: backgroundImage || null, backgroundColor: backgroundColor || null }" v-show="$vnode.data.key === $ksvuefp.currentIndex">
      <span class="ksvuefp-section__overlay" :style="{ background: options.overlay || null }" v-if="options.overlay"></span>
      <div class="ksvuefp-section__content">
        <slot></slot>
      </div>
    </tagger>
  </component>
</template>

<script>
import { slideY, slideX, fade } from '../ks-vue-fullpage-animations'
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

<style lang="css">
.ksvuefp-section {
   height: 100%;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   background-size: cover;
}
.ksvuefp-section__overlay {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.ksvuefp-section__content {
   width: 100%;
   position: relative;
   z-index: 1;
}
</style>
