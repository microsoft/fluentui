import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { ProgressBar, ProgressBarProps } from '../../ProgressBar';

export type ProgressFieldProps = FieldShimProps<ProgressBarProps>;

/** @deprecated Use Field with Progress: `<Field><Progress /></Field>` */
export const ProgressField: ForwardRefComponent<ProgressFieldProps> = makeFieldShim(ProgressBar);

// eslint-disable-next-line deprecation/deprecation
ProgressField.displayName = 'ProgressField';
