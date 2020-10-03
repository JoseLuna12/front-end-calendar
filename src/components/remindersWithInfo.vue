<template>
  <div>
    <!--  -->
    <div class="Reminder flex" :class="color" @click="EditEvent = true">
      <div class="index">
        {{ index + 1 }}
      </div>
      <div>
        <h4>{{ title }}</h4>
      </div>
      <div>
        <h5>{{ time }}</h5>
      </div>
      <div>
        {{ fcst }}
      </div>
    </div>
    <vs-dialog
      not-center
      scroll
      width="400px"
      v-model="EditEvent"
      v-on:close="restore()"
    >
      <template #header>
        <h2 class="not-margin">Review your <b> event </b></h2>
      </template>
      <div class="dialog_body not-margin">
        <vs-input
          success
          v-model="city"
          label="City"
          placeholder="Change Your City"
          class="dialog_input"
        />
        <vs-input
          success
          v-model="description"
          label="Description"
          placeholder="Change Your description"
          class="dialog_input"
        />
        <vs-input type="time" success v-model="hour" label="Starts at" />
        <h4>
          Change your color
        </h4>
        <div class="flex">
          <vs-radio v-model="Color" val="blue">
            <div class="color-picker blue"></div>
          </vs-radio>
          <vs-radio success v-model="Color" val="green">
            <div class="color-picker green"></div>
          </vs-radio>
          <vs-radio danger v-model="Color" val="red">
            <div class="color-picker red"></div>
          </vs-radio>
          <vs-radio warn v-model="Color" val="yellow">
            <div class="color-picker yellow"></div>
          </vs-radio>
          <vs-radio dark v-model="Color" val="black">
            <div class="color-picker black"></div>
          </vs-radio>
        </div>
      </div>
      <vs-button danger border @click="remove(day, index)">
        Delete
      </vs-button>
      <vs-button
        success
        border
        :disabled="
          !city && !description && description.length < 300 && !Color && !hour
        "
        :active="true"
        @click="replace(day, index)"
      >
        Save
      </vs-button>
    </vs-dialog>
  </div>
</template>

<script>
import EditEventsMix from "../functions/createEvent";
export default {
  name: "Remniders",
  mixins: [EditEventsMix],
  props: ["color", "title", "descript", "time", "fcst", "index", "id", "day"],
  mounted(){
      this.city=this.$props.title;
      this.description= this.$props.descript;
      this.hour= this.$props.time;
      this.Color= this.$props.color;
  },
  data() {
    return {
      EditEvent: false,
      city: this.$props.title,
      description: this.$props.descript,
      hour: this.$props.time,
      Color: this.$props.color
    };
  },
  methods: {
    restore() {
      this.city = this.$props.title;
      this.EditEvent = false;
      this.description = this.$props.descript;
      this.hour = this.$props.time;
      this.Color = this.$props.color;
    },
    remove(day, index) {
      this.Remove(day, index);
      this.EditEvent = false;
    },
    replace(day, index) {
      this.EditEvent = false;
      let newEvent = {
        day: this.$props.day,
        color: this.Color,
        descr: this.description,
        time: this.hour,
        title: this.city,
        forecast: "No Info"
      };
      this.Replace(day, index, newEvent);
    },
    
  }
};
</script>

<style>
.Reminder {
  height: 30px;
  padding: 5px;
  cursor: pointer;
}
.index {
  background-color: white;
  color: black;
  padding: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50px;
}
</style>