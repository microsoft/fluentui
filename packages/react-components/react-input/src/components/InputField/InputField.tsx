import * as React from 'react';
import type { FieldProps } from '@fluentui/react-field';
import {
  getFieldClassNames,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Input } from '../../Input';

export type InputFieldProps = FieldProps<typeof Input>;

export const inputFieldClassNames = getFieldClassNames('InputField');

export const InputField: ForwardRefComponent<InputFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Input, classNames: inputFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

InputField.displayName = 'InputField';
