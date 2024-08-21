import * as React from 'react';
import { getPartitionedNativeProps, getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
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
export const useColorArea_unstable = (props: ColorAreaProps, ref: React.Ref<HTMLDivElement>): ColorAreaState => {
  const inputXRef = React.useRef(null);
  const inputYRef = React.useRef(null);
  const divRef = React.useRef(null);

  const {
    // Slots
    inputX,
    inputY,
    thumb,
    ...rest
  } = props;

  const state: ColorAreaState = {
    components: {
      inputX: 'input',
      inputY: 'input',
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: divRef,
        ...rest,
      }),
      { elementType: 'div' },
    ),
    inputX: slot.always(inputX, {
      defaultProps: {
        id: useId('sliderX-', props.id),
        type: 'range',
        ref: inputXRef,
      },
      elementType: 'input',
    }),
    inputY: slot.always(inputY, {
      defaultProps: {
        id: useId('sliderY-', props.id),
        type: 'range',
        ref: inputYRef,
      },
      elementType: 'input',
    }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  useColorAreaState_unstable(state, props);

  return state;
};
