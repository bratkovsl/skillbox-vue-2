<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.name">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
               {{ product.price }} ₽
            </span>

    <ul class="colors colors--black">
      <!--            eslint-disable-next-line-->
      <li class="colors__item" v-for="colorId in product.colorIds" :key="colorId">
        <!--            eslint-disable-next-line-->
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
                 :value="getColor(colorId)"
                 v-model="color">
          <span class="colors__value"
                :style="{backgroundColor: getColor(colorId)}">
                  </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['product', 'colors'],
  data() {
    return {
      color: this.getColor(this.product.colorIds[0]),
    };
  },
  methods: {
    getColor(id) {
      const v = this.colors.filter((color) => color.id === id);
      return v[0].value;
    },
  },
};
</script>
