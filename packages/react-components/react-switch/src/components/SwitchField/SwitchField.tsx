import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Switch, SwitchProps } from '../../Switch';

export type SwitchFieldProps = FieldShimProps<SwitchProps>;

/** @deprecated Use Field with Switch: `<Field><Switch /></Field>` */
export const SwitchField: ForwardRefComponent<SwitchFieldProps> = makeFieldShim(Switch);
