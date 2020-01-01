import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import BootstrapVue from 'bootstrap-vue';
import VModal from 'vue-js-modal'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/main.css';

Vue.use(BootstrapVue);
Vue.use(VModal);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
