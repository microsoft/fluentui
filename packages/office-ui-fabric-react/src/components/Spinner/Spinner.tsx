import * as React from 'react';
import { css } from '../../Utilities';
import { ISpinnerProps, SpinnerType, SpinnerSize } from './Spinner.Props';
import styles from './Spinner.scss';

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
            ['ms-Spinner--xSmall ' + styles.isXSmall]: size === SpinnerSize.xSmall,
            ['ms-Spinner--small ' + styles.isSmall]: size === SpinnerSize.small,
            ['ms-Spinner--medium ' + styles.isMedium]: size === SpinnerSize.medium,
            ['ms-Spinner--large ' + styles.isLarge]: size === SpinnerSize.large,
            ['ms-Spinner--normal ' + styles.isTypeMedium]: type === SpinnerType.normal, // TODO remove deprecated value at >= 2.0.0
            ['ms-Spinner--large ' + styles.isTypeLarge]: type === SpinnerType.large // TODO remove deprecated value at >= 2.0.0
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