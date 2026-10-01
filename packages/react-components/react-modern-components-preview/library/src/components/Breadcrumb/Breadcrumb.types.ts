import type {
  BreadcrumbProps as BreadcrumbBaseProps,
  BreadcrumbState as BreadcrumbBaseState,
} from '@fluentui/react-headless-components-preview/breadcrumb';

export type { BreadcrumbContextValues, BreadcrumbSlots } from '@fluentui/react-headless-components-preview/breadcrumb';

export type BreadcrumbSize = 'small' | 'medium' | 'large';

export type BreadcrumbProps = BreadcrumbBaseProps & {
  /** Controls the size of breadcrumb items and dividers. */
  size?: BreadcrumbSize;
};

export type BreadcrumbState = BreadcrumbBaseState & {
  size: BreadcrumbSize;
  root: BreadcrumbBaseState['root'] & {
    'data-size': BreadcrumbSize;
  };
};
