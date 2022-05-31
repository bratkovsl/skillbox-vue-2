<template>
  <section class="catalog">
    <ProductList :products="products"/>
  </section>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';

export default {
  name: 'App',
  components: { ProductList },
  data() {
    return {
      products,
    };
  },
};
</script>
