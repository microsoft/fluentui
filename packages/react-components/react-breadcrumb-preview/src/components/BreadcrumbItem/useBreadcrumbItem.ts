import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { BreadcrumbItemProps, BreadcrumbItemState } from './BreadcrumbItem.types';
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
  const { size, iconPosition } = useBreadcrumbContext_unstable();
  const { current = false, icon } = props;

  const iconShorthand = resolveShorthand(icon);

  return {
    components: {
      root: 'li',
      icon: 'span',
    },
    root: getNativeElementProps('li', {
      ref,
      ...props,
    }),
    size,
    current,
    icon: iconShorthand,
    iconOnly: Boolean(iconShorthand?.children && !props.children),
    iconPosition: props.iconPosition || iconPosition,
  };
};
