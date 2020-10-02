import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import * as SignalFieldStyles from './SignalField.scss';

export type SignalFieldMode = 'wide' | 'compact';

export interface ISignalFieldProps extends React.HTMLAttributes<HTMLSpanElement> {
  signalsFieldMode?: SignalFieldMode;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

/**
 * Renders a field flanked by signals.
 * Pass `<Signal />` or related components in for the `before` and `after` fields.
 * Pass the main value as the children.
 */
export const SignalField: React.FunctionComponent<ISignalFieldProps> = (props: ISignalFieldProps): JSX.Element => {
  const { before, after, className, signalsFieldMode = 'compact', ...spanProps } = props;
  return (
    <span
      {...spanProps}
      className={css(
        SignalFieldStyles.signalField,
        {
          [SignalFieldStyles.wide]: signalsFieldMode === 'wide',
          [SignalFieldStyles.compact]: signalsFieldMode === 'compact',
        },
        className,
      )}
    >
      {props.before}
      <span className={SignalFieldStyles.signalFieldValue}>{props.children}</span>
      {props.after}
    </span>
  );
};
