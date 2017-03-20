import * as React from 'react';
import { css } from '../../Utilities';
import { ISpinnerProps, SpinnerType, SpinnerSize } from './Spinner.Props';
let styles: any = require('./Spinner.scss');

export class Spinner extends React.Component<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    size: SpinnerSize.medium
  };

  public render() {
    let { type, size, label, className } = this.props; // TODO remove deprecated type property at >= 2.0.0

    return (
      <div className={ css('ms-Spinner', styles.root, className) }>
        <div className={ css('ms-Spinner-circle', styles.circle,
          {
            ['ms-Spinner--xSmall ' + styles.circleIsXSmall]: size === SpinnerSize.xSmall,
            ['ms-Spinner--small ' + styles.circleIsSmall]: size === SpinnerSize.small,
            ['ms-Spinner--medium ' + styles.circleIsMedium]: size === SpinnerSize.medium,
            ['ms-Spinner--large ' + styles.circleIsLarge]: size === SpinnerSize.large,
            ['ms-Spinner--normal ' + styles.circleIsTypeMedium]: type === SpinnerType.normal, // TODO remove deprecated value at >= 2.0.0
            ['ms-Spinner--large ' + styles.circleIsTypeLarge]: type === SpinnerType.large // TODO remove deprecated value at >= 2.0.0
          })
        }>
        </div>
        { label && (
          <div className={ css('ms-Spinner-label', styles.label) }>{ label }</div>
        ) }
      </div >
    );
  }
}