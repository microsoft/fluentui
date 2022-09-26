import * as React from 'react';
import { SpinButton } from '@fluentui/react-spinbutton';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type SpinButtonFieldProps = FieldProps<typeof SpinButton>;

export const spinButtonFieldClassNames = getFieldClassNames('SpinButtonField');

export const SpinButtonField: ForwardRefComponent<SpinButtonFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: SpinButton, classNames: spinButtonFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

SpinButtonField.displayName = 'SpinButtonField';
