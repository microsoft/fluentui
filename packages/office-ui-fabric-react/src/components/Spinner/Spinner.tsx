import * as React from 'react';
import { css } from '../../Utilities';
import { ISpinnerProps, SpinnerType } from './Spinner.Props';
import styles from './Spinner.scss';

export class Spinner extends React.Component<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    type: SpinnerType.normal
  };

  public render() {
    let { type, label, className } = this.props;

    return (
      <div className={ css('ms-Spinner', styles.root, className) }>
        <div className={ css('ms-Spinner-circle', styles.circle,
          {
            ['ms-Spinner--normal ' + styles.isNormal]: type === SpinnerType.normal,
            ['ms-Spinner--large ' + styles.isLarge]: type === SpinnerType.large
          })
        }>
        </div>
        { label && (
          <div className={ css('ms-Spinner-label', styles.label) }>{ label }</div>
        ) }
      </div>
    );
  }
}