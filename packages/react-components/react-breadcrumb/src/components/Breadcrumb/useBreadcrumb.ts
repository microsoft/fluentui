import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { BreadcrumbProps, BreadcrumbState } from './Breadcrumb.types';

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
  const { size = 'medium', dividerType = 'chevron', ...rest } = props;
  return {
    components: {
      root: 'nav',
      list: 'ol',
    },
    root: getNativeElementProps('nav', {
      ref,
      ...rest,
    }),
    list: resolveShorthand(props.list, { required: true }),
    size,
    dividerType,
  };
};
