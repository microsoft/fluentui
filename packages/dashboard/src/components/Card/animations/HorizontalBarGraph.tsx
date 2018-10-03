import * as React from 'react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { getStyles } from '../animations/HorizontalBarGraph.style';

export interface IHorizontalBarGraph {}

export class HorizontalBarGraph extends React.Component<IHorizontalBarGraph> {
  constructor(props: IHorizontalBarGraph) {
    super(props);
  }

  public render(): JSX.Element {
    const horizontalBarGraphLoadingClassName = mergeStyles(getStyles().horizontalBarGraphLoading);
    const horizontalBarGraphLoadingBarClassName = mergeStyles(getStyles().horizontalBarGraphLoadingBar);
    const horizontalBarGraphLoadingBarFirstClassName = mergeStyles(
      getStyles().horizontalBarGraphLoadingBarFirst,
      getStyles().horizontalBarGraphLoadingAnimatedSegment
    );
    const horizontalBarGraphLoadingBarSecondClassName = mergeStyles(
      getStyles().horizontalBarGraphLoadingBarSecond,
      getStyles().horizontalBarGraphLoadingAnimatedSegment
    );
    return (
      <div className={horizontalBarGraphLoadingClassName}>
        <div className={horizontalBarGraphLoadingBarClassName}>
          <div className={horizontalBarGraphLoadingBarFirstClassName} />
          <div className={horizontalBarGraphLoadingBarSecondClassName} />
        </div>
      </div>
    );
  }
}
