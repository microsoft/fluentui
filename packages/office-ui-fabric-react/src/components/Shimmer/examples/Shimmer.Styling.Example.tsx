import * as React from 'react';

import { Shimmer, IShimmerStyleProps, IShimmerStyles } from 'office-ui-fabric-react/lib/Shimmer';

import * as ShimmerExampleStyles from './Shimmer.Example.scss';

export class ShimmerStylingExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={ ShimmerExampleStyles.shimmerExampleContainer }>
        <Shimmer width={ '75%' } getStyles={ this._getShimmerStyles } />
        <Shimmer width={ '75%' } getStyles={ this._getShimmerStyles } />
        <Shimmer width={ '75%' } getStyles={ this._getShimmerStyles } />
        <Shimmer width={ '75%' } getStyles={ this._getShimmerStyles } />
        <Shimmer width={ '75%' } getStyles={ this._getShimmerStyles } />
      </div>
    );
  }

  private _getShimmerStyles = (props: IShimmerStyleProps): IShimmerStyles => {
    return {
      shimmerWrapper: [
        {
          backgroundColor: '#deecf9',
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #c7e0f4 50%, rgba(255, 255, 255, 0) 100%)'
        }
      ]
    };
  }
}
