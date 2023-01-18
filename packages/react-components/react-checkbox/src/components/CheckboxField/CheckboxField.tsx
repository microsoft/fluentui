import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Checkbox, CheckboxProps } from '../../Checkbox';

export type CheckboxFieldProps = CheckboxProps &
  Omit<FieldShimProps, 'label'> & {
    fieldLabel?: FieldShimProps['label'];
  };

/**
 * @deprecated Use Field with Checkbox: `<Field><Checkbox /></Field>`
 */
export const CheckboxField: ForwardRefComponent<CheckboxFieldProps> = React.forwardRef((props, ref) => {
  const { label, fieldLabel } = props;
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, checkboxProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps} label={fieldLabel}>
      <Checkbox {...checkboxProps} label={label} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
CheckboxField.displayName = 'CheckboxField';
