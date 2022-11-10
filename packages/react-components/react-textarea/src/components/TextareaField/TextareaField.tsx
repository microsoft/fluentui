import * as React from 'react';
import type { FieldProps } from '@fluentui/react-field';
import {
  getFieldClassNames,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Textarea } from '../../Textarea';

export type TextareaFieldProps = FieldProps<typeof Textarea>;

export const textareaFieldClassNames = getFieldClassNames('TextareaField');

export const TextareaField: ForwardRefComponent<TextareaFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Textarea, classNames: textareaFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

TextareaField.displayName = 'TextareaField';
