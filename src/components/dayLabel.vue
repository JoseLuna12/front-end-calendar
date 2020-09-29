<template>
  <div>
    <div class="day">
      {{ DayName }}
    </div>
  </div>
</template>


<script>
export default {
  name: "Day_Label",
  props: ["DayName"]
};
</script>

<style scoped>
.day {
  background-color: cornflowerblue;
  height: 30px;
  padding: 5px;
}
</style>