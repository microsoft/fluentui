import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DrawerBaseTypes } from '../../shared/DrawerBase.types';

export type DrawerInlineSlots = {
  root: Slot<'div'>;
};

export type DrawerOpenChangeData = {
  open: boolean;
};

/**
 * DrawerInline Props
 */
export type DrawerInlineProps = ComponentProps<DrawerInlineSlots> &
  DrawerBaseTypes & {
    /**
     * Controls the open state of the Drawer
     *
     * @default false
     */
    open?: boolean;

    /**
     * Default value for the uncontrolled open state of the Drawer.
     *
     * @default false
     */
    defaultOpen?: boolean;

    /**
     * Whether the drawer has a separator line.
     * This prop only works when `type` is `inline`.
     *
     * @default false
     */
    separator?: boolean;
  };

/**
 * State used in rendering DrawerInline
 */
export type DrawerInlineState = ComponentState<DrawerInlineSlots> &
  DrawerBaseTypes &
  Pick<DrawerInlineProps, 'open' | 'separator'>;
