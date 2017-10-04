export default {
  /**
   * Html params
   * @property {String} sectionTag - The tag used to wrap each vsvuefp-section component.
  */
  sectionTag: 'div',
  /**
   * Animation params
   * @property {String} animationType - Transition effect between 2 screens. Should be one of 'slideY', 'slideX', or 'fade'
   * @property {Number} duration - Duration of transition between 2 screens, in ms
   * @property {String} easing - Easing of the transition between 2 screens. Can be all easings supported by Velocity, including bezier curves. ex: [0.2, 0.5, 0.2, 0.5]
   * @property {Number} animDelay - Content animation delay. Help you define timing between screens transition and content animations
  */
  animationType: 'slideY',
  duration: 1000,
  animDelay: 0,
  /**
   * Preloading params
   * @property {Boolean} preloaderEnabled - Add a fullscreen preloading overlay with loading animation
   * @property {String} preloaderBgColor - Background color for the preloader overlay.
   * @property {String} preloaderColor - Preloader icon and text color
   * @property {String} preloaderText - The text that will appear under the icon animation during loading
   * @property {Boolean} waitForBackgrounds - Wait for sections background images to be fully loaded before triggering $ksvuefp-ready event
  */
  preloaderEnabled: true,
  preloaderBgColor: '#fff',
  preloaderColor: '#212121',
  preloaderText: 'Loading...',
  waitForBackgrounds: true,
  /**
   * Navigation params
   * @property {Boolean} loopBottom - Go to first section on scroll down while watching last section
   * @property {Boolean} loopTop - Go to last section on scroll up while watching first section
  */
  loopBottom: false,
  loopTop: false,
  /**
   * Design params
   * @property {Boolean - String} overlay - Insert a fullsize div between background and content, and set its background property. Must be a valid css background rule
   * @property {Boolean} parallax - the context
   * @property {Float} parallaxOffset - the context
  */
  overlay: 'rgba(0, 0, 0, 0.2)',
  parallax: false,
  parallaxOffset: 0.5
}
