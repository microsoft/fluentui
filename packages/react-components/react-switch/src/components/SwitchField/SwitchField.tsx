import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Switch, SwitchProps } from '../../Switch';

export type SwitchFieldProps = SwitchProps & FieldShimProps;

/**
 * @deprecated Use Field with Switch: `<Field><Switch /></Field>`
 */
export const SwitchField: ForwardRefComponent<SwitchFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <Switch {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
SwitchField.displayName = 'SwitchField';
