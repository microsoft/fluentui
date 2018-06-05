import * as React from 'react';
import { BaseComponent, classNamesFunction, customizable, DelayedRender } from '../../Utilities';
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

@customizable('Shimmer', ['theme'])
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
      widthInPercentage,
      widthInPixel,
      className,
      customElementsGroup,
      theme,
      ariaLabel
    } = this.props;

    const { contentLoaded } = this.state;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      isDataLoaded,
      widthInPercentage,
      widthInPixel,
      className,
      transitionAnimationInterval: TRANSITION_ANIMATION_INTERVAL
    });

    return (
      <div className={this._classNames.root}>
        {!contentLoaded && (
          <div className={this._classNames.shimmerWrapper}>
            {customElementsGroup ? customElementsGroup : <ShimmerElementsGroup shimmerElements={shimmerElements} />}
          </div>
        )}
        {children && <div className={this._classNames.dataWrapper}>{children}</div>}
        {ariaLabel &&
          !isDataLoaded && (
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
