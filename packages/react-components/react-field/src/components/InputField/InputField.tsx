import * as React from 'react';
import { Input } from '@fluentui/react-input';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  getFieldClassNames,
  FieldProps,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '../../Field';

export const inputFieldClassNames = getFieldClassNames('InputField');

export type InputFieldProps = FieldProps<typeof Input>;

export const InputField: ForwardRefComponent<InputFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { fieldComponent: Input, classNames: inputFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

InputField.displayName = 'InputField';
