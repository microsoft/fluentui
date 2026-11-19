import type {
  BreadcrumbDividerProps as BreadcrumbDividerHeadlessProps,
  BreadcrumbDividerState as BreadcrumbDividerHeadlessState,
} from '@fluentui/react-headless-components-preview/breadcrumb';

import type { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';

export type { BreadcrumbDividerSlots } from '@fluentui/react-headless-components-preview/breadcrumb';

/** Windmod BreadcrumbDivider props. `size` is not among them — it comes from the breadcrumb context. */
export type BreadcrumbDividerProps = BreadcrumbDividerHeadlessProps;

/** Windmod BreadcrumbDivider state: headless state plus the size read off the breadcrumb context. */
export type BreadcrumbDividerState = BreadcrumbDividerHeadlessState & Pick<BreadcrumbProps, 'size'>;
