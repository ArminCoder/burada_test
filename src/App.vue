<template>
  <div id="app" class="container">
    <notifications />
    <router-view></router-view>
  </div>
</template>

<script>
import Notifications from "./components/Misc/Notifications";

export default {
  name: "App",

  components: { Notifications },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  text-align: center;
}
</style>
