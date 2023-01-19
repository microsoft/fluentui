import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Combobox, ComboboxProps } from '../../Combobox';

export type ComboboxFieldProps = FieldShimProps<ComboboxProps>;

/** @deprecated Use Field with Combobox: `<Field><Combobox /></Field>` */
export const ComboboxField: ForwardRefComponent<ComboboxFieldProps> = makeFieldShim(Combobox);
