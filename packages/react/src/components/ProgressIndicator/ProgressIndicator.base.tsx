import * as React from 'react';
import { classNamesFunction, getId } from '../../Utilities';
import type {
  IProgressIndicatorProps,
  IProgressIndicatorStyleProps,
  IProgressIndicatorStyles,
} from './ProgressIndicator.types';

const getClassNames = classNamesFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>();

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01;

/**
 * ProgressIndicator with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/microsoft/fluentui/wiki/Styling)
 */
export class ProgressIndicatorBase extends React.Component<IProgressIndicatorProps, {}> {
  public static defaultProps = {
    label: '',
    description: '',
    width: 180,
  };

  private _labelId: string;
  private _descriptionId: string;

  constructor(props: IProgressIndicatorProps) {
    super(props);

    const id = getId('progress-indicator');
    this._labelId = id + '-label';
    this._descriptionId = id + '-description';
  }

  public render() {
    const {
      barHeight,
      className,
      // eslint-disable-next-line deprecation/deprecation
      label = this.props.title, // Fall back to deprecated value.
      description,
      styles,
      theme,
      progressHidden,
      onRenderProgress = this._onRenderProgress,
    } = this.props;

    const percentComplete =
      typeof this.props.percentComplete === 'number'
        ? Math.min(100, Math.max(0, this.props.percentComplete * 100))
        : undefined;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      barHeight,
      indeterminate: percentComplete === undefined ? true : false,
    });

    return (
      <div className={classNames.root}>
        {label ? (
          <div id={this._labelId} className={classNames.itemName}>
            {label}
          </div>
        ) : null}
        {!progressHidden
          ? onRenderProgress(
              {
                ...(this.props as IProgressIndicatorProps),
                percentComplete: percentComplete,
              },
              this._onRenderProgress,
            )
          : null}
        {description ? (
          <div id={this._descriptionId} className={classNames.itemDescription}>
            {description}
          </div>
        ) : null}
      </div>
    );
  }

  private _onRenderProgress = (props: IProgressIndicatorProps): JSX.Element => {
    const {
      ariaLabel,
      ariaValueText,
      barHeight,
      className,
      description,
      // eslint-disable-next-line deprecation/deprecation
      label = this.props.title,
      styles,
      theme,
    } = this.props;

    const percentComplete =
      typeof this.props.percentComplete === 'number'
        ? Math.min(100, Math.max(0, this.props.percentComplete * 100))
        : undefined;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      barHeight,
      indeterminate: percentComplete === undefined ? true : false,
    });

    const progressBarStyles = {
      width: percentComplete !== undefined ? percentComplete + '%' : undefined,
      transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined,
    };

    const ariaValueMin = percentComplete !== undefined ? 0 : undefined;
    const ariaValueMax = percentComplete !== undefined ? 100 : undefined;
    const ariaValueNow = percentComplete !== undefined ? Math.floor(percentComplete!) : undefined;

    return (
      <div className={classNames.itemProgress}>
        <div className={classNames.progressTrack} />
        <div
          className={classNames.progressBar}
          style={progressBarStyles}
          role="progressbar"
          aria-describedby={description ? this._descriptionId : undefined}
          aria-label={ariaLabel}
          aria-labelledby={label ? this._labelId : undefined}
          aria-valuemin={ariaValueMin}
          aria-valuemax={ariaValueMax}
          aria-valuenow={ariaValueNow}
          aria-valuetext={ariaValueText}
        />
      </div>
    );
  };
}
