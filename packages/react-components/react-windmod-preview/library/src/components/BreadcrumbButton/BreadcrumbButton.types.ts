import type {
  BreadcrumbButtonProps as BreadcrumbButtonHeadlessProps,
  BreadcrumbButtonState as BreadcrumbButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/breadcrumb';

import type { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';
import type { ButtonProps } from '../Button/Button.types';

export type { BreadcrumbButtonSlots } from '@fluentui/react-headless-components-preview/breadcrumb';

/** Windmod BreadcrumbButton props. The breadcrumb fixes appearance and shape, and size comes from its context. */
export type BreadcrumbButtonProps = BreadcrumbButtonHeadlessProps;

/** Windmod BreadcrumbButton state: headless state plus the look props the breadcrumb pins. */
export type BreadcrumbButtonState = BreadcrumbButtonHeadlessState &
  Required<Pick<ButtonProps, 'appearance' | 'shape'>> &
  Required<Pick<BreadcrumbProps, 'size'>>;
