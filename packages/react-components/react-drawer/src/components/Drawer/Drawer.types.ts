import type { DialogProps, DialogSurfaceProps } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerSlots = {
  root: Slot<'div'>;

  dialog?: NonNullable<Slot<DialogProps>>;
  dialogSurface?: NonNullable<Slot<DialogSurfaceProps>>;
};

export type DrawerSizes = 'small' | 'medium' | 'large' | 'full';

/**
 * Drawer Props
 */
export type DrawerProps = ComponentProps<DrawerSlots> & {
  position?: 'left' | 'right';

  type?: 'persistent' | 'temporary';

  size?: DrawerSizes | number;
} & Pick<DialogProps, 'open' | 'defaultOpen' | 'onOpenChange'>;

/**
 * State used in rendering Drawer
 */
export type DrawerState = ComponentState<DrawerSlots> &
  Required<Pick<DrawerProps, 'type' | 'position' | 'open' | 'size'>>;
