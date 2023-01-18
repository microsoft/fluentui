import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { ProgressBar, ProgressBarProps } from '../../ProgressBar';

export type ProgressFieldProps = ProgressBarProps & FieldShimProps;

/**
 * @deprecated Use Field with ProgressBar: `<Field><ProgressBar /></Field>`
 */
export const ProgressField: ForwardRefComponent<ProgressFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <ProgressBar {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
ProgressField.displayName = 'ProgresField';
