import * as React from 'react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { getStyles, IBarGraphStyles } from './BarGraph.style';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface IBarGraphProps {}

const getClassNames = classNamesFunction<IBarGraphProps, IBarGraphStyles>();
const classNames = getClassNames(getStyles, {});

export class BarGraph extends React.Component<IBarGraphProps> {
  constructor(props: IBarGraphProps) {
    super(props);
  }

  public render(): JSX.Element {
    const barGraphLoadingBarFirstClassName = mergeStyles(getStyles().barGraphLoadingBarFirst, getStyles().barGraphLoadingAnimatedSegment);
    const barGraphLoadingBarSecondClassName = mergeStyles(getStyles().barGraphLoadingBarSecond, getStyles().barGraphLoadingAnimatedSegment);

    return (
      <div className={classNames.barGraphLoading}>
        <div className={classNames.barGraphLoadingBar}>
          <div className={barGraphLoadingBarFirstClassName} />
          <div className={barGraphLoadingBarSecondClassName} />
        </div>
        <div className={classNames.barGraphLoadingBar}>
          <div className={barGraphLoadingBarFirstClassName} />
          <div className={barGraphLoadingBarSecondClassName} />
        </div>
        <div className={classNames.barGraphLoadingBar}>
          <div className={barGraphLoadingBarFirstClassName} />
          <div className={barGraphLoadingBarSecondClassName} />
        </div>
        <div className={classNames.barGraphLoadingBar}>
          <div className={barGraphLoadingBarFirstClassName} />
          <div className={barGraphLoadingBarSecondClassName} />
        </div>
      </div>
    );
  }
}
