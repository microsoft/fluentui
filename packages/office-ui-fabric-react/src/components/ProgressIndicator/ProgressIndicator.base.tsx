import * as React from 'react';
import { BaseComponent, classNamesFunction, customizable } from '../../Utilities';
import {
  IProgressIndicatorProps,
  IProgressIndicatorStyleProps,
  IProgressIndicatorStyles
} from './ProgressIndicator.types';

const getClassNames = classNamesFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>();

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01;

export interface IProgressindicatorState {
  percentComplete?: number | undefined;
}

/**
 * ProgressIndicator with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
@customizable('ProgressIndicator', ['theme', 'styles'])
export class ProgressIndicatorBase extends BaseComponent<IProgressIndicatorProps, IProgressindicatorState> {
  public static defaultProps = {
    label: '',
    description: '',
    width: 180
  };

  constructor(props: IProgressIndicatorProps) {
    super(props);

    this._warnDeprecations({
      title: 'label'
    });

    this.state = {
      percentComplete: props.percentComplete
    };
  }

  public render() {
    const {
      barHeight,
      className,
      label = this.props.title, // Fall back to deprecated value.
      description,
      styles,
      theme,
      progressHidden,
      onRenderProgress = this._onRenderProgress
    } = this.props;

    const percentComplete =
      typeof this.props.percentComplete === 'number'
        ? Math.min(100, Math.max(0, this.props.percentComplete * 100))
        : undefined;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      barHeight,
      indeterminate: percentComplete === undefined ? true : false
    });

    return (
      <div className={classNames.root}>
        {label ? <div className={classNames.itemName}>{label}</div> : null}
        {!progressHidden
          ? onRenderProgress(
              {
                ...(this.props as IProgressIndicatorProps),
                percentComplete: percentComplete
              },
              this._onRenderProgress
            )
          : null}
        {description ? <div className={classNames.itemDescription}>{description}</div> : null}
      </div>
    );
  }

  private _onRenderProgress = (props: IProgressIndicatorProps): JSX.Element => {
    const { ariaValueText, barHeight, className, styles, theme } = this.props;

    const percentComplete =
      typeof this.props.percentComplete === 'number'
        ? Math.min(100, Math.max(0, this.props.percentComplete * 100))
        : undefined;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      barHeight,
      indeterminate: percentComplete === undefined ? true : false
    });

    const progressBarStyles = {
      width: percentComplete !== undefined ? percentComplete + '%' : undefined,
      transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined
    };

    const ariaValueMin = percentComplete !== undefined ? 0 : undefined;
    const ariaValueMax = percentComplete !== undefined ? 100 : undefined;
    const ariaValueNow = percentComplete !== undefined ? Math.floor(percentComplete!) : undefined;
    const percentCompleteAriaText = ariaValueText ? ariaValueText : this.state.percentComplete + '%';
    const indeterminateAriaText = ariaValueText ? ariaValueText : 'Working on it';

    return (
      <div className={classNames.itemProgress}>
        <div className={classNames.progressTrack} />
        <div
          className={classNames.progressBar}
          style={progressBarStyles}
          role="progressbar"
          aria-valuemin={ariaValueMin}
          aria-valuemax={ariaValueMax}
          aria-valuenow={ariaValueNow}
          aria-valuetext={ariaValueText}
        />
        {percentComplete ? (
          // aria-live is used in lieu of aria-valuenow to circumvent the need for tabbing to hear the screen reader
          <span
            aria-live="polite"
            aria-label={percentCompleteAriaText}
            // hidden
          >
            {/* { percentCompleteAriaText } */}
          </span>
        ) : (
          <span aria-live="polite" hidden>
            {indeterminateAriaText}
          </span>
        )}
      </div>
    );
  };

  public componentWillReceiveProps(nextProps: IProgressIndicatorProps): void {
    if (this.props !== nextProps) {
      if (typeof nextProps.percentComplete === 'number' && typeof this.props.percentComplete === 'number') {
        const nextPercentComplete = Math.min(100, Math.max(0, nextProps.percentComplete * 100));
        if (nextPercentComplete! - this.state.percentComplete! >= 10 || nextPercentComplete === 100) {
          // This throttles how often the screen reader updates so it can keep up with the progressbar.
          this.setState({
            percentComplete: Math.floor(nextPercentComplete)
          });
        }
      }
    }
  }
}
