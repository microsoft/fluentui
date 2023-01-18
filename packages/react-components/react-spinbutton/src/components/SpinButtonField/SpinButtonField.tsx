import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { SpinButton, SpinButtonProps } from '../../SpinButton';

export type SpinButtonFieldProps = SpinButtonProps & FieldShimProps;

/**
 * @deprecated Use Field with SpinButton: `<Field><SpinButton /></Field>`
 */
export const SpinButtonField: ForwardRefComponent<SpinButtonFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <SpinButton {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
SpinButtonField.displayName = 'SpinButtonField';
