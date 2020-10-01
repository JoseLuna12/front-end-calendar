<template>
  <div :key="reRenderKey">
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
        <badge
          v-for="(eve, index) in renderEvents"
          :key="index"
          :title="eve.title"
          :color="eve.color"
          :id="index"
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
  </div>
</template>

<script>
import blockDay from "./blockDay";
import badge from "./badge";
export default {
  name: "Day",
  props: ["DayNumber", "DayWeek"],
  components: {
    blockDay,
    badge
  },
  computed: {
    CurrentMonth() {
      return this.$store.state.currentMonthName;
    },
    GetEventsGlobal() {
      return this.$store.state.GlobalEvents[this.$props.DayNumber - 1] || [];
    }
  },
  data() {
    return {
      reRenderKey: 0,
      selected: false,
      isToday: false,
      isWeekend: false,
      active: false,
      DisabledButton: true,
      EventObj: {
        EventTitle: "",
        EventDescription: "",
        EventColor: "blue",
        StartTime: ""
      },
      Events: [],
      renderEvents: this.GetEventsGlobal 
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
    cancel() {
      let event = this.EventObj;
      event.EventTitle = "";
      event.EventDescription = "";
      event.EventColor = "blue";
      event.StartTime = "";
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
      this.Events.push(data);
      this.Events.sort(function(a, b) {
        return a.time.localeCompare(b.time);
      });
      this.addToGlobalState(this.Events);
    },
    CheckFieldsforEvent() {
      let event = this.EventObj;

      if (
        !!event.EventTitle &&
        !!event.EventDescription &&
        !!event.EventColor &&
        !!event.StartTime
      ) {
        this.DisabledButton = false;
      }
    },
    addToGlobalState(events) {
      let data = {
        index: parseInt(this.$props.DayNumber) - 1,
        event: events
      };
      this.$store.dispatch("addEventGlobal", data);
      this.reRenderKey+=1;
      this.renderEvents = this.GetEventsGlobal;
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

.button-margin .vs-button {
  margin-top: 25px;
}
</style>