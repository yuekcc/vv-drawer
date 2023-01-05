import { createApp, h, inject, onMounted, ref, defineComponent } from 'vue';
import DrawerContainer from './DrawerContainer.vue';
import { DRAWER_HANDLER } from './keys';

const PlaceholderComponent = {
  setup() {
    return () => h('div', null, 'Drawer Body');
  },
};

const DEFAULT_OPTIONS = {
  component: PlaceholderComponent,
  propsData: null,
  onClose: () => {},
  onOk: data => data,
  width: '70%',
  closeOnMask: true,
  customClass: '',
};

function makeDrawerComponent(options, clean) {
  const { component, onClose, onOk, width, closeOnMask, customClass, propsData } = { ...DEFAULT_OPTIONS, ...options };

  return defineComponent({
    name: 'DrawerWrapper',
    setup() {
      const canShow = ref(false);
      onMounted(() => {
        canShow.value = true;
      });

      const wrappedEmitClose = () => {
        canShow.value = false;
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
        if (canShow.value) {
          return h(DrawerContainer, drawerContainerProps, { default: () => h(component, propsData) });
        }

        return null;
      };
    },
  });
}

/**
 * 打开一个 Drawer 窗口
 */
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

/**
 * 使用 Drawer 服务，用于获取 Drawer 窗口的控制函数
 */
export function useDrawerService() {
  return inject(DRAWER_HANDLER);
}
