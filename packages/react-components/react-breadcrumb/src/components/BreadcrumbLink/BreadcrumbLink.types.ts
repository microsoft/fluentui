import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type BreadcrumbLinkSlots = {
  root: Slot<'div'>;
};

/**
 * BreadcrumbLink Props
 */
export type BreadcrumbLinkProps = ComponentProps<BreadcrumbLinkSlots> & {};

/**
 * State used in rendering BreadcrumbLink
 */
export type BreadcrumbLinkState = ComponentState<BreadcrumbLinkSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from BreadcrumbLinkProps.
// & Required<Pick<BreadcrumbLinkProps, 'propName'>>
