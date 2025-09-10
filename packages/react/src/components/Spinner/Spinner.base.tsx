import * as React from 'react';
import { SpinnerType, SpinnerSize } from './Spinner.types';
import { classNamesFunction, DelayedRender, getNativeProps, divProperties } from '../../Utilities';
import type { ISpinnerProps, ISpinnerStyleProps, ISpinnerStyles } from './Spinner.types';

const getClassNames = classNamesFunction<ISpinnerStyleProps, ISpinnerStyles>();

export class SpinnerBase extends React.Component<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    size: SpinnerSize.medium,
    ariaLive: 'polite',
    labelPosition: 'bottom',
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const { type, size, ariaLabel, ariaLive, styles, label, theme, className, labelPosition } = this.props;
    const statusMessage = ariaLabel;
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties, ['size']);

    // SpinnerType is deprecated. If someone is still using this property, rather than putting the SpinnerType into the
    // ISpinnerStyleProps, we'll map SpinnerType to its equivalent SpinnerSize and pass that in. Once SpinnerType
    // finally goes away we should delete this.
    let styleSize = size;
    if (styleSize === undefined && type !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      styleSize = type === SpinnerType.large ? SpinnerSize.large : SpinnerSize.medium;
    }

    const classNames = getClassNames(styles!, {
      theme: theme!,
      size: styleSize,
      className,
      labelPosition,
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
