import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as SignalStyles from './Signal.scss';

export interface ISignalProps extends React.HTMLAttributes<HTMLSpanElement> {
  ariaLabel?: string;
}

export type Signal = React.StatelessComponent<ISignalProps>;

export const Signal: Signal = (props: ISignalProps): JSX.Element => {
  const { ariaLabel, className, children, ...spanProps } = props;

  return (
    <span aria-label={props.ariaLabel} {...spanProps} className={css(SignalStyles.signal, className)}>
      {props.children}
    </span>
  );
};
