import Vue from 'vue';
import App from './App.vue';

// import data from './data';
// Задание 1
import { text, message } from './textExport';
import alertText from './alertText';

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// Задание 1
alert(text);
alert(message.text);
alertText('1 сообщение');
alertText('2 сообщение');
