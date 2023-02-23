import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { BreadcrumbDividerProps, BreadcrumbDividerState } from './BreadcrumbDivider.types';

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
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'span',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
