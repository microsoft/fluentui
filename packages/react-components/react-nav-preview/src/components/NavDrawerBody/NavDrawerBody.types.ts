import { DrawerBodySlots, DrawerBodyState } from '@fluentui/react-drawer';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type NavDrawerBodySlots = ComponentProps<DrawerBodySlots>;

/**
 * NavDrawerBody Props
 */
export type NavDrawerBodyProps = ComponentProps<DrawerBodySlots>;

/**
 * State used in rendering NavDrawerBody
 */
export type NavDrawerBodyState = ComponentState<Partial<DrawerBodySlots>> & DrawerBodyState;
