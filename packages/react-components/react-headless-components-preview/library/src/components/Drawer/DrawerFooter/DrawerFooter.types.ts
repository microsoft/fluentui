import type {
  DrawerFooterProps as DrawerFooterBaseProps,
  DrawerFooterSlots as DrawerFooterBaseSlots,
  DrawerFooterState as DrawerFooterBaseState,
} from '@fluentui/react-drawer';

export type DrawerFooterSlots = DrawerFooterBaseSlots;

export type DrawerFooterProps = DrawerFooterBaseProps;

export type DrawerFooterState = DrawerFooterBaseState & {
  root: {
    /**
     * Data attribute set to indicate the current scroll state of the drawer body.
     */
    'data-scroll-state'?: string;
  };
};
