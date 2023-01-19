import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { SpinButton, SpinButtonProps } from '../../SpinButton';

export type SpinButtonFieldProps = FieldShimProps<SpinButtonProps>;

/** @deprecated Use Field with SpinButton: `<Field><SpinButton /></Field>` */
export const SpinButtonField: ForwardRefComponent<SpinButtonFieldProps> = makeFieldShim(SpinButton);
