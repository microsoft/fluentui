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
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from BreadcrumbProps.
// & Required<Pick<BreadcrumbProps, 'propName'>>
