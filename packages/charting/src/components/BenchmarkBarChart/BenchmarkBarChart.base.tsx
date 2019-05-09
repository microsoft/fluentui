import * as React from 'react';

import { mergeStyles, FocusZone } from 'office-ui-fabric-react';
import { IProcessedStyleSet, DefaultPalette, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { IBenchmarkBarChartProps, IBenchmarkBarChartStyleProps, IBenchmarkBarChartStyle } from './BenchmarkBarChart.types';

const getClassNames = classNamesFunction<IBenchmarkBarChartStyleProps, IBenchmarkBarChartStyle>();

export class BenchmarkBarChartBase extends React.Component<IBenchmarkBarChartProps> {
  private _classNames: IProcessedStyleSet<IBenchmarkBarChartStyle>;

  constructor(props: IBenchmarkBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { chartTitle, data, benchmarkData, totalData } = this.props.data;

    const dataRatio = Math.round((data / totalData) * 100);
    const benchmarkRatio = Math.round(((benchmarkData ? benchmarkData : 0) / totalData) * 100);

    let percentageContent = data + '/' + totalData;
    if (this.props.isPercentage) {
      percentageContent = dataRatio + '%';
    }

    const benchmarkStyles: IStyle = {
      marginLeft: 'calc(' + benchmarkRatio + '% - 8px)'
    };

    const barChartColor = this.props.color || DefaultPalette.purple;
    const barHeight = this.props.height || 10;

    const { width, benchmarkColor, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      width: width,
      benchmarkColor: benchmarkColor
    });

    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.chartHeader}>
          <FocusZone>
            <div className={this._classNames.chartTitle}>
              <strong data-is-focusable={true}>{chartTitle}</strong>
            </div>
          </FocusZone>
          <FocusZone>
            <div className={this._classNames.percentage}>
              <strong data-is-focusable={true}>{percentageContent}</strong>
            </div>
          </FocusZone>
        </div>
        <div className={this._classNames.chartBody}>
          <FocusZone>
            <div
              className={mergeStyles(this._classNames.triangle, benchmarkStyles)}
              hidden={this.props.hideBenchmark}
              aria-label={String(benchmarkData)}
              data-is-focusable={true}
            />
          </FocusZone>
          <svg className={this._classNames.barChart} height={barHeight}>
            <g>
              <rect x="0" y="0" width={dataRatio + '%'} height={barHeight} fill={barChartColor} />
              <rect x={dataRatio + '%'} y="0" width={100 - dataRatio + '%'} height={barHeight} fill={DefaultPalette.neutralTertiary} />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}
