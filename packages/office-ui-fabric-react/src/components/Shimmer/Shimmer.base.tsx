import * as React from 'react';
import { BaseComponent, classNamesFunction, DelayedRender, getNativeProps, divProperties } from '../../Utilities';
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

export class ShimmerBase extends BaseComponent<IShimmerProps, IShimmerState> {
  public static defaultProps: IShimmerProps = {
    isDataLoaded: false
  };

  private _classNames: { [key in keyof IShimmerStyles]: string };
  private _lastTimeoutId: number | undefined;

  constructor(props: IShimmerProps) {
    super(props);

    this.state = {
      contentLoaded: props.isDataLoaded
    };
  }

  public componentWillReceiveProps(nextProps: IShimmerProps): void {
    const { isDataLoaded } = nextProps;

    if (this._lastTimeoutId !== undefined) {
      this._async.clearTimeout(this._lastTimeoutId);
      this._lastTimeoutId = undefined;
    }
    if (isDataLoaded) {
      this._lastTimeoutId = this._async.setTimeout(() => {
        this.setState({
          contentLoaded: isDataLoaded
        });
        this._lastTimeoutId = undefined;
      }, TRANSITION_ANIMATION_INTERVAL);
    } else {
      this.setState({
        contentLoaded: isDataLoaded
      });
    }
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

    const divProps = getNativeProps(this.props, divProperties);

    return (
      <div {...divProps} className={this._classNames.root}>
        {!contentLoaded && (
          <div style={{ width: width ? width : '100%' }} className={this._classNames.shimmerWrapper}>
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
