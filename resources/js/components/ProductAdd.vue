<template>
    <div>
        <h2>Add Product</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input class="form-control" type="text" id="name" v-model="product.name" required />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea class="form-control" id="description" v-model="product.description" required></textarea>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price:</label>
                <input class="form-control" type="number" id="price" v-model="product.price" required />
            </div>
            <button type="submit" class="btn btn-primary">Add Product</button>
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
  
<script>
import { mapActions } from 'vuex';

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
    methods: {
        ...mapActions('product', ['addProduct']),
        async submitForm() {
            try {
                await this.addProduct(this.product);
                this.$router.push('/');
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>