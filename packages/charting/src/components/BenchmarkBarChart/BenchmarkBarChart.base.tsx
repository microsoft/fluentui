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
    const { chartTitle, benchmarkLabel, data, benchmarkData, totalData } = this.props.data;

    const dataRatio = Math.round((data / totalData) * 100);
    const benchmarkRatio = Math.round(((benchmarkData ? benchmarkData : 0) / totalData) * 100);

    let percentageContent = data + '/' + totalData;
    if (this.props.isPercentage) {
      percentageContent = dataRatio + '%';
    }

    let benchmarkAriaLabel = benchmarkLabel || '';
    benchmarkAriaLabel += benchmarkData;

    const benchmarkStyles: IStyle = {
      marginLeft: 'calc(' + benchmarkRatio + '% - 8px)'
    };

    const barChartColor = this.props.color || DefaultPalette.purple;
    const barHeight = this.props.height || 10;

    const { theme, width, benchmarkColor, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: width,
      benchmarkColor: benchmarkColor
    });

    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.chartHeader}>
          <FocusZone className={this._classNames.chartTitle}>
            <strong data-is-focusable={true}>{chartTitle}</strong>
          </FocusZone>
          <FocusZone className={this._classNames.percentage}>
            <strong data-is-focusable={true}>{percentageContent}</strong>
          </FocusZone>
        </div>
        <div className={this._classNames.chartBody}>
          <FocusZone>
            <div
              className={mergeStyles(this._classNames.triangle, benchmarkStyles)}
              hidden={this.props.hideBenchmark}
              aria-label={benchmarkAriaLabel}
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
