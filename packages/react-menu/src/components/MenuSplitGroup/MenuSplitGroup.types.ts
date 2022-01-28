import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type MenuSplitGroupSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export type MenuSplitGroupCommons = {};

/**
 * MenuSplitGroup Props
 */
export type MenuSplitGroupProps = ComponentProps<MenuSplitGroupSlots> & MenuSplitGroupCommons;

/**
 * State used in rendering MenuSplitGroup
 */
export type MenuSplitGroupState = ComponentState<MenuSplitGroupSlots> & MenuSplitGroupCommons;
