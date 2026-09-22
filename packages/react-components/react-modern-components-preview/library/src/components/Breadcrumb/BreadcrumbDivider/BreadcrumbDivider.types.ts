import type { BreadcrumbDividerState as BreadcrumbDividerBaseState } from '@fluentui/react-headless-components-preview/breadcrumb';
import type { BreadcrumbSize } from '../Breadcrumb/Breadcrumb.types';

export type {
  BreadcrumbDividerProps,
  BreadcrumbDividerSlots,
} from '@fluentui/react-headless-components-preview/breadcrumb';

export type BreadcrumbDividerState = BreadcrumbDividerBaseState & {
  size: BreadcrumbSize;
  root: BreadcrumbDividerBaseState['root'] & {
    'data-size': BreadcrumbSize;
  };
};
