'use client';

import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useRenderer_unstable } from '@griffel/react';
import { getPartitionedNativeProps, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useSliderState_unstable } from './useSliderState';
import type { SliderBaseProps, SliderBaseState, SliderProps, SliderState } from './Slider.types';
import { ensureLegacyVerticalSliderInput } from './legacyVerticalSliderAppearance';
import { useFocusWithin } from '@fluentui/react-tabster';

export const useSlider_unstable = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  const { size = 'medium', ...baseProps } = props;

  const baseState = useSliderBase_unstable(baseProps, ref);

  // Styling concern, so it lives here rather than in the base hook that unstyled consumers build on. Client-only and
  // markup-free; see legacyVerticalSliderAppearance.ts for why the fallback cannot be static CSS.
  // The input element locates the styling root (document or shadow root) and lets a hidden mount retry once laid out.
  const { targetDocument } = useFluent();
  const { styleElementAttributes } = useRenderer_unstable();
  const vertical = !!baseState.vertical;
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (vertical) {
      return ensureLegacyVerticalSliderInput(inputRef.current ?? targetDocument, styleElementAttributes);
    }
  }, [vertical, targetDocument, styleElementAttributes]);

  return {
    ...baseState,
    input: { ...baseState.input, ref: useMergedRefs(baseState.input.ref, inputRef) },
    size,
  };
};

/**
 * Base hook for Slider component, which manages state related to slots structure, ARIA attributes,
 * keyboard handling, and controlled/uncontrolled value state.
 *
 * @param props - User provided props to the Slider component.
 * @param ref - User provided ref to be passed to the Slider input element.
 */
export const useSliderBase_unstable = (props: SliderBaseProps, ref: React.Ref<HTMLInputElement>): SliderBaseState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange'],
  });

  const {
    disabled,
    vertical,
    // Slots
    root,
    input,
    rail,
    thumb,
  } = props;

  const state: SliderBaseState = {
    disabled,
    vertical,
    components: {
      input: 'input',
      rail: 'div',
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(root, {
      defaultProps: nativeProps.root,
      elementType: 'div',
    }),
    input: slot.always(input, {
      defaultProps: {
        id: useId('slider-', props.id),
        ref,
        ...nativeProps.primary,
        type: 'range',
        orient: vertical ? 'vertical' : undefined,
      },
      elementType: 'input',
    }),
    rail: slot.always(rail, { elementType: 'div' }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  // Apply after slot resolution so an explicitly undefined slot attribute also receives the default.
  if (state.input['aria-orientation'] === undefined) {
    state.input['aria-orientation'] = state.vertical ? 'vertical' : 'horizontal';
  }

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLDivElement>());

  useSliderState_unstable(state, props);

  return state;
};
