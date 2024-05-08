import { DrawerHeaderSlots, DrawerHeaderState } from '@fluentui/react-drawer';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type NavDrawerHeaderSlots = ComponentProps<DrawerHeaderSlots>;

/**
 * NavDrawerHeader Props
 */
export type NavDrawerHeaderProps = ComponentProps<DrawerHeaderSlots>;

/**
 * State used in rendering NavDrawerHeader
 */
export type NavDrawerHeaderState = ComponentState<Partial<DrawerHeaderSlots>> & DrawerHeaderState;
