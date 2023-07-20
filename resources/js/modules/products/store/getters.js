export default {
    getProduct: state => state.product,
    authError(state) {
        return state.authError
    },
};
