<template>
  <div class="notification bg-white rounded border p-4" v-if="message">
      <span class="rounded py-4 px-5" v-html="message">
      </span>
  </div>
</template>

<script>
import {bus} from '../../main';

export default {
    name: 'Notifications',

    data() {
        return {
            message: ''
        }
    },

    mounted() {
        bus.$on('alert', (message) => {
            this.message = message;
            setTimeout(() => {
                this.message = '';
            }, 2000)
        })
    }
}
</script>

<style scoped>
.notification {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 1px 1px 10px #ccc;
    border: 1px solid inherit;
    z-index: 10;
}
</style>