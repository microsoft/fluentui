import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DrawerScrollState } from '../../shared/DrawerBase.types';

export type DrawerFooterSlots = {
  root: Slot<'footer'>;
};

/**
 * DrawerFooter Props
 */
export type DrawerFooterProps = ComponentProps<DrawerFooterSlots>;

/**
 * State used in rendering DrawerFooter
 */
export type DrawerFooterState = ComponentState<DrawerFooterSlots> & {
  scrollState: DrawerScrollState;
};
