import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { Axis as D3Axis } from 'd3-axis';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZoneDirection } from '@fluentui/react-focus';
import {
  classNamesFunction,
  getId,
  getRTL,
  memoizeFunction,
  warnDeprecations,
} from 'office-ui-fabric-react/lib/Utilities';
import { ChartTypes, tooltipOfXAxislabels, XAxisTypes } from '../../utilities/index';
import {
  CartesianChart,
  ILegend,
  IGroupedVerticalBarChartData,
  IGroupedVerticalBarChartProps,
  IGroupedVerticalBarChartStyleProps,
  IGroupedVerticalBarChartStyles,
  IGVBarChartSeriesPoint,
  IMargins,
  IBasestate,
  IRefArrayData,
  Legends,
} from '../../index';

const COMPONENT_NAME = 'GROUPED VERTICAL BAR CHART';
const GROUP_PADDING = 16;
const getClassNames = classNamesFunction<IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles>();
type StringAxis = D3Axis<string>;
type NumericAxis = D3Axis<number | { valueOf(): number }>;

// This interface used for - While forming datapoints from given prop "data" in code
interface IGVDataPoint {
  [key: string]: number | string;
}

// While forming datapoints from given prop "data" in code. These datapoints are used for to draw graph easily.
interface IGVSingleDataPoint {
  [key: string]: IGVDataPoint;
}
export interface IGroupedVerticalBarChartState extends IBasestate {
  titleForHoverCard: string;
  dataPointCalloutProps?: IGVBarChartSeriesPoint;
}

export class GroupedVerticalBarChartBase extends React.Component<
  IGroupedVerticalBarChartProps,
  IGroupedVerticalBarChartState
