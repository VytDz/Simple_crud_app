<template>
  <div class="container">
    <div class="message" v-if="showMessage"> {{message}} </div>
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
import moment from 'moment';
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
      reservations: state.listOfResrevations,
      name: '',
      lastName: '',
      showMessage: false,
      message: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleMessage() {
      this.showMessage = true;
      setTimeout(() => this.close(), 3000);
    },
    ifBooked() {
      const sharedTime = this.reservations.some(
        (item: any) => item.reservationTime === this.selectedTime.toISOString(),
      );

      const lessThan = moment(this.selectedTime).valueOf() - (15 * 60000);
      const moreThan = moment(this.selectedTime).valueOf() + (15 * 60000);
      const lessOrMoreThan15Min = this.reservations.some(
        (item: any) => moment(item.reservationTime).valueOf() < moreThan
          && new Date(item.reservationTime).getTime() > lessThan,
      );
      if (this.reservations.length > 0) {
        switch (true) {
          case sharedTime:
            this.message = 'Sorry this time is already taken';
            this.handleMessage();
            break;
          case lessOrMoreThan15Min:
            this.message = 'Sorry this time is too close to another appointment';
            this.handleMessage();
            break;
          default:
            break;
        }
      }
    },
    isRegisteredThisWeek() {
      const weeksAppointments = this.reservations.filter(
        (item: any) => moment().week() === moment(item.reservationTime).week(),
      );

      return weeksAppointments.find(
        (item: any) => item.name === this.name && item.lastName === this.lastName,
      );
    },
    submit() {
      if (this.isRegisteredThisWeek()) {
        this.message = 'Sorry you have already registered this week';
        this.handleMessage();
        this.close();
        return;
      }
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
    background-color: white;
    border: 1px black solid;
    border-radius: 10px;

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
        border-radius: 5px;
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
