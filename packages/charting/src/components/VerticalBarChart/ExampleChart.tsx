import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

import { IVerticalBarChartProps, IVerticalBarChartStyleProps, IVerticalBarChartStyles, IDataPoint } from './VerticalBarChart.types';

const getClassNames = classNamesFunction<IVerticalBarChartStyleProps, IVerticalBarChartStyles>();
type numericAxis = D3Axis<number | { valueOf(): number }>;
type stringAxis = D3Axis<string>;

const stringDataPoint = [
  {
    title: 'string Title Bar',
    x: 'strrr',
    chartData: [
      {
        name: 'redDelicious',
        data: 11
      },
      {
        name: 'mcintosh',
        data: 9
      },
      {
        name: 'oranges',
        data: 13
      },
      {
        name: 'pears',
        data: 4
      }
    ]
  },
  {
    title: 'string Title Bar',
    x: 'second',
    chartData: [
      {
        name: 'redDelicious',
        data: 8
      },
      {
        name: 'mcintosh',
        data: 25
      },
      {
        name: 'oranges',
        data: 13
      },
      {
        name: 'pears',
        data: 4
      }
    ]
  }
];

const numericData = [
  {
    title: 'Second Bar',
    x: 70,
    chartData: [
      {
        name: 'redDelicious',
        data: 11
      },
      {
        name: 'mcintosh',
        data: 9
      },
      {
        name: 'oranges',
        data: 13
      },
      {
        name: 'pears',
        data: 4
      }
    ]
  },
  {
    title: 'First Bar',
    x: 6,
    chartData: [
      {
        name: 'redDelicious',
        data: 30
        // position: 1 // for which one should be bottom
      },
      {
        name: 'mcintosh',
        data: 41
      },
      {
        name: 'oranges',
        data: 9
      },
      {
        name: 'pears',
        data: 6
      }
    ]
  },
  {
    title: 'First Bar',
    x: 50,
    chartData: [
      {
        name: 'redDelicious',
        data: 10
      },
      {
        name: 'mcintosh',
        data: 4
      },
      {
        name: 'oranges',
        data: 9
      },
      {
        name: 'pears',
        data: 6
      }
    ]
  },
  {
    title: 'Second Bar',
    x: 86,
    chartData: [
      {
        name: 'redDelicious',
        data: 2
      },
      {
        name: 'mcintosh',
        data: 18
      },
      {
        name: 'oranges',
        data: 19
      },
      {
        name: 'pears',
        data: 4
      }
    ]
  },
  {
    title: 'Second Bar',
    x: 100,
    chartData: [
      {
        name: 'redDelicious',
        data: 19
      },
      {
        name: 'mcintosh',
        data: 22
      },
      {
        name: 'oranges',
        data: 13
      },
      {
        name: 'pears',
        data: 4
      }
    ]
  }
];

const dataPoint = numericData;
const margin = { top: 35, bottom: 0, left: 35, right: 0 };
// const _width = 600 - margin.left - margin.right;
// const _height = 350 - margin.top - margin.bottom;
// const _width = 600;
// const _height = 350;
const _yAxisTickCount = 5;
// const _barWidth = 30;
const colors = ['#0000e6', '#6666ff', '#b30000', '#ff4d4d'];

export class ExampleChart extends React.Component<IVerticalBarChartProps, {}> {
  private _points: IDataPoint[];
  private _width: number;
  private _height: number;
  private _barWidth: number;
  private _yAxisTickCount: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IVerticalBarChartStyles>;

