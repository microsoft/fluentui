import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuSplitGroupSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * MenuSplitGroup Props
 */
export type MenuSplitGroupProps = ComponentProps<Partial<MenuSplitGroupSlots>>;

/**
 * State used in rendering MenuSplitGroup
 */
export type MenuSplitGroupState = ComponentState<MenuSplitGroupSlots>;
