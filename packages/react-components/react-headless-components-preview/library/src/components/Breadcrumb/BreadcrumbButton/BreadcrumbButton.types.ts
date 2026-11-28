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
     * Data attribute set when the breadcrumb button represents the current item.
     */
    'data-current'?: string;

    /**
     * Data attribute set when the button is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the button is disabled but still focusable.
     */
    'data-disabled-focusable'?: string;

    /**
     * Data attribute set when the button renders only an icon.
     */
    'data-icon-only'?: string;

    /**
     * Data attribute reflecting the icon position when an icon slot is present.
     */
    'data-icon-position'?: BreadcrumbButtonBaseState['iconPosition'];
  };
};
