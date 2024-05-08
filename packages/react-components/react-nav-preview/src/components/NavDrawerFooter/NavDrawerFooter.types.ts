import { DrawerFooterSlots, DrawerFooterState } from '@fluentui/react-drawer';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type NavDrawerFooterSlots = ComponentProps<DrawerFooterSlots>;

/**
 * NavDrawerFooter Props
 */
export type NavDrawerFooterProps = ComponentProps<DrawerFooterSlots>;

/**
 * State used in rendering NavDrawerFooter
 */
export type NavDrawerFooterState = ComponentState<Partial<DrawerFooterSlots>> & DrawerFooterState;
