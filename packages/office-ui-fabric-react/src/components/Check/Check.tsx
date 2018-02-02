import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { Icon } from '../../Icon';
import * as stylesImport from './Check.scss';
import { ICheckProps } from './Check.types';
const styles: any = stylesImport;

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
      <div
        className={ css(
          'ms-Check',
          styles.root,
          {
            [`is-checked ${styles.rootIsChecked}`]: isChecked
          }
        ) }
      >
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
