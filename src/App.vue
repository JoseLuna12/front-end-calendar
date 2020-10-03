<template>
  <div id="app">
    <addButton />
    <router-view />
  </div>
</template>

<script>
import addButton from "./components/addReminder";
export default {
  components: {
    addButton
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 5%;
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
li {
  list-style-type: none;
}
</style>
