import * as React from 'react';

import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { InfoButton } from '@fluentui/react-infobutton';
import { Label } from '@fluentui/react-label';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { FieldChildProps, FieldProps, FieldState } from './Field.types';

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
    required,
    validationState = props.validationMessage ? 'error' : 'none',
    size = 'medium',
  } = props;

  const baseId = useId('field-');

  const root = getNativeElementProps('div', { ...props, ref }, /*excludedPropNames:*/ ['children']);

  const label = resolveShorthand(props.label, {
    defaultProps: {
      id: baseId + '__label',
      required,
      size,
      // htmlFor is handled below
    },
  });

  const infoButton = resolveShorthand(props.infoButton, {
    defaultProps: {
      id: baseId + '__infoButton',
      size,
    },
  });

  if (label && infoButton && !infoButton['aria-labelledby']) {
    infoButton['aria-labelledby'] = label.id + ' ' + infoButton.id;
  }

  const labelWrapper = resolveShorthand(props.labelWrapper, {
    required: !!infoButton,
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

  const controlProps: FieldChildProps = React.isValidElement(children) ? { ...children.props } : {};

  if (label) {
    controlProps['aria-labelledby'] ??= label.id;

    if (!label.htmlFor) {
      // Assign the child a generated ID if doesn't already have an ID
      controlProps.id ??= baseId + '__control';
      label.htmlFor = controlProps.id;
    }
  }

  if (validationMessage || hint) {
    // The control is described by the validation message, or hint, or both
    // We also preserve and append any aria-describedby supplied by the user
    // For reference: https://github.com/microsoft/fluentui/pull/25580#discussion_r1017259933
    controlProps['aria-describedby'] = [validationMessage?.id, hint?.id, controlProps['aria-describedby']]
      .filter(Boolean)
      .join(' ');
  }

  if (validationState === 'error') {
    controlProps['aria-invalid'] ??= true;
  }

  if (required) {
    controlProps['aria-required'] ??= true;
  }

  if (React.isValidElement(children)) {
    root.children = React.cloneElement(children, controlProps);
  } else if (typeof children === 'function') {
    root.children = children(controlProps);
  }

  return {
    orientation,
    validationState,
    size,
    components: {
      root: 'div',
      label: Label,
      infoButton: InfoButton,
      labelWrapper: 'div',
      validationMessage: 'div',
      validationMessageIcon: 'span',
      hint: 'div',
    },
    root,
    label,
    infoButton,
    labelWrapper,
    validationMessageIcon,
    validationMessage,
    hint,
  };
};
