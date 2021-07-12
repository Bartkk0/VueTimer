import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var app = new Vue({
  render: h => h(App),
}).$mount('#app')
console.log(app)

//const counter = app.$children[0].$refs["counter"];

setInterval(() => {
  app.$children[0].onTick()
}, 500);