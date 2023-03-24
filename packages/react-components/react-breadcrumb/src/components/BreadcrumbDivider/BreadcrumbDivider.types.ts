import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type BreadcrumbDividerSlots = {
  root: Slot<'li'>;
};

/**
 * BreadcrumbDivider Props
 */
export type BreadcrumbDividerProps = ComponentProps<BreadcrumbDividerSlots> & {};

/**
 * State used in rendering BreadcrumbDivider
 */
export type BreadcrumbDividerState = ComponentState<BreadcrumbDividerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line,
//and provide union of props to pick from BreadcrumbDividerProps.
// & Required<Pick<BreadcrumbDividerProps, 'propName'>>
