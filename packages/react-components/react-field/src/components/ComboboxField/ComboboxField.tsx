import * as React from 'react';
import { Combobox } from '@fluentui/react-combobox';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type ComboboxFieldProps = FieldProps<typeof Combobox>;

export const comboboxFieldClassNames = getFieldClassNames('ComboboxField');

export const ComboboxField: ForwardRefComponent<ComboboxFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Combobox, classNames: comboboxFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

ComboboxField.displayName = 'ComboboxField';
