import * as React from 'react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { getStyles } from './DonutChart.style';

export interface IDonutChartProps {}

export class DonutChart extends React.Component<IDonutChartProps> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const donutChartLoadingClassName = mergeStyles(getStyles().donutChartLoading);
    const donutChartLoadingBaseClassName = mergeStyles(getStyles().donutChartLoadingBase, getStyles().donutChartLoadingSegment);
    const donutChartCircleFirstClassName = mergeStyles(
      getStyles().donutChartLoadingSegment,
      getStyles().donutChartLoadingSegmentFirst,
      getStyles().donutChartLoadingSegmentAnimation
    );
    const donutChartCircleSecondClassName = mergeStyles(
      getStyles().donutChartLoadingSegment,
      getStyles().donutChartLoadingSegmentSecond,
      getStyles().donutChartLoadingSegmentAnimation
    );
    return (
      <svg className={donutChartLoadingClassName} viewBox="0 0 63 63">
        <circle className={donutChartLoadingBaseClassName} r="25%" cx="50%" cy="50%" />
        <circle className={donutChartCircleFirstClassName} r="25%" cx="50%" cy="50%" />
        <circle className={donutChartCircleSecondClassName} r="25%" cx="50%" cy="50%" />
      </svg>
    );
  }
}
