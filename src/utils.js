export default {
  bgOffset (action, direction, offset) {
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
  getDirection (e, animType) {
    e = e || window.event
    switch (e.type) {
      case 'mousewheel':
      case 'wheel':
        const delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1
        if (delta < 0) return 'up'
        return 'down'
      case 'keydown':
        switch (e.key) {
          case 'ArrowDown':
            if (animType !== 'slideY') return 'none'
            return 'down'
          case 'ArrowUp':
            if (animType !== 'slideY') return 'none'
            return 'up'
          case 'ArrowLeft':
            if (animType !== 'slideX') return 'none'
            return 'up'
          case 'ArrowRight':
            if (animType !== 'slideX') return 'none'
            return 'down'
          default:
            return 'none' // Quit when this doesn't handle the key event.
        }
      case 'swipeup':
        if (animType === 'slideX') return 'none'
        return 'down'
      case 'swipeleft':
        if (animType !== 'slideX') return 'none'
        return 'down'
      case 'swipedown':
        if (animType === 'slideX') return 'none'
        return 'up'
      case 'swiperight':
        if (animType !== 'slideX') return 'none'
        return 'up'
      case 'navclick':
        if (e.oldIndex < e.nextIndex) {
          return 'down'
        } else {
          return 'up'
        }
      default:
        return 'none'

    }
  },
  getWindowDim () {
    if (typeof window === 'undefined') global.window = {}
    return {
      wHeight: window.innerHeight,
      wWidth: window.innerWidth
    }
  },
  getNextIndex (i, direction, length, options) {
    switch (direction) {
      case 'down':
        if (i !== length - 1) {
          i++
        } else {
          if (options.loopBottom) i = 0
          if (!options.loopBottom) i = 'none'
        }
        break
      case 'up':
        if (i !== 0) {
          i--
        } else {
          if (options.loopTop) i = length - 1
          if (!options.loopTop) i = 'none'
        }
        break
      default:
    }
    return i
  }
}
