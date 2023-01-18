import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Textarea, TextareaProps } from '../../Textarea';

export type TextareaFieldProps = TextareaProps & FieldShimProps;

/**
 * @deprecated Use Field with Textarea: `<Field><Textarea /></Field>`
 */
export const TextareaField: ForwardRefComponent<TextareaFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <Textarea {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
TextareaField.displayName = 'TextareaField';
