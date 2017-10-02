# ks-vue-fullpage

[![ks-vue-fullpage](https://img.shields.io/npm/v/ks-vue-fullpage.svg)](https://www.npmjs.com/package/ks-vue-fullpage) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

>
A simple, flexible and easy to use Vue plugin to create fullscreen scrolling websites (also known as single page websites or onepage sites).
No jQuery needed, pure Vanilla js.

Try it in this [ fiddle ](https://jsfiddle.net/romainPouchol/rf7csunm/6/).

![ksvuefullpage-demo-slidey](https://user-images.githubusercontent.com/7433657/30744371-1a03b764-9fa2-11e7-8641-e05816e95854.gif)


+ x-axis or y-axis animations
+ w/without subtle parallax animations (on both axis)
+ multiple events triggered by the plugin on every components, listenable using vm.$ksvuefp

Inspired by the awesome jQuery plugin [ "FullPage.js" ](https://github.com/alvarotrigo/fullPage.js), created by [ @Alvarotrigo ](https://github.com/alvarotrigo)

---
## Getting Started

The plugin only works with 2nd version of Vue.js. Also, you'll need to include Velocity and hammerjs in your bundle (or directly in your html page if you choose the good old script tag method).

```bash
    npm i --save ks-vue-fullpage
```

## Usage

#### With Webpack

```js
    import KsVueFullpage from 'ks-vue-fullpage'
    Vue.use(KsVueFullpage)
```
#### With Nuxt

Create a ksvuefp.js files in yur plugins folder, and add it to yout nuxt.config.js files with ssr: false option

ksvuefp.js
```js
    import KsVueFullpage from 'ks-vue-fullpage'
    Vue.use(KsVueFullpage)
```

nuxt.config.js
```js
{
  ...
  plugins: [{
    src: '~/plugins/ksvuefp',
    ssr: false
  }]
  ...
}
```

#### With a script tag

```html
    <link rel="stylesheet" href="/dist/ks-vue-fullpage.min.css"></link>
    <script src="/dist/ks-vue-fullpage.min.js"></script>  
```

Ks-vue-fullpage registers 2 new components:

+ "ks-vuefp", which is the wrapper for our sections
+ "ks-vuefp-section", which is the single section wrapper you'll use with v-for

and add $ksvuefp to every components, available at vm.$ksvuefp

vm.$ksvuefp returns the following datas object
```js
{
  fpLoaded: false, // true when the plugin and his components are totally loaded
  currentIndex: 0, // the index currently shown
  slidingActive: false, // true if sections transition is occuring
  sliderDirection: 'down', // one of 'up' or 'down'
  wWidth: '', // Integer. current screen width
  wHeight: '' // Integer. current screen height
}
```


### Example code

```html
    ...
      <ks-vuefp :options="options" :sections="sections"> // Where options is an object of options, and sections an array containing our sections datas

        <ks-vuefp-section
          tag="section"
          class="whatever"
          v-for="(s,index) in sections"
          v-show="$ksvuefp.currentIndex == index"
          :options="options"
          :section="s"
          :key="index"
          :backgroundImage="'url('+ s.img_url +')'"
          :backgroundColor="'#123456'" >

          <h2> {{any_data}} </h2>

        </ks-vuefp-section>

      </ks-vuefp>
    ...
    <script>
      ...
      data(){
        return {
          sections: [
            {
              any_data: "I'm section 1",
              img_url: './images/whatever01.jpg'
            },
            {
              any_data: "I'm section 2",
              img_url: './images/whatever02.jpg'
            },
            {
              any_data: "I'm section 3",
              img_url: './images/whatever03.jpg'
            }
          ],
          options: {
            // Animation duration, default to 1000
            duration: 800,
            // Animation easing, default to 'Linear'. You can use all css3 animations types, including bezier
            // curves. ex: [0.2, 0.5, 0.2, 0.5]
            easing: 'Linear',
            // Add a div between background and content, and set its background property.
            // Must be a valid css background rule. Leave empty for no overlay. Default: null
            overlay: 'rgba(0,0,0,0.2)',
            // Animation type, default to 'slideY'. Should be one of 'slideY', 'slideX', or 'fade'
            animationType: 'slideX',
            // Content animation delay. Wait for content animation to finish. default to 0
            animationDelay: 500,
            // Hides dot nav, default to false.
            hideNav: false,
            // Enable parallax effect on section's background, default to false
            parallax: true,
            // Parallax offset amount, default to 0.5. Should be between 0 and 1. 0 gives no parallax effect,
            // 1 gives a "stacking effect" (the old section remains fixed during transition while the next one
            // slides above it).
            parallaxOffset: 0.64
          }
        }
      }
      ...
    </script>
```

### Available Properties

#### ks-vuefp component

Name | Data type | Default value | Description
----- | ------------- | --- | ---
options  | object | - | custom options (cf example above)
sections | array | - | sections list (cf example above)

#### ks-vuefp-section component

Name | Data type | Default value | Description
----- | ------------- | --- | ---
tag | string | div |
options  | object | - | the same custom options as our wrapper (cf example above)
section | object, string | - | the single section datas issued by v-for (cf example above)
key | int | - | must be the section's index from v-for loop (cf example above)
backgroundImage | string | - | must be a valid css background rule.
backgroundColor | string | - | must be a valid css background rule.


### Available Events


*You can listen to this events on all components using vm.$ksvuefp.$on :*

Name | Datas | Description
----- | ------------- | ---
ksvuefp-ready | - | Triggered when the plugin is fully loaded
ksvuefp-change-begin | nextIndex, oldIndex, direction | Triggered when the animation between 2 sections begins
ksvuefp-change-done | - | Triggered when the animation between 2 sections finishes
ksvuefp-resized | - | Triggered on window.resize

*You can emit this event from all components using vm.$ksvuefp.$emit :*

Name | Datas | Description
----- | ------------- | ---
ksvuefp-nav-click | nextIndex | Changes the current index to nextIndex

For example, if you want to create a custom navigation:

```html
      <ul>
        <li v-for="(s,index) in sections">
          <a href="#" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', index)">
            Section {{ index + 1 }} // The first index is 0
          </a>
        </li>
      </ul>
```

---

## Remaining tasks

- [x] Add parallax effect on both axis
- [x]  Make it Nuxt compatible
- [ ] Create demos (in progress)
- [x] Add delay option, to enable content animations before sliding
- [ ] Add better responsive features

---

## Contribution

I'm just a lowly frontend developer trying to master ES6, so suggestions are more than welcome, not only for feature requests but also for coding style improvements.

---

## Licence

[ MIT ](http://opensource.org/licenses/MIT)
