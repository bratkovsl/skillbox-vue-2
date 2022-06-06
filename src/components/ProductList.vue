<template>
  <ul class="catalog__list">
    <ProductItem :product="product" :colors="colors"
                 v-for="product in products" :key="product.id" />
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products', 'colors'],
};
</script>
