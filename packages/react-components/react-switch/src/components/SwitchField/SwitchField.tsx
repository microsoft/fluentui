/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Switch, switchClassNames, SwitchProps } from '../../Switch';

/** @deprecated Use Field with Switch: `<Field><Switch /></Field>` */
export type SwitchFieldProps = DeprecatedFieldProps<SwitchProps>;
/** @deprecated Use Field with Switch: `<Field><Switch /></Field>` */
export const switchFieldClassNames = getDeprecatedFieldClassNames(switchClassNames.root);
/** @deprecated Use Field with Switch: `<Field><Switch /></Field>` */
export const SwitchField: ForwardRefComponent<SwitchFieldProps> = makeDeprecatedField(Switch);
