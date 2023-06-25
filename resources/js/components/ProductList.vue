<template>
    <span v-if="isLoading" class="loader"></span>
    <div v-else>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in this.products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <div class="row gap-3">
                            <router-link :to="`/products/${product.id}`" class="p-2 col border btn btn-primary">View</router-link>
                            <router-link :to="`/products/${product.id}/edit`" class="p-2 col border btn btn-success">Edit</router-link>
                            <button @click="showAlert(product.id)" type="button" class="p-2 col border btn btn-danger">Delete</button>
                            <!-- @click="deleteProduct(product.id)" -->
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
.loader {
    justify-content: center;
    align-items: center;
    /* height: 100vh;
    display: block;
    position: relative;
    height: 32px;
    width: 200px; */
    background: #fff;
    border: 2px solid #fff;
    color: red;
    overflow: hidden;
}

.loader::before {
    content: '';
    background: red;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    animation: loading 10s linear infinite;
}

.loader:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 24px;
    line-height: 32px;
    color: rgb(0, 255, 255);
    mix-blend-mode: difference;
    animation: percentage 10s linear infinite;
}

@keyframes loading {
    0% {
        width: 0
    }
    30% {
        width: 100%
    }
}

@keyframes percentage {
    0% {
        content: "0%"
    }
    5% {
        content: "5%"
    }
    10% {
        content: "10%"
    }
    /* 20% {
        content: "20%"
    } */
    30% {
        content: "30%"
    }
    /* 40% {
        content: "40%"
    } */
    50% {
        content: "50%"
    }
    /* 60% {
        content: "60%"
    } */
    70% {
        content: "70%"
    }
    80% {
        content: "80%"
    }
    /* 90% {
        content: "90%"
    } */
    /* 95% {
        content: "95%"
    }
    96% {
        content: "96%"
    }
    97% {
        content: "97%"
    } */
    98% {
        content: "98%"
    }
    99% {
        content: "99%"
    }
    100% {
        content: "100%"
    }
}
</style>

<!-- vue2 -->
<!--<script>
import { mapActions, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('product', ['products', 'message', 'isLoading']), // hãy sử dụng 'product' (đơn số) trong cấu hình Vuex.
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        showAlert(productId) {
            this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.deleteProduct(productId)
                            .then(() => {
                                this.$swal({
                                    position: 'top-end',
                                    text: this.message,
                                });
                            })
                            .catch((error) => {
                                console.error(error);
                                this.$swal({
                                    title: 'Error',
                                    text: "An error occurred while deleting the file.",
                                    icon: 'error',
                                });
                            });
                    } else if (result.dismiss === 'cancel') {
                        // Xử lý khi người dùng nhấp vào nút hủy bỏ
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        ...mapActions('product', ['fetchProducts', 'deleteProduct']),

        async onDeleteProduct(id) {
            try {
                await this.deleteProduct(id);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>-->

<!-- vue3 -->
<script>
import { computed, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
export default {
    setup() {
        const store = useStore();
        const { proxy } = getCurrentInstance();

        // định nghĩa các phương thức tính toán mà có thể sử dụng như các thuộc tính.
        // state, getters
        const message = computed(() => store.state.product.message);
        const products = computed(() => store.state.product.products);
        const isLoading = computed(() => store.state.product.isLoading);

        const showAlert = (productId) => {
            Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        deleteProduct(productId)
                            .then(() => {
                                Swal.fire({
                                    position: 'top-end',
                                    text: message.value,
                                });
                            })
                            .catch((error) => {
                                console.error(error);
                                Swal.fire({
                                    title: 'Error',
                                    text: "An error occurred while deleting the file.",
                                    icon: 'error',
                                });
                            });
                    } else if (result.dismiss === 'cancel') {
                        // Handle when user clicks on the cancel button
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        // goi action
        const fetchProducts = () => {
            store.dispatch('product/fetchProducts');
        };
        /**
         * Action trong Vuex thường được thực hiện bất đồng bộ
         * Khi gọi action deleteProduct thông qua store.dispatch, action sẽ trả về 
         * một Promise để cho phép chúng ta thực hiện các hành động sau khi action hoàn thành.
         */
        const deleteProduct = async (payload) => {
            // try {
            await store.dispatch('product/deleteProduct', payload);
            // } catch (error) {
            //     throw error;
            // }
        };
        // const deleteProduct = (payload) => {
        //     return new Promise((resolve, reject) => {
        //         store.dispatch('product/deleteProduct', payload)
        //             .then(() => {
        //                 resolve(); // Xóa thành công
        //             })
        //             .catch((error) => {
        //                 reject(error); // Xóa thất bại
        //             });
        //     });
        // };

        onMounted(() => { // Sử dụng onMounted để thực hiện các hành động khi component được mounted. Trong trường hợp này, nếu không phải là sản phẩm mới, sẽ gọi hàm fetchProduct để lấy thông tin sản phẩm từ server.
            fetchProducts();
        });

        return {
            message,
            products,
            isLoading,
            showAlert
        };
    }
};
</script>