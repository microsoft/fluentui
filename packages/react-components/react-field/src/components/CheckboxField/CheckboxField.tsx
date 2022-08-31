import * as React from 'react';
import { Checkbox, CheckboxProps } from '@fluentui/react-checkbox';
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
  // Forward the label prop to the underlying Checkbox (fieldComponent) instead of the Field
  props = {
    ...props,
    label: props.fieldLabel,
    control: {
      label: props.label,
      ...props.control,
    },
  };

  const state = useField_unstable({ props, ref, component: Checkbox, classNames: checkboxFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

CheckboxField.displayName = 'CheckboxField';
