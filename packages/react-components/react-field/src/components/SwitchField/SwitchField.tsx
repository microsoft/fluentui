import * as React from 'react';
import { Switch } from '@fluentui/react-switch';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type SwitchFieldProps = FieldProps<typeof Switch>;

export const switchFieldClassNames = getFieldClassNames('SwitchField');

export const SwitchField: ForwardRefComponent<SwitchFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Switch, classNames: switchFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

SwitchField.displayName = 'SwitchField';
