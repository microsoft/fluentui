import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

import { DrawerBaseProps, DrawerBaseState } from '../../shared/DrawerBase.types';

export type InlineDrawerSlots = {
  root: Slot<'div', 'aside'>;
};

/**
 * InlineDrawer Props
 */
export type InlineDrawerProps = ComponentProps<InlineDrawerSlots> &
  DrawerBaseProps & {
    /**
     * Whether the drawer has a separator line.
     *
     * @default false
     */
    separator?: boolean;
  };

/**
 * State used in rendering InlineDrawer
 */
export type InlineDrawerState = Required<
  ComponentState<InlineDrawerSlots> & DrawerBaseState & Pick<InlineDrawerProps, 'separator'>
>;
