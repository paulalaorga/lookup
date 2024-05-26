import { createApp } from 'vue';
import App from './App.vue';
import SkyMap from './components/SkyMap.vue';

const app = createApp(App);

// Register the SkyMap component globally if needed
app.component('SkyMap', SkyMap);

app.mount('#app');
