import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

Vue.registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager"). PreviousNextView)
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  
  render: h => h('frame', [h(App)]), 
  
}).$start()
