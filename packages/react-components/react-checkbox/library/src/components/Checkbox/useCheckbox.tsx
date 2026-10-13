'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useCheckboxBase } from '@fluentui/react-core-preview';
import type { CheckboxProps as CheckboxCoreProps } from '@fluentui/react-core-preview';
import type { CheckboxBaseProps, CheckboxBaseState, CheckboxProps, CheckboxState } from './Checkbox.types';
import {
  Checkmark12Filled,
  Checkmark16Filled,
  Square12Filled,
  Square16Filled,
  CircleFilled,
} from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';

/**
 * Create the state required to render Checkbox.
 *
 * The returned state can be modified with hooks such as useCheckboxStyles_unstable,
 * before being passed to renderCheckbox_unstable.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to `<input>` element of Checkbox
 */
export const useCheckbox_unstable = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>): CheckboxState => {
  const { shape = 'square', size = 'medium', ...checkboxProps } = props;

  const state = useCheckboxBase_unstable(checkboxProps, ref);

  // Override indicator children with size+shape-appropriate icon
  const mixed = state.checked === 'mixed';
  let checkmarkIcon;
  if (mixed) {
    if (shape === 'circular') {
      checkmarkIcon = <CircleFilled />;
    } else {
      checkmarkIcon = size === 'large' ? <Square16Filled /> : <Square12Filled />;
    }
  } else if (state.checked) {
    checkmarkIcon = size === 'large' ? <Checkmark16Filled /> : <Checkmark12Filled />;
  }

  if (state.indicator) {
    state.indicator.children ??= checkmarkIcon;
  }

  return {
    shape,
    size,
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      label: Label,
    },
    label: slot.optional(props.label, {
      // `disabled` and `required` are Label props, so they are set here and not in the core base hook.
      // `required` is read from the input, where the base hook has merged the surrounding Field's props.
      defaultProps: {
        disabled: state.disabled,
        required: state.input.required,
        ...state.label,
        size: 'medium',
      },
      elementType: Label,
    }),
  };
};

/**
 * Base hook for Checkbox component, which manages state related to checked state, ARIA attributes,
 * focus management, and slot structure without design props.
 *
 * The implementation lives in `@fluentui/react-core-preview`. The v9 types use `Label` for the label slot, the core
 * types use a plain `label` element, hence the casts.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to `<input>` element of Checkbox
 */
export const useCheckboxBase_unstable = (
  props: CheckboxBaseProps,
  ref: React.Ref<HTMLInputElement>,
): CheckboxBaseState => useCheckboxBase(props as CheckboxCoreProps, ref) as CheckboxBaseState;
