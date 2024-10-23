import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ColorAreaProps, ColorAreaState } from './ColorArea.types';

/**
 * Create the state required to render ColorArea.
 *
 * The returned state can be modified with hooks such as useColorAreaStyles_unstable,
 * before being passed to renderColorArea_unstable.
 *
 * @param props - props from this instance of ColorArea
 * @param ref - reference to root HTMLDivElement of ColorArea
 */
export const useColorArea_unstable = (props: ColorAreaProps, ref: React.Ref<HTMLDivElement>): ColorAreaState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
