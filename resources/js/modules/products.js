const productModule = {
  namespaced: true,
  state: {
    products: [],
    message: '',
    productData: {
      name: '',
      description: '',
      price: 0
    }
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
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('/api/products');
        commit('setProducts', response.data);
      } catch (error) {
        console.error(error);
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
    async addProduct(_, product) {
      try {
        await axios.post('/api/products', product);
      } catch (error) {
        console.error(error);
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