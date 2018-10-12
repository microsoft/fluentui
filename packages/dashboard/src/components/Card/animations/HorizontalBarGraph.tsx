import * as React from 'react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { getStyles, IHorizontalBarGraphStyles } from '../animations/HorizontalBarGraph.style';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface IHorizontalBarGraph {}

export class HorizontalBarGraph extends React.Component<IHorizontalBarGraph> {
  constructor(props: IHorizontalBarGraph) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IHorizontalBarGraph, IHorizontalBarGraphStyles>();
    const classNames = getClassNames(getStyles, {});

    const horizontalBarGraphLoadingBarFirstClassName = mergeStyles(
      getStyles().horizontalBarGraphLoadingBarFirst,
      getStyles().horizontalBarGraphLoadingAnimatedSegment
    );
    const horizontalBarGraphLoadingBarSecondClassName = mergeStyles(
      getStyles().horizontalBarGraphLoadingBarSecond,
      getStyles().horizontalBarGraphLoadingAnimatedSegment
    );
    return (
      <div className={classNames.horizontalBarGraphLoading}>
        <div className={classNames.horizontalBarGraphLoadingBar}>
          <div className={horizontalBarGraphLoadingBarFirstClassName} />
          <div className={horizontalBarGraphLoadingBarSecondClassName} />
        </div>
      </div>
    );
  }
}
