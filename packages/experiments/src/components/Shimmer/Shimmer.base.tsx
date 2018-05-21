import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable
} from '../../Utilities';
import {
  IShimmerProps,
  IShimmerStyleProps,
  IShimmerStyles,
  IShimmerElement,
} from './Shimmer.types';
import { ShimmerElementsGroup } from './ShimmerElementsGroup';

export interface IShimmerState {
  contentLoaded?: boolean;
}

const ANIMATION_INTERVAL = 200; /* ms */

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

@customizable('Shimmer', ['theme'])
export class ShimmerBase extends BaseComponent<IShimmerProps, IShimmerState> {
  public static defaultProps: IShimmerProps = {
    isDataLoaded: false,
    isBaseStyle: false
  };

  private _classNames: { [key in keyof IShimmerStyles]: string };
  private _lastTimeoutId: number | undefined;

  constructor(props: IShimmerProps) {
    super(props);

    this.state = {
      contentLoaded: props.isDataLoaded
    };

    this._warnDeprecations({
      'isBaseStyle': 'customElementsGroup',
      'width': 'widthInPercentage or widthInPixel',
      'lineElements': 'shimmerElements'
    });

    this._warnMutuallyExclusive({
      'widthInPixel': 'widthInPercentage',
      'lineElements': 'shimmerElements',
      'customElementsGroup': 'lineElements'
    });
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
      }, ANIMATION_INTERVAL);
    } else {
      this.setState({
        contentLoaded: isDataLoaded
      });
    }
  }

  public render(): JSX.Element {
    const {
      getStyles,
      width,
      lineElements,
      shimmerElements,
      children,
      isDataLoaded,
      isBaseStyle,
      widthInPercentage,
      widthInPixel,
      className,
      customElementsGroup,
      theme
    } = this.props;

    const { contentLoaded } = this.state;

    // lineElements is a deprecated prop so need to check which one was used.
    const elements: IShimmerElement[] | undefined = shimmerElements || lineElements;

    this._classNames = getClassNames(getStyles!, {
      theme: theme!,
      width,
      isDataLoaded,
      widthInPercentage,
      widthInPixel,
      className,
      contentLoaded
    });

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.shimmerWrapper }>
          { isBaseStyle ? children : // isBaseStyle prop is deprecated and this check needs to be removed in the future
            customElementsGroup ? customElementsGroup :
              <ShimmerElementsGroup
                shimmerElements={ elements }
              />
          }
        </div>
        { !isBaseStyle && // same in here... this check needs to be removed in the future
          <div className={ this._classNames.dataWrapper }>
            { children ? children : null }
          </div>
        }
      </div>
    );
  }
}