import * as React from 'react';
import type { CheckboxProps } from '@fluentui/react-checkbox';
import { Checkbox } from '@fluentui/react-checkbox';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type CheckboxFieldProps = Omit<FieldProps<typeof Checkbox>, 'label'> & {
  /**
   * The Checkbox's label.
   */
  label?: CheckboxProps['label'];

  /**
   * The label for the CheckboxField, which appears above or before the Checkbox, depending on the `orientation` prop.
   * It is recommended to only set the `label` prop, and not `fieldLabel`.
   */
  fieldLabel?: FieldProps<typeof Checkbox>['label'];
};

export const checkboxFieldClassNames = getFieldClassNames('CheckboxField');

export const CheckboxField: ForwardRefComponent<CheckboxFieldProps> = React.forwardRef((props, ref) => {
  const { fieldLabel, required, label, control, ...restOfProps } = props;

  props = {
    // Use the fieldLabel prop as the Field's label
    label: fieldLabel,
    // Use the label prop as the Checkbox's label
    control: { label, required, ...control },
    ...restOfProps,
  };

  const state = useField_unstable(props, ref, { component: Checkbox, classNames: checkboxFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

CheckboxField.displayName = 'CheckboxField';
