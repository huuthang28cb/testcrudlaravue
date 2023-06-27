<template>
    <div>
        <h2>Add Product</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input class="form-control" type="text" id="name" v-model="product.name" />
                <div v-if="productData.errors && productData.errors.name" class="text-sm text-red-600 err">{{ productData.errors.name[0] }}</div>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea class="form-control" id="description" v-model="product.description"></textarea>
                <div v-if="productData.errors && productData.errors.description" class="text-sm text-red-600 err">{{ productData.errors.description[0] }}</div>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price:</label>
                <input class="form-control" type="number" id="price" v-model="product.price" />
                <div v-if="productData.errors && productData.errors.price" class="text-sm text-red-600 err">{{ productData.errors.price[0] }}</div>
            </div>
            <button type="submit" class="btn btn-primary">Add Product</button>
            <div v-if="isLoading">Loading...</div>
        </form>
    </div>
</template>
  
  <!--<script>
import axios from 'axios';
export default {
    data() {
        return {
            product: {
                name: '',
                description: '',
                price: 0
            }
        }
    },
    computed: {
        isNewProduct() {
            return !this.$route.path.includes('edit');
        }
    },
    async created() {
        if (!this.isNewProduct) {
            const response = await axios.get(`/api/products/${this.$route.params.id}`); // day la edit, @@
            this.product = response.data;
        }
    },
    methods: {
        async submitForm() {
            try {
                if (this.isNewProduct) {
                    await axios.post('/api/products', this.product);
                } else {
                    await axios.put(`/api/products/${this.$route.params.id}`, this.product);
                }
                this.$router.push('/');
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>-->


<style>
.err {
    color: red;
}
</style>

<!-- vue2 -->
<!--<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            product: {
                name: '',
                description: '',
                price: ''
            }
        }
    },
    computed: {
        ...mapState('product', ['message', 'productData', 'isLoading']), // hãy sử dụng 'product' (đơn số) trong cấu hình Vuex.
    },
    methods: {
        ...mapActions('product', ['addProduct']),
        async submitForm() {
            try {
                const re = await this.addProduct(this.product);
                if (re) {
                    this.$swal({
                        text: this.message,
                    });
                    this.$router.push('/');
                }
            } catch (error) {
                console.error(error);
                console.log('aaaa')
            }
        }
    }
}
</script>-->

<!-- vue3 -->
<script>
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';

export default {
    setup() {
        const store = useStore();
        const { proxy } = getCurrentInstance();

        const product = {
            name: '',
            description: '',
            price: ''
        };

        const message = computed(() => store.state.product.message);
        const productData = computed(() => store.state.product.productData);
        const isLoading = computed(() => store.state.product.isLoading);

        const addProduct = async () => {
            try {
                const re = await store.dispatch('product/addProduct', product);
                if (re) {
                    Swal.fire({
                        text: message.value,
                    });
                    proxy.$router.push('/');
                }
            } catch (error) {
                console.error(error);
            }
        };

        const submitForm = () => {
            addProduct();
        };

        return {
            product,
            message,
            productData,
            isLoading,
            submitForm
        };
    }
};
</script>