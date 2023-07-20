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

// Định nghĩa hàm kiểm tra lỗi C_E_005
function isC_E_005Error(error) {
    return error.response && error.response.data.body[0] === "C_E_005";
}

// Định nghĩa hàm xử lý lỗi toàn cục
function handleGlobalError(error) {
    console.error(error, 'aaaaaaaaaaaai');
    if (isC_E_005Error(error)) {
        // store.state.authenticated = false;
        // Hoặc bạn có thể xử lý lỗi ở đây theo ý muốn
        // Ví dụ: thông báo lỗi, redirect, vv.
        return;
    }
    // Xử lý các lỗi khác theo ý muốn
    // ...
}

const app = createApp(App);

// Đăng ký handleGlobalError vào app.config.globalProperties
app.config.globalProperties.$handleGlobalError = handleGlobalError;

app.use(router);
app.use(store);
app.mount('#app');
