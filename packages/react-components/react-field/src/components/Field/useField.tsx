import * as React from 'react';

import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
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

  const root = getNativeElementProps('div', { ...props, ref }, /*excludedPropNames:*/ ['children']);

  const label = resolveShorthand(props.label, {
    defaultProps: {
      htmlFor: generatedControlId,
      id: baseId + '__label',
      required,
      size,
    },
  });

  const validationMessage = resolveShorthand(props.validationMessage, {
    defaultProps: {
      id: baseId + '__validationMessage',
      role: validationState === 'error' ? 'alert' : undefined,
    },
  });

  const hint = resolveShorthand(props.hint, {
    defaultProps: {
      id: baseId + '__hint',
    },
  });

  const defaultIcon = validationMessageIcons[validationState];
  const validationMessageIcon = resolveShorthand(props.validationMessageIcon, {
    required: !!defaultIcon,
    defaultProps: {
      children: defaultIcon,
    },
  });

  return {
    children,
    generatedControlId,
    orientation,
    required,
    size,
    validationState,
    components: {
      root: 'div',
      label: Label,
      validationMessage: 'div',
      validationMessageIcon: 'span',
      hint: 'div',
    },
    root,
    label,
    validationMessageIcon,
    validationMessage,
    hint,
  };
};
