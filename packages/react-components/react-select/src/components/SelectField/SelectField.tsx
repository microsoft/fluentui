import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Select, SelectProps } from '../../Select';

export type SelectFieldProps = SelectProps & FieldShimProps;

/**
 * @deprecated Use Field with Select: `<Field><Select /></Field>`
 */
export const SelectField: ForwardRefComponent<SelectFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <Select {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
SelectField.displayName = 'SelectField';
