import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const App = {
  template: `<main style="text-align: center">
    <button @click="updateItemByKey">updateItemByKey</button>
    <button @click="updateItemWithSplice">updateItemWithSplice</button>
    <button @click="updateItemValueByArrayKey">updateItemValueByArrayKey</button>
    <button @click="updateItemWithSet">updateItemWithSet</button>
    <button @click="addNewKey">addNewKey</button>
    <button @click="addNewKeyWithReassign">addNewKeyWithReassign</button>
    <button @click="addNewKeyWithSet">addNewKeyWithSet</button>
    <hr />
    <p v-for="item in items" :key="item.id">{{ item }}</p>
    <hr />
    <p>{{ obj }}</p>
  </main>`,

  data() {
    return {
      items: [
        {
          id: Math.random(),
          value: 'a',
        },
        {
          id: Math.random(),
          value: 'b',
        },
      ],
      obj: {
        id: Math.random(),
        value: 'c',
      },
    };
  },

  methods: {
    updateItemByKey() {
      this.items[0] = {
        id: Math.random(),
        value: this.items[0].value + '!',
      };
    },

    updateItemWithSplice() {
      this.items.splice(0, 1, {
        id: Math.random(),
        value: this.items[0].value + '!',
      });
    },

    updateItemValueByArrayKey() {
      this.items[0].value += '!';
    },

    updateItemWithSet() {
      // Vue.set === this.$set
      const newValue = {
        id: Math.random(),
        value: this.items[0].value + '!',
      };
      this.$set(this.items, 0, newValue);
    },

    addNewKey() {
      this.obj.newKey = 'New Value';
    },

    addNewKeyWithReassign() {
      // Cработает ?
      // this.obj = Object.assign(this.obj, {
      //   newKey: 'New Value 2',
      // });

      // this.obj = {
      //   ...this.obj,
      //   newKey: 'New Value 2',
      // };

      // Сработает ?
      this.obj = Object.assign({}, this.obj, {
        newKey: 'New Value 2',
      });
    },

    addNewKeyWithSet() {
      this.$set(this.obj, 'newKey', 'New Value');
      this.$delete(this.obj, 'id');
      // this.$set(this.items[0], 'newKey', 'New Value') -- не сработает
    },
  },
};

const app = new Vue({
  render: (h) => h(App),
}).$mount('#app');
