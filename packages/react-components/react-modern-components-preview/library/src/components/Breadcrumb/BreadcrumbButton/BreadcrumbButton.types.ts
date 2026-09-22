import type {
  BreadcrumbButtonProps as BreadcrumbButtonBaseProps,
  BreadcrumbButtonState as BreadcrumbButtonBaseState,
} from '@fluentui/react-headless-components-preview/breadcrumb';
import type { BreadcrumbSize } from '../Breadcrumb/Breadcrumb.types';

export type { BreadcrumbButtonSlots } from '@fluentui/react-headless-components-preview/breadcrumb';

export type BreadcrumbButtonProps = BreadcrumbButtonBaseProps & {
  /** Overrides the size inherited from Breadcrumb. */
  size?: BreadcrumbSize;
};

export type BreadcrumbButtonState = BreadcrumbButtonBaseState & {
  appearance: 'subtle';
  shape: 'rounded';
  size: BreadcrumbSize;
  root: BreadcrumbButtonBaseState['root'] & {
    'data-appearance': 'subtle';
    'data-disabled'?: string;
    'data-disabled-focusable'?: string;
    'data-icon-only'?: string;
    'data-icon-position'?: 'before' | 'after';
    'data-shape': 'rounded';
    'data-size': BreadcrumbSize;
  };
};
