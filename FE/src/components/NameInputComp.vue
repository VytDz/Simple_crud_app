<template>
  <div class="container">
    <div class="message" v-if="showMessage">Sorry this time is already taken</div>
    <div class="inputs">
      <input type="text" name="name" v-model="name" placeholder="Name" />
      <input
        type="text"
        name="lastName"
        v-model="lastName"
        placeholder="Last name"
      />
      <button :disabled="showMessage" class="submit" @click="submit">Submit</button>
      <button class="close" @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { state } from '@/store/store';
import { create } from '@/services/dataService';
import init from '@/services/init';

export default defineComponent({
  name: 'NameInputComp',
  props: {
    selectedTime: {
      required: true,
      type: Object,
    },
  },
  created() {
    this.ifBooked();
  },
  data() {
    return {
      dateToSave: this.selectedTime,
      name: '',
      lastName: '',
      showMessage: false,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    ifBooked() {
      const reservations = state.listOfResrevations;
      const sharedTime = reservations.some(
        (element: any) => element.reservationTime === this.selectedTime.toISOString(),
      );
      if (reservations.length > 0 && sharedTime) {
        this.showMessage = true;
        setTimeout(() => this.close(), 5000);
      }
    },
    submit() {
      create({
        name: this.name,
        lastName: this.lastName,
        timeStamp: this.dateToSave,
      });
      init();
      this.close();
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
  .container {
    width: 50vw;
    height: 50vh;
    z-index: 1;
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    background-color: grey;

    .message{
      width: 50vw;
      height: 50vh;
      z-index: 1;
      position: absolute;
      font-size: 5vw;
      background: orange;
    }

    .inputs {
      display: flex;
      flex-flow: column;
      justify-content: center;
      input {
        font-size: 2vh;
        margin-bottom: 1vh;
      }
      .submit {
        background: greenyellow;
      }
      .close {
        background: red;
      }
      button {
        margin-top: 3vh;
        border-radius: 5px;
        font-size: 2vh;
      }
    }
  }
</style>
