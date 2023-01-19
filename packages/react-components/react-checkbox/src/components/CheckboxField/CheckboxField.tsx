import * as React from 'react';
import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Checkbox, CheckboxProps } from '../../Checkbox';

export type CheckboxFieldProps = Omit<FieldShimProps<CheckboxProps>, 'label'> & {
  label?: CheckboxProps['label'];
  fieldLabel?: FieldShimProps<CheckboxProps>['label'];
};

/** @deprecated Use Field with Checkbox: `<Field><Checkbox /></Field>` */
export const CheckboxField: ForwardRefComponent<CheckboxFieldProps> = React.forwardRef((props, ref) => {
  const CheckboxFieldShim = makeFieldShim(Checkbox);
  return (
    <CheckboxFieldShim
      {...props}
      label={props.fieldLabel}
      control={{ ...props.control, label: props.label }}
      ref={ref}
    />
  );
});
