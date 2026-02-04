'use client';

import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { CircleFilled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { useFocusWithin } from '@fluentui/react-tabster';
import { getPartitionedNativeProps, mergeCallbacks, useId, slot } from '@fluentui/react-utilities';
import type { SwitchProps, SwitchState, SwitchBaseProps, SwitchBaseState } from './Switch.types';

/**
 * Create the state required to render Switch.
 *
 * The returned state can be modified with hooks such as useSwitchStyles_unstable,
 * before being passed to renderSwitch_unstable.
 *
 * @param props - props from this instance of Switch
 * @param ref - reference to `<input>` element of Switch
 */
export const useSwitch_unstable = (props: SwitchProps, ref: React.Ref<HTMLInputElement>): SwitchState => {
  const { size = 'medium', ...baseProps } = props;

  const baseState = useSwitchBase_unstable(baseProps, ref);

  return {
    ...baseState,
    size,
  };
};

/**
 * Base hook for Switch component, manages state and structure common to all variants of Switch
 *
 * @param props - base props from this instance of Switch
 * @param ref - reference to `<input>` element of Switch
 */
export const useSwitchBase_unstable = (props: SwitchBaseProps, ref?: React.Ref<HTMLInputElement>): SwitchBaseState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true });

  const { checked, defaultChecked, disabled, labelPosition = 'after', onChange, required } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
  });

  const id = useId('switch-', nativeProps.primary.id);

  const root = slot.always(props.root, {
    defaultProps: { ref: useFocusWithin<HTMLDivElement>(), ...nativeProps.root },
    elementType: 'div',
  });
  const indicator = slot.always(props.indicator, {
    defaultProps: { 'aria-hidden': true, children: <CircleFilled /> },
    elementType: 'div',
  });
  const input = slot.always(props.input, {
    defaultProps: { checked, defaultChecked, id, ref, role: 'switch', type: 'checkbox', ...nativeProps.primary },
    elementType: 'input',
  });
  input.onChange = mergeCallbacks(input.onChange, ev => onChange?.(ev, { checked: ev.currentTarget.checked }));
  const label = slot.optional(props.label, {
    defaultProps: { disabled, htmlFor: id, required, size: 'medium' },
    elementType: Label,
  });
  return {
    labelPosition,
    components: { root: 'div', indicator: 'div', input: 'input', label: Label },

    root,
    indicator,
    input,
    label,
  };
};
