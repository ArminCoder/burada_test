<template>
  <div class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div class="form-group col-8 mx-auto bg-light rounded shadow p-4">
      <img
        class="mb-4"
        src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
        alt
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="email"
        required
        autofocus
      />
      <input
        type="password"
        id="inputPassword"
        class="form-control mt-4"
        placeholder="Password"
        v-model="password"
        required
      />
      <button @click="login" class="btn mt-4 btn-primary btn-block" type="submit">Sign in</button>
    </div>
  </div>
</template>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
<script>
import axios from "axios";
import {bus} from "../main";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      const params = new URLSearchParams()
      params.append('grant_type', 'password')
      params.append('username', this.email)
      params.append('password', this.password)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      axios.post("https://app.postmypartytest.com/token", params, config)
        .then((res) => {
          bus.$emit('alert', "<span class='text-success'>Success!</span>");

          localStorage.setItem('token', res.data.access_token);
          this.$router.push({ name: "dashboard" });

        })
        .catch((err) => {
          bus.$emit('alert', `<span class='text-danger'>${err.response.data.error_description}`);
        })
    },
  },
};
</script>

<style scoped>
</style>
