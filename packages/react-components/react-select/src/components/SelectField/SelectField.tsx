import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Select, SelectProps } from '../../Select';

export type SelectFieldProps = FieldShimProps<SelectProps>;

/** @deprecated Use Field with Select: `<Field><Select /></Field>` */
export const SelectField: ForwardRefComponent<SelectFieldProps> = makeFieldShim(Select);
