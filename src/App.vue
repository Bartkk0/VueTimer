<template>
  <div id="app">
    <button v-on:click="onRingStop" v-if="isRinging">Stop</button>
    <Counter fontSize="100pt" ref="counter"></Counter>
    <button v-on:click="onStart" v-if="!isRunning">Start</button>
    <button v-on:click="onStop" v-if="isRunning">Stop</button>

    <input type="number" min="0" max="24" v-model="hours">
    <input type="number" min="0" max="59" v-model="minutes">
    <input type="number" min="0" max="59" v-model="seconds">
  </div>
</template>

<script>
import Counter from './components/Counter'

export default {
  name: 'App',
  components: {
    Counter
  },
  data: function () {
    return {
      isRunning: false,
      isRinging: false,
      audio: new Audio("assets/barka.mp3"),
      hours: 0,
      minutes: 0,
      seconds: 0,
      targetTime: null
    }
  },
  methods: {
    onStart: function () {
      this.isRunning = true;
      this.targetTime = new Date().getTime() + this.seconds * 1000 + this.minutes * 60000 + this.hours * 3600000;
      console.log(this.targetTime)
      console.log(new Date().getTime())
    },
    onStop: function () {
      this.isRunning = false;
    },
    onTick: function () {
      if (!this.isRunning) return;
      let now = new Date().getTime();

      if (now > this.targetTime) {
        this.onStop();

        this.audio.currentTime = 0;
        this.audio.play();

        this.isRinging = true;
        return;
      }

      this.$refs["counter"].timestamp = this.targetTime - now;
    },
    onRingStop: function (a, b) {
      console.log(a, b)
      this.audio.pause();
      this.isRinging = false;
    }
  },
  watch: {
    seconds: function (val){
      if(val < 0) val = 0;
      if(val > 59) val = 59;
      this.seconds = val;
    },
    minutes: function (val){
      if(val < 0) val = 0;
      if(val > 59) val = 59;
      this.minutes = val;
    },
    hours: function (val){
      if(val < 0) val = 0;
      if(val > 23) val = 23;
      this.hours = val;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap');

*{
  font-family: 'Lato', sans-serif;
}

body{
  height: 100%;
  user-select: none;
}

#app {
  position: absolute;
  display: block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
}

button, input, input:focus-visible{
  border: 0;
  font-weight: 600;
  width: 10%;
  padding: 8px;
  outline: 0;
  margin-left: 4px;
}

input::-webkit-inner-spin-button{
  display: none;
}

</style>
