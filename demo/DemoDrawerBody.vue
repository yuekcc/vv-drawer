<script setup>
import { useDrawerService } from '../dist/vv-drawer.mjs';

defineProps({
  title: { type: String, required: true },
});

const { emitClose, emitOk } = useDrawerService();

function close() {
  emitClose();
}

function submit() {
  emitOk({ name: 'Tom' });
  emitClose();
}
</script>

<template>
  <div style="padding: 20px">
    <h2>{{ title }}</h2>
    <div>
      <button @click="close">Close</button>
      <button @click="submit">Submit</button>
    </div>
  </div>
</template>
