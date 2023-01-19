import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Checkbox, CheckboxProps } from '../../Checkbox';

export type CheckboxFieldProps = Omit<FieldShimProps<CheckboxProps>, 'label'> & {
  label?: CheckboxProps['label'];
  fieldLabel?: FieldShimProps<CheckboxProps>['label'];
};

/** @deprecated Use Field with Checkbox: `<Field><Checkbox /></Field>` */
export const CheckboxField: ForwardRefComponent<CheckboxFieldProps> = makeFieldShim<CheckboxFieldProps>(
  Checkbox,
  props => ({
    ...props,
    control: { ...props.control, label: props.label, required: props.required },
    label: props.fieldLabel,
    required: undefined,
  }),
);
