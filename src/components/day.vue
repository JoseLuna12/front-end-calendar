<template>
  <div
    class="day"
    v-on:click="select"
    v-bind:class="{ selected_class: selected, today: isToday }"
  >
    {{ DayNumber }}
  </div>
</template>

<script>
export default {
  name: "Day",
  props: ["DayNumber", "FirstDay"],
  data() {
    return {
      selected: false,
      isToday: false,
    };
  },
  created() {
    this.Today();
  },
  methods: {
    select() {
      this.selected = !this.selected;
    },
    Today() {
      this.isToday = this.$props.DayNumber == this.$store.state.currentDate;
    }
  }
};
</script>

<style>
.day {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  height: 90px;
  padding: 5px;
}
.selected_class {
  background: blue;
  color: white;
}
.today {
  color: red;
}
</style>