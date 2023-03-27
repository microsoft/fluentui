import type { DialogProps, DialogSurfaceProps } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerSlots = {
  root: Slot<'div'>;

  dialog?: NonNullable<Slot<DialogProps>>;
  dialogSurface?: NonNullable<Slot<DialogSurfaceProps>>;
};

/**
 * Drawer Props
 */
export type DrawerProps = ComponentProps<DrawerSlots> & {
  position?: 'left' | 'right';

  type?: 'persistent' | 'temporary';
} & Pick<DialogProps, 'open' | 'defaultOpen' | 'onOpenChange'>;

/**
 * State used in rendering Drawer
 */
export type DrawerState = ComponentState<DrawerSlots> &
  Required<Pick<DrawerProps, 'type' | 'position' | 'open'>> & {
    isVisible: boolean;
    isMounted: boolean;
  };
