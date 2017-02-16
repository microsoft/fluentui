import * as React from 'react';
import { css } from '../../Utilities';
import {
  ISpinnerProps,
  SpinnerType, // Deprecated and will be removed at >= 2.0.0. Use SpinnerSize instead.
  SpinnerSize
} from './Spinner.Props';
import './Spinner.scss';

export class Spinner extends React.Component<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    size: SpinnerSize.medium
  };

  public render() {
    let { type, size, label, className } = this.props; // TODO remove deprecated type property at >= 2.0.0

    return (
      <div className={ css('ms-Spinner', className) }>
        <div className={ css('ms-Spinner-circle',
          { 'ms-Spinner--xSmall': size === SpinnerSize.xSmall },
          { 'ms-Spinner--small': size === SpinnerSize.small },
          { 'ms-Spinner--medium': size === SpinnerSize.medium },
          { 'ms-Spinner--large': size === SpinnerSize.large },
          { 'ms-Spinner--normal': type === SpinnerType.normal }, // TODO remove deprecated value at >= 2.0.0
          { 'ms-Spinner--large': type === SpinnerType.large }) // TODO remove deprecated value at >= 2.0.0
        }>
        </div>
        { label && (
          <div className='ms-Spinner-label'>{ label }</div>
        ) }
      </div >
    );
  }
}