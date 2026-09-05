import type { BreadcrumbButtonBaseState } from '@fluentui/react-breadcrumb';

export type {
  BreadcrumbButtonSlots,
  BreadcrumbButtonBaseProps as BreadcrumbButtonProps,
} from '@fluentui/react-breadcrumb';

/**
 * BreadcrumbButton component state
 */
export type BreadcrumbButtonState = BreadcrumbButtonBaseState & {
  root: {
    /**
     * Present when this button represents the current page in the breadcrumb; omitted otherwise.
     */
    'data-current'?: string;
  };
};
