import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SwatchRowProps, SwatchRowState } from './SwatchRow.types';

/**
 * Create the state required to render SwatchRow.
 *
 * The returned state can be modified with hooks such as useSwatchRowStyles_unstable,
 * before being passed to renderSwatchRow_unstable.
 *
 * @param props - props from this instance of SwatchRow
 * @param ref - reference to root HTMLElement of SwatchRow
 */
export const useSwatchRow_unstable = (props: SwatchRowProps, ref: React.Ref<HTMLElement>): SwatchRowState => {
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
