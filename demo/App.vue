<script setup>
import { useDrawer } from '../dist/vv-drawer.mjs';
import DemoDrawerBody from './DemoDrawerBody.vue';

const openDrawer = useDrawer();

function showDrawer() {
  window.forceCloseDrawer = openDrawer({
    component: DemoDrawerBody,
    propsData: {
      title: 'Title is here',
    },
    onClose: () => {
      console.log('#onClose');
    },
    onOk: data => {
      console.log('#onOk', data);
    },
  });
}
</script>

<template>
  <h1>Drawer Demo</h1>
  <button @click="showDrawer">Show Drawer</button>
</template>
