import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Combobox, ComboboxProps } from '../../Combobox';

export type ComboboxFieldProps = ComboboxProps & FieldShimProps;

/**
 * @deprecated Use Field with Combobox: `<Field><Combobox /></Field>`
 */
export const ComboboxField: ForwardRefComponent<ComboboxFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <Combobox {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
ComboboxField.displayName = 'ComboboxField';
