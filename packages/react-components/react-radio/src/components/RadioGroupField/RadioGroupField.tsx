/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { RadioGroup, radioGroupClassNames, RadioGroupProps } from '../../RadioGroup';

/** @deprecated Use Field with RadioGroup: `<Field><RadioGroup /></Field>` */
export type RadioGroupFieldProps = DeprecatedFieldProps<RadioGroupProps>;
/** @deprecated Use Field with RadioGroup: `<Field><RadioGroup /></Field>` */
export const radioGroupFieldClassNames = getDeprecatedFieldClassNames(radioGroupClassNames.root);
/** @deprecated Use Field with RadioGroup: `<Field><RadioGroup /></Field>` */
export const RadioGroupField: ForwardRefComponent<RadioGroupFieldProps> = makeDeprecatedField(RadioGroup);
