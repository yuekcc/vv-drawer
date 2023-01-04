<script setup>
import { useDrawerService } from './use_drawer';

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
    <h2>Demo Drawer Body</h2>
    <div>
      <button @click="close">Close</button>
      <button @click="submit">Submit</button>
    </div>
  </div>
</template>
