const productModule = {
  namespaced: true,
  state: {
    products: [],
    message: '',
    productData: {
      name: '',
      description: '',
      price: 0,
      errors: {} // Thêm trường errors để chứa thông báo lỗi
    },
    isLoading: false // Add a new isLoading property
  },
  mutations: {
    setMessage(state, message){
      state.message = message;
    },
    setProducts(state, products) {
      state.products = products;
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(product => product.id !== productId);
    },
    setProduct(state, product) {
      state.productData = product;
    },
    setProductErrors(state, errors) {
      state.productData.errors = errors;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        commit('setLoading', true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await axios.get('/api/products');
        commit('setProducts', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('setLoading', false); // Set loading state to false
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
        commit('setLoading', false); // Set loading state to false
      }
    },
    async updateProduct(_, { productId, product }) {
      try {
        await axios.put(`/api/products/${productId}`, product);
      } catch (error) {
        console.error(error);
      }
    }
  },
  getters: {
    getProduct: state => state.product
  }
};

export default productModule;