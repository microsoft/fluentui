import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TagGroupSlots = {
  root: Slot<'div'>;
};

/**
 * TagGroup Props
 */
export type TagGroupProps = ComponentProps<TagGroupSlots> & {};

/**
 * State used in rendering TagGroup
 */
export type TagGroupState = ComponentState<TagGroupSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TagGroupProps.
// & Required<Pick<TagGroupProps, 'propName'>>
