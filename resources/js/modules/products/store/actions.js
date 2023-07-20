import axios from 'axios';
import store from '../../../store';

// Định nghĩa hàm kiểm tra lỗi C_E_005
function isC_E_005Error(error) {
    return error.response && error.response.data.body[0] === "C_E_005";
}

// Định nghĩa hàm xử lý lỗi toàn cục
function handleGlobalError(error) {
    console.error(error, 'aaaaaaaaaaa');
    if (isC_E_005Error(error)) {
        store.state.authenticated = false;
        return;
    }
    // Nếu không phải lỗi C_E_005, xử lý lỗi theo ý muốn
    // ...
}

export default {
    async fetchProducts({ commit }) {
        try {
            commit('setLoading', true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.get('/api/products');
            commit('setProducts', response.data);
        } catch (error) {
            handleGlobalError(error)
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
