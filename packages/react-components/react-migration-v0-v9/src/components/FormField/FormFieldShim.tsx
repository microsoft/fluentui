import {
  FieldProps,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-components/unstable';
import { ObjectShorthandValue } from '@fluentui/react-northstar';
import * as React from 'react';

type FieldComponent = React.VoidFunctionComponent<
  Pick<
    React.HTMLAttributes<HTMLElement>,
    'id' | 'className' | 'style' | 'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-errormessage'
  > & {
    /**
     * FormField children to be rendered
     */
    children?: unknown;
  }
>;

// TODO: It should be consuming it from V9
type FieldPropsWithOptionalComponentProps<T extends FieldComponent> = FieldProps<T> & {
  /**
   * Whether the field label should be marked as required.
   */
  required?: boolean;

  /**
   * Size of the field label.
   *
   * Number sizes will be ignored, but are allowed because the HTML `<input>` element has a prop `size?: number`.
   */
  size?: 'small' | 'medium' | 'large' | number;
};

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

const DummyVoidFunctionComponent: FieldComponent = () => {
  return null;
};

export const FormFieldShim = React.forwardRef<HTMLInputElement, CustomInputFieldProps>((props, ref) => {
  const { errorMessage, required, control, label, children } = props;
  const fieldProps: FieldPropsWithOptionalComponentProps<typeof DummyVoidFunctionComponent> = { required };

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

  fieldProps.control = { children: () => children || control?.content };

  const state = useField_unstable(fieldProps, ref, {
    component: DummyVoidFunctionComponent,
    classNames: {
      root: '',
      control: '',
      hint: '',
      label: '',
      validationMessage: '',
      validationMessageIcon: '',
    },
  });

  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

FormFieldShim.displayName = 'FormFieldShim';
