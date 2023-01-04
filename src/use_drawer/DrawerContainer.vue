<script setup>
import { onMounted, provide, ref } from 'vue';
import { DRAWER_HANDLER } from './keys';

const props = defineProps({
  emitClose: { type: Function, required: true },
  emitOk: { type: Function, required: true },
  width: { type: String, default: '70%' },
  closeOnMask: { type: Boolean, default: true },
  customClass: { type: String, default: '' },
});

const canShowBody = ref(false);

onMounted(() => {
  setTimeout(() => {
    canShowBody.value = true;
  }, 0);
});

const wrappedEmitClose = () => {
  canShowBody.value = false;
  setTimeout(() => {
    props.emitClose();
  }, 330);
};

const wrappedEmitOk = data => {
  props.emitOk(data);
};

provide(DRAWER_HANDLER, {
  emitClose: wrappedEmitClose,
  emitOk: wrappedEmitOk,
});

function clickOnMask() {
  if (props.closeOnMask) {
    wrappedEmitClose();
  }
}
</script>

<template>
  <div class="drawer-container" :class="customClass">
    <div class="mask" @click="clickOnMask"></div>
    <transition name="fade-in-right">
      <div v-if="canShowBody" class="body" :style="{ width }">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
:root {
  --animation-delay: 0.3s;
}

.fade-in-right-enter-active {
  animation: fadeInRight var(--animation-delay);
}

.fade-in-right-leave-active {
  animation: fadeOutRight var(--animation-delay);
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeOutRight {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}

.drawer-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;

  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;

    background-color: rgba(0, 0, 0, 0.2);
  }

  .body {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    z-index: 10;
  }
}
</style>
