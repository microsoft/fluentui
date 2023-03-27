/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { SpinButton, spinButtonClassNames, SpinButtonProps } from '../../SpinButton';

/** @deprecated Use Field with SpinButton: `<Field><SpinButton /></Field>` */
export type SpinButtonFieldProps = DeprecatedFieldProps<SpinButtonProps>;
/** @deprecated Use Field with SpinButton: `<Field><SpinButton /></Field>` */
export const spinButtonFieldClassNames = getDeprecatedFieldClassNames(spinButtonClassNames.root);
/** @deprecated Use Field with SpinButton: `<Field><SpinButton /></Field>` */
export const SpinButtonField: ForwardRefComponent<SpinButtonFieldProps> = makeDeprecatedField(SpinButton);
