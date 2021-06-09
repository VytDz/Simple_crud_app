<template>
  <div class="container">
    <div class="inputs">
      <input type="text" name="name" v-model="name" placeholder="Name">
      <input type="text" name="lastName" v-model="lastName" placeholder="Last name">
      <button class="submit" @click="submit">Submit</button>
      <button class="close" @click="close">Close</button>
      <button class="close" @click="getall">getAll</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';
import { create, getAll } from '@/services/dataService';
// import { assignUserName, assignUserLastName, assignTimeStamp } from '@/store/store';

export default defineComponent({
  name: 'NameInputComp',
  props: {
    selectedTime: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      dateToSave: moment(this.selectedTime).format(),
      name: '',
      lastName: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      create(
        {
          name: this.name,
          lastName: this.lastName,
          timeStamp: this.dateToSave,
        },
      );
    },
    getall() {
      console.log('aaaa', getAll());
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

    .inputs{
      display: flex;
      flex-flow: column;
      justify-content: center;
      input{
        font-size: 2vh;
        margin-bottom: 1vh;
      }
      .submit{
        background: greenyellow;
      }
      .close{
        background: red;
      }
      button{
        margin-top: 3vh;
        border-radius: 5px;
        font-size: 2vh;
      }
    }
  }
</style>
