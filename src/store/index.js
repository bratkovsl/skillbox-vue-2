import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartSpinner: true,
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, {
      productId,
      amount,
    }) {
      // eslint-disable-next-line
      const item = state.cartProducts.find(item => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, cartProductsData) {
      state.cartProductsData = cartProductsData;
    },
    syncCartProducts(state) {
      // eslint-disable-next-line
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
    updateCartSpinner(state, status) {
      state.cartSpinner = status;
    },
  },
  getters: {
    cartDetailProducts(state) {
      // eslint-disable-next-line
      return state.cartProducts.map(item => {
        // eslint-disable-next-line
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      // eslint-disable-next-line
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartProductAmount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.amount) + acc, 0);
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
          context.commit('updateCartSpinner', false);
        });
    },
    addProductToCart(context, {
      productId,
      amount,
    }) {
      // eslint-disable-next-line no-promise-executor-return
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        // eslint-disable-next-line
        .then(() => {
          return axios
            .post(`${API_BASE_URL}/api/baskets/products`, {
              // eslint-disable-next-line
              productId: productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            // eslint-disable-next-line
            .then(response => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    updateCartProductAmount(context, {
      productId,
      amount,
    }) {
      context.commit('updateCartProductAmount', {
        productId,
        amount,
      });
      if (amount < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          // eslint-disable-next-line
          productId: productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        // eslint-disable-next-line
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    // eslint-disable-next-line
    deleteProductCart(context, { productId }) {
      // eslint-disable-next-line no-promise-executor-return
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        // eslint-disable-next-line
        .then(() => {
          return axios
            .delete(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
              data: {
                productId,
              },
            })
            // eslint-disable-next-line
            .then(response => {
              console.log(response);
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            })
            .catch((error) => {
              console.log(error);
              context.commit('syncCartProducts');
            });
        });
    },
  },
});
