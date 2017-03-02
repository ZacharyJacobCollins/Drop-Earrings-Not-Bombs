
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('creator', require('./components/creator.vue'));
Vue.component('selector', require('./components/selector.vue'));
Vue.component('colorpicker', require('./components/colorpicker.vue'));
Vue.component('classicEarring', require('./components/classic-earring.vue'));

const app = new Vue({
  store,
  el: '#app'
});
