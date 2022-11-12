import * as React from 'react';
import type { FieldProps } from '@fluentui/react-field';
import {
  getFieldClassNames,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Switch } from '../../Switch';

// The Field's `label` prop overrides the Switch's built-in `label`.
// Therefore, the Switch's `labelPosition` has no effect and is omitted to avoid confusion.
export type SwitchFieldProps = Omit<FieldProps<typeof Switch>, 'labelPosition'>;

export const switchFieldClassNames = getFieldClassNames('SwitchField');

export const SwitchField: ForwardRefComponent<SwitchFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Switch, classNames: switchFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

SwitchField.displayName = 'SwitchField';
