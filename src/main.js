import  'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload' 
import 'common/stylus/index.styl'
import store from './store'
fastclick.attach(document.body)
Vue.config.productionTip = false
//window.addEventListener('touchmove', (e)=>{ passive: false })
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
 
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('common/image/default.png'),
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
