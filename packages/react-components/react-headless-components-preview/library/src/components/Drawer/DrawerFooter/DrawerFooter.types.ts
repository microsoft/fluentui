import type { DrawerFooterState as DrawerFooterBaseState } from '@fluentui/react-drawer';

export type { DrawerFooterProps, DrawerFooterSlots } from '@fluentui/react-drawer';

export type DrawerFooterState = DrawerFooterBaseState & {
  root: {
    /**
     * Data attribute set to indicate the current scroll state of the drawer body.
     */
    'data-scroll-state'?: string;
  };
};
