import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type BreadcrumbSlots = {
  root: Slot<'div'>;
};

/**
 * Breadcrumb Props
 */
export type BreadcrumbProps = ComponentProps<BreadcrumbSlots> & {};

/**
 * State used in rendering Breadcrumb
 */
export type BreadcrumbState = ComponentState<BreadcrumbSlots>;
