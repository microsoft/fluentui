import * as React from 'react';
import { ISpinnerProps, SpinnerType } from './Spinner.Props';
import { css } from '../../utilities/css';
import './Spinner.scss';

export class Spinner extends React.Component<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    type: SpinnerType.normal
  };

  public render() {
    let { type, label, className } = this.props;

    return (
      <div className={ css('ms-Spinner', className) }>
        <div className={ css('ms-Spinner-circle',
            { 'ms-Spinner--normal': type === SpinnerType.normal },
            { 'ms-Spinner--large': type === SpinnerType.large })
          }>
        </div>
        { label && (
          <div className='ms-Spinner-label'>{label}</div>
        ) }
      </div>
    );
  }
}