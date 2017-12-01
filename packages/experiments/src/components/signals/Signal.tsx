
import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as SignalStylesModule from './Signal.scss';

// tslint:disable-next-line:no-any
const SignalStyles: any = SignalStylesModule;

export interface ISignalProps extends React.HTMLAttributes<HTMLSpanElement> {
  ariaLabel?: string;
}

export type Signal = React.StatelessComponent<ISignalProps>;

export const Signal: Signal = (props: ISignalProps): JSX.Element => {
  const {
    ariaLabel,
    className,
    ...spanProps
  } = props;

  return (
    <span
      aria-label={ props.ariaLabel }
      { ...spanProps }
      className={ css(SignalStyles.signal, className) }
    >
      { props.children }
    </span>
  );
};
