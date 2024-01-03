import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
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
  const { focusMode = 'tab', size = 'medium', list, ...rest } = props;

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
    root: slot.always(
      getIntrinsicElementProps('nav', {
        ref,
        'aria-label': props['aria-label'] ?? 'breadcrumb',
        ...(focusMode === 'arrow' ? focusAttributes : {}),
        ...rest,
      }),
      { elementType: 'nav' },
    ),
    list: slot.optional(list, { renderByDefault: true, defaultProps: { role: 'list' }, elementType: 'ol' }),
    size,
  };
};
