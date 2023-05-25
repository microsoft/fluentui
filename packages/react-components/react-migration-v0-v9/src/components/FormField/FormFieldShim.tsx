import {
  FieldProps,
  renderField_unstable,
  useFieldContextValues_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-components';
import type { ObjectShorthandValue } from '@fluentui/react-northstar';

import * as React from 'react';

type WithContent = ObjectShorthandValue<React.HTMLAttributes<HTMLDivElement>> | string;

/**
 *
 */
type CustomInputFieldProps = React.PropsWithChildren<{
  /**
   * Message to be shown when error state is true
   */
  errorMessage?: WithContent;
  /**
   * Whether the field label should be marked as required.
   */
  required?: boolean;
  /**
   * Control to be rendered
   */
  control?: ObjectShorthandValue<{
    /**
     * Control content
     */
    content?: React.ReactNode;
  }> & {
    /**
     * Error state
     */
    error?: 'true' | 'false';
  };
  /**
   * Label to be rendered
   */
  label?: WithContent;
}>;

export const FormFieldShim = React.forwardRef<HTMLInputElement, CustomInputFieldProps>((props, ref) => {
  const { errorMessage, required, control, label } = props;
  const fieldProps: FieldProps = { required };

  if (errorMessage && control?.error === 'true') {
    fieldProps.validationState = 'error';
    if (typeof errorMessage === 'object') {
      fieldProps.validationMessage = errorMessage.content;
    }
    if (typeof errorMessage === 'string') {
      fieldProps.validationMessage = errorMessage;
    }
  }

  if (label) {
    if (typeof label === 'object') {
      fieldProps.label = label.content;
    } else {
      fieldProps.label = label;
    }
  }

  const children: FieldProps['children'] = props.children || control?.content;

  if (React.isValidElement(children)) {
    const child: React.ReactElement = children;

    // Use the Field's child render function to pass the field control props to the child
    fieldProps.children = fieldControlProps => React.cloneElement(child, { ...fieldControlProps, ...child.props });
  } else {
    fieldProps.children = children;
  }

  const state = useField_unstable(fieldProps, ref);
  useFieldStyles_unstable(state);
  const context = useFieldContextValues_unstable(state);
  return renderField_unstable(state, context);
});

FormFieldShim.displayName = 'FormFieldShim';
