<template>
  <div>
    <Header />
    <CalendarComp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
