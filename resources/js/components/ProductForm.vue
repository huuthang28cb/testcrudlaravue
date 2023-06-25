<template>
    <div>
        <h2 v-if="isNewProduct">Add Product</h2>
        <h2 v-else>Edit Product</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input class="form-control" type="text" id="name" v-model="productData.name" required />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea class="form-control" id="description" v-model="productData.description" required></textarea>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price:</label>
                <input class="form-control" type="number" id="price" v-model="productData.price" required />
            </div>
            <button type="submit" v-if="isNewProduct" class="btn btn-primary">Add Product</button>
            <button type="submit" v-else class="btn btn-primary">Update Product</button>
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

<!-- Vue2 -->
<!--<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters('product', ['getProduct']),
        isNewProduct() {
            return !this.$route.path.includes('edit');
        },
        ...mapState('product', ['productData']) // Thêm computed property này
    },
    created() {
        if (!this.isNewProduct) {
            this.fetchProduct(this.$route.params.id);
        }
    },
    methods: {
        ...mapActions('product', ['fetchProduct', 'addProduct', 'updateProduct']),
        submitForm() {
            try {
                if (this.isNewProduct) {
                    this.addProduct(this.productData);
                } else {
                    this.updateProduct({ productId: this.$route.params.id, product: this.productData });
                }
                this.$router.push('/');
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>-->

<!-- vue3 -->
<script>
import { computed, onMounted, getCurrentInstance } from 'vue'; //  Đây là cách import các hàm và hooks cần thiết từ Vue 3.
import { useStore } from 'vuex'; //  Đây là cách import hàm useStore từ Vuex để truy cập vào store.

// Common logic

export default {
    setup() { //  Đây là một hàm được sử dụng trong Composition API để cung cấp các tài nguyên và hàm cho component
        const store = useStore(); // Sử dụng hàm useStore để lấy ra instance của Vuex store.
        const { proxy } = getCurrentInstance(); // de dung route,  Sử dụng getCurrentInstance() để lấy ra instance hiện tại của component và thông qua proxy, chúng ta có thể truy cập vào các biến và hàm của component.

        const getProduct = computed(() => { // Sử dụng computed để tạo một computed property getProduct dựa trên giá trị getter trong Vuex store.
            return store.getters['product/getProduct']; 
        });

        const isNewProduct = computed(() => { // Sử dụng computed để tạo một computed property isNewProduct để kiểm tra xem đường dẫn hiện tại có chứa "edit" hay không.
            return !proxy.$router.currentRoute.value.path.includes('edit');
        });

        const productData = computed(() => { // Sử dụng computed để tạo một computed property productData dựa trên giá trị state trong Vuex store.
            return store.state.product.productData;
        });

        const fetchProduct = () => { // Định nghĩa một hàm fetchProduct để gọi action trong Vuex store để lấy dữ liệu sản phẩm.
            store.dispatch('product/fetchProduct', proxy.$route.params.id);
        };

        const addProduct = (data) => { // Định nghĩa một hàm addProduct để gọi action trong Vuex store để thêm sản phẩm mới.
            store.dispatch('product/addProduct', data);
        };

        const updateProduct = (payload) => { // Định nghĩa một hàm updateProduct để gọi action trong Vuex store để cập nhật thông tin sản phẩm.
            store.dispatch('product/updateProduct', payload);
        };

        onMounted(() => { // Sử dụng onMounted để thực hiện các hành động khi component được mounted. Trong trường hợp này, nếu không phải là sản phẩm mới, sẽ gọi hàm fetchProduct để lấy thông tin sản phẩm từ server.
            if (!isNewProduct.value) {
                fetchProduct();
            }
        });

        /**
         * Định nghĩa một hàm submitForm để xử lý việc gửi form. 
         * Nếu là sản phẩm mới, gọi hàm addProduct để thêm sản phẩm mới vào store. 
         * Nếu là sản phẩm đã tồn tại, gọi hàm updateProduct để cập nhật thông tin sản phẩm. 
         * Sau đó, chuyển hướng đến trang chủ ('/') và xử lý các lỗi nếu có.
         */
        const submitForm = () => {
            try {
                if (isNewProduct.value) {
                    addProduct(productData.value);
                } else {
                    updateProduct({ productId: proxy.$route.params.id, product: productData.value });
                }
                proxy.$router.push('/');
            } catch (error) {
                console.error(error);
            }
        };

        return {
            getProduct,
            isNewProduct,
            productData,
            submitForm
        };
    }
};
</script>