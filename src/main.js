import Vue from 'vue'
import App from './App.vue'
import VueHead from 'vue-head'
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import VueChartist from 'vue-chartist';

Vue.use(VueMomentJS, moment);
Vue.use(VueHead)
Vue.use(VueChartist)

new Vue({
  el: '#app',
  render: h => h(App)
})
