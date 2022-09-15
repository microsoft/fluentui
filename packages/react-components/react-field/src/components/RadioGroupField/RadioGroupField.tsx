import * as React from 'react';
import { RadioGroup } from '@fluentui/react-radio';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type RadioGroupFieldProps = FieldProps<typeof RadioGroup>;

export const radioGroupFieldClassNames = getFieldClassNames('RadioGroupField');

export const RadioGroupField: ForwardRefComponent<RadioGroupFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, {
    component: RadioGroup,
    classNames: radioGroupFieldClassNames,
    labelConnection: 'aria-labelledby',
  });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

RadioGroupField.displayName = 'RadioGroupField';
