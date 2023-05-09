import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TagGroupSlots = {
  root: Slot<'div'>;
};

/**
 * TagGroup Props
 */
export type TagGroupProps = ComponentProps<TagGroupSlots>;
/**
 * State used in rendering TagGroup
 */
export type TagGroupState = ComponentState<TagGroupSlots> & {
  handleTagDismiss: () => void;
};
