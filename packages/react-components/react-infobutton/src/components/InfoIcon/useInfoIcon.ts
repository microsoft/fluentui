import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { InfoIconProps, InfoIconState } from './InfoIcon.types';

/**
 * Create the state required to render InfoIcon.
 *
 * The returned state can be modified with hooks such as useInfoIconStyles_unstable,
 * before being passed to renderInfoIcon_unstable.
 *
 * @param props - props from this instance of InfoIcon
 * @param ref - reference to root HTMLElement of InfoIcon
 */
export const useInfoIcon_unstable = (props: InfoIconProps, ref: React.Ref<HTMLElement>): InfoIconState => {
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
