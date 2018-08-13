import * as React from 'react';
import { ISpinnerProps, ISpinnerStyleProps, ISpinnerStyles, SpinnerType, SpinnerSize } from './Spinner.types';
import { BaseComponent, classNamesFunction, DelayedRender, getNativeProps, divProperties } from '../../Utilities';

const getClassNames = classNamesFunction<ISpinnerStyleProps, ISpinnerStyles>();

export class SpinnerBase extends BaseComponent<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    size: SpinnerSize.medium,
    ariaLive: 'polite'
  };

  public render() {
    const { type, size, ariaLabel, ariaLive, styles, label, theme, className } = this.props;
    const statusMessage = ariaLabel || label;
    const nativeProps = getNativeProps(this.props, divProperties, ['size']);

    // SpinnerType is deprecated. If someone is still using this property, rather than putting the SpinnerType into the ISpinnerStyleProps,
    // we'll map SpinnerType to its equivalent SpinnerSize and pass that in. Once SpinnerType finally goes away we should delete this.
    let styleSize = size;
    if (styleSize === undefined && type !== undefined) {
      styleSize = type === SpinnerType.large ? SpinnerSize.large : SpinnerSize.medium;
    }

    const classNames = getClassNames(styles!, {
      theme: theme!,
      size: styleSize,
      className
    });

    return (
      <div {...nativeProps} className={classNames.root}>
        <div className={classNames.circle} />
        {label && <div className={classNames.label}>{label}</div>}
        {statusMessage && (
          <div role="status" aria-live={ariaLive}>
            <DelayedRender>
              <div className={classNames.screenReaderText}>{statusMessage}</div>
            </DelayedRender>
          </div>
        )}
      </div>
    );
  }
}
