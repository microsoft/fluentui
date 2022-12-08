import * as React from 'react';
import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { FieldChildProps, FieldProps, FieldState } from './Field.types';

const validationMessageIcons = {
  error: <ErrorCircle12Filled />,
  warning: <Warning12Filled />,
  success: <CheckmarkCircle12Filled />,
} as const;

/**
 * Create the state required to render Field.
 *
 * The returned state can be modified with hooks such as useFieldStyles_unstable,
 * before being passed to renderField_unstable.
 *
 * @param props - Props passed to this field
 * @param ref - Ref to the control slot (primary slot)
 */
export const useField_unstable = (props: FieldProps, ref: React.Ref<HTMLElement>): FieldState => {
  const { children, htmlFor, orientation = 'vertical', required, size, validationState } = props;

  const baseId = useId('field-');

  const root = getNativeElementProps('div', props, ['children']);

  const control = resolveShorthand(props.control, {
    required: true,
  });

  const label = resolveShorthand(props.label, {
    defaultProps: {
      htmlFor,
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

  const validationMessageIcon = resolveShorthand(props.validationMessageIcon, {
    required: !!validationState,
    defaultProps: {
      children: validationState ? validationMessageIcons[validationState] : undefined,
    },
  });

  const childElement = children && typeof children === 'object' ? React.Children.only(children) : undefined;

  const childProps: FieldChildProps = { ...childElement?.props };

  if (label && !htmlFor) {
    childProps['aria-labelledby'] ??= label.id;
  }

  if (validationMessage || hint) {
    // The control is described by the validation message, or hint, or both
    // We also preserve and append any aria-describedby supplied by the user
    // For reference: https://github.com/microsoft/fluentui/pull/25580#discussion_r1017259933
    childProps['aria-describedby'] = [validationMessage?.id, hint?.id, childProps['aria-describedby']]
      .filter(Boolean)
      .join(' ');
  }

  if (required) {
    childProps['aria-required'] ??= true;
  }

  if (validationState === 'error') {
    childProps['aria-invalid'] ??= true;
  }

  if (typeof children === 'function') {
    control.children = children(childProps);
  } else if (childElement) {
    control.children = React.cloneElement(childElement, childProps);
  }

  return {
    orientation,
    validationState,
    components: {
      root: 'div',
      control: 'div',
      label: Label,
      validationMessage: 'div',
      validationMessageIcon: 'span',
      hint: 'div',
    },
    root,
    control,
    label,
    validationMessageIcon,
    validationMessage,
    hint,
  };
};
