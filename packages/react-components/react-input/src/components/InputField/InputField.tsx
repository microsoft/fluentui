/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Input, inputClassNames, InputProps } from '../../Input';

/** @deprecated Use Field with Input: `<Field><Input /></Field>` */
export type InputFieldProps = DeprecatedFieldProps<InputProps>;
/** @deprecated Use Field with Input: `<Field><Input /></Field>` */
export const inputFieldClassNames = getDeprecatedFieldClassNames(inputClassNames.root);
/** @deprecated Use Field with Input: `<Field><Input /></Field>` */
export const InputField: ForwardRefComponent<InputFieldProps> = makeDeprecatedField(Input);
