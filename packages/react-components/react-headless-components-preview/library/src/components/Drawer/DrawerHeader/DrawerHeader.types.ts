import type { DrawerHeaderState as DrawerHeaderBaseState } from '@fluentui/react-drawer';

export type { DrawerHeaderProps, DrawerHeaderSlots } from '@fluentui/react-drawer';

export type DrawerHeaderState = DrawerHeaderBaseState & {
  root: {
    /**
     * Data attribute set to indicate the current scroll state of the drawer body.
     */
    'data-scroll-state'?: string;
  };
};
