<template>
  <div id="app" class="page wrapper container">
    <app-input v-model="value" placeholder="Text">
      <template #left-icon v-if="icon">
        <app-icon icon="search" />
      </template>
    </app-input>
    <button @click="icon = !icon">Toggle Icon</button>
    <hr>
    {{ value }}
  </div>
</template>

<script>
import AppInput from './components/AppInput';
import AppIcon from './components/AppIcon';
export default {
  name: 'App',

  components: { AppIcon, AppInput },

  data() {
    return {
      value: 'Initial Text',
      icon: true,
    };
  },
};
</script>

<style scoped></style>
