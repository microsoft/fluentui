import type {
  BreadcrumbItemProps as BreadcrumbItemHeadlessProps,
  BreadcrumbItemState as BreadcrumbItemHeadlessState,
} from '@fluentui/react-headless-components-preview/breadcrumb';

export type { BreadcrumbItemSlots } from '@fluentui/react-headless-components-preview/breadcrumb';

/** Windmod BreadcrumbItem props. The headless surface carries every prop; windmod adds no look props. */
export type BreadcrumbItemProps = BreadcrumbItemHeadlessProps;

/** Windmod BreadcrumbItem state. The item has no size branch — only the divider and the button do. */
export type BreadcrumbItemState = BreadcrumbItemHeadlessState;
