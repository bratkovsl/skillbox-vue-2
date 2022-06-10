<template>
  <main class="content container" v-if="!orderInfo">
    <BaseLoader/>
  </main>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'cart'}" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{orderInfo.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями
            заказа.
            Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{orderInfo.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{orderInfo.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{orderInfo.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
               {{orderInfo.email}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>
        <OrderInfoBlock :products="orderInfo.basket.items"
                            :total-price="orderInfo.totalPrice"
                            :product-counter="productCounter" :shipping-price="500" />
      </form>
    </section>
  </main>
</template>

<script>
import OrderInfoBlock from '@/components/OrderInfoBlock.vue';
import { mapState } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  components: { BaseLoader, OrderInfoBlock },
  computed: {
    ...mapState(['orderInfo']),
    productCounter() {
      // eslint-disable-next-line max-len
      return this.orderInfo.basket.items.reduce((value, item) => value + item.quantity, 0);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        if (this.orderInfo && this.orderInfo.id === this.$route.params.id) {
          return;
        }
        this.$store.dispatch('loadOrderInfo', this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>
