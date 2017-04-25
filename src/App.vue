<template>
  <div>
    <app-header></app-header>
    <app-dashboard></app-dashboard>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Dashboard from './components/Dashboard.vue';

  export default {
    components: {
      'app-header': Header,
      'app-dashboard': Dashboard
    }
  }
</script>

<style lang="sass" scoped>

</style>
