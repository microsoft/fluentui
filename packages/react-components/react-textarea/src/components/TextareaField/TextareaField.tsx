/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Textarea, textareaClassNames, TextareaProps } from '../../Textarea';

/** @deprecated Use Field with Textarea: `<Field><Textarea /></Field>` */
export type TextareaFieldProps = DeprecatedFieldProps<TextareaProps>;
/** @deprecated Use Field with Textarea: `<Field><Textarea /></Field>` */
export const textareaFieldClassNames = getDeprecatedFieldClassNames(textareaClassNames.root);
/** @deprecated Use Field with Textarea: `<Field><Textarea /></Field>` */
export const TextareaField: ForwardRefComponent<TextareaFieldProps> = makeDeprecatedField(Textarea);
