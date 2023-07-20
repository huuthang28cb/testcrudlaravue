import { createWebHistory, createRouter } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductForm from './components/ProductForm.vue';
import ProductAdd from './components/ProductAdd.vue';
import Product from './components/Product.vue';
import store from './store';

/* Guest Component */
const Login = () => import('./components/Login.vue');
const Register = () => import('./components/Register.vue');
/* Guest Component */

/* Layouts */
const DahboardLayout = () => import('./components/Default.vue');
/* Layouts */

/* Authenticated Component */
const Dashboard = () => import('./components/Dashboard.vue');
/* Authenticated Component */

const routes = [
    // { path: '/', component: ProductList, name: 'home' },
    { path: '/products/create', component: ProductAdd, name: 'product-create' },
    { path: '/products/:id', component: Product, name: 'product-details' },
    { path: '/products/:id/edit', component: ProductForm, name: 'product-edit' },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        name: 'home',
        component: ProductList,
        meta: {
            middleware: "auth"
        }
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    console.log(store.state.authenticated)
    if (to.meta.middleware == "guest") {
        if (store.state.authenticated) {
            next({ name: "home" });
        } else {
            next();
        }
    } else {
        if (store.state.authenticated) {
            next();
        } else {
            next({ name: "login" });
        }
    }
});

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title;
//   const isAuthenticated = localStorage.getItem('authenticated') === 'true';

//   if (to.meta.middleware == "guest") {
//     if (isAuthenticated) {
//       next({ name: "home" });
//     } else {
//       next();
//     }
//   } else {
//     if (isAuthenticated) {
//       next();
//     } else {
//       next({ name: "login" });
//     }
//   }
// });


export default router;