  public render(): JSX.Element {
    this._adjustProps();

    const dataset = this._createDataSetLayer();

    const isNumeric = dataset.length > 0 && typeof dataset[0].x === 'number';

    const xAxis = isNumeric ? this._createNumericXAxis(dataset) : this._createStringXAxis(dataset);
    const yAxis = this._createYAxis(dataset);
    const bars: JSX.Element[] = [];
    dataPoint.map((singleChart: any) => {
      const singleChartBar = isNumeric ? this._createBars(singleChart, dataset) : this._createStringBars(singleChart, dataset);
      bars.push(singleChartBar); // string bar issues
    });

    return (
      <div className={this._classNames.root}>
        <svg
          width={this._width + 50}
          height={this._height + 50}
          style={{ padding: 20, boxSizing: 'content-box', marginLeft: 35, marginRight: 0, marginTop: 35, marginBottom: 0 }}
        >
          {/** transform: (0, height-margin.bottom) X-axis*/}
          <g ref={(node: SVGGElement | null) => this._setXAxis(node, xAxis)} transform={`translate(35, ${this._height - margin.bottom})`} />
          {/**transform:  (margin.left, 0) Y-Axis*/}
          <g ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)} transform={`translate(${margin.left}, 0)`} />
          <g className={this._classNames.bars} transform={`translate(${margin.left}, 0)`}>
            {bars}
          </g>
        </svg>
      </div>
    );
  }

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._width = this.props.width || 600;
    this._height = this.props.height || 350;
    this._barWidth = this.props.barWidth || 30;
    this._yAxisTickCount = this.props.yAxisTickCount || 5;

    const { theme, className, styles } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this._width,
      height: this._height,
      className
    });
  }

  private _setXAxis(node: SVGGElement | null, xAxis: numericAxis | stringAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(xAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.xAxisDomain!);
    axisNode.selectAll('line').attr('class', this._classNames.xAxisTicks!);
    axisNode.selectAll('text').attr('class', this._classNames.xAxisText!);
  }

  private _setYAxis(node: SVGElement | null, yAxis: numericAxis): void {
    if (node === null) {
      return;
    }
    const axisNode = d3Select(node).call(yAxis);
    axisNode.selectAll('.domain').attr('class', this._classNames.yAxisDomain!);
    axisNode.selectAll('line').attr('class', this._classNames.yAxisTicks!);
    axisNode.selectAll('text').attr('class', this._classNames.yAxisText!);
  }

  private _createNumericXAxis(dataset: any): numericAxis {
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;
    const xMin = d3Min(dataset, (point: IDataPoint) => point.x as number)!;
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width]); // (margins.left, _width - margins.right)
    const xAxis = d3AxisBottom(xAxisScale)
      .ticks(10)
      .tickPadding(10);
    // .tickSizeInner(-2);
    return xAxis;
  }

  private _createStringXAxis(dataset: any): stringAxis {
    const xAxisScale = d3ScaleBand()
      .domain(dataset.map((point: IDataPoint) => point.x as string))
      .range([0, this._width]);
    const xAxis = d3AxisBottom(xAxisScale).tickFormat((x: string, index: number) => dataset[index].x as string);
    return xAxis;
  }

  private _createYAxis(dataset: any): numericAxis {
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;
    const yMin = d3Min(dataset, (point: IDataPoint) => point.y)!;
    const yAxisScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([this._height, 0]); // (_height-margin.bottom, margin.top)
    const yAxis = d3AxisLeft(yAxisScale)
      .ticks(5)
      .tickPadding(10);
    // .tickSizeInner(-6);
    return yAxis;
  }

  private _createDataSetLayer(): any {
    const dataset: any[] = [];

    dataPoint.map((singleChart: any) => {
      let total = 0;
      singleChart.chartData.forEach((point: any) => {
        total = total + point.data;
      });
      const singleChartData = {
        title: singleChart.title,
        y: total,
        x: singleChart.x
      };
      dataset.push(singleChartData);
    });
    return dataset;
  }

  private _createStringBars(singleChartData: any, dataset: any): any {
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;

    const endpointDistance = 0.5 * (this._width / dataset.length);
    const xBarScale = d3ScaleLinear()
      .domain([0, dataset.length - 1])
      .range([endpointDistance - 0.5 * this._barWidth, this._width - endpointDistance - 0.5 * this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    let total = 0;
    const bar = singleChartData.chartData.map((point: any, index: number) => {
      total = total + point.data;
      console.log(total, 'total,', point.data);
      return (
        <>
          <rect
            key={point.x}
            x={xBarScale(index)}
            y={this._height - yBarScale(total)}
            width={this._barWidth}
            height={yBarScale(point.data)}
            fill={colors[index]}
          />
        </>
      );
    });
    return bar;
  }

  private _createBars(singleChartData: any, dataset: any): any {
    const xMax = d3Max(dataset, (point: IDataPoint) => point.x as number)!;
    const yMax = d3Max(dataset, (point: IDataPoint) => point.y)!;

    const xBarScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([0, this._width - this._barWidth]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, this._height]);

    // const startingPoint: number[] = [];

    let total = 0;
    const bar = singleChartData.chartData.map((point: any, index: number) => {
      // startingPoint.push(total); // may be no need
      total = total + point.data;
      return (
        <>
          <rect
            key={index}
            x={xBarScale(singleChartData.x as number)}
            y={this._height - yBarScale(total)} // startingPoint[index]
            width={this._barWidth}
            height={yBarScale(point.data)}
            fill={colors[index]}
          />
          {/* <rect key={index} x={0} y={_height - 20} width={_barWidth} height={20} fill={'blue'} /> */}
        </>
      );
    });

    return bar;
  }
}
