import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { ILegend, Legends } from '../Legends/index';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { ILineChartProps, ILineChartStyleProps, ILineChartStyles, IDataPoint, ILineChartPoints } from './LineChart.types';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

const getClassNames = classNamesFunction<ILineChartStyleProps, ILineChartStyles>();

export class LineChartBase extends React.Component<
  ILineChartProps,
  {
    _width: number;
    _height: number;
    containerWidth: number;
    containerHeight: number;
    isCalloutVisible: boolean;
    hoverYValue: string | number | null;
    hoverXValue: string | number | null;
    activeLegend: string;
    lineColor: string;
    // tslint:disable-next-line:no-any
    refSelected: any;
    hoveredLineColor: string;
  }
> {
  private _points: ILineChartPoints[];
  private _classNames: IProcessedStyleSet<ILineChartStyles>;
  private xAxisElement: SVGElement | null;
  private yAxisElement: SVGElement | null;
  // tslint:disable-next-line:no-any
  private _xAxisScale: any = '';
  // tslint:disable-next-line:no-any
  private _yAxisScale: any = '';
  private _uniqLineText: string;
  private chartContainer: HTMLDivElement;
  // These margins are necessary for d3Scales to appear without cutting off
  private margins = { top: 20, right: 10, bottom: 35, left: 40 };
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      containerHeight: 0,
      containerWidth: 0,
      isCalloutVisible: false,
      hoverYValue: '',
      hoverXValue: '',
      activeLegend: '',
      lineColor: '',
      refSelected: '',
      hoveredLineColor: ''
    };
    this._points = this.props.data!.lineChartData || [];
    this._uniqLineText =
      '_line_' +
      Math.random()
        .toString(36)
        .substring(7);
    this._fitParentContainer = this._fitParentContainer.bind(this);
  }

  public componentDidMount(): void {
    this._fitParentContainer();
    window.addEventListener('resize', this._fitParentContainer);
  }

  public render(): JSX.Element {
    const { theme, className, styles } = this.props;
    const isNumeric = this._points[0].data[0] ? typeof this._points[0].data[0]!.x === 'number' : false;
    isNumeric ? this._createNumericXAxis() : this._createStringXAxis();
    this._createYAxis();
    const strokeWidth = this.props.strokeWidth ? this.props.strokeWidth : 4;
    const lines = this._createLines(strokeWidth);
    const legendBars = this._createLegends(this._points!);
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state._width,
      height: this.state._height,
      color: this.state.lineColor,
      className
    });

    const svgDimensions = {
      width: this.state.containerWidth ? this.state.containerWidth : 800,
      height: this.state.containerHeight ? this.state.containerHeight : 500
    };
    return (
      <div ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)} className={this._classNames.root}>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <g
            ref={(e: SVGElement | null) => {
              this.xAxisElement = e;
            }}
            transform={`translate(0, ${svgDimensions.height - 35})`}
            className={this._classNames.xAxis}
          />
          <g
            ref={(e: SVGElement | null) => {
              this.yAxisElement = e;
            }}
            transform={`translate(40, 0)`}
            className={this._classNames.yAxis}
          />
          <g>{lines}</g>
        </svg>
        <div className={this._classNames.legendContainer}>{legendBars}</div>
        {this.state.isCalloutVisible ? (
          <Callout target={this.state.refSelected} isBeakVisible={false} gapSpace={5} directionalHint={DirectionalHint.topAutoEdge}>
            <div className={this._classNames.calloutContentRoot}>
              <span className={this._classNames.calloutContentX}>{this.state.hoverXValue}</span>
              <span className={this._classNames.calloutContentY}>{this.state.hoverYValue}</span>
            </div>
          </Callout>
        ) : null}
      </div>
    );
  }

  private _fitParentContainer(): void {
    setTimeout(() => {
      const { containerWidth, containerHeight } = this.state;
      const currentContainerWidth = this.chartContainer.getBoundingClientRect().width;
      const currentContainerHeight = this.chartContainer.getBoundingClientRect().height;
      const shouldResize = containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight - 26
        });
      }
    }, 100);
  }

  private _createLegends(data: ILineChartPoints[]): JSX.Element {
    const legendDataItems = data.map((point: ILineChartPoints, index: number) => {
      const color: string = point.color;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          if (this.state.activeLegend !== point.legend || this.state.activeLegend === '') {
            this.setState({ activeLegend: point.legend });
          } else {
            this.setState({ activeLegend: point.legend });
          }
        },
        onMouseOutAction: () => {
          this.setState({ activeLegend: '' });
        },
        hoverAction: () => {
          this.setState({ activeLegend: point.legend });
        }
      };
      return legend;
    });
    const legends = <Legends legends={legendDataItems} />;
    return legends;
  }

  private _createNumericXAxis(): void {
    const xMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: IDataPoint) => {
        return item.x as number;
      });
    })!;
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([this.margins.left, this.state.containerWidth - this.margins.right]);
    this._xAxisScale = xAxisScale;
    const xAxis = d3AxisBottom(xAxisScale)
      .tickSize(10)
      .tickPadding(12)
      .ticks(7)
      .tickSizeOuter(0);
    if (this.xAxisElement) {
      d3Select(this.xAxisElement)
        .call(xAxis)
        .selectAll('text')
        .style('font', '10px Segoe UI semibold');
    }
  }

  private _prepareDatapoints(maxVal: number, splitInto: number, includeZero: boolean): number[] {
    const val = Math.ceil(maxVal / splitInto);
    const dataPointsArray: number[] = includeZero ? [0, val] : [val];
    while (dataPointsArray[dataPointsArray.length - 1] < maxVal) {
      dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] + val);
    }
    return dataPointsArray;
  }

  private _getXAxisValues(xAxisData: string[]): string[] {
    let tickValues: string[] = [];
    if (xAxisData.length <= 7) {
      tickValues = xAxisData;
    } else {
      tickValues.push(xAxisData[0]);
      const length = Math.ceil((xAxisData.length - 2) / 5);
      for (let i = length; i < xAxisData.length - 2; i += length) {
        tickValues.push(xAxisData[i]);
      }
      tickValues.push(xAxisData[xAxisData.length - 1]);
    }
    return tickValues;
  }

  private _createStringXAxis = () => {
    const xAxisData: string[] = [];
    this._points.map((singleLineChartData: ILineChartPoints) => {
      singleLineChartData.data.map((point: IDataPoint) => {
        xAxisData.push(point.x as string);
      });
    });
    const tickValues: string[] = this._getXAxisValues(xAxisData);
    const xAxisScale = d3ScaleBand()
      .padding(1)
      .domain(xAxisData)
      .range([this.margins.left, this.state.containerWidth - this.margins.right]);
    this._xAxisScale = xAxisScale;
    const xAxis = d3AxisBottom(xAxisScale)
      .tickSize(10)
      .tickPadding(12)
      .tickValues(tickValues)
      .tickSizeOuter(0);
    if (this.xAxisElement) {
      d3Select(this.xAxisElement)
        .call(xAxis)
        .selectAll('text')
        .style('font', '10px Segoe UI semibold');
    }
  };

  private _createYAxis = () => {
    const yMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: IDataPoint) => item.y);
    })!;
    const domainValues = this._prepareDatapoints(yMax, 4, true);
    const yAxisScale = d3ScaleLinear()
      .domain([0, domainValues[domainValues.length - 1]])
      .range([this.state.containerHeight - this.margins.bottom, this.margins.top]);
    this._yAxisScale = yAxisScale;
    const yAxis = d3AxisLeft(yAxisScale)
      .tickSize(-(this.state.containerWidth - this.margins.left - this.margins.right))
      .tickPadding(12)
      .tickValues(domainValues);
    this.yAxisElement
      ? d3Select(this.yAxisElement)
          .call(yAxis)
          .selectAll('text')
          .style('font', '10px Segoe UI semibold')
      : '';
  };

  private _createLines(strokeWidth: number): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      const lineColor: string = this._points[i].color;
      for (let j = 1; j < this._points[i].data.length; j++) {
        const keyVal = this._uniqLineText + i + '_' + j;
        const x1 = this._points[i].data[j - 1].x;
        const y1 = this._points[i].data[j - 1].y;
        if (this.state.activeLegend === legendVal || this.state.activeLegend === '') {
          lines.push(
            <line
              id={keyVal}
              key={keyVal}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(this._points[i].data[j].x)}
              y2={this._yAxisScale(this._points[i].data[j].y)}
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap={'round'}
              onMouseOver={this._handleHover.bind(this, x1, y1, lineColor)}
              onMouseMove={this._handleHover.bind(this, x1, y1, lineColor)}
              onMouseOut={this._handleMouseOut}
              opacity={1}
            />
          );
        } else {
          lines.push(
            <line
              id={keyVal}
              key={keyVal}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(this._points[i].data[j].x)}
              y2={this._yAxisScale(this._points[i].data[j].y)}
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={0.1}
            />
          );
        }
      }
    }
    return lines;
  }

  private _handleHover = (x: number | string, y: number | string, lineColor: string, mouseEvent: React.MouseEvent<SVGPathElement>) => {
    mouseEvent.persist();
    this.setState({
      isCalloutVisible: true,
      refSelected: mouseEvent,
      hoverXValue: x,
      hoverYValue: y,
      lineColor: lineColor
    });
  };

  private _handleMouseOut = () => {
    this.setState({
      isCalloutVisible: false
    });
  };
}
