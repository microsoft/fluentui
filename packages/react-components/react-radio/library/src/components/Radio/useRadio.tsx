'use client';

import type * as React from 'react';
import { Label } from '@fluentui/react-label';
import { getPartitionedNativeProps, mergeCallbacks, useId, slot } from '@fluentui/react-utilities';
import { useRadioGroupContextValue_unstable } from '../../contexts/RadioGroupContext';
import { useFocusWithin } from '@fluentui/react-tabster';
import type { RadioBaseProps, RadioBaseState, RadioProps, RadioState } from './Radio.types';

/**
 * Create the state required to render Radio.
 *
 * The returned state can be modified with hooks such as useRadioStyles_unstable,
 * before being passed to renderRadio_unstable.
 *
 * @param props - props from this instance of Radio
 * @param ref - reference to `<input>` element of Radio
 */
export const useRadio_unstable = (props: RadioProps, ref: React.Ref<HTMLInputElement>): RadioState => {
  const state = useRadioBase_unstable(props, ref);

  return {
    ...state,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: { ...state.components, label: Label },
    label: slot.optional(props.label, {
      defaultProps: { ...state.label },
      elementType: Label,
    }),
  };
};

/**
 * Create the state required to render Radio.
 *
 * The returned state can be modified with hooks such as useRadioStyles_unstable,
 * before being passed to renderRadio_unstable.
 *
 * @param props - props from this instance of Radio
 * @param ref - reference to `<input>` element of Radio
 */
export const useRadioBase_unstable = (props: RadioBaseProps, ref: React.Ref<HTMLInputElement>): RadioBaseState => {
  const group = useRadioGroupContextValue_unstable();

  const {
    name = group.name,
    checked = group.value !== undefined ? group.value === props.value : undefined,
    defaultChecked = group.defaultValue !== undefined ? group.defaultValue === props.value : undefined,
    labelPosition = group.layout === 'horizontal-stacked' ? 'below' : 'after',
    disabled = group.disabled,
    required = group.required,
    'aria-describedby': ariaDescribedBy = group['aria-describedby'],
    onChange,
  } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
  });

  const root = slot.always(props.root, {
    defaultProps: {
      ref: useFocusWithin<HTMLSpanElement>(),
      ...nativeProps.root,
    },
    elementType: 'span',
  });
  const input = slot.always(props.input, {
    defaultProps: {
      ref,
      type: 'radio',
      id: useId('radio-', nativeProps.primary.id),
      name,
      checked,
      defaultChecked,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      ...nativeProps.primary,
    },
    elementType: 'input',
  });
  input.onChange = mergeCallbacks(input.onChange, ev => onChange?.(ev, { value: ev.currentTarget.value }));
  const label = slot.optional(props.label, {
    defaultProps: { htmlFor: input.id, disabled: input.disabled },
    elementType: 'label',
  });
  const indicator = slot.always(props.indicator, {
    defaultProps: { 'aria-hidden': true },
    elementType: 'div',
  });
  return {
    labelPosition,
    components: { root: 'span', input: 'input', label: 'label', indicator: 'div' },
    root,
    input,
    label,
    indicator,
  };
};
