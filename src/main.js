import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'vue-universal-modal/dist/index.css'

import VueUniversalModal from 'vue-universal-modal'
import 'normalize.css/normalize.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueUniversalModal, {
  teleportTarget: '#app'
})
app.mount('#app')
