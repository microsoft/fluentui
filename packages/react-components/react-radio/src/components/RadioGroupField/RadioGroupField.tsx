import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { RadioGroup, RadioGroupProps } from '../../RadioGroup';

export type RadioGroupFieldProps = RadioGroupProps & FieldShimProps;

/**
 * @deprecated Use Field with RadioGroup: `<Field><RadioGroup /></Field>`
 */
export const RadioGroupField: ForwardRefComponent<RadioGroupFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <RadioGroup {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
RadioGroupField.displayName = 'RadioGroupField';
