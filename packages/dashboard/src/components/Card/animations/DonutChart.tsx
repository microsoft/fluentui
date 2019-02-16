import * as React from 'react';

import { getStyles, IDonutChartStyles } from './DonutChart.style';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface IDonutChartProps {}

const getClassNames = classNamesFunction<IDonutChartProps, IDonutChartStyles>();
const classNames = getClassNames(getStyles, {});

export class DonutChart extends React.Component<IDonutChartProps> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <svg className={classNames.donutChartLoading} viewBox="0 0 63 63">
        <circle className={classNames.donutChartLoadingBase} r="25%" cx="50%" cy="50%" />
        <circle className={classNames.donutChartCircleFirst} r="25%" cx="50%" cy="50%" />
        <circle className={classNames.donutChartCircleSecond} r="25%" cx="50%" cy="50%" />
      </svg>
    );
  }
}
