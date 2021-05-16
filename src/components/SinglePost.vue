<template>
  <div class="py-5 px-3">
    <div class="p-3 d-flex justify-content-start">
      <span class="h5">Edit Post</span>
    </div>
    <div class="form-group">
      <label>Text</label>
      <input type="text" class="form-control" placeholder="Template Name" v-model="text" />
    </div>
        <div class="form-group">
      <label>Day</label>
      <input type="number" min="1" max="31" class="form-control" placeholder="Template Name" v-model="day" />
    </div>
        <div class="form-group">
      <label>Time</label>
      <input type="time" class="form-control" placeholder="Template Name" v-model="time" />
    </div>
    <div class="form-group text-center">
      <button class="btn btn-primary mt-4" @click="updatePost">Update</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Template',

    props: {
        post: {
            type: Object,
            default: () => {}
        },
    },

    data() {
        return {
            text: '',
            day: '',
            time: ''
        }
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
                Time: this.time
            }
            this.$emit('update', data);
        },

    }
};
</script>

<style>
</style>