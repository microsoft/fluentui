import * as React from 'react';
import { classNamesFunction, DelayedRender, getNativeProps, divProperties, Async, initializeComponentRef } from '../../Utilities';
import { IShimmerProps, IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import { ShimmerElementsGroup } from './ShimmerElementsGroup/ShimmerElementsGroup';

export interface IShimmerState {
  /**
   * Flag for knowing when to remove the shimmerWrapper from the DOM.
   */
  contentLoaded?: boolean;
}

const TRANSITION_ANIMATION_INTERVAL = 200; /* ms */

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

/**
 * {@docCategory Shimmer}
 */
export class ShimmerBase extends React.Component<IShimmerProps, IShimmerState> {
  public static defaultProps: IShimmerProps = {
    isDataLoaded: false
  };

  private _classNames: { [key in keyof IShimmerStyles]: string };
  private _lastTimeoutId: number;
  private _async: Async;

  constructor(props: IShimmerProps) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      contentLoaded: props.isDataLoaded
    };

    this._async = new Async(this);
  }

  public componentDidUpdate(prevProps: IShimmerProps): void {
    const { isDataLoaded } = this.props;

    if (isDataLoaded !== prevProps.isDataLoaded) {
      this._async.clearTimeout(this._lastTimeoutId);

      // Removing the shimmerWrapper div from the DOM only after the fade out animation completed.
      if (isDataLoaded) {
        this._lastTimeoutId = this._async.setTimeout(() => {
          this.setState({
            contentLoaded: isDataLoaded
          });
        }, TRANSITION_ANIMATION_INTERVAL);
      } else {
        this.setState({
          contentLoaded: isDataLoaded
        });
      }
    }
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const {
      styles,
      shimmerElements,
      children,
      isDataLoaded,
      width,
      className,
      customElementsGroup,
      theme,
      ariaLabel,
      shimmerColors
    } = this.props;

    const { contentLoaded } = this.state;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      isDataLoaded,
      className,
      transitionAnimationInterval: TRANSITION_ANIMATION_INTERVAL,
      shimmerColor: shimmerColors && shimmerColors.shimmer,
      shimmerWaveColor: shimmerColors && shimmerColors.shimmerWave
    });

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    return (
      <div {...divProps} className={this._classNames.root}>
        {!contentLoaded && (
          <div style={{ width: width ? width : '100%' }} className={this._classNames.shimmerWrapper}>
            <div className={this._classNames.shimmerGradient} />
            {customElementsGroup ? (
              customElementsGroup
            ) : (
              <ShimmerElementsGroup shimmerElements={shimmerElements} backgroundColor={shimmerColors && shimmerColors.background} />
            )}
          </div>
        )}
        {children && <div className={this._classNames.dataWrapper}>{children}</div>}
        {ariaLabel && !isDataLoaded && (
          <div role="status" aria-live="polite">
            <DelayedRender>
              <div className={this._classNames.screenReaderText}>{ariaLabel}</div>
            </DelayedRender>
          </div>
        )}
      </div>
    );
  }
}
