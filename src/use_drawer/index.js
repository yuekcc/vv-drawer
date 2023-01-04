import { createApp, h, inject, onMounted, ref } from 'vue';
import DrawerContainer from './DrawerContainer.vue';
import { DRAWER_HANDLER } from './keys';

function makeDrawerComponent(options, clean) {
  const { component, onClose, onOk, width, closeOnMask, customClass } = options;

  return {
    setup() {
      const canShowDrawerContainer = ref(false);
      onMounted(() => {
        canShowDrawerContainer.value = true;
      });

      const wrappedEmitClose = () => {
        canShowDrawerContainer.value = false;
        onClose();
        setTimeout(clean, 0);
      };

      const wrappedEmitOk = data => {
        onOk(data);
      };

      const drawerContainerProps = {
        width,
        closeOnMask,
        customClass,
        emitClose: wrappedEmitClose,
        emitOk: wrappedEmitOk,
      };

      return () => {
        if (canShowDrawerContainer.value) {
          return h(DrawerContainer, drawerContainerProps, { default: () => h(component, null) });
        }

        return null;
      };
    },
  };
}

export function useDrawer() {
  let el = null;
  let app = null;

  const clean = () => {
    if (app) {
      app.unmount();
      app = null;
    }

    if (el) {
      el.remove();
      el = null;
    }
  };

  return options => {
    app = createApp(makeDrawerComponent(options, clean));

    el = document.createElement('div');
    document.body.append(el);
    app.mount(el);
  };
}

export function useDrawerService() {
  return inject(DRAWER_HANDLER);
}
