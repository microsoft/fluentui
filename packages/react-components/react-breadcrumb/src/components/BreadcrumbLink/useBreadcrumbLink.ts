import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { BreadcrumbLinkProps, BreadcrumbLinkState } from './BreadcrumbLink.types';

/**
 * Create the state required to render BreadcrumbLink.
 *
 * The returned state can be modified with hooks such as useBreadcrumbLinkStyles_unstable,
 * before being passed to renderBreadcrumbLink_unstable.
 *
 * @param props - props from this instance of BreadcrumbLink
 * @param ref - reference to root HTMLElement of BreadcrumbLink
 */
export const useBreadcrumbLink_unstable = (
  props: BreadcrumbLinkProps,
  ref: React.Ref<HTMLElement>,
): BreadcrumbLinkState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
