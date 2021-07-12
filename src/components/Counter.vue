<template>
  <div class="counter" :style="{[`font-size`]: fontSize}">{{ content }}</div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    fontSize: String
  },
  data: function() {
    return{
      timestamp: null
    }
  },
  computed: {
    content: {
      get: function () {
        if(this.timestamp != null){
          let t = this.timestamp / 1000;
          let s = String(Math.floor(t % 60)).padStart(2, '0');
          let m = String(Math.floor(t / 60) % 60).padStart(2, '0');
          let h = String(Math.floor(t / 3600) % 24).padStart(2, '0');

          return `${h}:${m}:${s}`;
        }
        return "00:00:00";
      }
    }
  }
}
</script>

<style scoped>
.counter {
  width: 100%;
  height: fit-content;
  font-family: 'Lato', sans-serif;
  font-weight: 100;
}
</style>