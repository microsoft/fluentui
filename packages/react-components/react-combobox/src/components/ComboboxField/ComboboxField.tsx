/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Combobox, comboboxClassNames, ComboboxProps } from '../../Combobox';

/** @deprecated Use Field with Combobox: `<Field><Combobox /></Field>` */
export type ComboboxFieldProps = DeprecatedFieldProps<ComboboxProps>;
/** @deprecated Use Field with Combobox: `<Field><Combobox /></Field>` */
export const comboboxFieldClassNames = getDeprecatedFieldClassNames(comboboxClassNames.root);
/** @deprecated Use Field with Combobox: `<Field><Combobox /></Field>` */
export const ComboboxField: ForwardRefComponent<ComboboxFieldProps> = makeDeprecatedField(Combobox);
