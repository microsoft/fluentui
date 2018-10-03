import * as React from 'react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { getStyles } from './BarGraph.style';

export interface IBarGraphProps {}

export class BarGraph extends React.Component<IBarGraphProps> {
  constructor(props: IBarGraphProps) {
    super(props);
  }

  public render(): JSX.Element {
    const barGraphLoadingClassName = mergeStyles(getStyles().barGraphLoading);
    const barGraphLoadingBarClassName = mergeStyles(getStyles().barGraphLoadingBar);
    const barGraphLoadingBarFirstClassName = mergeStyles(getStyles().barGraphLoadingBarFirst, getStyles().barGraphLoadingAnimatedSegment);
    const barGraphLoadingBarSecondClassName = mergeStyles(getStyles().barGraphLoadingBarSecond, getStyles().barGraphLoadingAnimatedSegment);

    return (
      <div className={barGraphLoadingClassName}>
        <div className={barGraphLoadingBarClassName}>
          <div className={barGraphLoadingBarFirstClassName} />
          <div className={barGraphLoadingBarSecondClassName} />
        </div>
        <div className={barGraphLoadingBarClassName}>
          <div className={barGraphLoadingBarFirstClassName} />
          <div className={barGraphLoadingBarSecondClassName} />
        </div>
        <div className={barGraphLoadingBarClassName}>
          <div className={barGraphLoadingBarFirstClassName} />
          <div className={barGraphLoadingBarSecondClassName} />
        </div>
        <div className={barGraphLoadingBarClassName}>
          <div className={barGraphLoadingBarFirstClassName} />
          <div className={barGraphLoadingBarSecondClassName} />
        </div>
      </div>
    );
  }
}
