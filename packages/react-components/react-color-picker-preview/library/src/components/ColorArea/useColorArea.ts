import * as React from 'react';
import { useId, slot, getPartitionedNativeProps } from '@fluentui/react-utilities';
import type { ColorAreaProps, ColorAreaState } from './ColorArea.types';
import { useColorAreaState_unstable } from './useColorAreaState';

/**
 * Create the state required to render ColorArea.
 *
 * The returned state can be modified with hooks such as useColorAreaStyles_unstable,
 * before being passed to renderColorArea_unstable.
 *
 * @param props - props from this instance of ColorArea
 * @param ref - reference to root HTMLInputElement of ColorArea
 */
export const useColorArea_unstable = (props: ColorAreaProps, ref: React.Ref<HTMLInputElement>): ColorAreaState => {

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange'],
  });

  const {
    // Slots
    root,
    inputX,
    inputY,
    thumb,
  } = props;

  const state: ColorAreaState = {
    components: {
      inputX: 'input',
      inputY: 'input',
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(root, {
      defaultProps: { ...nativeProps.root, ref: divRef },
      elementType: 'div',
    }),
    inputX: slot.always(inputX, {
      defaultProps: {
        id: useId('sliderX-', props.id),
        type: 'range',
        ref,
        ...nativeProps.primary,
      },
      elementType: 'input',
    }),
    inputY: slot.always(inputY, {
      defaultProps: {
        id: useId('sliderY-', props.id),
        type: 'range',
      },
      elementType: 'input',
    }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  useColorAreaState_unstable(state, props);

  return state;
};
