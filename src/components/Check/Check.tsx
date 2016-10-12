import * as React from 'react';
import { css } from '../../utilities/css';
import './Check.scss';

export interface ICheckProps extends React.Props<Check> {
  isChecked?: boolean;
}

export class Check extends React.Component<ICheckProps, {}> {
  public static defaultProps = {
    isChecked: false
  };

  public shouldComponentUpdate(newProps: ICheckProps) {
    return this.props.isChecked !== newProps.isChecked;
  }

  public render() {
    let { isChecked } = this.props;

    return (
      <div className={ css('ms-Check', {
          'is-checked': isChecked
        }) }>
        <div className='ms-Icon ms-Check-background'>
        </div>
        <i className='ms-Check-check ms-Icon ms-Icon--CheckMark'></i>
      </div>
    );
  }
}
