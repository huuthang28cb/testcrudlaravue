import { createWebHistory, createRouter } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductForm from './components/ProductForm.vue';
import ProductAdd from './components/ProductAdd.vue';
import Product from './components/Product.vue';

const routes = [
    { path: '/', component: ProductList, name: 'home' },
    { path: '/products/create', component: ProductAdd, name: 'product-create' },
    { path: '/products/:id', component: Product, name: 'product-details' },
    { path: '/products/:id/edit', component: ProductForm, name: 'product-edit' },
  ];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;