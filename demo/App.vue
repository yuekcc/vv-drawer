<script setup>
import { useDrawer } from '../dist/vv-drawer.mjs';
import DemoDrawerBody from './DemoDrawerBody.vue';

const openDrawer = useDrawer();

function showDemoDrawer() {
  openDrawer({
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
  <h1>VV-Drawer</h1>
  <button @click="showDemoDrawer">Open</button>
</template>
