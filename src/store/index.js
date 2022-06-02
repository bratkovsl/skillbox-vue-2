import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 1,
        amount: 2,
      },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      // eslint-disable-next-line
      const item = state.cartProducts.find(item => item.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      // eslint-disable-next-line
      const item = state.cartProducts.find(item => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      // eslint-disable-next-line
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      // eslint-disable-next-line
      return state.cartProducts.map(item => {
        return {
          ...item,
          product: products.find((p) => p.id === item.productId),
        };
      });
    },
    cartTotalPrice(state, getters) {
      // eslint-disable-next-line
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartProductAmount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.amount) + acc, 0);
      // return getters.cartDetailProducts.length; только товары
    },
  },
});
