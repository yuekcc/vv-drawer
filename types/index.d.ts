import { defineComponent } from 'vue';

export interface DrawerOptions {
  component: ReturnType<typeof defineComponent>;
  propsData?: object;
  onClose?: () => void;
  onOk?: (data: unknown) => void;
  closeOnMask?: boolean;
  width?: string;
  customClass?: string;
}

export function userDrawer(): (options: DrawerOptions) => void;

export interface DrawerService {
  emitClose: () => void;
  emitOk: (data: unknown) => void;
}

export function useDrawerService(): DrawerService;
