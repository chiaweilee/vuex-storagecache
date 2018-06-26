import Vue from 'Vue'
import App from './App.vue'
import calc from '../src/index'

Vue.config.productionTip = false

Vue.use(calc)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  template: '<App/>',
  components: {App}
})
