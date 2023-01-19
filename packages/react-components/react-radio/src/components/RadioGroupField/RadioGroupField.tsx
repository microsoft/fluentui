import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { RadioGroup, RadioGroupProps } from '../../RadioGroup';

export type RadioGroupFieldProps = FieldShimProps<RadioGroupProps>;

/** @deprecated Use Field with RadioGroup: `<Field><RadioGroup /></Field>` */
export const RadioGroupField: ForwardRefComponent<RadioGroupFieldProps> = makeFieldShim(RadioGroup);
