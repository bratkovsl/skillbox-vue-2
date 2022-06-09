<template>
  <main class="content container" v-if="productsLoading"><BaseLoader /></main>
  <main class="content container" v-else-if="!productData">Ошибка при загрузке товара</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ productData.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="productData.image.file.url"
               :alt="productData.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productData.id }}</span>
        <h2 class="item__title">
          {{ productData.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ productData.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in productData.colors" :key="color.id">
                  <!--            eslint-disable-next-line-->
                  <label class="colors__label">
                    <!--            eslint-disable-next-line-->
                    <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.id" v-model="colorCurrent">
                    <span class="colors__value" :style="{backgroundColor: color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <!--            eslint-disable-next-line-->
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <!--            eslint-disable-next-line-->
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <!--            eslint-disable-next-line-->
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128"
                           checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <ProductAmount :value.sync="productAmount"/>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Происходит отправка товара в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные
            отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и различные приложения
            сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал
            с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего
            74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из
            черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56
            мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и
            синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс
            и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ProductAmount from '@/components/ProductAmount.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  components: { BaseLoader, ProductAmount },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoadingFailed: false,
      productsLoading: false,
      productAdded: false,
      productAddSending: false,
      colorCurrent: null,
    };
  },
  computed: {
    products() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions(['addProductToCart']),
    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({
        productId: this.productData.id,
        amount: this.productAmount,
      })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    setDefaultColor() {
      this.colorCurrent = this.productData.colors[0].id;
    },
    loadProduct() {
      this.productsLoading = true;
      this.productLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        // eslint-disable-next-line
        .then(response => {
          this.productData = response.data;
          this.setDefaultColor();
        })
        // eslint-disable-next-line no-return-assign
        .catch(() => this.productLoadingFailed = true)
        // eslint-disable-next-line
        .then(() => this.productsLoading = false);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
