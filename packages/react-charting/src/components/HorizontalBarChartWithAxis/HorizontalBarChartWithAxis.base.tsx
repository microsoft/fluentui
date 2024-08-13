import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { select as d3Select } from 'd3-selection';
import { scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { ILegend } from '../../components/Legends/Legends.types';
import { Legends } from '../../components/Legends/Legends';
import {
  IAccessibilityProps,
  IBasestate,
  IHorizontalBarChartWithAxisDataPoint,
  IRefArrayData,
  IMargins,
} from '../../types/IDataPoint';
import { IChildProps, IYValueHover } from '../CommonComponents/CartesianChart.types';
import { CartesianChart } from '../CommonComponents/CartesianChart';
import {
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisStyleProps,
  IHorizontalBarChartWithAxisStyles,
} from './HorizontalBarChartWithAxis.types';
import { FocusZoneDirection } from '@fluentui/react-focus';
import {
  ChartHoverCard,
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  YAxisType,
  XAxisTypes,
  NumericAxis,
  StringAxis,
  getTypeOfAxis,
  getNextColor,
  findHBCWANumericMinMaxOfY,
  createYAxisForHorizontalBarChartWithAxis,
  IDomainNRange,
  domainRangeOfNumericForHorizontalBarChartWithAxis,
  createStringYAxisForHorizontalBarChartWithAxis,
} from '../../utilities/index';

const getClassNames = classNamesFunction<IHorizontalBarChartWithAxisStyleProps, IHorizontalBarChartWithAxisStyles>();
export interface IHorizontalBarChartWithAxisState extends IBasestate {
  selectedLegendTitle: string;
  dataPointCalloutProps?: IHorizontalBarChartWithAxisDataPoint; // define this in hover and focus
  /**
   * data point of x, where rectangle is hovered or focused
   */
  activeXdataPoint: number | null;
  YValueHover: IYValueHover[];
  hoverXValue?: string | number | null;
  callOutAccessibilityData?: IAccessibilityProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltipElement?: any;
}

type ColorScale = (_p?: number) => string;

export class HorizontalBarChartWithAxisBase extends React.Component<
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisState
> {
  private _points: IHorizontalBarChartWithAxisDataPoint[];
  private _barHeight: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IHorizontalBarChartWithAxisStyles>;
  private _refArray: IRefArrayData[];
  private _calloutId: string;
  private margins: IMargins;
  private _isRtl: boolean = getRTL();
  private _bars: JSX.Element[];
  private _yAxisLabels: string[];
  private _xMax: number;
  private _tooltipId: string;
  private _xAxisType: XAxisTypes;
  private _yAxisType: YAxisType;
  private _calloutAnchorPoint: IHorizontalBarChartWithAxisDataPoint | null;

  public constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);
    this.state = {
      color: '',
      dataForHoverCard: 0,
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      refSelected: null,
      selectedLegendTitle: '',
      xCalloutValue: '',
      yCalloutValue: '',
      activeXdataPoint: null,
      YValueHover: [],
      hoverXValue: '',
    };
    this._calloutId = getId('callout');
    this._tooltipId = getId('HBCWATooltipID_');
    this._refArray = [];
    this._xAxisType =
      this.props.data! && this.props.data!.length > 0
        ? (getTypeOfAxis(this.props.data![0].x, true) as XAxisTypes)
        : XAxisTypes.NumericAxis;
    this._yAxisType =
      this.props.data! && this.props.data!.length > 0
        ? (getTypeOfAxis(this.props.data![0].y, false) as YAxisType)
        : YAxisType.StringAxis;
  }

  public render(): JSX.Element {
    this._adjustProps();
    const reversedBars = [...this._points].reverse();
    this._yAxisLabels = reversedBars.map((point: IHorizontalBarChartWithAxisDataPoint) => point.y as string);
    this._xMax = Math.max(
      d3Max(this._points, (point: IHorizontalBarChartWithAxisDataPoint) => point.x)!,
      this.props.xMaxValue || 0,
    );
    const legendBars: JSX.Element = this._getLegendData(this._points, this.props.theme!.palette);
    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      legendColor: this.state.color,
    });
    const calloutProps = {
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topAutoEdge,
      id: `toolTip${this._calloutId}`,
      target: this.state.refSelected,
      isBeakVisible: false,
      gapSpace: 15,
      color: this.state.color,
      legend: this.state.selectedLegendTitle,
      XValue: this.state.xCalloutValue,
      YValue: this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard,
      onDismiss: this._closeCallout,
      preventDismissOnLostFocus: true,
      ...this.props.calloutProps,
      ...getAccessibleDataObject(this.state.callOutAccessibilityData),
    };
    const tickParams = {
      tickValues: this.props.tickValues,
      tickFormat: this.props.tickFormat,
    };
    return (
      <CartesianChart
        {...this.props}
        chartTitle={this._getChartTitle()}
        points={this._points}
        chartType={ChartTypes.HorizontalBarChartWithAxis}
        xAxisType={this._xAxisType}
        yAxisType={this._yAxisType}
        stringDatasetForYAxisDomain={this._yAxisLabels}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        createYAxis={createYAxisForHorizontalBarChartWithAxis}
        getDomainNRangeValues={this._getDomainNRangeValues}
        createStringYAxis={createStringYAxisForHorizontalBarChartWithAxis}
        getMinMaxOfYAxis={findHBCWANumericMinMaxOfY}
        barwidth={this._barHeight}
        focusZoneDirection={FocusZoneDirection.vertical}
        customizedCallout={this._getCustomizedCallout()}
        getmargins={this._getMargins}
        getGraphData={this._getGraphData}
        getAxisData={this._getAxisData}
        onChartMouseLeave={this._handleChartMouseLeave}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          return (
            <>
              <g>{this._bars}</g>
            </>
          );
        }}
      />
    );
  }

  private _getDomainNRangeValues = (
    points: IHorizontalBarChartWithAxisDataPoint[],
    margins: IMargins,
    width: number,
    chartType: ChartTypes,
    isRTL: boolean,
    xAxisType: XAxisTypes,
    barWidth: number,
    tickValues: Date[] | number[] | undefined,
    shiftX: number,
  ) => {
    let domainNRangeValue: IDomainNRange;
    if (xAxisType === XAxisTypes.NumericAxis) {
      domainNRangeValue = domainRangeOfNumericForHorizontalBarChartWithAxis(points, margins, width, isRTL, shiftX);
    } else {
      domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
    return domainNRangeValue;
  };

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._barHeight = this.props.barHeight || 32;
    const { palette } = this.props.theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.blueDark];
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  private _renderContentForOnlyBars = (point: IHorizontalBarChartWithAxisDataPoint): JSX.Element => {
    const { useSingleColor = false } = this.props;
    let selectedPointIndex = 0;
    this.props.data!.forEach((yDataPoint: IHorizontalBarChartWithAxisDataPoint, index: number) => {
      if (yDataPoint.y === point.y) {
        selectedPointIndex = index;
      }
    });
    let color: string;
    if (useSingleColor) {
      //if useSingle color , then check if user has given a palette or not
      // and pick the first color from that or else from our paltette.
      color = this.props.colors ? this._createColors()(1) : getNextColor(1, 0, this.props.theme?.isInverted);
    } else {
      color = point.color
        ? point.color
        : this.props.colors
        ? this._createColors()(point.x)
        : getNextColor(selectedPointIndex, 0, this.props.theme?.isInverted);
    }
    return (
      <>
        <ChartHoverCard
          XValue={point.xAxisCalloutData || point.x.toString()}
          Legend={point.legend}
          YValue={point.yAxisCalloutData || point.y}
          color={color}
          culture={this.props.culture}
        />
      </>
    );
  };

  private _renderCallout = (props?: IHorizontalBarChartWithAxisDataPoint): JSX.Element | null => {
    return props ? this._renderContentForOnlyBars(props) : null;
  };

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps, this._renderCallout)
      : null;
  };

  private _getGraphData = (
    xScale: NumericAxis,
    yScale: NumericAxis | StringAxis,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
    yElement?: SVGElement | null,
  ) => {
    return (this._bars =
      this._yAxisType === YAxisType.NumericAxis
        ? this._createNumericBars(containerHeight, containerWidth, xElement!, yElement!)
        : this._createStringBars(containerHeight, containerWidth, xElement!, yElement!));
  };

  private _createColors(): D3ScaleLinear<string, string> | ColorScale {
    const increment = this._colors.length <= 1 ? 1 : 1 / (this._colors.length - 1);
    const { useSingleColor = false } = this.props;
    if (useSingleColor) {
      return (_p?: number) => {
        const { theme, colors } = this.props;
        return colors && colors.length > 0 ? colors[0] : theme!.palette.blueLight;
      };
    }
    const domainValues = [];
    for (let i = 0; i < this._colors.length; i++) {
      domainValues.push(increment * i * this._xMax);
    }
    const colorScale = d3ScaleLinear<string>().domain(domainValues).range(this._colors);
    return colorScale;
  }

  private _refCallback = (element: SVGRectElement, legendTitle: string): void => {
    this._refArray.push({ index: legendTitle, refElement: element });
  };

  private _getCalloutContentForBar = (
    point: IHorizontalBarChartWithAxisDataPoint,
  ): { YValueHover: IYValueHover[]; hoverXValue: string | number | null } => {
    const YValueHover: IYValueHover[] = [];
    const { useSingleColor = false } = this.props;
    const { data } = this.props;
    const selectedPoint = data!.filter((yDataPoint: IHorizontalBarChartWithAxisDataPoint) => yDataPoint.y === point.y);
    let selectedPointIndex = 0;
    data!.forEach((yDataPoint: IHorizontalBarChartWithAxisDataPoint, index: number) => {
      if (yDataPoint.y === point.y) {
        selectedPointIndex = index;
      }
    });
    let color: string;
    if (useSingleColor) {
      //if useSingle color , then check if user has given a palette or not
      // and pick the first color from that or else from our paltette.
      color = this.props.colors ? this._createColors()(1) : getNextColor(1, 0, this.props.theme?.isInverted);
    } else {
      color = selectedPoint[0].color
        ? selectedPoint[0].color
        : this.props.colors
        ? this._createColors()(selectedPoint[0].x)
        : getNextColor(selectedPointIndex, 0, this.props.theme?.isInverted);
    }
    // callout data for the bar
    YValueHover.push({
      legend: selectedPoint[0].legend,
      // For HBCWA x and y Values are swapped
      y: selectedPoint[0].x,
      color,
      data: selectedPoint[0].yAxisCalloutData,
      yAxisCalloutData: selectedPoint[0].yAxisCalloutData,
    });
    return { YValueHover, hoverXValue: point.yAxisCalloutData || point.y.toString() };
  };

  private _onBarHover(
    point: IHorizontalBarChartWithAxisDataPoint,
    color: string,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void {
    mouseEvent.persist();

    const { YValueHover, hoverXValue } = this._getCalloutContentForBar(point);
    if (
      (this.state.isLegendSelected === false ||
        (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend)) &&
      this._calloutAnchorPoint !== point
    ) {
      this._calloutAnchorPoint = point;
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        dataForHoverCard: point.x,
        selectedLegendTitle: point.legend!,
        color: this.props.useSingleColor ? color : point.color,
        // To display callout value, if no callout value given, taking given point.x value as a string.
        xCalloutValue: point.yAxisCalloutData! || point.y.toString(),
        yCalloutValue: point.xAxisCalloutData || point.x.toString(),
        dataPointCalloutProps: point,
        activeXdataPoint: point.x,
        YValueHover,
        hoverXValue,
        callOutAccessibilityData: point.callOutAccessibilityData,
      });
    }
  }

  private _onBarLeave = (): void => {
    /**/
  };

  private _handleChartMouseLeave = (): void => {
    this._calloutAnchorPoint = null;
    this.setState({
      isCalloutVisible: false,
      activeXdataPoint: null,
      YValueHover: [],
      hoverXValue: '',
    });
  };

  private _onBarFocus = (
    point: IHorizontalBarChartWithAxisDataPoint,
    refArrayIndexNumber: number,
    color: string,
  ): void => {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend)
    ) {
      const { YValueHover, hoverXValue } = this._getCalloutContentForBar(point);
      this._refArray.forEach((obj: IRefArrayData, index: number) => {
        if (refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: point.legend!,
            dataForHoverCard: point.x,
            color: this.props.useSingleColor ? color : point.color,
            xCalloutValue: point.yAxisCalloutData || point.y.toString(),
            yCalloutValue: point.xAxisCalloutData! || point.x.toString(),
            dataPointCalloutProps: point,
            activeXdataPoint: point.x,
            YValueHover,
            hoverXValue,
            callOutAccessibilityData: point.callOutAccessibilityData,
          });
        }
      });
    }
  };

  private _getScales = (
    containerHeight: number,
    containerWidth: number,
    isNumericScale: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): { xBarScale: any; yBarScale: any } => {
    if (isNumericScale) {
      const xMax = d3Max(this._points, (point: IHorizontalBarChartWithAxisDataPoint) => point.x as number)!;
      const yMax = d3Max(this._points, (point: IHorizontalBarChartWithAxisDataPoint) => point.y as number)!;
      const xBarScale = d3ScaleLinear()
        .domain(this._isRtl ? [xMax, 0] : [0, xMax])
        .nice()
        .range([this.margins.left!, containerWidth - this.margins.right!]);
      const yBarScale = d3ScaleLinear()
        .domain([0, yMax])
        .range([containerHeight - this.margins.bottom!, this.margins.top!]);
      return { xBarScale, yBarScale };
    } else {
      const xMax = d3Max(this._points, (point: IHorizontalBarChartWithAxisDataPoint) => point.x as number)!;
      // please note these padding default values must be consistent in here
      // and CatrtesianChartBase w for more details refer example
      // http://using-d3js.com/04_07_ordinal_scales.html
      const yBarScale = d3ScaleBand()
        .domain(this._yAxisLabels)
        .range([containerHeight - this.margins.bottom! - this._barHeight / 2, this.margins.top! + this._barHeight / 2])
        .padding(this.props.yAxisPadding || 0);

      const xBarScale = d3ScaleLinear()
        .domain(this._isRtl ? [xMax, 0] : [0, xMax])
        .nice()
        .range([this.margins.left!, containerWidth - this.margins.right!]);
      return { xBarScale, yBarScale };
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _createNumericBars(
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
    yElement: SVGElement,
  ): JSX.Element[] {
    const { useSingleColor = false } = this.props;
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth, true);
    const sortedBars: IHorizontalBarChartWithAxisDataPoint[] = [...this._points];
    sortedBars.sort((a, b) => {
      const aValue = typeof a.y === 'number' ? a.y : parseFloat(a.y);
      const bValue = typeof b.y === 'number' ? b.y : parseFloat(b.y);
      return bValue - aValue;
    });
    const bars = sortedBars.map((point: IHorizontalBarChartWithAxisDataPoint, index: number) => {
      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this.state.selectedLegendTitle === point.legend;
      }
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        legendColor: this.state.color,
        shouldHighlight,
      });
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      if (barHeight < 1) {
        return <React.Fragment key={point.x}> </React.Fragment>;
      }
      let color: string;
      if (useSingleColor) {
        //if useSingle color , then check if user has given a palette or not
        // and pick the first color from that or else from our paltette.
        color = this.props.colors ? this._createColors()(1) : getNextColor(1, 0, this.props.theme?.isInverted);
      } else {
        color = this.props.colors
          ? this._createColors()(point.x)
          : getNextColor(index, 0, this.props.theme?.isInverted);
      }
      return (
        <rect
          key={point.y}
          x={this._isRtl ? xBarScale(point.x) : this.margins.left!}
          className={this._classNames.opacityChangeOnHover}
          y={yBarScale(point.y) - this._barHeight / 2}
          data-is-focusable={shouldHighlight}
          width={
            this._isRtl
              ? containerWidth - this.margins.right! - Math.max(xBarScale(point.x), 0)
              : Math.max(xBarScale(point.x), 0) - this.margins.left!
          }
          height={this._barHeight}
          ref={(e: SVGRectElement) => {
            this._refCallback(e, point.legend!);
          }}
          onClick={point.onClick}
          onMouseOver={this._onBarHover.bind(this, point, color)}
          aria-label={this._getAriaLabel(point)}
          role="img"
          aria-labelledby={`toolTip${this._calloutId}`}
          onMouseLeave={this._onBarLeave}
          onFocus={this._onBarFocus.bind(this, point, index, color)}
          onBlur={this._onBarLeave}
          fill={point.color && !useSingleColor ? point.color : color}
        />
      );
    });
    return bars;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _tooltipOfYAxislabels(ytooltipProps: any) {
    const { tooltipCls, yAxis, id } = ytooltipProps;
    if (yAxis === null) {
      return null;
    }
    const div = d3Select('body').append('div').attr('id', id).attr('class', tooltipCls).style('opacity', 0);
    const aa = yAxis!.selectAll('#BaseSpan')._groups[0];
    const baseSpanLength = aa && Object.keys(aa)!.length;
    const originalDataArray: string[] = [];
    for (let i = 0; i < baseSpanLength; i++) {
      const originalData = aa[i].dataset && (Object.values(aa[i].dataset)[0] as string);
      originalDataArray.push(originalData);
    }
    const tickObject = yAxis!.selectAll('.tick')._groups[0];
    const tickObjectLength = tickObject && Object.keys(tickObject)!.length;
    for (let i = 0; i < tickObjectLength; i++) {
      const d1 = tickObject[i];
      d3Select(d1)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on('mouseover', (event: any, d) => {
          if (!this.state.tooltipElement) {
            div.style('opacity', 0.9);
            div
              .html(originalDataArray[i])
              .style('left', event.pageX + 'px')
              .style('top', event.pageY - 28 + 'px');
          }
        })
        .on('mouseout', d => {
          div.style('opacity', 0);
        });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _createStringBars(
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
    yElement: SVGElement,
  ): JSX.Element[] {
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth, false);
    const { useSingleColor = false } = this.props;
    const bars = this._points.map((point: IHorizontalBarChartWithAxisDataPoint, index: number) => {
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      if (barHeight < 1) {
        return <React.Fragment key={point.x}> </React.Fragment>;
      }
      let color: string;
      if (useSingleColor) {
        //if useSingle color , then check if user has given a palette or not
        // and pick the first color from that or else from our paltette.
        color = this.props.colors ? this._createColors()(1) : getNextColor(1, 0, this.props.theme?.isInverted);
      } else {
        color = this.props.colors
          ? this._createColors()(point.x)
          : getNextColor(index, 0, this.props.theme?.isInverted);
      }

      return (
        <rect
          transform={`translate(0,${0.5 * (yBarScale.bandwidth() - this._barHeight)})`}
          key={point.x}
          x={this._isRtl ? xBarScale(point.x) : this.margins.left!}
          y={yBarScale(point.y)}
          width={
            this._isRtl
              ? containerWidth - this.margins.right! - Math.max(xBarScale(point.x), 0)
              : Math.max(xBarScale(point.x), 0) - this.margins.left!
          }
          height={this._barHeight}
          aria-labelledby={`toolTip${this._calloutId}`}
          aria-label={this._getAriaLabel(point)}
          role="img"
          ref={(e: SVGRectElement) => {
            this._refCallback(e, point.legend!);
          }}
          onClick={point.onClick}
          onMouseOver={this._onBarHover.bind(this, point, color)}
          onMouseLeave={this._onBarLeave}
          onBlur={this._onBarLeave}
          data-is-focusable={true}
          onFocus={this._onBarFocus.bind(this, point, index, color)}
          fill={point.color && !useSingleColor ? point.color : color}
        />
      );
    });

    // Removing un wanted tooltip div from DOM, when prop not provided, for proper cleanup
    // of unwanted DOM elements, to prevent flacky behaviour in tooltips , that might occur
    // in creating tooltips when tooltips are enabled( as we try to recreate a tspan with this._tooltipId)
    if (!this.props.showYAxisLablesTooltip) {
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        //eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at y axis labels.
    if (this.props.showYAxisLablesTooltip) {
      const yAxisElement = d3Select(yElement).call(yBarScale);
      if (!this.state.tooltipElement) {
        try {
          document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
          //eslint-disable-next-line no-empty
        } catch (e) {}
      }
      const ytooltipProps = {
        tooltipCls: this._classNames.tooltip!,
        id: this._tooltipId,
        yAxis: yAxisElement,
      };
      yAxisElement && this._tooltipOfYAxislabels(ytooltipProps);
    }
    return bars;
  }

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onLegendClick(customMessage: string): void {
    if (this.state.isLegendSelected) {
      if (this.state.selectedLegendTitle === customMessage) {
        this.setState({
          isLegendSelected: false,
          selectedLegendTitle: customMessage,
        });
      } else {
        this.setState({
          selectedLegendTitle: customMessage,
        });
      }
    } else {
      this.setState({
        isLegendSelected: true,
        selectedLegendTitle: customMessage,
      });
    }
  }

  private _onLegendHover(customMessage: string): void {
    if (this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: true,
        selectedLegendTitle: customMessage,
      });
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: false,
        selectedLegendTitle: '',
        isLegendSelected: isLegendFocused ? false : this.state.isLegendSelected,
      });
    }
  }

  private _getLegendData = (data: IHorizontalBarChartWithAxisDataPoint[], palette: IPalette): JSX.Element => {
    const { useSingleColor } = this.props;
    const actions: ILegend[] = [];
    data.forEach((point: IHorizontalBarChartWithAxisDataPoint, _index: number) => {
      const color: string = useSingleColor
        ? this.props.colors
          ? this._createColors()(1)
          : getNextColor(1, 0, this.props.theme?.isInverted)
        : point.color!;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color,
        action: () => {
          this._onLegendClick(point.legend!);
        },
        hoverAction: () => {
          this._handleChartMouseLeave();
          this._onLegendHover(point.legend!);
        },
        onMouseOutAction: (isLegendSelected?: boolean) => {
          this._onLegendLeave(isLegendSelected);
        },
      };
      actions.push(legend);
    });
    const legends = (
      <Legends
        legends={actions}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...this.props.legendProps}
      />
    );
    return legends;
  };

  private _getAxisData = (yAxisData: IAxisData) => {
    if (yAxisData && yAxisData.yAxisDomainValues.length) {
      // For HBCWA x and y Values are swapped
      const { yAxisDomainValues: domainValue } = yAxisData;
      this._xMax = Math.max(domainValue[domainValue.length - 1], this.props.xMaxValue || 0);
    }
  };
  private _getAriaLabel = (point: IHorizontalBarChartWithAxisDataPoint): string => {
    const xValue = point.xAxisCalloutData || point.x;
    const yValue = point.yAxisCalloutData || point.y;
    return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ` + `${yValue}.`;
  };

  private _getChartTitle = (): string => {
    const { chartTitle, data } = this.props;
    return (chartTitle ? `${chartTitle}. ` : '') + `Horizontal bar chart with ${data?.length || 0} bars. `;
  };
}
