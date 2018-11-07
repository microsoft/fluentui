import * as React from 'react';

import { getStyles, ILineChartStyles } from './LineChart.style';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface ILineChartProps {}

const getClassNames = classNamesFunction<ILineChartProps, ILineChartStyles>();
const classNames = getClassNames(getStyles, {});

export class LineChart extends React.Component<ILineChartProps> {
  constructor(props: ILineChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <svg className={classNames.lineChartLoading} viewBox="0 0 172.5 118.5">
        <g>
          <path className={classNames.lineChartLoadingSegment} d="M26.5 46.3 L49.9 68.8 L71.5 58 L98.1 27.7 L123.5 50 L147.4 50" />
          <path className={classNames.lineChartLoadingSegmentFirst} d="M26.5 46.3 L49.9 68.8 L71.5 58 L98.1 27.7 L123.5 50 L147.4 50" />
        </g>
        <g>
          <path className={classNames.lineChartLoadingSegment} d="M23.6 61.9 L48.1 55.2 L72.9 37.1 L100 45.8 L124 70.8 L148.3 78" />
          <path className={classNames.lineChartLoadingSegmentSecond} d="M23.6 61.9 L48.1 55.2 L72.9 37.1 L100 45.8 L124 70.8 L148.3 78" />
        </g>
      </svg>
    );
  }
}
