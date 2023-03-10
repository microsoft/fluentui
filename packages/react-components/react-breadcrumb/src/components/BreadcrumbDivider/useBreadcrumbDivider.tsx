import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { BreadcrumbDividerProps, BreadcrumbDividerState } from './BreadcrumbDivider.types';
import { ChevronRight20Regular, ChevronRight16Regular, ChevronRight12Regular } from '@fluentui/react-icons';
import { BreadcrumbSize } from '../Breadcrumb/Breadcrumb.types';
import { BreadcrumbVariant } from './BreadcrumbDivider.types';

/**
 * Create the state required to render BreadcrumbDivider.
 *
 * The returned state can be modified with hooks such as useBreadcrumbDividerStyles_unstable,
 * before being passed to renderBreadcrumbDivider_unstable.
 *
 * @param props - props from this instance of BreadcrumbDivider
 * @param ref - reference to root HTMLElement of BreadcrumbDivider
 */
export const useBreadcrumbDivider_unstable = (
  props: BreadcrumbDividerProps,
  ref: React.Ref<HTMLElement>,
): BreadcrumbDividerState => {
  const { variant, size, ...rest } = props;
  const icon = variant !== null ? getDividerIcon(size, variant) : null;

  return {
    components: {
      root: 'span',
    },
    root: getNativeElementProps('span', {
      ref,
      required: true,
      children: icon,
      ...rest,
    }),
  };
};

/**
 * Get icon of the divider
 *
 * @param size - size of the Breadcrumb
 * @param variant - variant of the divider, can be `slash` or `chevron`
 */
function getDividerIcon(size: BreadcrumbSize = 'medium', variant: BreadcrumbVariant) {
  if (size === 'small') {
    return variant === 'slash' ? '/' : <ChevronRight12Regular />;
  }
  if (size === 'large') {
    return <ChevronRight20Regular />;
  }
  return <ChevronRight16Regular />;
}
