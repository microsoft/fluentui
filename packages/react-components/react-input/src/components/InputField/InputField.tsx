import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Input, InputProps } from '../../Input';

export type InputFieldProps = FieldShimProps<InputProps>;

/** @deprecated Use Field with Input: `<Field><Input /></Field>` */
export const InputField: ForwardRefComponent<InputFieldProps> = makeFieldShim(Input);
