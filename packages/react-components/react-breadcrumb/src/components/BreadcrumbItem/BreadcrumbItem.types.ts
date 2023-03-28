import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type BreadcrumbItemSlots = {
  root: Slot<'li'>;
};

/**
 * BreadcrumbItem Props
 */
export type BreadcrumbItemProps = ComponentProps<BreadcrumbItemSlots> & {};

/**
 * State used in rendering BreadcrumbItem
 */
export type BreadcrumbItemState = ComponentState<BreadcrumbItemSlots>;
// TODO: Remove semicolon from previous line, uncomment next line,
// and provide union of props to pick from BreadcrumbItemProps.
// & Required<Pick<BreadcrumbItemProps, 'propName'>>
