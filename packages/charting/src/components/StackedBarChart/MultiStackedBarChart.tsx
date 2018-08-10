import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

import { Legend } from '../Legend/Legend';

import { IMultiStackedBarChartProps, IMultiStackedBarChartStyles } from './MultiStackedBarChart.types';
import { IDataPoint, ILegendDataItem } from './StackedBarChart.types';
import { StackedBarChart } from './StackedBarChart';
import { getMultiStackedBarChartStyles } from './MultiStackedBarChart.styles';

export class MultiStackedBarChart extends React.Component<IMultiStackedBarChartProps, {}> {
  private _classNames: IProcessedStyleSet<IMultiStackedBarChartStyles>;
  constructor(props: IMultiStackedBarChartProps) {
    super(props);

    const getClassNames = classNamesFunction<{}, IMultiStackedBarChartStyles>();
    this._classNames = getClassNames(() => getMultiStackedBarChartStyles(props.width));
  }

  public render(): JSX.Element {
    const { data, chartTitles, legendData, width, barHeight } = this.props;

    return (
      <div className={this._classNames.root}>
        {data.map((value: IDataPoint[], index: number) => {
          let colors: string[] | undefined = [];
          const points: IDataPoint[] = value;

          /**
           *  If the data point array is empty
           *  render a default blank bar
           */
          if (value.length === 0) {
            colors = ['#C2C2C2'];
            points.push({ x: '', y: 100 });
          } else if (legendData && legendData.length > 0) {
            /**
             * Try to get the color for each data point from legendData
             * if atleast one color mapping is missing , we fallback to default colors.
             */
            for (let i = 0; i < legendData.length; i++) {
              const itemIdx = legendData.findIndex((item: ILegendDataItem) => item.legendText === value[i].x);
              if (itemIdx > -1) {
                colors!.push(legendData[itemIdx].legendColor);
              } else {
                colors = undefined;
                break;
              }
            }
          }

          return (
            <div key={index} className={this._classNames.items}>
              <StackedBarChart
                barHeight={barHeight}
                width={width}
                chartTitle={chartTitles[index]}
                colors={colors}
                data={points}
                hideLegend={true}
                hideNumberDisplay={true}
              />
            </div>
          );
        })}
        <Legend renderData={legendData!} />
      </div>
    );
  }
}
