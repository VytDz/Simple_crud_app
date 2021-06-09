<template>
  <div class="app">
    <div class="loader" v-if="state.loading">Loading...</div>
    <Header />
    <CalendarComp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { state } from '@/store/store';
import init from '@/services/init';
import Header from '@/components/Header.vue';
import CalendarComp from '@/components/CalendarComp.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    CalendarComp,
  },
  created() {
    init();
  },
  computed: {
    state() {
      return state;
    },
  },
});
</script>

<style lang="scss">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: greenyellow;
    font-size: 10vw;
    z-index: 5;
    width: 100%;
    height: 100%;
  }
}

</style>
