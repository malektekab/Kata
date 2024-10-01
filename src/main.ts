import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import.meta
import router from './router'
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css"; 
import "primeicons/primeicons.css"; 


const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.use(createPinia());

app.mount('#app')
