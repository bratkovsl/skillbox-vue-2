<template>
  <ul v-if="products.length > 0" class="catalog__list">
    <ProductItem :product="product" :colors="colors"
                 v-for="product in products" :key="product.id"/>
  </ul>
  <div v-else class="catalog__item">
    Ничего не найдено
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products', 'colors'],
};
</script>
