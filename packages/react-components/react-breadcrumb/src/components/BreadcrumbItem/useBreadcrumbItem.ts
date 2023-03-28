import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { BreadcrumbItemProps, BreadcrumbItemState } from './BreadcrumbItem.types';

/**
 * Create the state required to render BreadcrumbItem.
 *
 * The returned state can be modified with hooks such as useBreadcrumbItemStyles_unstable,
 * before being passed to renderBreadcrumbItem_unstable.
 *
 * @param props - props from this instance of BreadcrumbItem
 * @param ref - reference to root HTMLElement of BreadcrumbItem
 */
export const useBreadcrumbItem_unstable = (
  props: BreadcrumbItemProps,
  ref: React.Ref<HTMLElement>,
): BreadcrumbItemState => {
  return {
    components: {
      root: 'li',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
