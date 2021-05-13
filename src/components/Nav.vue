<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-4">
    <a class="navbar-brand" href="/dashboard">Burada Test Project</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link text-light" href="/dashboard">
            Home
          </a>
        </li>
        <li @click="logout" class="nav-item">
          <a class="nav-link text-light" href="#">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
    name: "Navigation",

    methods: {
        logout() {
            this.$emit('logout');
        }
    }
};
</script>

<style>
</style>