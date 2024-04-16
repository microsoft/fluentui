import * as React from 'react';

import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import type { FieldProps, FieldState } from './Field.types';

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
  const {
    children,
    orientation = 'vertical',
    required = false,
    validationState = props.validationMessage ? 'error' : 'none',
    size = 'medium',
  } = props;

  const baseId = useId('field-');
  const generatedControlId = baseId + '__control';

  const root = slot.always(getIntrinsicElementProps('div', { ...props, ref }, /*excludedPropNames:*/ ['children']), {
    elementType: 'div',
  });
  const label = slot.optional(props.label, {
    defaultProps: { htmlFor: generatedControlId, id: baseId + '__label', required, size },
    elementType: Label,
  });
  const validationMessage = slot.optional(props.validationMessage, {
    defaultProps: { id: baseId + '__validationMessage', role: validationState === 'error' ? 'alert' : undefined },
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
    orientation,
    required,
    size,
    validationState,
    components: { root: 'div', label: Label, validationMessage: 'div', validationMessageIcon: 'span', hint: 'div' },
    root,
    label,
    validationMessageIcon,
    validationMessage,
    hint,
  };
};
