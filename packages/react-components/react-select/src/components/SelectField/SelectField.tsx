/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Select, selectClassNames, SelectProps } from '../../Select';

/** @deprecated Use Field with Select: `<Field><Select /></Field>` */
export type SelectFieldProps = DeprecatedFieldProps<SelectProps>;
/** @deprecated Use Field with Select: `<Field><Select /></Field>` */
export const selectFieldClassNames = getDeprecatedFieldClassNames(selectClassNames.root);
/** @deprecated Use Field with Select: `<Field><Select /></Field>` */
export const SelectField: ForwardRefComponent<SelectFieldProps> = makeDeprecatedField(Select);
