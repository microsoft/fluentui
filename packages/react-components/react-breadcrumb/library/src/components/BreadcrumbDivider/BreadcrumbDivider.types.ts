import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
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
