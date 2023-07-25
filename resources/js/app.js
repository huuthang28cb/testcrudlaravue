import './bootstrap';
import '../sass/app.scss';
import router from './routes'; // Import route từ file routes.js
import store from './store'; // Import Vuex store

import { createApp } from 'vue';
import App from './components/App.vue';
import handleGlobalError from './utils/handleGlobalError';

// handle Global Error axios error
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        handleGlobalError(error, store)
    }
);

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
