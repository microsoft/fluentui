/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { ProgressBar, progressBarClassNames, ProgressBarProps } from '../../ProgressBar';

/** @deprecated Use Field with ProgressBar: `<Field><ProgressBar /></Field>` */
export type ProgressFieldProps = DeprecatedFieldProps<ProgressBarProps>;
/** @deprecated Use Field with ProgressBar: `<Field><ProgressBar /></Field>` */
export const progressFieldClassNames = getDeprecatedFieldClassNames(progressBarClassNames.root);
/** @deprecated Use Field with ProgressBar: `<Field><ProgressBar /></Field>` */
export const ProgressField: ForwardRefComponent<ProgressFieldProps> = makeDeprecatedField(ProgressBar, {
  displayName: 'ProgressField',
  mapProps: (props: ProgressFieldProps) => ({
    ...props,
    control: { ...props.control, validationState: props.validationState },
  }),
});
