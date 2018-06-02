import * as React from 'react';

import { Shimmer, IShimmerStyleProps, IShimmerStyles } from '@uifabric/experiments/lib/Shimmer';

import './Shimmer.Example.scss';

export class ShimmerStylingExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="shimmerBasicExample-container">
        <Shimmer widthInPercentage={75} styles={this._getShimmerStyles} />
        <Shimmer widthInPercentage={75} styles={this._getShimmerStyles} />
        <Shimmer widthInPercentage={75} styles={this._getShimmerStyles} />
        <Shimmer widthInPercentage={75} styles={this._getShimmerStyles} />
        <Shimmer widthInPercentage={75} styles={this._getShimmerStyles} />
      </div>
    );
  }

  private _getShimmerStyles = (props: IShimmerStyleProps): IShimmerStyles => {
    return {
      shimmerWrapper: [
        {
          backgroundColor: '#deecf9',
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #c7e0f4 50%, rgba(255, 255, 255, 0) 100%)'
        }
      ]
    };
  };
}
