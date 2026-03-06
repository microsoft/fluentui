import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';
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

/**
 * BreadcrumbItem base props (same as BreadcrumbItemProps since size is passed through context, not as a design prop)
 */
export type BreadcrumbItemBaseProps = DistributiveOmit<BreadcrumbItemProps, 'size'>;

/**
 * BreadcrumbItem base state (excludes size, which is a design prop injected from context)
 */
export type BreadcrumbItemBaseState = DistributiveOmit<BreadcrumbItemState, 'size'>;
