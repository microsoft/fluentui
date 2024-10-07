import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ColorAreaProps, ColorAreaState } from './ColorArea.types';
import { useColorAreaState_unstable } from './useColorAreaState';

/**
 * Create the state required to render ColorArea.
 *
 * The returned state can be modified with hooks such as useColorAreaStyles_unstable,
 * before being passed to renderColorArea_unstable.
 *
 * @param props - props from this instance of ColorArea
 * @param ref - reference to root HTMLDivElement of ColorArea
 */
export const useColorArea_unstable = (props: ColorAreaProps): ColorAreaState => {
  const ref = React.useRef(null);

  const {
    // Slots
    thumb,
  } = props;

  const state: ColorAreaState = {
    components: {
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  useColorAreaState_unstable(state, props);

  return state;
};
