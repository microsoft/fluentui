import * as React from 'react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { getStyles } from './Shimmer.style';

export interface IShimmerProps {}

export class Shimmer extends React.Component<IShimmerProps> {
  constructor(props: IShimmerProps) {
    super(props);
  }

  public render(): JSX.Element {
    const shimmerLoadingClassName = mergeStyles(getStyles().shimmerLoading);
    const shimmerLoadingBarClassName = mergeStyles(getStyles().shimmerLoadingBar);
    return (
      // tslint:disable: jsx-ban-props
      <svg className={shimmerLoadingClassName} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="shimmerLoadingGradient" gradientTransform="rotate(3)">
            <stop offset="0%" stopColor="#C2C2C2" />
            <stop offset="50%" stopColor="#DDDDDD" />
            <stop offset="100%" stopColor="#C2C2C2" />
          </linearGradient>

          <mask id="shimmerMask">
            <rect x="0" y="0" height="20%" width="100%" fill="white" />
            <rect x="0" y="40" height="20%" width="100%" fill="white" />
            <rect x="0" y="80" height="20%" width="100%" fill="white" />
          </mask>
        </defs>

        <rect height="100%" width="100%" fill="#C2C2C2" mask="url(#shimmerMask)" />
        <rect
          className={shimmerLoadingBarClassName}
          height="100%"
          width="100%"
          fill="url(#shimmerLoadingGradient)"
          mask="url(#shimmerMask)"
        />
      </svg>
    );
  }
}
