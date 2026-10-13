'use client';

import type * as React from 'react';
import {
  getPartitionedNativeProps,
  useControllableState,
  mergeCallbacks,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import { useFocusWithin } from '@fluentui/react-tabster';
import { useFieldControlProps } from '../Field/useFieldControlProps';
import type { CheckboxBaseState, CheckboxProps } from './Checkbox.types';

/**
 * Base hook for Checkbox component, which manages state related to checked state, ARIA attributes,
 * focus management, and slot structure without design props.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to `<input>` element of Checkbox
 */
export const useCheckboxBase = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>): CheckboxBaseState => {
  'use no memo'; // justified: compiler would optimize useCheckboxBase — manual opt-out to preserve runtime behavior

  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps(props, { supportsLabelFor: true, supportsRequired: true });

  const { disabled = false, labelPosition = 'after', onChange } = props;

  const [checked, setChecked] = useControllableState({
    defaultState: props.defaultChecked,
    state: props.checked,
    initialState: false,
  });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
  });

  const mixed = checked === 'mixed';
  const id = useId('checkbox-', nativeProps.primary.id);

  const state: CheckboxBaseState = {
    checked,
    disabled,
    labelPosition,
    components: {
      root: 'span',
      input: 'input',
      indicator: 'div',
      label: 'label',
    },
    root: slot.always(props.root, {
      defaultProps: {
        ref: useFocusWithin<HTMLSpanElement>(),
        ...nativeProps.root,
      },
      elementType: 'span',
    }),
    input: slot.always(props.input, {
      defaultProps: {
        type: 'checkbox',
        id,
        ref,
        checked: checked === true,
        ...nativeProps.primary,
      },
      elementType: 'input',
    }),
    // `disabled` and `required` are Label props, so the styled hook sets them on its Label, not the base hook.
    label: slot.optional(props.label, {
      defaultProps: {
        htmlFor: id,
      },
      elementType: 'label',
    }),
    indicator: slot.optional(props.indicator, {
      renderByDefault: true,
      defaultProps: {
        'aria-hidden': true,
      },
      elementType: 'div',
    }),
  };

  state.input.onChange = mergeCallbacks(state.input.onChange, ev => {
    const val = ev.currentTarget.indeterminate ? 'mixed' : ev.currentTarget.checked;
    onChange?.(ev, { checked: val });
    setChecked(val);
  });

  // Create a ref object for the input element so we can use it to set the indeterminate prop.
  // Use useMergedRefs, since the ref might be undefined or a function-ref (no .current)
  const inputRef = useMergedRefs(state.input.ref);
  state.input.ref = inputRef;

  // Set the <input> element's checked and indeterminate properties based on our tri-state property.
  // Since indeterminate can only be set via javascript, it has to be done in a layout effect.
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = mixed;
    }
  }, [inputRef, mixed]);

  return state;
};
