import {
  FieldProps,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-components/unstable';
import { ObjectShorthandValue } from '@fluentui/react-northstar';
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
  const { errorMessage, required, control, label, children } = props;
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

  fieldProps.children = (children || control?.content) as React.ReactElement;

  const state = useField_unstable(fieldProps, ref);

  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

FormFieldShim.displayName = 'FormFieldShim';
