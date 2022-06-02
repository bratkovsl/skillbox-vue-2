<template>
  <div class="form__counter">
    <button style="cursor: pointer" @click.prevent="decrement" type="button"
            aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <!--            eslint-disable-next-line-->
    <input type="text" v-model.number="value">

    <button style="cursor: pointer" @click.prevent="increment" type="button"
            aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    increment() {
      this.$emit('update:value', this.value + 1);
    },
    decrement() {
      if (this.value > 1) {
        this.$emit('update:value', this.value - 1);
      }
    },
  },
};
</script>
