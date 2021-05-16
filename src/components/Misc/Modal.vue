<template>
  <div
    class="modal-wrapper"
  >
    <transition
      @before-leave="backdropLeaving = true"
      @after-leave="backdropLeaving = false"
      enter-active-class="transition-all transition-fast ease-out-quad"
      leave-active-class="transition-all transition-medium ease-in-quad"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
      appear
    >
      <div>
        <div class="position-absolute backdrop" @click="close"></div>
      </div>
    </transition>

    <transition
      @before-leave="cardLeaving = true"
      @after-leave="cardLeaving = false"
      enter-active-class="transition-all transition-fast ease-out-quad"
      leave-active-class="transition-all transition-medium ease-in-quad"
      enter-class="opacity-0 scale-70"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-70"
      appear
    >
      <div class="relative">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
 
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.relative {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  max-width: 80%;
  max-height: 80%;
  background: #fff;
  border-radius: 20px;
  z-index: 999;
}
.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}
.backdrop {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>
