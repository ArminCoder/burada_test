<template>
  <div class="py-5 px-3">
    <div class="p-3 d-flex justify-content-start">
      <span class="h5">{{ mode == 'create' ? 'Create ' : 'Edit ' }} Template</span>
    </div>
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="Template Name" v-model="name" />
    </div>
    <div class="form-group text-center">
      <button class="btn btn-primary mt-4" @click="storeTemplate" v-if="mode == 'create'">Create</button>
      <button class="btn btn-primary mt-4" @click="updateTemplate" v-else>Update</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Template',

    props: {
        selectedTemplate: {
            type: Object,
            default: () => {}
        },
        mode: {
            type: String,
            default: () => {}
        }
    },

    data() {
        return {
            name: '',
        }
    },
    
    mounted() {
        this.name = this.selectedTemplate.Name;
    },

    methods: {
        storeTemplate() {
            const data = {
                name: this.name
            }

            this.$emit('store', data);
        },

        updateTemplate() {
            const data = {
                id: this.selectedTemplate.Id,
                name: this.name
            }
            this.$emit('update', data);
        },

    }
};
</script>

<style>
</style>