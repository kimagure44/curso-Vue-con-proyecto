import ScreenHome from '@/components/pages/home.vue'
import ScreenContact from '@/components/pages/contact.vue'
import ShowPoster from '@/components/pages/showPoster.vue'

const routes = [
  { path: '/', component: ScreenHome, name: 'home' },
  { path: '/contact', component: ScreenContact, name: 'contact' },
  { path: '/poster/:idPelicula', component: ShowPoster, name: 'poster' }
]

export default routes
