import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';
import type { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';

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
export type BreadcrumbDividerState = ComponentState<BreadcrumbDividerSlots> & Pick<BreadcrumbProps, 'size'>;

/**
 * BreadcrumbDivider base props (same as BreadcrumbDividerProps since BreadcrumbDivider has no design props of its own)
 */
export type BreadcrumbDividerBaseProps = BreadcrumbDividerProps;

/**
 * BreadcrumbDivider base state (excludes size, which is a design prop injected from context)
 */
export type BreadcrumbDividerBaseState = DistributiveOmit<BreadcrumbDividerState, 'size'>;
