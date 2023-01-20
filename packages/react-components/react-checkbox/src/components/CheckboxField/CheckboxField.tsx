/* eslint-disable deprecation/deprecation */
import {
  DeprecatedFieldProps,
  FieldProps,
  getDeprecatedFieldClassNames,
  makeDeprecatedField,
} from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Checkbox, checkboxClassNames, CheckboxProps } from '../../Checkbox';

/** @deprecated Use Field with a Checkbox inside: `<Field><Checkbox /></Field>` */
export type CheckboxFieldProps = Omit<DeprecatedFieldProps<CheckboxProps>, 'label'> & {
  label?: CheckboxProps['label'];
  fieldLabel?: FieldProps['label'];
};

/** @deprecated Use Field with a Checkbox inside: `<Field><Checkbox /></Field>` */
export const checkboxFieldClassNames = getDeprecatedFieldClassNames(checkboxClassNames.root);

/** @deprecated Use Field with a Checkbox inside: `<Field><Checkbox /></Field>` */
export const CheckboxField: ForwardRefComponent<CheckboxFieldProps> = makeDeprecatedField(Checkbox, {
  mapProps: (props: CheckboxFieldProps) => ({
    ...props,
    label: props.fieldLabel,
    required: undefined,
    control: { ...props.control, required: props.required, label: props.label },
  }),
});
