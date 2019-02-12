import Vue from 'vue'
// Importamos Vue router
import VueRouter from 'vue-router'
import App from '@/App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FilmLoading from '@/components/global/filmLoading.vue'
import FilmModal from '@/components/global/filmModal.vue'
import EventBus from '@/plugin/eventBus'
// Importamos las rutas
import routes from '@/routes'

/*
 * Importar componente de forma global
 * Vue.component(tag-html, componente)
 */

Vue.component('film-loading', FilmLoading)
Vue.component('film-modal', FilmModal)

/*
 * Vue.use nos sirve para usar plugins, librerias externas, etc...
 */
Vue.use(EventBus)
Vue.use(VueRouter)

// Declaramos una instancia de Vue-router con las rutas
const router = new VueRouter({
  routes,
  mode: 'history'
})

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Pasamos Vuerouter a la instancia global
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
