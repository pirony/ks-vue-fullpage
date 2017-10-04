<template lang="html">
  <ul :class="['ksvuefp-nav', options.navPosition === 'bottom' || options.animationType === 'slideX' ? 'is-bottom' : 'is-right']">
    <li class="ksvuefp-nav__item" v-for="(s, index) in sections">
      <span @click="click(index)" :class="['ksvuefp-nav__dot', index === $ksvuefp.currentIndex ? 'active' : '']"></span>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['sections', 'options'],
  methods: {
    click (i) {
      if (i === this.$ksvuefp.currentIndex) return

      this.$ksvuefp.$emit('ksvuefp-nav-click', { nextIndex: i })
    }
  }
}
</script>
<style>
.ksvuefp-nav {
  position: fixed;
  z-index: 2;
  list-style: none;
  margin: 0;
  display: flex;
  justify-content: center;
  &.is-right, &.is-left {
    flex-direction: column;
  }
  &.is-right {
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
  &.is-left {
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }
  &.is-top {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.is-bottom {
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }
}

.ksvuefp-nav .ksvuefp-nav__item {
  display: block;
  height: 22px;
  width: 22px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ksvuefp-nav__dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: white;
  display: block;
  margin: 15px auto;
  cursor: pointer;
}

.ksvuefp-nav__dot.active {
  height: 14px;
  width: 14px;
  cursor: default;
}
</style>
