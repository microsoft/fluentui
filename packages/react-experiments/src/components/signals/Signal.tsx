import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import * as SignalStyles from './Signal.scss';
import type { JSXElement } from '@fluentui/utilities';

export interface ISignalProps extends React.HTMLAttributes<HTMLSpanElement> {
  ariaLabel?: string;
}

export type Signal = React.FunctionComponent<ISignalProps>;

export const Signal: Signal = (props: ISignalProps): JSXElement => {
  const { ariaLabel, className, children, ...spanProps } = props;

  return (
    <span aria-label={props.ariaLabel} {...spanProps} className={css(SignalStyles.signal, className)}>
      {props.children}
    </span>
  );
};
