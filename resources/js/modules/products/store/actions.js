import axios from 'axios';
import store from '../../../store';

export default {
    async fetchProducts({ commit }) {
        try {
            commit('setLoading', true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.get('/api/products');
            commit('setProducts', response.data);
        } catch (error) {
            // console.log('omg')
        } finally {
            commit('setLoading', false);
        }
    },
    async deleteProduct({ commit }, productId) {
        try {
            const re = await axios.delete(`/api/products/${productId}`);
            commit('deleteProduct', productId);
            commit('setMessage', re.data.message);
        } catch (error) {
            console.error(error);
        }
    },
    async fetchProduct({ commit }, productId) {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            const product = response.data;
            commit('setProduct', product);
        } catch (error) {
            console.error(error);
        }
    },
    async addProduct({ commit }, product) {
        try {
            commit('setLoading', true);
            const response = await axios.post('/api/products', product);
            commit('setMessage', response.data.message);
            return true;
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                commit('setProductErrors', errors);
            } else {
                console.error(error);
            }
        } finally {
            commit('setLoading', false);
        }
    },
    async updateProduct(_, { productId, product }) {
        try {
            await axios.put(`/api/products/${productId}`, product);
        } catch (error) {
            console.error(error);
        }
    }
};
