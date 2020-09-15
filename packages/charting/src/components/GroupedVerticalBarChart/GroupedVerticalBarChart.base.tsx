import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { axisRight as d3AxisRight, axisLeft as d3AxisLeft, axisBottom as d3AxisBottom, Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { format as d3Format } from 'd3-format';
import { classNamesFunction, getId, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { ILegend, Legends } from '../Legends/index';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { createWrapOfXLabels, tooltipOfXAxislabels } from '../../utilities/index';
import {
  IGroupedVerticalBarChartProps,
  IGroupedVerticalBarChartStyleProps,
  IGroupedVerticalBarChartStyles,
} from './GroupedVerticalBarChart.types';
import {
  IGroupedVerticalBarChartData,
  IGVDataPoint,
  IGVForBarChart,
  IGVSingleDataPoint,
  IGVBarChartSeriesPoint,
} from '../../types/index';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/index';

const getClassNames = classNamesFunction<IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles>();
type StringAxis = D3Axis<string>;
type NumericAxis = D3Axis<number | { valueOf(): number }>;

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}

export interface IGroupedVerticalBarChartState {
  color: string;
  containerWidth: number;
  containerHeight: number;
  dataForHoverCard: number;
  isCalloutVisible: boolean;
  isLegendSelected: boolean;
  isLegendHovered: boolean;
  titleForHoverCard: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected: any;
  xCalloutValue?: string;
  yCalloutValue?: string;
  _width?: number;
  _height?: number;
}

export class GroupedVerticalBarChartBase extends React.Component<
  IGroupedVerticalBarChartProps,
  IGroupedVerticalBarChartState
> {
  private _points: IGroupedVerticalBarChartData[];
  private _yAxisTickCount: number;
  private _xAxisLabels: string[];
  private _barWidth: number;
  private _groupPadding: number = 16;
  private _showXAxisGridLines: boolean;
  private _showYAxisGridLines: boolean;
  private _showXAxisPath: boolean;
  private _showYAxisPath: boolean;
  private _classNames: IProcessedStyleSet<IGroupedVerticalBarChartStyles>;
  private _refArray: IRefArrayData[];
  private _reqID: number;
  private _calloutId: string;
  private _tooltipId: string;
  private _yMax: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _datasetForBars: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xScale0: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xScale1: any;
  private _uniqLineText: string;
  private _dataset: IGVDataPoint[];
  private _keys: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxis: any;
  private _xAxisTickPadding: number;
  private _removalValue: number = 0;
  private _isGraphDraw: boolean = true;
  private legendContainer: HTMLDivElement;
  private chartContainer: HTMLDivElement;
  private minLegendContainerHeight: number = 32;
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };
  private _isRtl: boolean = getRTL();

  public constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this.state = {
      containerWidth: 0,
      containerHeight: 0,
      color: '',
      dataForHoverCard: 0,
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      refSelected: null,
      titleForHoverCard: '',
      xCalloutValue: '',
      yCalloutValue: '',
      _width: this.props.width || 600,
      _height: this.props.height || 350,
    };
    this._refArray = [];
    this._calloutId = getId('callout');
    this._adjustProps();
    this._uniqLineText = getId('GroupedVerticalChart_');
    this._tooltipId = getId('GVBCTooltipId_');
  }

  public componentDidMount(): void {
    this._fitParentContainer(true);
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
    d3Select('#firstGElementForBars').remove();
  }

  public componentDidUpdate(prevProps: IGroupedVerticalBarChartProps): void {
    if (this._isGraphDraw || prevProps.data !== this.props.data) {
      this._drawGraph();
      this._isGraphDraw = false;
    }
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this._fitParentContainer();
      this._drawGraph();
      this._isGraphDraw = false;
    }
  }

  public render(): React.ReactNode {
    this._adjustProps();
    const { theme, className, styles } = this.props;

    if (this.props.parentRef) {
      this._fitParentContainer();
    }

    this._xAxisLabels = this._createXAxisProperties();
    this._datasetForBars = this._createDataset();
    this._xScale0 = this._createX0Scale(this._xAxisLabels);
    this._xScale1 = this._createX1Scale(this._xScale0);
    const x0Axis = this._createx0Axis(this._xScale0);
    const yAxis: NumericAxis = this._createYAxis(this._dataset);
    const legends: JSX.Element = this._getLegendData(this.props.theme!.palette);

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      legendColor: this.state.color,
      showXAxisPath: this._showXAxisPath,
      showYAxisPath: this._showYAxisPath,
      href: this.props.href,
      width: this.state._width,
      height: this.state._height,
      isRtl: this._isRtl,
    });

    const svgDimensions = {
      width: this.state.containerWidth || 600,
      height: this.state.containerHeight || 350,
    };
    return (
      <div
        id={`d3GroupedChart_${this._uniqLineText}`}
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
        className={this._classNames.root}
      >
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <svg
            width={svgDimensions.width}
            height={svgDimensions.height}
            id={this._uniqLineText}
            style={{ display: 'block' }}
          >
            <g
              id="xAxisGElement"
              ref={(node: SVGGElement | null) => this._setXAxis(node, x0Axis)}
              className={this._classNames.xAxis}
              transform={`translate(0, ${svgDimensions.height - 35 - this._removalValue})`}
            />
            <g
              id="yAxisGElement"
              ref={(node: SVGGElement | null) => this._setYAxis(node, yAxis)}
              className={this._classNames.yAxis}
              transform={`translate(${this._isRtl ? svgDimensions.width - this.margins.right - 10 : 40}, 0)`}
            />
            <g id={`barGElement_${this._uniqLineText}`} className="barGElement" />
          </svg>
        </FocusZone>
        <div
          ref={(e: HTMLDivElement) => (this.legendContainer = e)}
          id={this._uniqLineText}
          className={this._classNames.legendContainer}
        >
          {legends}
        </div>
        <Callout
          target={this.state.refSelected}
          gapSpace={10}
          isBeakVisible={false}
          setInitialFocus={true}
          hidden={!(!this.props.hideTooltip && this.state.isCalloutVisible)}
          directionalHint={DirectionalHint.topRightEdge}
          id={this._calloutId}
        >
          <ChartHoverCard
            XValue={this.state.xCalloutValue}
            Legend={this.state.titleForHoverCard}
            YValue={this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard}
            color={this.state.color}
          />
        </Callout>
      </div>
    );
  }

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._yAxisTickCount = this.props.yAxisTickCount || 5;
    this._showXAxisGridLines = this.props.showXAxisGridLines || false;
    this._showYAxisGridLines = this.props.showYAxisGridLines || false;
    this._showXAxisPath = this.props.showXAxisPath || false;
    this._showYAxisPath = this.props.showYAxisPath || false;
    this._barWidth = this.props.barwidth!;
    this._xAxisTickPadding = this.props.xAxisTickPadding || 4;
  }

  private _fitParentContainer(calledFromDidMount?: boolean): void {
    const { containerWidth, containerHeight } = this.state;
    this._reqID = requestAnimationFrame(() => {
      const legendContainerComputedStyles = getComputedStyle(this.legendContainer);
      const legendContainerHeight =
        (this.legendContainer.getBoundingClientRect().height || this.minLegendContainerHeight) +
        parseFloat(legendContainerComputedStyles.marginTop || '0') +
        parseFloat(legendContainerComputedStyles.marginBottom || '0');
      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight =
        container.getBoundingClientRect().height > legendContainerHeight
          ? container.getBoundingClientRect().height
          : 350;
      const shouldResize =
        containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight;
      if (shouldResize) {
        this.setState(
          {
            containerWidth: currentContainerWidth,
            containerHeight: currentContainerHeight - legendContainerHeight,
          },
          () => {
            if (calledFromDidMount) {
              this._drawGraph();
            }
          },
        );
      }
    });
  }

  private _getOpacity = (legendTitle: string) => {
    let shouldHighlight = true;
    if (this.state.isLegendHovered || this.state.isLegendSelected) {
      shouldHighlight = this.state.titleForHoverCard === legendTitle;
    }
    return shouldHighlight ? '' : '0.1';
  };

  private _onBarHover = (
    target: SVGRectElement,
    color: string,
    data: number,
    legendTitle: string,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
  ): void => {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.titleForHoverCard === legendTitle)
    ) {
      this.setState({
        refSelected: target,
        isCalloutVisible: true,
        titleForHoverCard: legendTitle,
        dataForHoverCard: data,
        color: color,
        xCalloutValue: xAxisCalloutData,
        yCalloutValue: yAxisCalloutData,
      });
    }
  };

  private _mouseAction = (
    type: string,
    color: string,
    data: number,
    legendTitle: string,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
  ): void => {
    this._onBarHover(d3Event.target, color, data, legendTitle, xAxisCalloutData, yAxisCalloutData);
  };

  private _onBarLeave = (): void => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onBarFocus = (
    legendText: string,
    pointData: number,
    color: string,
    refArrayIndexNumber: number,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
  ): void => {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.titleForHoverCard === legendText)
    ) {
      this._refArray.forEach((obj: IRefArrayData, index: number) => {
        if (obj.legendText === legendText && refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            titleForHoverCard: legendText,
            dataForHoverCard: pointData,
            color: color,
            xCalloutValue: xAxisCalloutData,
            yCalloutValue: yAxisCalloutData,
          });
        }
      });
    }
  };

  private _focusAction = (
    type: string,
    color: string,
    data: number,
    legendTitle: string,
    refArrayIndexNumber: number,
    xAxisCalloutData: string,
    yAxisCalloutData: string,
  ): void => {
    this._refArray[refArrayIndexNumber] = { legendText: legendTitle, refElement: d3Event.target };
    this._onBarFocus(legendTitle, data, color, refArrayIndexNumber, xAxisCalloutData, yAxisCalloutData);
  };

  private _redirectToUrl = (href: string | undefined): void => {
    href ? (window.location.href = href) : '';
  };

  private _drawGraph = (): void => {
    const that = this;

    const yBarScale = d3ScaleLinear()
      .domain([0, this._yMax])
      .range([0, this.state.containerHeight - this._removalValue - this.margins.bottom - this.margins.top]);

    // previous <g> - graph need to remove otherwise multile g elements will create
    d3Select(`#firstGElementForBars_${this._uniqLineText}`).remove();
    const barContainer = d3Select(`#barGElement_${this._uniqLineText}`)
      .append('g')
      .attr('class', 'firstGElementForBars')
      .attr('id', `firstGElementForBars_${this._uniqLineText}`);
    const seriesName = barContainer
      .selectAll('.name')
      .data(this._datasetForBars)
      .enter()
      .append('g')
      .attr('transform', (d: IGVForBarChart) => `translate(${this._xScale0(d.xAxisPoint)}, 0)`);

    let widthOfBar: number;
    if (this._barWidth && this._barWidth < this._xScale1.bandwidth()) {
      widthOfBar = this._barWidth;
    } else {
      widthOfBar = this._xScale1.bandwidth();
    }

    const tempDataSet = Object.keys(this._datasetForBars[0]).splice(0, this._keys.length);
    tempDataSet.forEach((datasetKey: string, index: number) => {
      seriesName
        .selectAll(`.${datasetKey}`)
        .data(d => [d])
        .enter()
        .append('rect')
        .style('fill', (d: IGVSingleDataPoint) => d[datasetKey].color)
        .attr('data-is-focusable', true)
        .attr('class', this._classNames.opacityChangeOnHover)
        .attr('fill-opacity', (d: IGVForBarChart) => that._getOpacity(d[datasetKey].legend))
        .attr('x', (d: IGVSingleDataPoint) => this._xScale1(datasetKey)!)
        .attr('y', (d: IGVForBarChart) => {
          return this.state.containerHeight - this._removalValue - this.margins.bottom - yBarScale(d[datasetKey].data);
        })
        .attr('aria-labelledby', this._calloutId)
        .attr('width', widthOfBar)
        .attr('height', (d: IGVForBarChart) => {
          return yBarScale(d[datasetKey].data) > 0 ? yBarScale(d[datasetKey].data) : 0;
        })
        .on('mouseover', (d: IGVForBarChart) => {
          return that._mouseAction(
            'mouseover',
            d[datasetKey].color,
            d[datasetKey].data,
            d[datasetKey].legend,
            d[datasetKey].xAxisCalloutData!,
            d[datasetKey].yAxisCalloutData!,
          );
        })
        .on('mousemove', (d: IGVForBarChart) =>
          that._mouseAction(
            'mousemove',
            d[datasetKey].color,
            d[datasetKey].data,
            d[datasetKey].legend,
            d[datasetKey].xAxisCalloutData!,
            d[datasetKey].yAxisCalloutData!,
          ),
        )
        .on('mouseout', this._onBarLeave)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on('focus', (d: any) =>
          that._focusAction(
            'focus',
            d[datasetKey].color,
            d[datasetKey].data,
            d[datasetKey].legend,
            d.indexNum * that._keys.length + index,
            d[datasetKey].xAxisCalloutData!,
            d[datasetKey].yAxisCalloutData!,
          ),
        )
        .on('blur', that._onBarLeave)
        .on('click', (d: IGVForBarChart) => that._redirectToUrl(this.props.href!));
    });

    if (!this.props.wrapXAxisLables && this.props.showXAxisLablesTooltip) {
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: this._classNames.tooltip!,
        id: this._tooltipId,
        xAxis: this._xAxis,
      };
      tooltipOfXAxislabels(tooltipProps);
    }
  };

  private _createXAxisProperties = (): string[] => {
    const keys: string[] = [];
    const colors: string[] = [];

    const xAxisLabels: string[] = this._points.map(singlePoint => singlePoint.name);

    this._points[0].series.forEach((singleKey: IGVBarChartSeriesPoint) => {
      keys.push(singleKey.key);
      colors.push(singleKey.color);
    });

    this._keys = keys;

    return xAxisLabels;
  };

  private _createDataset = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const datasetForBars: any = [];
    const dataset: IGVDataPoint[] = [];

    this._points.forEach((point: IGroupedVerticalBarChartData, index: number) => {
      const singleDatasetPoint: IGVDataPoint = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const singleDatasetPointforBars: any = {};

      point.series.forEach((seriesPoint: IGVBarChartSeriesPoint) => {
        singleDatasetPoint[seriesPoint.key] = seriesPoint.data;
        singleDatasetPointforBars[seriesPoint.key] = {
          ...seriesPoint,
        };
      });

      singleDatasetPointforBars.xAxisPoint = point.name;
      singleDatasetPointforBars.indexNum = index;

      datasetForBars.push(singleDatasetPointforBars);
      dataset.push(singleDatasetPoint);
    });
    this._dataset = dataset;
    return datasetForBars;
  };

  private _createX0Scale = (xAxisLabels: string[]) => {
    const x0Axis = d3ScaleBand()
      .domain(xAxisLabels.map((label: string) => label))
      .range(
        this._isRtl
          ? [this.state.containerWidth - this.margins.right, this.margins.left]
          : [this.margins.left, this.state.containerWidth - this.margins.right],
      )
      .padding(this._groupPadding / 100);
    return x0Axis;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _createX1Scale = (xScale0: any): any => {
    return d3ScaleBand()
      .domain(this._keys)
      .range(this._isRtl ? [xScale0.bandwidth(), 0] : [0, xScale0.bandwidth()])
      .padding(0.05);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _createx0Axis = (xScale0: any): any => {
    const x0Axis = d3AxisBottom(xScale0).tickPadding(this._xAxisTickPadding);

    this._showXAxisGridLines &&
      x0Axis.tickSizeInner(-(this.state.containerHeight - this._removalValue - this.margins.bottom - this.margins.top));
    return x0Axis;
  };

  private _createYAxis(dataset: IGVDataPoint[]): NumericAxis {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yMax: number = d3Max(dataset, (point: any) => d3Max(this._keys, (key: string) => point[key]));
    this._yMax = yMax;
    const interval = Math.ceil(yMax / this._yAxisTickCount);
    const domains: Array<number> = [0];
    while (domains[domains.length - 1] < yMax) {
      domains.push(domains[domains.length - 1] + interval);
    }
    const yAxisScale = d3ScaleLinear()
      .domain([0, domains[domains.length - 1]])
      .range([this.state.containerHeight - this._removalValue - this.margins.bottom, this.margins.top]);
    const axis = this._isRtl ? d3AxisRight(yAxisScale) : d3AxisLeft(yAxisScale);
    const yAxis = axis
      .tickPadding(5)
      .tickFormat(d3Format('.2~s'))
      .tickValues(domains);

    this._showYAxisGridLines &&
      yAxis.tickSizeInner(-(this.state.containerWidth - this.margins.left - this.margins.right));

    return yAxis;
  }

  private _onLegendClick(customMessage: string): void {
    if (this.state.isLegendSelected) {
      if (this.state.titleForHoverCard === customMessage) {
        this.setState({
          isLegendSelected: false,
          titleForHoverCard: customMessage,
        });
      } else {
        this.setState({
          titleForHoverCard: customMessage,
        });
      }
    } else {
      this.setState({
        isLegendSelected: true,
        titleForHoverCard: customMessage,
      });
    }
    this._isGraphDraw = true;
  }

  private _onLegendHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: true,
        titleForHoverCard: customMessage,
      });
      this._isGraphDraw = true;
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: false,
        titleForHoverCard: '',
        isLegendSelected: isLegendFocused ? false : this.state.isLegendSelected,
      });
      this._isGraphDraw = true;
    }
  }

  private _getLegendData = (palette: IPalette): JSX.Element => {
    const data = this._points;
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];

    data.forEach((singleChartData: IGroupedVerticalBarChartData) => {
      singleChartData.series.forEach((point: IGVBarChartSeriesPoint) => {
        const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
        const checkSimilarLegends = actions.filter((leg: ILegend) => leg.title === point.legend && leg.color === color);
        if (checkSimilarLegends!.length > 0) {
          return;
        }

        const legend: ILegend = {
          title: point.legend,
          color: color,
          action: () => {
            this._onLegendClick(point.legend);
          },
          hoverAction: () => {
            this._onLegendHover(point.legend);
          },
          onMouseOutAction: (isLegendSelected?: boolean) => {
            this._onLegendLeave(isLegendSelected);
          },
        };

        actions.push(legend);
      });
    });
    return (
      <Legends
        legends={actions}
        overflowProps={this.props.legendsOverflowProps}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        {...this.props.legendProps}
      />
    );
  };

  private _setXAxis(node: SVGGElement | null, xAxis: NumericAxis | StringAxis): void {
    if (node === null) {
      return;
    }
    this._xAxis = d3Select(node).call(xAxis);
    const wrapLabelProps = {
      node: node,
      xAxis: xAxis,
      showXAxisLablesTooltip: this.props.showXAxisLablesTooltip || false,
      noOfCharsToTruncate: this.props.noOfCharsToTruncate || 4,
    };
    let temp = 0;
    if (this.props.wrapXAxisLables || this.props.showXAxisLablesTooltip) {
      temp = createWrapOfXLabels(wrapLabelProps) as number;
    }
    this._removalValue = temp;
  }

  private _setYAxis(node: SVGElement | null, yAxis: NumericAxis): void {
    if (node === null) {
      return;
    }
    d3Select(node).call(yAxis);
  }
}
