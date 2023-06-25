<template>
    <div>
        <h5 id="associating-form-text-with-form-controls">Name:</h5>
        <h6>{{ productData.name }}</h6>
        <h5 id="associating-form-text-with-form-controls">Description:</h5>
        <p>{{ productData.description }}</p>
        <h5 id="associating-form-text-with-form-controls">Price:</h5>
        <p>{{ productData.price }}</p>
        <router-link :to="`/products/${productData.id}/edit`" class="btn btn-primary">Edit</router-link>
    </div>
</template>

<script>
import { computed, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const { proxy } = getCurrentInstance();

        // const getProduct = computed(() => { 
        //     return store.getters['product/getProduct']; 
        // });
        const productData = computed(() => { 
            return store.state.product.productData;
        });
        const fetchProduct = () => {
            store.dispatch('product/fetchProduct', proxy.$route.params.id);
        };
        onMounted(() => {
            fetchProduct();
        });
        return {
            // getProduct,
            productData,
        };
    }
};
</script>