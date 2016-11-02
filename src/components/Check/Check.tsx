import * as React from 'react';
import { css } from '../../utilities/css';
import './Check.scss';

export interface ICheckProps extends React.Props<Check> {
  /**
   * Whether or not this menu item is currently checked.
   * @defaultvalue false
   */
  checked?: boolean;
  /**
   * @deprecated
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'checked' instead.
   */
  isChecked?: boolean;
}

export class Check extends React.Component<ICheckProps, {}> {
  public static defaultProps = {
    isChecked: false
  };

  public shouldComponentUpdate(newProps: ICheckProps) {
    return this.props.isChecked !== newProps.isChecked || this.props.checked !== newProps.checked;
  }

  public render() {
    let { isChecked, checked } = this.props;

    return (
      <div className={ css('ms-Check', {
          'is-checked': isChecked || checked
        }) }>
        <div className='ms-Icon ms-Check-background'>
        </div>
        <i className='ms-Check-check ms-Icon ms-Icon--CheckMark'></i>
      </div>
    );
  }
}
