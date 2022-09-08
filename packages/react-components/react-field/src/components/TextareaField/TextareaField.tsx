import * as React from 'react';
import { Textarea } from '@fluentui/react-textarea';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type TextareaFieldProps = FieldProps<typeof Textarea>;

export const textareaFieldClassNames = getFieldClassNames('TextareaField');

export const TextareaField: ForwardRefComponent<TextareaFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Textarea, classNames: textareaFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

TextareaField.displayName = 'TextareaField';
