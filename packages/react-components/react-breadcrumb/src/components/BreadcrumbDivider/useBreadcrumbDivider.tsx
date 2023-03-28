import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { BreadcrumbDividerProps, BreadcrumbDividerState } from './BreadcrumbDivider.types';
import { ChevronRight20Regular, ChevronRight16Regular, ChevronRight12Regular } from '@fluentui/react-icons';
import { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';

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
  ref: React.Ref<HTMLLIElement>,
): BreadcrumbDividerState => {
  const { size, dividerType } = useBreadcrumbContext_unstable();
  const icon = getDividerIcon(size, dividerType);

  return {
    components: {
      root: 'li',
    },
    root: getNativeElementProps('li', {
      ref,
      'aria-hidden': true,
      children: icon,
      ...props,
    }),
  };
};

/**
 * Get icon of the divider
 *
 * @param size - size of the Breadcrumb
 * @param dividerType - type of the divider, can be `slash` or `chevron`
 */
function getDividerIcon(size: BreadcrumbProps['size'] = 'medium', dividerType: BreadcrumbProps['dividerType']) {
  if (size === 'small') {
    return dividerType === 'slash' ? '/' : <ChevronRight12Regular />;
  }
  if (size === 'large') {
    return <ChevronRight20Regular />;
  }
  return <ChevronRight16Regular />;
}
