<template>
  <div>
    <div v-if="DayNumber != '' ">
      <div
        class="day"
        v-on:click="select"
        v-bind:class="{ selected_class: selected, today: isToday, weekend: isWeekend }"
      >
        {{ DayNumber }}
      </div>
    </div>
    <div v-else>
        <blockDay />
    </div>
  </div>
</template>

<script>
import blockDay from "./blockDay";
export default {
  name: "Day",
  props: ["DayNumber", 'DayWeek'],
  components: {
    blockDay
  },
  data() {
    return {
      selected: false,
      isToday: false,
      isWeekend: false
    };
  },
  created() {
    this.Today();
    this.Weekend();
  },
  methods: {
    select() {
      this.selected = !this.selected;
    },
    Today() {
      this.isToday = this.$props.DayNumber == this.$store.state.currentDate;
    },
    Weekend(){
        let Sun = this.$store.state.days[0];
        let Sat = this.$store.state.days[this.$store.state.days.length - 1];
        this.isWeekend = this.$props.DayWeek == Sun || this.$props.DayWeek == Sat;
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
.weekend{
    color: blue;
}
</style>