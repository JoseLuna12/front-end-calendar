<template>
  <div>
    <div v-if="DayNumber != ''">
      <div
        class="day"
        v-on:click="select"
        v-bind:class="{
          selected_class: selected,
          today: isToday,
          weekend: isWeekend
        }"
      >
        {{ DayNumber }}
      </div>
    </div>
    <div v-else>
      <blockDay />
    </div>

    <vs-dialog not-center width="700px" v-model="selected">
      <template #header>
        <h2 class="not-margin">
          Add an Event for <b> {{ CurrentMonth }} {{ DayNumber }} </b>
        </h2>
      </template>
      <div class="dialog_body not-margin">
        <vs-input
          v-model="EventObj.EventTitle"
          success
          label="Event Title"
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
        <vs-radio v-model="EventObj.EventColor" val="blue" @change="CheckFieldsforEvent">
          <div class="color-picker blue"></div>
        </vs-radio>
        <vs-radio success v-model="EventObj.EventColor" val="green" @change="CheckFieldsforEvent">
          <div class="color-picker green"></div>
        </vs-radio>
        <vs-radio danger v-model="EventObj.EventColor" val="red" @change="CheckFieldsforEvent">
          <div class="color-picker red"></div>
        </vs-radio>
        <vs-radio warn v-model="EventObj.EventColor" val="yellow" @change="CheckFieldsforEvent">
          <div class="color-picker yellow"></div>
        </vs-radio>
        <vs-radio dark v-model="EventObj.EventColor" val="black" @change="CheckFieldsforEvent">
          <div class="color-picker black"></div>
        </vs-radio>
      </div>
      <div class="flex button-margin">
        <vs-button success border :disabled="DisabledButton" :active="true"  @click="SaveEvent">
          Save
        </vs-button>
        <vs-button danger border :disabled="false" :active="true"  @click="cancel">
          Cancel
        </vs-button>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import blockDay from "./blockDay";
export default {
  name: "Day",
  props: ["DayNumber", "DayWeek"],
  components: {
    blockDay
  },
  computed: {
    CurrentMonth() {
      return this.$store.state.currentMonthName;
    }
  },
  data() {
    return {
      selected: false,
      isToday: false,
      isWeekend: false,
      active: false,
      DisabledButton:true,
      EventObj: {
        EventTitle: "",
        EventDescription: "",
        EventColor: "blue",
        StartTime: ""
      }
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
    cancel(){
        let event = this.EventObj;
        event.EventTitle = '';
        event.EventDescription = '';
        event.EventColor = 'blue';
        event.StartTime = '';
        this.selected = false;
    },
    Today() {
      this.isToday = this.$props.DayNumber == this.$store.state.currentDate;
    },
    Weekend() {
      let Sun = this.$store.state.days[0];
      let Sat = this.$store.state.days[this.$store.state.days.length - 1];
      this.isWeekend = this.$props.DayWeek == Sun || this.$props.DayWeek == Sat;
    },
    SaveEvent(){
        console.log(this.EventObj)
    },
    CheckFieldsforEvent(){
        console.log('checking...')
        let event = this.EventObj;
        // // console.log('Titulo '+ )
        // console.log('Description '+ !!event.EventDescription)
        // console.log('Color '+ )
        // console.log('Time '+ !!event.StartTime)

        if(!!event.EventTitle && !!event.EventDescription && !!event.EventColor && !!event.StartTime){
            this.DisabledButton = false;
        }
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
.weekend {
  color: blue;
}
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  text-align: center;
}
.dialog {
  background-color: teal !important;
}
.dialog_body {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}

.vs-input-content .vs-input,
.vs-input {
  width: 100%;
}
.dialog_input {
  width: 100%;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.color-picker {
  width: 30px;
  height: 30px;
  border-radius: 50px;
}

.button-margin .vs-button{
    margin-top: 25px;
}

.blue {
  background-color: #1a5cff;
  color: white;
}
.green {
  background-color: #46c93a;
  color: white;
}
.red {
  background-color: #ff4757;
  color: white;
}
.yellow {
  background-color: #ffba00;
  color: white;
}
.black {
  background-color: #1e1e1e;
  color: white;
}
</style>