import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// import productModule from './modules/products_backup'; // backup
import productModule from './modules/products/store/index';
// import authModule from './modules/auth/store/index';
import router from './routes';
import VueCookies from 'vue-cookies'

const reducer = (state) => ({
    authenticated: state.authenticated,
    // user: state.user,
});

// set common token into header fetch api
axios.defaults.headers.common['token'] = `${VueCookies.get('token')}`;

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
        errors: {
            email: '',
            password: ''
        },
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
        },
        SET_ERROR(state, value) {
            state.errors = value
        }
    },
    actions: {
        async login({ commit }, auth) {
            try {
                var data = await axios.post('/login', auth);
                await VueCookies.set('token', data.data.token, { expires: 60 });
                commit('SET_USER', data.data);
                commit('SET_AUTHENTICATED', true);
                window.location.reload();
                router.push({ name: 'home' });
            } catch (error) {
                // commit('SET_USER', {});
                // commit('SET_AUTHENTICATED', false);
            }
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
