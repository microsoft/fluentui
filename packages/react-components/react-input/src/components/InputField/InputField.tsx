import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Input, InputProps } from '../../Input';

export type InputFieldProps = InputProps & FieldShimProps;

/**
 * @deprecated Use Field with Input: `<Field><Input /></Field>`
 */
export const InputField: ForwardRefComponent<InputFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <Input {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
InputField.displayName = 'InputField';
