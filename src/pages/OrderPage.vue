<template>
  <!--  eslint-disable-->
  <main class="content container">
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
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <BaseLoader v-if="formSending"/>
      <form v-else class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name"
                          placeholder="Введите ваше полное имя"/>
            <BaseFormText v-model="formData.address" title="Адрес" :error="formError.address"
                          placeholder="Введите ваш адрес"/>
            <BaseFormText type="tel" v-model="formData.phone" title="Телефон"
                          :error="formError.phone" placeholder="Введите ваш телефон"/>
            <BaseFormText type="email" v-model="formData.email" title="Email"
                          :error="formError.email" placeholder="Введи ваш Email"/>
            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу"
                              :error="formError.comment" placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0"
                         checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <OrderInfoBlock :products="products" :total-price="totalPrice" :product-counter="productCounter" :shipping-price="500">
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </OrderInfoBlock>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import OrderInfoBlock from '@/components/OrderInfoBlock.vue';
import { mapGetters } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  components: {
    BaseLoader,
    OrderInfoBlock,
    BaseFormText,
    BaseFormTextarea,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formSending: false,
    };
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      productCounter: 'cartProductAmount',
    }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.formSending = true;
      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          this.formSending = false;
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message || '';
          this.formSending = false;
        });
    },
  },
};
</script>
