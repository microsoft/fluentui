import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { BreadcrumbProps } from '../Breadcrumb';

export type BreadcrumbItemSlots = {
  root: Slot<'li'>;
};

/**
 * BreadcrumbItem Props
 */
export type BreadcrumbItemProps = ComponentProps<BreadcrumbItemSlots> & Pick<BreadcrumbProps, 'size'>;

/**
 * State used in rendering BreadcrumbItem
 */
export type BreadcrumbItemState = ComponentState<BreadcrumbItemSlots> & Required<Pick<BreadcrumbItemProps, 'size'>>;
