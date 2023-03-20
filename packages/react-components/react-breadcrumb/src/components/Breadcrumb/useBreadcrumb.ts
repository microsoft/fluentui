import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
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
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'nav',
      list: 'ol',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('nav', {
      ref,
      ...props,
    }),
    list: {},
  };
};
