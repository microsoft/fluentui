'use client';

import type * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { getIntrinsicElementProps, slot, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusWithin } from '@fluentui/react-tabster';
import { useRangeSliderState_unstable } from './useRangeSliderState';
import type {
  RangeSliderBaseProps,
  RangeSliderBaseState,
  RangeSliderProps,
  RangeSliderSlots,
  RangeSliderState,
} from './RangeSlider.types';

/**
 * Props that describe the value of a single thumb, so they only make sense on each input individually.
 * They are not forwarded from the RangeSlider props; set them on the `startInput` and `endInput` slots.
 */
const perThumbPropNames = ['aria-valuetext', 'aria-valuenow', 'aria-valuemin', 'aria-valuemax'] as const;

/**
 * Props that are forwarded from the RangeSlider props to both inputs, instead of the root.
 */
const inputPropNames = [
  'name',
  'form',
  'required',
  'aria-describedby',
  'aria-errormessage',
  'aria-invalid',
  'aria-required',
] as const;

type InputSlotProps = RangeSliderProps['startInput'];

type RootNativeProps = React.HTMLAttributes<HTMLDivElement> & { as?: 'div'; name?: string };

/**
 * Create the state required to render RangeSlider.
 *
 * The returned state can be modified with hooks such as useRangeSliderStyles_unstable,
 * before being passed to renderRangeSlider_unstable.
 *
 * @param props - props from this instance of RangeSlider
 * @param ref - reference to root HTMLDivElement of RangeSlider
 */
export const useRangeSlider_unstable = (props: RangeSliderProps, ref: React.Ref<HTMLDivElement>): RangeSliderState => {
  const { size = 'medium', ...baseProps } = props;

  const baseState = useRangeSliderBase_unstable(baseProps, ref);

  // Focus-within tracking drives the thumbs' focus ring styles
  /* eslint-disable react-hooks/immutability */
  baseState.startThumb.ref = useMergedRefs(baseState.startThumb.ref, useFocusWithin<HTMLDivElement>());
  baseState.endThumb.ref = useMergedRefs(baseState.endThumb.ref, useFocusWithin<HTMLDivElement>());
  /* eslint-enable react-hooks/immutability */

  return {
    ...baseState,
    size,
  };
};

/**
 * Base hook for RangeSlider component, which manages state related to slots structure, ARIA attributes,
 * pointer and keyboard handling, and controlled/uncontrolled value state. It has no styling or focus-ring concerns.
 *
 * @param props - User provided props to the RangeSlider component.
 * @param ref - User provided ref to be passed to the RangeSlider root element.
 */
export const useRangeSliderBase_unstable = (
  props: RangeSliderBaseProps,
  ref: React.Ref<HTMLDivElement>,
): RangeSliderBaseState => {
  // supportsLabelFor is false because RangeSlider has two <input> elements, so htmlFor cannot target both.
  // The Field label is applied to the root group and, unless a slot provides its own label, to both inputs.
  // eslint-disable-next-line react-hooks/immutability
  props = useFieldControlProps_unstable(props, { supportsLabelFor: false });

  const { disabled, vertical = false, rail, startThumb, endThumb, startInput, endInput } = props;

  // Native props that aren't input-specific go to the root, so event handlers such as onPointerDown work
  // (the inputs don't receive pointer events) and `id` stays unique.
  // `form` and `required` aren't valid on a div, so getIntrinsicElementProps drops them already.
  const rootNativeProps = getIntrinsicElementProps('div', props as RootNativeProps, [
    'onChange',
    'name',
    'aria-describedby',
    'aria-errormessage',
    'aria-invalid',
    'aria-required',
    ...perThumbPropNames,
  ]);

  const sharedInputProps: Record<string, unknown> = {};
  for (const propName of inputPropNames) {
    if (props[propName] !== undefined) {
      sharedInputProps[propName] = props[propName];
    }
  }

  // An input falls back to the RangeSlider's label only when its slot doesn't provide one,
  // because aria-labelledby would otherwise take precedence over a per-thumb aria-label.
  const getLabelFallback = (inputSlot: InputSlotProps) => {
    if (typeof inputSlot === 'object' && inputSlot && (inputSlot['aria-label'] || inputSlot['aria-labelledby'])) {
      return {};
    }
    return { 'aria-label': props['aria-label'], 'aria-labelledby': props['aria-labelledby'] };
  };

  const startInputId = useId('rangeslider-start-', props.id ? `${props.id}-start` : undefined);
  const endInputId = useId('rangeslider-end-', props.id ? `${props.id}-end` : undefined);

  const getInputDefaultProps = (id: string, inputSlot: InputSlotProps) => ({
    id,
    ...sharedInputProps,
    ...getLabelFallback(inputSlot),
    type: 'range',
    orient: vertical ? ('vertical' as const) : undefined,
    'aria-orientation': vertical ? ('vertical' as const) : ('horizontal' as const),
  });

  const state: RangeSliderBaseState = {
    disabled,
    vertical,
    startDisabled: false,
    endDisabled: false,
    activeThumb: 'start',
    value: { start: 0, end: 0 },
    components: {
      root: 'div',
      rail: 'div',
      startThumb: 'div',
      endThumb: 'div',
      startInput: 'input',
      endInput: 'input',
    },
    root: slot.always({ role: 'group', ...rootNativeProps, ref }, { elementType: 'div' }),
    rail: slot.always(rail, { elementType: 'div' }),
    startThumb: slot.always(startThumb, { defaultProps: { role: 'presentation' }, elementType: 'div' }),
    endThumb: slot.always(endThumb, { defaultProps: { role: 'presentation' }, elementType: 'div' }),
    startInput: slot.always<RangeSliderSlots['startInput']>(startInput, {
      defaultProps: getInputDefaultProps(startInputId, startInput),
      elementType: 'input',
    }),
    endInput: slot.always<RangeSliderSlots['endInput']>(endInput, {
      defaultProps: getInputDefaultProps(endInputId, endInput),
      elementType: 'input',
    }),
  };

  useRangeSliderState_unstable(state, props);

  return state;
};
