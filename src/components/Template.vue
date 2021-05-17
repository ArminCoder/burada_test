<template>
  <div class="py-5 px-3">
    <div class="p-3 d-flex justify-content-start">
      <span class="h5">{{ mode == 'create' ? 'Create ' : 'Edit ' }} Template</span>
    </div>
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="Template Name" v-model="name" />
      <small
        v-if="maxLengthError"
        class="text-danger"
      >Template name cannot be longer than 100 characters.</small>
    </div>
    <div class="form-group text-center">
      <button
        :disabled="disabled"
        class="btn btn-primary mt-4"
        @click="storeTemplate"
        v-if="mode == 'create'"
      >Create</button>
      <button
        :disabled="disabled"
        class="btn btn-primary mt-4"
        @click="updateTemplate"
        v-else
      >Update</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Template",

  props: {
    selectedTemplate: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
      default: () => {},
    },
  },

  computed: {
    disabled() {
      return !this.name || this.name.length > 100;
    },
    maxLengthError() {
      return this.name && this.name.length > 100;
    },
  },

  data() {
    return {
      name: "",
    };
  },

  mounted() {
    this.name = this.selectedTemplate.Name;
  },

  methods: {
    storeTemplate() {
      const data = {
        name: this.name,
      };

      this.$emit("store", data);
    },

    updateTemplate() {
      const data = {
        id: this.selectedTemplate.Id,
        name: this.name,
      };
      this.$emit("update", data);
    },
  },
};
</script>

<style>
</style>