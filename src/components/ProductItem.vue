<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.name">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
               {{ product.price | numberFormat }} ₽
            </span>

    <ul class="colors colors--black">
      <!--            eslint-disable-next-line-->
      <li class="colors__item" v-for="c in product.colors" :key="c.id">
        <!--            eslint-disable-next-line-->
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
                 :value="c.code"
                 v-model="color">
          <span class="colors__value"
                :style="{backgroundColor: c.code}">
                  </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  data() {
    return {
      color: this.product.colors[0].code,
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
};
</script>
