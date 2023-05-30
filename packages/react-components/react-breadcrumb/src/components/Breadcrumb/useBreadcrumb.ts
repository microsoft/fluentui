import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { BreadcrumbProps, BreadcrumbState } from './Breadcrumb.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Create the state required to render Breadcrumb.
 *
 * The returned state can be modified with hooks such as useBreadcrumbStyles_unstable,
 * before being passed to renderBreadcrumb_unstable.
 *
 * @param props - props from this instance of Breadcrumb
 * @param ref - reference to root HTMLElement of Breadcrumb
 */
export const useBreadcrumb_unstable = (props: BreadcrumbProps, ref: React.Ref<HTMLElement>): BreadcrumbState => {
  const {
    appearance = 'transparent',
    disableFocus,
    dividerType = 'chevron',
    iconPosition = 'before',
    size = 'medium',
    list,
    ...rest
  } = props;

  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'horizontal',
    memorizeCurrent: true,
  });

  return {
    components: {
      root: 'nav',
      list: 'ol',
    },
    root: getNativeElementProps('nav', {
      ref,
      'aria-label': props['aria-label'] ?? 'breadcrumb',
      ...(!disableFocus ? focusAttributes : {}),
      ...rest,
    }),
    list: resolveShorthand(list, { required: true, defaultProps: { role: 'list' } }),
    appearance,
    dividerType,
    iconPosition,
    size,
  };
};
