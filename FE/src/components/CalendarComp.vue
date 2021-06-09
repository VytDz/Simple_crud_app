<template>
  <div v-if="!state.loading" class="container">
    <div class="picker">
      <DatePicker
        v-model="date"
        mode="dateTime"
        :timezone="timezone"
      />
      <button :disabled="timeIsBooked" @click="toggleInputComponent">
        Select this time
      </button>
    </div>
    <NameInputComp
      v-if="nameInputToggle"
      @close="toggleInputComponent"
      :selectedTime="date"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DatePicker } from 'v-calendar';
import { state } from '@/store/store';
import NameInputComp from '@/components/NameInputComp.vue';

export default defineComponent({
  name: 'CalendarComp',
  components: {
    DatePicker,
    NameInputComp,
  },
  data() {
    return {
      date: new Date(),
      timezone: '',
      nameInputToggle: false,
      timeIsBooked: false,
    };
  },
  methods: {
    toggleInputComponent() {
      this.nameInputToggle = !this.nameInputToggle;
    },
  },
  computed: {
    state() {
      return state;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .picker {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    button {
      margin-top: 3vh;
      font-size: 2vh;
      border-radius: 5px;
    }
  }
</style>
