import type {
  BreadcrumbButtonSlots as BreadcrumbButtonBaseSlots,
  BreadcrumbButtonBaseProps,
  BreadcrumbButtonBaseState,
} from '@fluentui/react-breadcrumb';

/**
 * BreadcrumbButton component slots
 */
export type BreadcrumbButtonSlots = BreadcrumbButtonBaseSlots;

/**
 * BreadcrumbButton component props
 */
export type BreadcrumbButtonProps = BreadcrumbButtonBaseProps;

/**
 * BreadcrumbButton component state
 */
export type BreadcrumbButtonState = BreadcrumbButtonBaseState & {
  root: {
    /**
     * Data attribute set to indicate that this button represents the current page in the breadcrumb.
     */
    'data-current'?: string;
  };
};
