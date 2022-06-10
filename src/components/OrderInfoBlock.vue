<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products" :key="item.product.id">
        <h3>{{ item.product.title }} - ({{item.amount}} шт.)</h3>
        <b>{{ ((item.amount || item.quantity) * item.product.price) | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>{{ shippingPrice | numberFormat }} ₽</b></p>
      <p>Итого: <b>{{ productCounter }}</b>
        {{ numWord(productCounter, ['товар', 'товара', 'товаров']) }} на сумму
        <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
    <slot />
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import numWord from '@/helpers/numWord';

export default {
  props: ['products', 'totalPrice', 'productCounter', 'shippingPrice'],
  filters: {
    numberFormat,
  },
  data() {
    return {
      numWord,
    };
  },
};
</script>
