import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type BreadcrumbButtonSlots = {
  root: Slot<'div'>;
};

/**
 * BreadcrumbButton Props
 */
export type BreadcrumbButtonProps = ComponentProps<BreadcrumbButtonSlots> & {};

/**
 * State used in rendering BreadcrumbButton
 */
export type BreadcrumbButtonState = ComponentState<BreadcrumbButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from BreadcrumbButtonProps.
// & Required<Pick<BreadcrumbButtonProps, 'propName'>>
