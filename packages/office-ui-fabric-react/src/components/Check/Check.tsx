import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { Icon } from '../../Icon';
import * as stylesImport from './Check.scss';
const styles: any = stylesImport;

export interface ICheckProps extends React.Props<Check> {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * Whether or not this menu item is currently checked.
   * @defaultvalue false
   */
  checked?: boolean;
  /**
   * Deprecated at v0.65.1 and will be removed by v 1.0. Use 'checked' instead.
   * @deprecated
   */
  isChecked?: boolean;

  alwaysShowCheck?: boolean;
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
        isChecked && ('is-checked ' + styles.rootIsChecked)
      ) }>
        { Icon({
          className: 'ms-Check-circle ' + styles.circle,
          iconName: 'CircleRing'
        }) }
        { Icon({
          className: 'ms-Check-check ' + styles.check,
          iconName: 'StatusCircleCheckmark'
        }) }
      </div>
    );
  }
}
