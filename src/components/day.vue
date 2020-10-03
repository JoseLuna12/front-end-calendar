<template>
  <div>
    <div v-if="DayNumber != ''">
      <div
        class="day"
        v-bind:class="{
          selected_class: selected,
          today: isToday,
          weekend: isWeekend
        }"
      >
        <div class="NumberBox" v-on:click="select">
          {{ DayNumber }}
        </div>
        <badge
          v-for="(eve, index) in renderEvents"
          :key="index"
          :title="eve.title"
          :color="eve.color"
          :id="index"
          :day="DayNumber"
          :openAllReminders="OpenAllReminders"
        />
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
          @click="SaveEvent"
        >
          Save
        </vs-button>
      </div>
    </vs-dialog>

    <vs-dialog not-center scroll width="800px" v-model="OpenAllEvents">
      <template #header>
        <h2 class="not-margin">
          Reminders for <b> {{ CurrentMonth }} {{ DayNumber }} </b>
        </h2>
      </template>
      <div class="dialog_body not-margin">
        <ul v-if="renderEvents && renderEvents.length" >
          <li v-for="(eve, index) in renderEvents" v-bind:key="index">
            <reminder
              :color="eve.color"
              :title="eve.title"
              :fcst="eve.forecast"
              :index="index"
              :descript="eve.description"
              :time="eve.time"
              :id="eve.id"
              :day="DayNumber"
            />
          </li>
        </ul>
        <div v-else>
          No reminders for this day
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import blockDay from "./blockDay";
import badge from "./badge";
import reminder from "./remindersWithInfo";
import addReminder from "../functions/createEvent";
export default {
  name: "Day",
  props: ["DayNumber", "DayWeek"],
  mixins: [addReminder],
  components: {
    blockDay,
    badge,
    reminder
  },
  computed: {
    CurrentMonth() {
      return this.$store.state.currentMonthName;
    },
    GetEventsGlobal() {
      return this.$store.getters.GetEventByDay(this.$props.DayNumber - 1);
    }
  },
  data() {
    return {
      selected: false,
      isToday: false,
      isWeekend: false,
      active: false,
      DisabledButton: true,
      OpenAllEvents: false,
      EventObj: {
        EventTitle: "",
        EventDescription: "",
        EventColor: "blue",
        StartTime: ""
      },
      renderEvents: this.GetEventsGlobal
    };
  },
  created() {
    this.Today();
    this.Weekend();
    this.renderEvents = this.GetEventsGlobal;
  },
  methods: {
    select() {
      this.selected = !this.selected;
    },
    cancel() {
      this.EventObj.EventTitle = "";
      this.EventObj.EventDescription = "";
      this.EventObj.EventColor = "blue";
      this.EventObj.StartTime = "";
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
    SaveEvent() {
      let data = {
        title: this.EventObj.EventTitle,
        description: this.EventObj.EventDescription,
        color: this.EventObj.EventColor,
        time: this.EventObj.StartTime
      };
      this.addToGlobalState(data);
      this.cancel();
    },
    CheckFieldsforEvent() {
      let event = this.EventObj;

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
    addToGlobalState(events) {
      this.add(
        this.$props.DayNumber,
        events.title,
        events.description,
        events.time,
        events.color,
        "No Data"
      );
    },
    OpenAllReminders() {
      this.OpenAllEvents = !this.OpenAllEvents;
    }
  }
};
</script>

<style>
.NumberBox {
  width: 100%;
  height: 30%;
  cursor: pointer;
}
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
</style>