<template>
  <div>
    <vs-button :active="true" @click="addDialog = !addDialog">
      Add Reminder
    </vs-button>
    <vs-dialog not-center width="700px" v-model="addDialog">
      <template #header>
        <h2 class="not-margin">
          Add an Event
        </h2>
      </template>
      <div class="dialog_body not-margin">
        <vs-select
          placeholder="Choose the day"
          v-model="EventObj.day"
          label="Day"
        >
          <vs-option
            v-for="(day, index) in daysArray"
            :key="index"
            :label="day"
            :value="day"
          >
            {{ day }}
          </vs-option>
        </vs-select>
        <vs-input
          v-model="EventObj.EventTitle"
          success
          label="City"
          placeholder="Add your event title"
          class="dialog_input"
          @change="CheckFieldsforEvent"
        />
        <vs-input
          v-model="EventObj.EventDescription"
          success
          label="Event Description"
          placeholder="Add your event description"
          class="dialog_input"
          @change="CheckFieldsforEvent"
        />
        <vs-input
          type="time"
          success
          v-model="EventObj.StartTime"
          label="Starts at"
          @change="CheckFieldsforEvent"
        />
      </div>
      <h4>
        Select color
      </h4>
      <div class="flex">
        <vs-radio
          v-model="EventObj.EventColor"
          val="blue"
          @change="CheckFieldsforEvent"
        >
          <div class="color-picker blue"></div>
        </vs-radio>
        <vs-radio
          success
          v-model="EventObj.EventColor"
          val="green"
          @change="CheckFieldsforEvent"
        >
          <div class="color-picker green"></div>
        </vs-radio>
        <vs-radio
          danger
          v-model="EventObj.EventColor"
          val="red"
          @change="CheckFieldsforEvent"
        >
          <div class="color-picker red"></div>
        </vs-radio>
        <vs-radio
          warn
          v-model="EventObj.EventColor"
          val="yellow"
          @change="CheckFieldsforEvent"
        >
          <div class="color-picker yellow"></div>
        </vs-radio>
        <vs-radio
          dark
          v-model="EventObj.EventColor"
          val="black"
          @change="CheckFieldsforEvent"
        >
          <div class="color-picker black"></div>
        </vs-radio>
      </div>
      <div class="flex button-margin">
        <vs-button danger border @click="cancel">
          Cancel
        </vs-button>
        <vs-button
          success
          border
          :disabled="DisabledButton"
          :active="true"
          @click="addEvent"
        >
          Save
        </vs-button>
      </div>
    </vs-dialog>
  </div>
</template>
<script>
import add from "../functions/createEvent";
import noti from "../functions/notification";
export default {
  mixins: [add, noti],
  mounted() {
    this.EventObj.day = this.Today;
    this.daysArray = this.DaysCount;
  },
  data() {
    return {
      daysArray: this.DaysCount,
      addDialog: false,
      EventObj: {
        EventTitle: "",
        EventDescription: "",
        EventColor: "blue",
        StartTime: "",
        day: this.Today
      },
      DisabledButton: true
    };
  },
  computed: {
    Today() {
      return this.$store.state.currentDate;
    },
    DaysCount() {
      return this.$store.getters.DaysArray;
    },
    CurrentMonth(){
      return this.$store.state.currentMonthName;
    }
  },
  methods: {
    async addEvent() {
      let event = this.EventObj;
      this.add(
        event.day,
        event.EventTitle,
        event.EventDescription,
        event.StartTime,
        event.EventColor,
        this.currentForecast
      );
      this.cancel();
    },
    CheckFieldsforEvent() {
      let event = this.EventObj;
      if(event.EventDescription.length > 300){
        this.CreateNotification({color:'danger', title:'Invalid input in description', description:'Description must be under 300 letters'})
      }
      if (
        !!event.EventTitle &&
        !!event.EventDescription &&
        event.EventDescription.length < 300 &&
        !!event.EventColor &&
        !!event.StartTime
      ) {
        this.DisabledButton = false;
      }
    },
    cancel() {
      this.EventObj.EventTitle = "";
      this.EventObj.EventDescription = "";
      this.EventObj.EventColor = "blue";
      this.EventObj.StartTime = "";
      this.EventObj.day = "";
      this.addDialog = false;
      this.DisabledButton = true;
    }
  }
};
</script>