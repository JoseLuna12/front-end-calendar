<template>
  <div>
    <div class="day_label">
      <DayLabel v-for="d in Days" :key="d" :DayName="d" />
    </div>
    <div id="Calendar">
      <Day v-for="(d, index) in MonthDays" :key="index" :DayNumber="d.month" :DayWeek="Days[d.day]"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Day from "../components/day";
import DayLabel from "../components/dayLabel"

export default {
  name: "Home",
  components: {
    Day,
    DayLabel
  },
  computed: {
    Days() {
      return this.$store.state.days;
    },
    Months(){
      return this.$store.state.months;
    },
    Today(){
      return this.$store.state.today;
    },
    CurrentMonth(){
      return this.Today.getMonth();
    },
    CurrentMonthName(){
      return this.Months[this.CurrentMonth]
    },
    CurrentYear(){
      return this.Today.getFullYear();
    }
  },
  created(){
    this.setMonthDays(this.CurrentYear, this.CurrentMonth);
    this.$store.dispatch("setMonth", this.CurrentMonthName);
    this.$store.dispatch("setDay", this.FirstDay);
    this.$store.dispatch("setStartDay", this.FirstDay);
    this.$store.dispatch("setCurrDate", this.Today.getDate());
  },
  data() {
    return {
      daysTest: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      MonthDays: [],
      FirstDay: Number
    };
  },
  methods:{
    setMonthDays(year, month){
      let firstDay = new Date(year, month).getDay();
      let daysInMonth = 32 - new Date(year, month, 32).getDate();

      this.FirstDay = firstDay;
      this.setUpMonths(this.FirstDay);

      let WeekDays = this.FirstDay;

      for(let i = 1; i <= daysInMonth; i++){
        this.MonthDays.push(
          {
            month: i,
            day: WeekDays
          }
        );
        if(WeekDays > this.Days.length - this.FirstDay){
          WeekDays = 0;
        }else{
          WeekDays++
        }
      }
    },
    setUpMonths(days){
      for(let i = 0; i < days; i++){
        this.MonthDays.push(
          {
            month: '',
            day: i
          }
        );
      }
    }
  }
};
</script>

<style scoped>
#Calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  height: 100%;
}
.day_label {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(1, 1fr);
}
</style>