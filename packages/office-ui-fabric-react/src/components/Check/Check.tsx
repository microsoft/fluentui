import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import styles = require('./Check.scss');

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

export class Check extends BaseComponent<ICheckProps, {}> {
  public static defaultProps = {
    isChecked: false
  };

  public shouldComponentUpdate(newProps: ICheckProps) {
    return this.props.isChecked !== newProps.isChecked || this.props.checked !== newProps.checked;
  }

  public render() {
    let { isChecked, checked } = this.props;

    isChecked = isChecked || checked;

    return (
      <div className={ css(
        'ms-Check',
        styles.root,
        {
          ['is-checked ' + styles.rootIsChecked]: isChecked
        }) }>
        <div className={ css('ms-Icon ms-Check-background', styles.background) }>
        </div>
        <i className={ css('ms-Check-check ms-Icon ms-Icon--CheckMark', styles.check) }></i>
      </div>
    );
  }
}
