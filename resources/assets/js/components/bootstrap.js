import Vue from 'vue'

import Creator from './creator.vue';
import ColorPicker from './colorpicker';
import Selector from './selector.vue';
import ClassicEarring from './classic-earring.vue';

//Register the components
Vue.component('creator', Creator);
Vue.component('selector', Selector);
Vue.component('colorpicker', ColorPicker);
Vue.component('classicEarring', ClassicEarring);
