<template>
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Login</h1>
                        <hr />
                        <form action="javascript:void(0)" class="row" method="post">
                            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="text" v-model="auth.email" name="email" id="email" class="form-control" />
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" v-model="auth.password" name="password" id="password" class="form-control" />
                            </div>
                            <div class="col-12 mb-2">
                                <button :disabled="processing" @click="login" class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Login" }}
                                    </button>
                            </div>
                            <div class="col-12 text-center">
                                <label>
                                    Don't have an account? <router-link :to="{ name: 'register' }">Register Now!</router-link>
                                    </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<!--<script>
import { computed, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
    name: "login",
    setup() {
        const store = useStore();

        const auth = ref({
            email: "",
            password: ""
        });
        const validationErrors = ref({});
        const processing = ref(false);

        const signIn = () => {
            store.dispatch("auth/login");
        };

        const login = async () => {
            processing.value = true;
            await axios.get("/sanctum/csrf-cookie");
            try {
                const response = await axios.post("/login", auth.value);
                console.log(response)
                if (response.status === 200) {
                    signIn();
                } else {
                    validationErrors.value = {};
                    alert(response.data.message);
                }
            } catch (error) {
                // console.log(error);
                if (error.response && error.response.status === 422) {
                    validationErrors.value = error.response.data.errors;
                } else {
                    validationErrors.value = {};
                    alert("An error occurred during login.");
                }
            } finally {
                processing.value = false;
            }
        };

        return {
            auth,
            validationErrors,
            processing,
            signIn,
            login
        };
    }
};
</script>-->
<!--<script>
import { mapActions } from 'vuex';
// import { useRouter } from 'vue-router' // Import useRouter từ Vue Router
export default {
    name: "login",
    data() {
        return {
            auth: {
                email: "",
                password: ""
            },
            validationErrors: {},
            processing: false
        }
    },
    methods: {
        ...mapActions({
            signIn: 'login'
        }),
        async login() {
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', this.auth).then(({ data }) => {
                this.signIn()
            }).catch(({ response }) => {
                if (response.status === 422) {
                    this.validationErrors = response.data.errors
                } else {
                    this.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(() => {
                this.processing = false
            })
        },
    }
}
</script>-->
<script>
/**
 * ref được sử dụng để tạo một biến tham chiếu (reference variable) cho một giá trị. Biến tham chiếu này cũng có khả năng theo dõi (reactive) nhưng chỉ áp dụng cho giá trị của nó. 
 */
import { reactive, ref } from 'vue'; // reactive: Đối tượng reactive cho phép các thuộc tính bên trong nó có khả năng theo dõi và tự động cập nhật các phụ thuộc khi có sự thay đổi
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    name: 'login',
    setup() {
        const store = useStore();

        const auth = reactive({
            email: '',
            password: '',
        });

        const validationErrors = ref({});
        const processing = ref(false);

        const login = async () => {
            processing.value = true;
            await axios.get('/sanctum/csrf-cookie');
            try {
                const response = await axios.post('/login', auth);
                store.dispatch('login');
            } catch (error) {
                const { response } = error;
                if (response && response.status === 422) {
                    validationErrors.value = response.data.errors;
                } else {
                    validationErrors.value = {};
                    alert(response.data.message);
                }
            } finally {
                processing.value = false;
            }
        };

        return {
            auth,
            validationErrors,
            processing,
            login,
        };
    },
};
</script>