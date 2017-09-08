import * as React from 'react';
import { BaseComponent, css, DelayedRender } from '../../Utilities';
import { ISpinnerProps, SpinnerType, SpinnerSize } from './Spinner.Props';
import * as stylesImport from './Spinner.scss';
const styles: any = stylesImport;

export class Spinner extends BaseComponent<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    size: SpinnerSize.medium,
    ariaLive: 'polite'
  };

  public render() {
    let { type, size, label, className, ariaLive, ariaLabel } = this.props; // TODO remove deprecated type property at >= 2.0.0
    const statusMessage = ariaLabel || label;

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
        {
          label && <div className={ css('ms-Spinner-label', styles.label) }>{ label }</div>
        }
        {
          statusMessage &&
          <div role='status' aria-live={ this.props.ariaLive }>
            <DelayedRender>
              <div className={ styles.screenReaderOnly }>{ statusMessage }</div>
            </DelayedRender>
          </div>
        }
      </div>
    );
  }
}