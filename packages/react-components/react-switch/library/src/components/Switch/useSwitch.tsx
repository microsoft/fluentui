'use client';

import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { CircleFilled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { useFocusWithin } from '@fluentui/react-tabster';
import { mergeCallbacks, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
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

  // Focus-within ref drives the styled focus outline; applied here rather than in the base hook
  // so the base hook does not depend on react-tabster (keyborg).
  // eslint-disable-next-line react-hooks/immutability
  baseState.root.ref = useMergedRefs(baseState.root.ref, useFocusWithin<HTMLDivElement>());

  baseState.indicator.children ??= <CircleFilled />;

  return {
    ...baseState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      label: Label,
    },
    size,
    label: slot.optional(props.label, {
      defaultProps: { size: 'medium', ...baseState.label },
      elementType: Label,
    }),
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

  const {
    checked,
    defaultChecked,
    disabledFocusable = false,
    labelPosition = 'after',
    onChange,
    // Slots
    root: rootSlot,
    indicator: indicatorSlot,
    input: inputSlot,
    label: labelSlot,
    // `className` and `style` go to the root slot, the rest of the native props go to the primary `input` slot.
    className,
    style,
    ...inputProps
  } = props;
  const { disabled, required } = props;

  const id = useId('switch-', inputProps.id);

  const root = slot.always(rootSlot, {
    defaultProps: { className, style },
    elementType: 'div',
  });
  const indicator = slot.always(indicatorSlot, {
    defaultProps: { 'aria-hidden': true },
    elementType: 'div',
  });
  const input = slot.always(inputSlot, {
    defaultProps: {
      checked,
      defaultChecked,
      id,
      ref,
      role: 'switch',
      type: 'checkbox',
      ...inputProps,
      disabled: disabled && !disabledFocusable,
      ...(disabledFocusable && { 'aria-disabled': true }),
    },
    elementType: 'input',
  });
  input.onChange = mergeCallbacks(input.onChange, ev => onChange?.(ev, { checked: ev.currentTarget.checked }));
  input.onClick = mergeCallbacks(input.onClick, ev => {
    if (disabledFocusable) {
      ev.preventDefault();
    }
  });
  input.onKeyDown = mergeCallbacks(input.onKeyDown, ev => {
    if (disabledFocusable && (ev.key === ' ' || ev.key === 'Enter')) {
      ev.preventDefault();
    }
  });
  const label = slot.optional(labelSlot, {
    defaultProps: { disabled: disabled || disabledFocusable, htmlFor: id, required },
    elementType: 'label',
  });
  return {
    disabledFocusable,
    labelPosition,
    components: { root: 'div', indicator: 'div', input: 'input', label: 'label' },

    root,
    indicator,
    input,
    label,
  };
};
