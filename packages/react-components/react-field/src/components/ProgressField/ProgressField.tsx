import * as React from 'react';
import { Progress } from '@fluentui/react-progress';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type ProgressFieldProps = FieldProps<typeof Progress>;

export const progressFieldClassNames = getFieldClassNames('ProgressField');

export const ProgressField: ForwardRefComponent<ProgressFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, {
    component: Progress,
    classNames: progressFieldClassNames,
    labelConnection: 'aria-labelledby',
  });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

ProgressField.displayName = 'ProgressField';
