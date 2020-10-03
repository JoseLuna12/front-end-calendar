<template>
  <div></div>
</template>

<script>
export default {
  name: "Home",
  computed: {},
  created() {},
  data() {
    return {
      ...this.$store.state,
    };
  },
  methods: {
    addEvent() {
      let data = {
        id: 'xy123',
        color: 'blue',
        description: 'This is a description',
        time: '22:04',
        title: 'Quito',
        forecast: 'No data'
      };
      this.$store.dispatch("addEventGlobal", data);
    },
    addEventErr(){
      let data = {
        id: 'xy123',
        color: 'blue',
        description: 'This is a description This is a description This is a description This is a description This is a description This is a description This is a descriptionThis is a description This is a description This is a description This is a description This is a description This is a description This is a description This is a description This is a description This is a description This is a description This is a descriptionThis is a description This is a description This is a description This is a description This is a description',
        time: '22:04',
        title: 'Quito',
        forecast: 'No data'
      };
      try{
        this.$store.dispatch("addEventGlobal", data);
      }catch(error){
        this.errorMsg = 'Description must be under 300 letters';
        return error
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