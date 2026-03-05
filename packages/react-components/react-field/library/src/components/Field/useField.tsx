"use client";

import * as React from 'react';

import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import type { FieldBaseProps, FieldBaseState, FieldProps, FieldState } from './Field.types';

const validationMessageIcons = {
  error: <ErrorCircle12Filled />,
  warning: <Warning12Filled />,
  success: <CheckmarkCircle12Filled />,
  none: undefined,
} as const;

/**
 * Create the state required to render Field.
 *
 * The returned state can be modified with hooks such as useFieldStyles_unstable,
 * before being passed to renderField_unstable.
 *
 * @param props - Props passed to this field
 * @param ref - Ref to the root
 */
export const useField_unstable = (props: FieldProps, ref: React.Ref<HTMLDivElement>): FieldState => {
  const { orientation = 'vertical', size = 'medium', ...fieldProps } = props;
  const state = useFieldBase_unstable(fieldProps, ref);

  // Merge the size design prop into the label slot (which already has htmlFor, id, required)
  const label = state.label ? { ...state.label, size } : state.label;

  return {
    ...state,
    label,
    orientation,
    size,
  };
};

/**
 * Base hook for Field component, which manages state related to validation, ARIA attributes,
 * ID generation, and slot structure without design props.
 *
 * @param props - Props passed to this field
 * @param ref - Ref to the root
 */
export const useFieldBase_unstable = (props: FieldBaseProps, ref: React.Ref<HTMLDivElement>): FieldBaseState => {
  const {
    children,
    required = false,
    validationState = props.validationMessage ? 'error' : 'none',
  } = props;

  const baseId = useId('field-');
  const generatedControlId = baseId + '__control';

  const root = slot.always(getIntrinsicElementProps('div', { ...props, ref }, /*excludedPropNames:*/ ['children']), {
    elementType: 'div',
  });
  const label = slot.optional(props.label, {
    defaultProps: { htmlFor: generatedControlId, id: baseId + '__label', required },
    elementType: Label,
  });
  const validationMessage = slot.optional(props.validationMessage, {
    defaultProps: {
      id: baseId + '__validationMessage',
      role: validationState === 'error' || validationState === 'warning' ? 'alert' : undefined,
    },
    elementType: 'div',
  });
  const hint = slot.optional(props.hint, { defaultProps: { id: baseId + '__hint' }, elementType: 'div' });
  const defaultIcon = validationMessageIcons[validationState];
  const validationMessageIcon = slot.optional(props.validationMessageIcon, {
    renderByDefault: !!defaultIcon,
    defaultProps: { children: defaultIcon },
    elementType: 'span',
  });

  return {
    children,
    generatedControlId,
    required,
    validationState,
    components: { root: 'div', label: Label, validationMessage: 'div', validationMessageIcon: 'span', hint: 'div' },
    root,
    label,
    validationMessageIcon,
    validationMessage,
    hint,
  };
};
