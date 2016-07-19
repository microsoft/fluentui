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
      <svg
        focusable='false'
        className={ css('ms-Check', {
          'is-checked': isChecked
        }) }
        height='20'
        width='20'
      >
        <circle className='ms-Check-circle' cx='10' cy='10' r='9' strokeWidth='1' />
        <polyline className='ms-Check-check' points='6.3,10.3 9,13 13.3,7.5' strokeWidth='1.5' fill='none' />
      </svg>
    );
  }
}
