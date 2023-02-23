import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { BreadcrumbDivider } from '../BreadcrumbDivider/BreadcrumbDivider';

export type BreadcrumbItemSlots = {
  root: Slot<'div'>;
  divider?: Slot<typeof BreadcrumbDivider>;
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
