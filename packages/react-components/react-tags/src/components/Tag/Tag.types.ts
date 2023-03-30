import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TagSlots = {
  root: Slot<'div'>;
};

/**
 * Tag Props
 */
export type TagProps = ComponentProps<TagSlots> & {};

/**
 * State used in rendering Tag
 */
export type TagState = ComponentState<TagSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TagProps.
// & Required<Pick<TagProps, 'propName'>>
