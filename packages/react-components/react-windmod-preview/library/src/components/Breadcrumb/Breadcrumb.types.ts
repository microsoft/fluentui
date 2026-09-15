import type {
  BreadcrumbProps as BreadcrumbHeadlessProps,
  BreadcrumbState as BreadcrumbHeadlessState,
} from '@fluentui/react-headless-components-preview/breadcrumb';

export type { BreadcrumbContextValues, BreadcrumbSlots } from '@fluentui/react-headless-components-preview/breadcrumb';

/** Size of the Breadcrumb. It reaches BreadcrumbItem, BreadcrumbDivider and BreadcrumbButton through the breadcrumb context. */
export type BreadcrumbSize = 'small' | 'medium' | 'large';

/**
 * Windmod Breadcrumb props: the headless breadcrumb plus the look prop the headless surface
 * deliberately omits (it exists purely to select styles).
 */
export type BreadcrumbProps = BreadcrumbHeadlessProps & {
  /** @default 'medium' */
  size?: BreadcrumbSize;
};

/** Windmod Breadcrumb state: headless state plus the resolved look prop. */
export type BreadcrumbState = BreadcrumbHeadlessState & Required<Pick<BreadcrumbProps, 'size'>>;
