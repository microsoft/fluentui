import * as React from 'react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { getStyles, IDonutChartStyles } from './DonutChart.style';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface IDonutChartProps {}

export class DonutChart extends React.Component<IDonutChartProps> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IDonutChartProps, IDonutChartStyles>();
    const classNames = getClassNames(getStyles, {});

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
      <svg className={classNames.donutChartLoading} viewBox="0 0 63 63">
        <circle className={donutChartLoadingBaseClassName} r="25%" cx="50%" cy="50%" />
        <circle className={donutChartCircleFirstClassName} r="25%" cx="50%" cy="50%" />
        <circle className={donutChartCircleSecondClassName} r="25%" cx="50%" cy="50%" />
      </svg>
    );
  }
}
