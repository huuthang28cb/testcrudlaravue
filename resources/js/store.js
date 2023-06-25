import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// import productModule from './modules/products_backup'; // backup
import productModule from './modules/products/store/index';
// import authModule from './modules/auth/store/index';
import router from './routes';

const reducer = (state) => ({
    authenticated: state.authenticated,
    user: state.user,
});

const store = createStore({
    modules: {
        product: productModule,
        // auth: authModule,
    },
    plugins: [createPersistedState({ reducer })],
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
        sessionExpiration: null,
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },
        SET_USER(state, value) {
            state.user = value
        }
    },
    actions: {
        login({ commit }) {
            return axios.get('/api/user')
                .then(({ data }) => {
                    commit('SET_USER', data);
                    commit('SET_AUTHENTICATED', true);
                    // localStorage.setItem('authenticated', 'true');
                    router.push({ name: 'home' });
                })
                .catch((error) => {
                    commit('SET_USER', {});
                    commit('SET_AUTHENTICATED', false);
                    console.error(error);
                });
        },
        logout({ commit }) {
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
            localStorage.removeItem('authenticated'); // Xóa trạng thái đăng nhập
            router.push({ name: 'login' });
        }
    },
});

export default store;