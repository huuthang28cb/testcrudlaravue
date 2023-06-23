import { createStore } from 'vuex';
import productModule from './modules/products';

const store = createStore({
    modules: {
        product: productModule,
    },
});

export default store;