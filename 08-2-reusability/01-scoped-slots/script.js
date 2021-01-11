import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const ListView = {
  template: `
    <ul>
      <li v-for="(item, idx) in items_">
        <slot :item="item" :removeItem="() => remove(idx)" :idx="idx">
          <span>{{ item }}</span>
          <button @click="remove(idx)">x</button>
        </slot>
      </li>
    </ul>`,

  props: {
    items: Array,
  },

  data() {
    return {
      items_: [...this.items],
    };
  },

  methods: {
    remove(idx) {
      this.items_.splice(idx, 1);
      this.$emit('update:items', [...this.items_]);
    },
  },

  // template: `<p> <slot /> </p>`,
  render(h) {
    return h('p', this.$scopedSlots.default());
    return h('p', this.$slots.default);
  },
  // template: `<p> <slot :item="item" /> </p>`,
  // render(h) {
  //   return h('p', this.$scopedSlots.default({ item: this.item }));
  // },
};

const App = {
  template: `
    <div>
      <list-view :items.sync="list">
        <template #default="{ item, idx, removeItem }">
          <a href="#" @click="removeItem">{{ item }}</a>
        </template>
      </list-view>
    </div>`,

  components: {
    ListView,
  },

  data() {
    return {
      list: [1, 2, 3, 4, 5],
    };
  },
};

const app = new Vue(App).$mount('#app');
