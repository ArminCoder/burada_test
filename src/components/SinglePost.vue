<template>
  <div class="py-5 px-3">
    <div class="p-3 d-flex justify-content-start">
      <span class="h5">Edit Post</span>
    </div>
    <div class="form-group">
      <label>Text</label>
      <textarea
        type="text"
        rows="8"
        class="form-control"
        placeholder="Template Name"
        v-model="text"
      />
      <small
        v-if="maxLengthError"
        class="text-danger"
      >Post text cannot be longer than 500 characters.</small>
    </div>
    <div class="form-group">
      <label>Day</label>
      <input
        type="number"
        min="1"
        max="31"
        class="form-control"
        placeholder="Template Name"
        v-model="day"
      />
    </div>
    <small
      v-if="invalidIntegerError"
      class="text-danger"
    >Number cannot be smaller than 1 or larger then 31.</small>

    <div class="form-group">
      <label>Time</label>
      <input type="time" class="form-control" placeholder="Template Name" v-model="time" />
    </div>
    <div class="form-group text-center">
      <button :disabled="disabled" class="btn btn-primary mt-4" @click="updatePost">Update</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Template",

  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      text: "",
      day: null,
      time: null,
    };
  },

  computed: {
    disabled() {
      return !this.post.Text || !this.post.Day || !this.post.Time || this.maxLengthError || this.invalidIntegerError;
    },

    maxLengthError() {
      return this.text.length > 500;
    },

    invalidIntegerError() {
      return (this.day < 1 || this.day > 31) && this.day != null;
    },
  },

  mounted() {
    this.text = this.post.Text;
    this.day = this.post.Day;
    this.time = this.post.Time;
  },

  methods: {
    updatePost() {
      const data = {
        Id: this.post.Id,
        Text: this.text,
        Day: this.day,
        Time: this.time,
      };
      this.$emit("update", data);
    },
  },
};
</script>

<style>
</style>