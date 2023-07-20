// import './bootstrap';
// import '../sass/app.scss';
// import { createApp } from 'vue';
// import router from './routes';
// import store from './store';
// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

// import App from './components/App.vue';

// const app = createApp(App);

// app.use(router);
// app.use(store);
// app.use(VueSweetalert2);

// app.config.globalProperties.$store = store; // Gán store cho global properties

// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title;
//     if (to.meta.middleware == "guest") {
//         if (app.config.globalProperties.$store.state.auth.authenticated) {
//             next({ name: "dashboard" });
//         } else {
//             next();
//         }
//     } else {
//         if (app.config.globalProperties.$store.state.auth.authenticated) {
//             next();
//         } else {
//             next({ name: "login" });
//         }
//     }
// });

// app.mount('#app');

import './bootstrap';
import '../sass/app.scss';
import router from './routes'; // Import route từ file routes.js
import store from './store'; // Import Vuex store

import { createApp } from 'vue';
import App from './components/App.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
