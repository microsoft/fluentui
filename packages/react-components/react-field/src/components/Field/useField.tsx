import * as React from 'react';
import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { FieldProps, FieldState } from './Field.types';
import { Label } from '@fluentui/react-label';

/**
 * Create the state required to render Field.
 *
 * The returned state can be modified with hooks such as useFieldStyles_unstable,
 * before being passed to renderField_unstable.
 *
 * @param props - props from this instance of Field
 * @param ref - reference to root HTMLElement of Field
 */
export const useField_unstable = (props: FieldProps, ref: React.Ref<HTMLElement>): FieldState => {
  const baseId = useId('field-');

  let childInput = React.Children.only(props.children);
  if (!React.isValidElement(childInput) || childInput.type === React.Fragment) {
    throw new Error(
      'The child must be a single input element for this component. ' +
        "Please ensure that you're not using React Fragments.",
    );
  }

  const {
    size = 'medium',
    labelPosition = 'above',
    status,
    inputId = childInput.props.id || baseId + '__input',
    required = childInput.props.required,
  } = props;

  const label = resolveShorthand(props.label, {
    defaultProps: {
      id: baseId + '__label',
      htmlFor: inputId,
      required,
      size,
    },
  });

  // Apply the props to the child input
  childInput = React.cloneElement(childInput, {
    id: inputId,
    'aria-labelledby': label?.id,
    required,
    ...childInput.props,
  });

  let defaultStatusIcon;
  if (status === 'error') {
    defaultStatusIcon = <ErrorCircle12Filled />;
  } else if (status === 'warning') {
    defaultStatusIcon = <Warning12Filled />;
  } else if (status === 'success') {
    defaultStatusIcon = <CheckmarkCircle12Filled />;
  }

  return {
    labelPosition,
    status,
    size,
    required,
    labelId: label?.id,
    inputId,
    components: {
      root: 'div',
      label: Label,
      statusText: 'span',
      statusIcon: 'span',
      helperText: 'span',
    },
    root: getNativeElementProps('div', {
      ...props,
      ref,
      children: childInput,
    }),
    label,
    statusIcon: resolveShorthand(props.statusIcon, {
      required: !!status,
      defaultProps: {
        children: defaultStatusIcon,
      },
    }),
    statusText: resolveShorthand(props.statusText),
    helperText: resolveShorthand(props.helperText),
  };
};
