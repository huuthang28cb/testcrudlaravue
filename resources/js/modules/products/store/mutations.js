export default {
    setMessage(state, message) {
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
    },
    setAuthError(state, authError) {
        state.authError = authError;
    }
};
