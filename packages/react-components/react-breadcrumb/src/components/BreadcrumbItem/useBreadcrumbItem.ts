import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { BreadcrumbItemProps, BreadcrumbItemState } from './BreadcrumbItem.types';
import { BreadcrumbDivider } from '../BreadcrumbDivider/BreadcrumbDivider';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';
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
  const { divider, ...rest } = props;
  const { size } = useBreadcrumbContext_unstable();
  return {
    components: {
      root: 'li',
      divider: BreadcrumbDivider,
    },
    root: getNativeElementProps('div', {
      ref,
      ...rest,
    }),
    divider: resolveShorthand(divider, {
      required: true,
      defaultProps: {
        size,
      },
    }),
  };
};
