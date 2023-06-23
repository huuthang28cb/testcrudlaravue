<template>
    <div>
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

<script>
import { mapActions, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('product', ['products', 'message']), // hãy sử dụng 'product' (đơn số) trong cấu hình Vuex.
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
</script>