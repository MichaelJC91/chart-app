<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!-- The Sign-in button. This will run `queryReports()` on success. -->
        <p id="google-signin-btn"></p>
        <chartist
          ratio="ct-major-second"
          type="Line"
          :data="chartData"
          :options="chartOptions">
        </chartist>
      </div>
    </div>
  </div>
</template>

<script>

import GoogleApiMixin from '../assets/mixins/googleApi.js'

export default {
  mixins: [GoogleApiMixin],
  mounted() {
    gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.queryReports // note, no "()" here
    });
  }
}

</script>

<style lang="sass" scoped>
</style>
