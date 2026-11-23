'use client';

import type * as React from 'react';
import { Label } from '@fluentui/react-label';
import { mergeCallbacks, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
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

  // Focus-within ref drives the styled focus outline; applied here rather than in the base hook
  // so the base hook does not depend on react-tabster (keyborg).
  // eslint-disable-next-line react-hooks/immutability
  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLSpanElement>());

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
    // Slots
    root: rootSlot,
    input: inputSlot,
    label: labelSlot,
    indicator: indicatorSlot,
    // `className` and `style` go to the root slot, the rest of the native props go to the primary `input` slot.
    className,
    style,
    ...inputProps
  } = props;

  const root = slot.always(rootSlot, {
    defaultProps: { className, style },
    elementType: 'span',
  });
  const input = slot.always(inputSlot, {
    defaultProps: {
      ref,
      type: 'radio',
      id: useId('radio-', inputProps.id),
      name,
      checked,
      defaultChecked,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      ...inputProps,
    },
    elementType: 'input',
  });
  input.onChange = mergeCallbacks(input.onChange, ev => onChange?.(ev, { value: ev.currentTarget.value }));
  const label = slot.optional(labelSlot, {
    defaultProps: { htmlFor: input.id, disabled: input.disabled },
    elementType: 'label',
  });
  const indicator = slot.always(indicatorSlot, {
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
