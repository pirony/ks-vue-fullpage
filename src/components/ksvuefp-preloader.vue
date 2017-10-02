<template lang="html">
  <div class="ksvuefp-preloader" :style="{ backgroundColor: backgroundColor || '#fff' }">
    <div>
      <div class="ksvuefp-preloader__wrapper">
        <div v-for="n in 4" :class="['square' + n, 'square']"><span :style="{ backgroundColor: preloaderColor || '#333' }"></span></div>
      </div>
      <p class="ksvuefp-preloader__text" :style="{ color: preloaderColor || '#333' }">{{ preloaderText || 'loading...' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ksvuefpPreloader',
  props: ['backgroundColor', 'preloaderColor', 'preloaderText']
}
</script>

<style>
.ksvuefp-preloader {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 99998;
  display: flex;
  justify-content: center;
  align-items: center;
  &__wrapper {
    margin: 20px auto;
    width: 40px;
    height: 40px;
    position: relative;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }
  &__text {
    display: block;
    text-align: center;
    margin-top: 15px;
  }
}

.ksvuefp-preloader .square {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.ksvuefp-preloader .square span {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-animation: ks-foldCubeAngle 2.4s infinite linear both;
  animation: ks-foldCubeAngle 2.4s infinite linear both;
  -webkit-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.ksvuefp-preloader .square2 {
  -webkit-transform: scale(1.1) rotateZ(90deg);
  transform: scale(1.1) rotateZ(90deg);
}

.ksvuefp-preloader .square3 {
  -webkit-transform: scale(1.1) rotateZ(270deg);
  transform: scale(1.1) rotateZ(270deg);
}

.ksvuefp-preloader .square4 {
  -webkit-transform: scale(1.1) rotateZ(180deg);
  transform: scale(1.1) rotateZ(180deg);
}

.ksvuefp-preloader .square2 span {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.ksvuefp-preloader .square3 span {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}

.ksvuefp-preloader .square4 span {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

@-webkit-keyframes ks-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }

  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }

  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes ks-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }

  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }

  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
