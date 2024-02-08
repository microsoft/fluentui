import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavCategorySlots = {
  root: Slot<'div'>;
};

/**
 * NavCategory Props
 */
export type NavCategoryProps = ComponentProps<NavCategorySlots> & {};

/**
 * State used in rendering NavCategory
 */
export type NavCategoryState = ComponentState<NavCategorySlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavCategoryProps.
// & Required<Pick<NavCategoryProps, 'propName'>>
