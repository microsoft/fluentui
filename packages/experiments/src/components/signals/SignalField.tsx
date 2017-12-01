
import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as SignalFieldStylesModule from './SignalField.scss';

// tslint:disable-next-line:no-any
const SignalFieldStyles: any = SignalFieldStylesModule;

export interface ISignalFieldProps extends React.HTMLAttributes<HTMLSpanElement> {
  before?: React.ReactNode | React.ReactNode[];
  after?: React.ReactNode | React.ReactNode[];
}

/**
 * Renders a field flanked by signals.
 * Pass `<Signal />` or related components in for the `before` and `after` fields.
 * Pass the main value as the children.
 */
export const SignalField: React.StatelessComponent<ISignalFieldProps> = (props: ISignalFieldProps): JSX.Element => {
  const {
    before,
    after,
    className,
    ...spanProps
  } = props;
  return (
    <span
      { ...spanProps }
      className={ css(SignalFieldStyles.signalField, className) }
    >
      { props.before }
      <span className={ SignalFieldStyles.signalFieldValue }>
        { props.children }
      </span>
      { props.after }
    </span>
  );
};
