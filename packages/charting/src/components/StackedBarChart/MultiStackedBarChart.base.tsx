import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

import { Legend } from '../Legend/Legend';

import { IMultiStackedBarChartProps, IMultiStackedBarChartStyles } from './MultiStackedBarChart.types';
import { IDataPoint, ILegendDataItem } from './StackedBarChart.types';
import { StackedBarChart } from './StackedBarChart';

const getClassNames = classNamesFunction<{}, IMultiStackedBarChartStyles>();

export class MultiStackedBarChartBase extends React.Component<IMultiStackedBarChartProps, {}> {
  private _width: number;
  private _barHeight: number;
  private _renderLegend: boolean | undefined;
  private _blankBarColor: string;
  private _defaultPaletteColors: string[];
  private _classNames: IProcessedStyleSet<IMultiStackedBarChartStyles>;

  public render(): JSX.Element {
    const { data, chartTitles, legendData, theme } = this.props;

    this._adjustProps();

    return (
      <div className={this._classNames.root}>
        {data.map((points: IDataPoint[], index: number) => {
          const colors = this._getColorsForStackedBarChart(points);
          if (points.length === 0) {
            points.push({ x: '', y: 100 });
          }
          return (
            <div key={index} className={this._classNames.items}>
              <StackedBarChart
                barHeight={this._barHeight}
                width={this._width}
                theme={theme}
                chartTitle={chartTitles[index]}
                colors={colors}
                data={points}
                hideLegend={true}
                hideNumberDisplay={true}
              />
            </div>
          );
        })}
        {this._renderLegend && <Legend renderData={legendData!} />}
      </div>
    );
  }

  private _adjustProps = (): void => {
    const { theme, className, styles, width, barHeight, legendData } = this.props;
    const { palette } = theme!;

    this._width = width || 500;
    this._barHeight = barHeight || 16;
    this._renderLegend = legendData && legendData.length > 0;
    this._blankBarColor = palette.neutralTertiaryAlt;
    this._defaultPaletteColors = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this._width,
      className,
      barHeight: this._barHeight
    });
  };

  private _getColorsForStackedBarChart = (points: IDataPoint[]): string[] => {
    if (points.length === 0) {
      return [this._blankBarColor];
    }

    if (this._renderLegend === true) {
      const { legendData } = this.props;
      const paletteColorSize = this._defaultPaletteColors.length;
      return points.map((point: IDataPoint, index: number) => {
        const legendIdx = legendData!.findIndex((legendItem: ILegendDataItem) => legendItem.legendText === point.x);
        if (legendIdx > -1) {
          return legendData![legendIdx].legendColor;
        } else {
          return this._defaultPaletteColors[index % paletteColorSize];
        }
      });
    }

    return this._defaultPaletteColors;
  };
}
