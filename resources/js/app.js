import './bootstrap';
import { createApp } from 'vue';
import router from './routes'; // Import route từ file routes.js
import store from './store'; // Import Vuex store
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Import components
import App from './components/App.vue';

const app = createApp(App);
app.use(router);
app.use(store); // Đăng ký Vuex store với ứng dụng Vue
app.use(VueSweetalert2);
app.mount('#app');