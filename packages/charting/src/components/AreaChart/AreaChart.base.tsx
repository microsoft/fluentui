import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { area as d3Area, stack as d3Stack, curveMonotoneX as d3CurveBasis } from 'd3-shape';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { IAreaChartProps, IAreaChartStyleProps, IAreaChartStyles } from './AreaChart.types';

import { IAreaChartDataSetPoint, ILineChartDataPoint, ILineChartPoints } from '../../types/index';

import { createNumericXAxis, createDateXAxis, createYAxis } from '../../utilities/index';

const getClassNames = classNamesFunction<IAreaChartStyleProps, IAreaChartStyles>();

export interface IAreaChartState {
  _width: number;
  _height: number;
  containerWidth: number;
  containerHeight: number;
}

export class AreaChartBase extends React.Component<IAreaChartProps, IAreaChartState> {
  private _points: ILineChartPoints[];
  private _classNames: IProcessedStyleSet<IAreaChartStyles>;
  private _reqID: number;
  // tslint:disable-next-line:no-any
  private dataSet: any;
  private _colors: string[];
  private _keys: string[];
  private _yAxisTickCount: number;
  private _isGraphDraw: boolean = true;
  private _showXAxisPath: boolean;
  private _showYAxisPath: boolean;
  private xAxisElement: SVGElement | null;
  private yAxisElement: SVGElement | null;
  // tslint:disable-next-line:no-any
  private _yAxisTickFormat: any;
  private chartContainer: HTMLDivElement;
  // These margins are necessary for d3Scales to appear without cutting off
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };

  public constructor(props: IAreaChartProps) {
    super(props);
    this.state = {
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      containerHeight: 0,
      containerWidth: 0,
    };
  }

  public componentDidMount(): void {
    this._fitParentContainer();
  }

  public componentDidUpdate(prevProps: IAreaChartProps): void {
    if (this._isGraphDraw) {
      this._drawGraph();
      this._isGraphDraw = false;
    }
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this._fitParentContainer();
      this._drawGraph();
    }
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
    d3Select('#firstGElementForChart').remove();
  }

  public render(): JSX.Element {
    const { theme, className, styles, tickValues, tickFormat, isXAxisDateType } = this.props;

    if (this.props.parentRef) {
      this._fitParentContainer();
    }

    this._adjustProps();
    this.dataSet = this._createDataSet();
    const XAxisParams = {
      margins: this.margins,
      containerWidth: this.state.containerWidth,
      xAxisElement: this.xAxisElement!,
    };
    const tickParams = {
      tickValues: tickValues,
      tickFormat: tickFormat,
    };
    isXAxisDateType
      ? createDateXAxis(this._points, XAxisParams, tickParams)
      : createNumericXAxis(this._points, XAxisParams);
    this._keys = this._createKeys();

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state._width,
      height: this.state._height,
      showXAxisPath: this._showXAxisPath,
      showYAxisPath: this._showYAxisPath,
      className,
    });

    const svgDimensions = {
      width: this.state.containerWidth,
      height: this.state.containerHeight,
    };

    return (
      <div
        id="d3AreaChart"
        className={this._classNames.root}
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
      >
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <g
            ref={(e: SVGElement | null) => {
              this.xAxisElement = e;
            }}
            id="xAxisGElement"
            transform={`translate(0, ${svgDimensions.height - 35})`}
            className={this._classNames.xAxis}
          />
          <g
            ref={(e: SVGElement | null) => {
              this.yAxisElement = e;
            }}
            id="yAxisGElement"
            transform={`translate(40, 0)`}
            className={this._classNames.yAxis}
          />
          <g id="graphGElement" />
        </svg>
      </div>
    );
  }

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;

    this._reqID = requestAnimationFrame(() => {
      const legendContainerHeight = 32;
      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight =
        container.getBoundingClientRect().height > legendContainerHeight
          ? container.getBoundingClientRect().height
          : 350;
      const shouldResize =
        containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight - legendContainerHeight,
        });
      }
    });
  }

  private _adjustProps(): void {
    this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
    this._yAxisTickCount = this.props.yAxisTickCount || 4;
    this._showXAxisPath = this.props.showXAxisPath || false;
    this._showYAxisPath = this.props.showYAxisPath || false;
    this._yAxisTickFormat = this.props.yAxisTickFormat;
  }

  private _createDataSet = () => {
    let allChartPoints: ILineChartDataPoint[] = [];
    const dataSet: IAreaChartDataSetPoint[] = [];
    this._points.length &&
      this._points.map((singleChartPoint: ILineChartPoints) => {
        allChartPoints = [...allChartPoints, ...singleChartPoint.data];
      });

    let tempArr = allChartPoints;
    while (tempArr.length) {
      const valToCheck = tempArr[0].x;
      const filteredChartPoints: ILineChartDataPoint[] = tempArr.filter(
        (point: ILineChartDataPoint) => point.x === valToCheck,
      );

      // tslint:disable-next-line:no-any
      const singleDataset: any = {};
      filteredChartPoints.map((singleDataPoint: ILineChartDataPoint, index: number) => {
        singleDataset.xVal = singleDataPoint.x;
        singleDataset[`chart${index}`] = singleDataPoint.y;
      });
      dataSet.push(singleDataset);

      const val = tempArr[0].x; // removing compared objects from array
      tempArr = tempArr.filter((point: ILineChartDataPoint) => point.x !== val);
    }
    return dataSet;
  };

  private _getColors = (): string[] => {
    return this._points.map((singlePoint: ILineChartPoints) => singlePoint.color);
  };

  private _createKeys = (): string[] => {
    const keysLength: number = Object.keys(this.dataSet[0]).length;
    const keys: string[] = [];
    for (let i = 0; i < keysLength - 1; i++) {
      const keyVal = `chart${i}`;
      keys.push(keyVal);
    }
    return keys;
  };

  private _drawGraph = (): void => {
    d3Select('#firstGElementForChart').remove();
    const chartContainer = d3Select('#graphGElement')
      .append('g')
      .attr('id', 'firstGElementForChart');

    this._colors = this._getColors();
    const stackedValues = d3Stack().keys(this._keys)(this.dataSet);

    // tslint:disable-next-line:no-any
    const stackedData: any[] = [];
    // tslint:disable-next-line:no-any
    stackedValues.forEach((layer: any) => {
      const currentStack: IAreaChartDataSetPoint[] = [];
      // tslint:disable-next-line: no-any
      layer.forEach((d: any) => {
        currentStack.push({
          values: d,
          xVal: d.data.xVal,
        });
      });
      stackedData.push(currentStack);
    });
    const maxOfYVal = d3Max(stackedValues[stackedValues.length - 1], dp => dp[1])!;

    const xMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: ILineChartDataPoint) => item.x as number);
    })!;

    const xMin = d3Min(this._points, (point: ILineChartPoints) => {
      return d3Min(point.data, (item: ILineChartDataPoint) => item.x);
    })!;
    const { yMaxValue = 0, yMinValue = 0 } = this.props;
    const yAxisParams = {
      margins: this.margins,
      containerWidth: this.state.containerWidth,
      containerHeight: this.state.containerHeight,
      yAxisTickFormat: this._yAxisTickFormat,
      yMaxValue: yMaxValue,
      yMinValue: yMinValue,
      yAxisElement: this.yAxisElement,
      yAxisTickCount: this._yAxisTickCount,
    };

    createYAxis(this._points, yAxisParams);

    const xScale = d3ScaleLinear()
      .range([this.margins.left, this.state.containerWidth - this.margins.right])
      .domain([xMin, xMax]);

    const yScale = d3ScaleLinear()
      .range([this.state.containerHeight - this.margins.bottom, this.margins.top])
      .domain([0, maxOfYVal]);

    const area = d3Area()
      // tslint:disable-next-line:no-any
      .x((d: any) => xScale(d.xVal))
      // tslint:disable-next-line:no-any
      .y0((d: any) => yScale(d.values[0]))
      // tslint:disable-next-line:no-any
      .y1((d: any) => yScale(d.values[1]))
      .curve(d3CurveBasis);

    const series = chartContainer
      .selectAll('.series')
      .data(stackedData)
      .enter()
      .append('g');

    series
      .append('path')
      .style('fill', (d: string, i: number) => this._colors[i])
      .attr('d', area);
  };
}
