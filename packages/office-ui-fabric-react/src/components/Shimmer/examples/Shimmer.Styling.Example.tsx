// @codepen

import * as React from 'react';
import { Shimmer, IShimmerStyleProps, IShimmerStyles } from 'office-ui-fabric-react/lib/Shimmer';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > *': {
      margin: '10px 0'
    }
  }
});

export class ShimmerStylingExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className={wrapperClass}>
        <Shimmer width="75%" styles={this._getShimmerStyles} />
        <Shimmer width="75%" styles={this._getShimmerStyles} />
        <Shimmer width="75%" styles={this._getShimmerStyles} />
        <Shimmer width="75%" styles={this._getShimmerStyles} />
        <Shimmer width="75%" styles={this._getShimmerStyles} />
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
