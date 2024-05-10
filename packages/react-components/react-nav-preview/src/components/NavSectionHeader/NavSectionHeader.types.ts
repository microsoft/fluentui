import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavSectionHeaderSlots = {
  root: Slot<'h2', 'h1' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'>;
};

/**
 * NavSectionHeader Props
 */
export type NavSectionHeaderProps = ComponentProps<NavSectionHeaderSlots>;

/**
 * State used in rendering NavSectionHeader
 */
export type NavSectionHeaderState = ComponentState<NavSectionHeaderSlots>;
