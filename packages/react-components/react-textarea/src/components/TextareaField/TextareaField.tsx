import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Textarea, TextareaProps } from '../../Textarea';

export type TextareaFieldProps = FieldShimProps<TextareaProps>;

/** @deprecated Use Field with Textarea: `<Field><Textarea /></Field>` */
export const TextareaField: ForwardRefComponent<TextareaFieldProps> = makeFieldShim(Textarea);
