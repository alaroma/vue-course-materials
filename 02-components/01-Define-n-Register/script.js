import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const VCat = {
  template: '#v-cat-template',

  data: () => ({
    random: Math.random(),
  }),
};

const VCatX = {
  template: '#v-cat-x-template',

  data: () => ({
    random: Math.random(),
  }),
};

const VCat4 = {
  template: `<figure>
    <img :src="'https://cataas.com/cat?height=200&random=' + random" alt="Random cat 1">
    <figcaption>Cat #{{ random }}</figcaption>
  </figure>`,

  data: () => ({
    random: Math.random(),
  }),
};

Vue.component('VCat6', {
  template: `<figure>
    <img :src="'https://cataas.com/cat?height=200&random=' + random" alt="Random cat 1">
    <figcaption>Cat #{{ random }}</figcaption>
  </figure>`,

  data: () => ({
    random: Math.random(),
  }),
});

new Vue({
  el: '#app',

  components: {
    VCat,
    VCat2: VCatX,
    VCat3: {
      template: '#v-cat-x-template',

      data: () => ({
        random: Math.random(),
      }),
    },
    VCat4,
    VCat5: () => import('./VCat.js'),
  },
});
