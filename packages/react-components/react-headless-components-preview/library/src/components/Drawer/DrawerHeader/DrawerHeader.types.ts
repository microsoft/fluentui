import type {
  DrawerHeaderProps as DrawerHeaderBaseProps,
  DrawerHeaderSlots as DrawerHeaderBaseSlots,
  DrawerHeaderState as DrawerHeaderBaseState,
} from '@fluentui/react-drawer';

export type DrawerHeaderSlots = DrawerHeaderBaseSlots;

export type DrawerHeaderProps = DrawerHeaderBaseProps;

export type DrawerHeaderState = DrawerHeaderBaseState & {
  root: {
    /**
     * Data attribute set to indicate the current scroll state of the drawer body.
     */
    'data-scroll-state'?: string;
  };
};