> {
  private _createSet: (
    data: IGroupedVerticalBarChartData[],
  ) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { keys: string[]; xAxisLabels: string[]; datasetForBars: any };
  private _dataset: IGVDataPoint[];
  private _keys: string[];
  private _xAxisLabels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _datasetForBars: any;
  private margins: IMargins;
  private _groupedVerticalBarGraph: JSX.Element[];
  private _classNames: IProcessedStyleSet<IGroupedVerticalBarChartStyles>;
  private _refArray: IRefArrayData[];
  private _yMax: number;
  private _calloutId: string;
  private _tooltipId: string;
  private _isNumeric: boolean;
  private _isRtl: boolean = getRTL();

  public constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this._createSet = memoizeFunction((data: IGroupedVerticalBarChartData[]) => this._createDataSetOfGVBC(data));
    this.state = {
      color: '',
      dataForHoverCard: 0,
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      refSelected: null,
      titleForHoverCard: '',
      xCalloutValue: '',
      yCalloutValue: '',
    };
    warnDeprecations(COMPONENT_NAME, props, {
      showYAxisGridLines: 'Dont use this property. Lines are drawn by default',
      showXAxisPath: 'Dont use this property. Axis line removed default.',
      showYAxisPath: 'Dont use this property. No need to display Y axis path. Handling default',
      showXAxisGridLines: 'Dont use this proprty. Handling with default value.',
      legendColor: 'Dont use this property. colour will pick from given data.',
    });
    this._refArray = [];
    this._calloutId = getId('callout');
    this._tooltipId = getId('GVBCTooltipId_');
  }

  public render(): React.ReactNode {
    const points = this.props.data;
    const { keys, xAxisLabels, datasetForBars } = this._createSet(points);
    this._keys = keys;
    this._xAxisLabels = xAxisLabels;
    this._datasetForBars = datasetForBars;
    this._isNumeric = points.length > 0 && typeof points[0].name === 'number';
    const legends: JSX.Element = this._getLegendData(points, this.props.theme!.palette);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yMax = d3Max(this._dataset, (point: any) => d3Max(this._keys, (key: string) => point[key]));
    this._yMax = Math.max(yMax, this.props.yMaxValue || 0);
    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      href: this.props.href!,
    });
    const calloutProps = {
      target: this.state.refSelected,
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topRightEdge,
      id: `toolTip${this._calloutId}`,
      gapSpace: 15,
      isBeakVisible: false,
      setInitialFocus: true,
      color: this.state.color,
      Legend: this.state.titleForHoverCard,
      XValue: this.state.xCalloutValue,
      YValue: this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard,
      ...this.props.calloutProps,
    };
    const tickParams = {
      tickValues: this.props.tickValues!,
      tickFormat: this.props.tickFormat!,
    };

    return (
      <CartesianChart
        {...this.props}
        points={this._datasetForBars}
        chartType={ChartTypes.GroupedVerticalBarChart}
        calloutProps={calloutProps}
        legendBars={legends}
        xAxisType={this._isNumeric ? XAxisTypes.NumericAxis : XAxisTypes.StringAxis}
        datasetForXAxisDomain={this._xAxisLabels}
        tickParams={tickParams}
        xAxisPadding={this.props.xAxisTickPadding || 5}
        isCalloutForStack={false}
        maxOfYVal={this._yMax}
        focusZoneDirection={FocusZoneDirection.horizontal}
        customizedCallout={this._getCustomizedCallout()}
        getmargins={this._getMargins}
        getGraphData={this._getGraphData}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={() => {
          return <g>{this._groupedVerticalBarGraph}</g>;
        }}
      />
    );
  }

  private _getGraphData = (
    xScale: StringAxis | NumericAxis,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
  ) => {
    const xScale0 = this._createX0Scale(containerWidth);
    const xScale1 = this._createX1Scale(xScale0);
    const allGroupsBars: JSX.Element[] = [];
    this._datasetForBars.forEach((singleSet: IGVSingleDataPoint) => {
      allGroupsBars.push(this._buildGraph(singleSet, xScale0, xScale1, containerHeight, xElement!));
    });
    this._groupedVerticalBarGraph = allGroupsBars;
  };

  private _getMargins = (margins: IMargins) => (this.margins = margins);

  private _createDataSetOfGVBC = (points: IGroupedVerticalBarChartData[]) => {
    const keys: string[] = [];
    const xAxisLabels: string[] = points.map(singlePoint => singlePoint.name);
    points[0].series.forEach((singleKey: IGVBarChartSeriesPoint) => {
      keys.push(singleKey.key);
    });
    const datasetForBars = this._createDataset(points);
    return {
      keys,
      xAxisLabels,
      datasetForBars,
    };
  };

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps)
      : null;
  };

  private _getOpacity = (legendTitle: string): string => {
    let shouldHighlight = true;
    if (this.state.isLegendHovered || this.state.isLegendSelected) {
      shouldHighlight = this.state.titleForHoverCard === legendTitle;
    }
    return shouldHighlight ? '' : '0.1';
  };

  private _onBarHover = (pointData: IGVBarChartSeriesPoint, mouseEvent: React.MouseEvent<SVGPathElement>): void => {
    mouseEvent.persist();
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.titleForHoverCard === pointData.legend)
    ) {
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        titleForHoverCard: pointData.legend,
        dataForHoverCard: pointData.data,
        color: pointData.color,
        xCalloutValue: pointData.xAxisCalloutData,
        yCalloutValue: pointData.yAxisCalloutData,
        dataPointCalloutProps: pointData,
      });
    }
  };

  private _onBarLeave = (): void => this.setState({ isCalloutVisible: false });

  private _onBarFocus = (pointData: IGVBarChartSeriesPoint, refArrayIndexNumber: number): void => {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.titleForHoverCard === pointData.legend)
    ) {
      this._refArray.forEach((obj: IRefArrayData, index: number) => {
        if (obj.index === pointData.legend && refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            titleForHoverCard: pointData.legend,
            dataForHoverCard: pointData.data,
            color: pointData.color,
            xCalloutValue: pointData.xAxisCalloutData,
            yCalloutValue: pointData.yAxisCalloutData,
            dataPointCalloutProps: pointData,
          });
        }
      });
    }
  };

  private _redirectToUrl = (href: string | undefined): void => {
    href ? (window.location.href = href) : '';
  };

  private _refCallback(element: SVGRectElement, legendTitle: string, refIndexNumber: number): void {
    this._refArray[refIndexNumber] = { index: legendTitle, refElement: element };
  }

  private _buildGraph = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    singleSet: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale0: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale1: any,
    containerHeight: number,
    xElement: SVGElement,
  ): JSX.Element => {
    const singleGroup: JSX.Element[] = [];

    const yBarScale = d3ScaleLinear()
      .domain([0, this._yMax])
      .range([0, containerHeight! - this.margins.bottom! - this.margins.top!]);

    let widthOfBar: number;
    if (this.props.barwidth && this.props.barwidth < xScale1.bandwidth()) {
      widthOfBar = this.props.barwidth;
    } else {
      widthOfBar = xScale1.bandwidth();
    }
    const tempDataSet = Object.keys(this._datasetForBars[0]).splice(0, this._keys.length);
    tempDataSet.forEach((datasetKey: string, index: number) => {
      const refIndexNumber = singleSet.indexNum * tempDataSet.length + index;
      const pointData = singleSet[datasetKey];
      singleGroup.push(
        <rect
          className={this._classNames.opacityChangeOnHover}
          key={`${singleSet.indexNum}-${index}`}
          height={Math.max(yBarScale(pointData.data), 0)}
          width={widthOfBar}
          x={xScale1(datasetKey)!}
          y={Math.max(containerHeight! - this.margins.bottom! - yBarScale(pointData.data), 0)}
          data-is-focusable={true}
          opacity={this._getOpacity(pointData.legend)}
          ref={(e: SVGRectElement | null) => {
            this._refCallback(e!, pointData.legend, refIndexNumber);
          }}
          fill={pointData.color}
          onMouseOver={this._onBarHover.bind(this, pointData)}
          onMouseMove={this._onBarHover.bind(this, pointData)}
          onMouseOut={this._onBarLeave}
          onFocus={this._onBarFocus.bind(this, pointData, refIndexNumber)}
          onBlur={this._onBarLeave}
          onClick={this._redirectToUrl.bind(this, this.props.href!)}
        />,
      );
    });
    // Used to display tooltip at x axis labels.
    if (!this.props.wrapXAxisLables && this.props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xScale0);
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: this._classNames.tooltip!,
        id: this._tooltipId,
        xAxis: xAxisElement,
      };
      xAxisElement && tooltipOfXAxislabels(tooltipProps);
    }
    return (
      <g key={singleSet.indexNum} transform={`translate(${xScale0(singleSet.xAxisPoint)}, 0)`}>
        {singleGroup}
      </g>
    );
  };

  private _createDataset = (points: IGroupedVerticalBarChartData[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const datasetForBars: any = [];
    const dataset: IGVDataPoint[] = [];

    points.forEach((point: IGroupedVerticalBarChartData, index: number) => {
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

  // For grouped vertical bar chart, First need to define total scale (from start to end)
  // From that need to define scale for single group of bars - done by createX1Scale
  private _createX0Scale = (containerWidth: number) => {
    const x0Axis = d3ScaleBand()
      .domain(this._xAxisLabels)
      .range(
        this._isRtl
          ? [containerWidth! - this.margins.right!, this.margins.left!]
          : [this.margins.left!, containerWidth! - this.margins.right!],
      )
      .padding(GROUP_PADDING / 100);
    return x0Axis;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _createX1Scale = (xScale0: any): any => {
    return d3ScaleBand()
      .domain(this._keys)
      .range(this._isRtl ? [xScale0.bandwidth(), 0] : [0, xScale0.bandwidth()])
      .padding(0.05);
  };

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
  }

  private _onLegendHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: true,
        titleForHoverCard: customMessage,
      });
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: false,
        titleForHoverCard: '',
        isLegendSelected: isLegendFocused ? false : this.state.isLegendSelected,
      });
    }
  }

  private _getLegendData = (points: IGroupedVerticalBarChartData[], palette: IPalette): JSX.Element => {
    const data = points;
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
}
