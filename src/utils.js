export default {
  ksVueFpNav: {
    props: ['sections'],
    render (h, ctx) {
      const sections = this.sections
      return h(
        'ul',
        { class: 'ksVueFpNav' },
        sections.map((item, index) =>
          h(
            'item',
            { props: { item, index }, key: index }
          )
        )
      )
    },
    components: {
      item: {
        props: ['item', 'index'],
        functional: true,
        render (h, ctx) {
          const clickEv = function () {
            ctx.parent.$ksvuefp.$emit('ksvuefp-nav-click', { nextIndex: ctx.props.index })
          }
          return h(
            'li',
            [h(
              'span',
              {
                class: ['dot', ctx.props.index === ctx.parent.$ksvuefp.currentIndex ? 'active' : ''],
                attrs: {
                  href: '#',
                  'data-index': ctx.props.index
                },
                on: {
                  click: clickEv
                }
              }
            )]
          )
        }
      }
    }
  },
  ksVueFpSection: {
    props: ['section', 'backgroundImage', 'backgroundColor', 'options', 'index'],
    functional: true,
    render (h, ctx) {
      return h(
        'section',
        {
          style: {
            backgroundImage: ctx.props.backgroundImage || null,
            backgroundColor: ctx.props.backgroundColor || null
          },
          class: ctx.data.staticClass + ' ksVueFpSection',
          key: ctx.data.key,
          props: {
            options: ctx.props.options,
            sliderDirection: ctx.parent.$ksvuefp.sliderDirection,
            slidingActive: ctx.parent.$ksvuefp.slidingActive,
            tag: 'div',
            appear: false,
            index: ctx.data.key
          },
          directives: ctx.data.directives
        },
        [
          h(
            'div',
            {
              class: 'ksVueFpSectionContent',
              style: {
                position: 'relative',
                zIndex: 1
              }
            },
            ctx.children
          )
        ]
      )
    }
  },
  bgOffset(action, direction, offset) {
    let res
    switch (action) {
      case 'enter':
        res = direction === 'up' ? offset || '0.5' : offset * -1 || '-0.5'
        break
      case 'leave':
        res = direction === 'up' ? offset * -1 || '-0.5' : offset || '0.5'
        break
    }

    return res
  },
  getDirection(e, animType) {
    switch (e.type) {
      case 'mousewheel':
      case 'wheel':
        const delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1
        if (delta < 0) return 'up'
        return 'down'
        break
      case 'keyup':
        switch (e.key) {
          case "ArrowDown":
            if (animType !== 'slideY') return 'none'
            return 'down'
            break
          case "ArrowUp":
            if (animType !== 'slideY') return 'none'
            return 'up'
            break
          case "ArrowLeft":
            if (animType !== 'slideX') return 'none'
            return 'up'
            break
          case "ArrowRight":
            if (animType !== 'slideX') return 'none'
            return 'down'
            break
          default:
            return 'none' // Quit when this doesn't handle the key event.
        }
        break
      case 'swipeup':
        if (animType == 'slideX') return 'none'
        return 'down'
        break
      case 'swipeleft':
        if (animType !== 'slideX') return 'none'
        return 'down'
        break
      case 'swipedown':
        if (animType == 'slideX') return 'none'
        return 'up'
        break
      case 'swiperight':
        if (animType !== 'slideX') return 'none'
        return 'up'
        break
      case 'navclick':
        if (e.oldIndex < e.nextIndex) {
          return 'down'
        } else {
          return 'up'
        }
        break
      default:
        return 'none'

    }
  },
  setWindowDim(vm) {
    vm.wWidth = window.innerWidth
    vm.wHeight = window.innerHeight
    vm.$nextTick(() => {
      vm.$ksvuefp.$emit('ksvuefp-change-done')
    })
  },
  getNextIndex(i, direction, length) {
    switch (direction) {
      case 'down':
        if (i !== length - 1) {
          i++
        } else {
          i = 0
        }
        break
      case 'up':
        if (i !== 0) {
          i--
        } else {
          i = length - 1
        }
        break
      default:
    }
    return i
  }
}
