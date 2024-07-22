import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { getPartitionedNativeProps, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useColorAreaState_unstable } from './useColorAreaState';
import { ColorAreaProps, ColorAreaState } from './ColorArea.types';
import { useFocusWithin } from '@fluentui/react-tabster';

export const useColorArea_unstable = (props: ColorAreaProps, ref: React.Ref<HTMLInputElement>): ColorAreaState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true });
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
    color = 'red',
    // ...rest
  } = props;

  const state: ColorAreaState = {
    color,
    components: {
      root: 'div',
      inputX: 'input',
      inputY: 'input',
      thumb: 'div',
    },
    root: slot.always(root, {
      defaultProps: nativeProps.root,
      elementType: 'div',
    }),
    inputX: slot.always(inputX, {
      defaultProps: {
        id: useId('sliderX-', props.id),
        ref,
        ...nativeProps.primary,
        type: 'range',
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

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLDivElement>());

  useColorAreaState_unstable(state, props);

  return state;
};
