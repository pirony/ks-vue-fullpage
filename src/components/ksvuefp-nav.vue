<template lang="html">
  <ul class="ksvuefp-nav">
    <li v-for="(s, index) in sections">
      <span @click="click(index)" :class="['ksvuefp-nav__dot', index === $ksvuefp.currentIndex ? 'active' : '']"></span>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['sections'],
  methods: {
    click (i) {
      if (i === this.$ksvuefp.currentIndex) return

      this.$ksvuefp.$emit('ksvuefp-nav-click', { nextIndex: i })
    }
  }
}
</script>
<style lang="css">
.ksvuefp-nav {
  position: fixed;
  top: 50%;
  right: 0;
  width: 48px;
  transform: translateY(-50%);
  list-style: none;
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
