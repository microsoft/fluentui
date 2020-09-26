import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { classNamesFunction, getId, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import {
  CartesianChart,
  ChartHoverCard,
  IBasestate,
  IMargins,
  ILegend,
  IRefArrayData,
  IVerticalBarChartProps,
  IVerticalBarChartStyleProps,
  IVerticalBarChartStyles,
  IVerticalBarChartDataPoint,
  Legends,
} from '../../index';
import { FocusZoneDirection } from '@fluentui/react-focus';
import { ChartTypes, XAxisTypes, NumericAxis, StringAxis } from '../../utilities/index';

const getClassNames = classNamesFunction<IVerticalBarChartStyleProps, IVerticalBarChartStyles>();
export interface IVerticalBarChartState extends IBasestate {
  selectedLegendTitle: string;
  dataPointCalloutProps?: IVerticalBarChartDataPoint; // define this in hover and focus
}

export class VerticalBarChartBase extends React.Component<IVerticalBarChartProps, IVerticalBarChartState> {
  private _points: IVerticalBarChartDataPoint[];
  private _barWidth: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IVerticalBarChartStyles>;
  private _refArray: IRefArrayData[];
  private _isNumeric: boolean;
  private _calloutId: string;
  private margins: IMargins;
  private _isRtl: boolean = getRTL();
  private _bars: JSX.Element[];
  private _xAxisLabels: string[];
  private _yMax: number;

  public constructor(props: IVerticalBarChartProps) {
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
    };
    this._calloutId = getId('callout');
    this._refArray = [];
  }

  public render(): JSX.Element {
    this._adjustProps();
    this._xAxisLabels = this._points.map((point: IVerticalBarChartDataPoint) => point.x as string);
    this._isNumeric = this._points.length > 0 && typeof this._points[0].x === 'number';
    this._yMax = Math.max(
      d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.y)!,
      this.props.yMaxValue || 0,
    );
    const legendBars: JSX.Element = this._getLegendData(this._points, this.props.theme!.palette);
    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      legendColor: this.state.color,
    });
    const calloutProps = {
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topRightEdge,
      id: `toolTip${this._calloutId}`,
      target: this.state.refSelected,
      isBeakVisible: false,
      gapSpace: 15,
      color: this.state.color,
      Legend: this.state.selectedLegendTitle,
      XValue: this.state.xCalloutValue,
      YValue: this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard,
      ...this.props.calloutProps,
    };
    const tickParams = {
      tickValues: this.props.tickValues,
      tickFormat: this.props.tickFormat,
    };
    return (
      <CartesianChart
        {...this.props}
        points={this._points}
        chartType={ChartTypes.VerticalBarChart}
        xAxisType={this._isNumeric ? XAxisTypes.NumericAxis : XAxisTypes.StringAxis}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        datasetForXAxisDomain={this._xAxisLabels}
        barwidth={this._barWidth}
        focusZoneDirection={FocusZoneDirection.horizontal}
        customizedCallout={this._getCustomizedCallout()}
        getmargins={this._getMargins}
        getGraphData={this._getGraphData}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={() => {
          return <g>{this._bars}</g>;
        }}
      />
    );
  }

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._barWidth = this.props.barWidth || 32;
    const { palette } = this.props.theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.blueDark];
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  private _renderCallout(props?: IVerticalBarChartDataPoint): JSX.Element | null {
    return props ? (
      <ChartHoverCard
        XValue={props.xAxisCalloutData}
        Legend={props.legend}
        YValue={props.yAxisCalloutData}
        color={props.color}
      />
    ) : null;
  }

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps, this._renderCallout)
      : null;
  };

  private _getGraphData = (
    xScale: StringAxis,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
  ) => {
    return (this._bars = this._isNumeric
      ? this._createNumericBars(containerHeight, containerWidth)
      : this._createStringBars(containerHeight, containerWidth));
  };

  private _createColors(): D3ScaleLinear<string, string> {
    const increment = this._colors.length <= 1 ? 1 : 1 / (this._colors.length - 1);
    const domainValues = [];
    for (let i = 0; i < this._colors.length; i++) {
      domainValues.push(increment * i * this._yMax);
    }
    const colorScale = d3ScaleLinear<string>()
      .domain(domainValues)
      .range(this._colors);
    return colorScale;
  }

  private _refCallback = (element: SVGRectElement, legendTitle: string): void => {
    this._refArray.push({ index: legendTitle, refElement: element });
  };

  private _onBarHover(
    point: IVerticalBarChartDataPoint,
    color: string,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ): void {
    mouseEvent.persist();
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend)
    ) {
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        dataForHoverCard: point.y,
        selectedLegendTitle: point.legend!,
        color: point.color || color,
        // To display callout value,If no callout value given, taking given point.x value as a string.
        xCalloutValue: point.xAxisCalloutData || point.x.toString(),
        yCalloutValue: point.yAxisCalloutData!,
        dataPointCalloutProps: point,
      });
    }
  }

  private _onBarLeave = (): void => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onBarFocus = (point: IVerticalBarChartDataPoint, refArrayIndexNumber: number, color: string): void => {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend)
    ) {
      this._refArray.forEach((obj: IRefArrayData, index: number) => {
        if (obj.index === point.legend! && refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: point.legend!,
            dataForHoverCard: point.y,
            color: point.color || color,
            xCalloutValue: point.xAxisCalloutData || point.x.toString(),
            yCalloutValue: point.yAxisCalloutData!,
            dataPointCalloutProps: point,
          });
        }
      });
    }
  };

  private _createNumericBars(containerHeight: number, containerWidth: number): JSX.Element[] {
    const xMax = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
    const xBarScale = d3ScaleLinear()
      .domain(this._isRtl ? [xMax, 0] : [0, xMax])
      .nice()
      .range([
        this.margins.left! + this._barWidth / 2,
        containerWidth - this.margins.right! - this._barWidth - this._barWidth / 2,
      ]);
    const yBarScale = d3ScaleLinear()
      .domain([0, this._yMax])
      .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);

    const colorScale = this._createColors();
    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this.state.selectedLegendTitle === point.legend;
      }
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        legendColor: this.state.color,
        shouldHighlight: shouldHighlight,
      });
      return (
        <rect
          key={point.x}
          x={xBarScale(point.x as number)}
          className={this._classNames.opacityChangeOnHover}
          y={containerHeight - this.margins.bottom! - yBarScale(point.y)}
          width={this._barWidth}
          data-is-focusable={true}
          height={Math.max(yBarScale(point.y), 0)}
          ref={(e: SVGRectElement) => {
            this._refCallback(e, point.legend!);
          }}
          onMouseOver={this._onBarHover.bind(this, point, colorScale(point.y))}
          aria-labelledby={this._calloutId}
          onMouseLeave={this._onBarLeave}
          onFocus={this._onBarFocus.bind(this, point, index, colorScale(point.y))}
          onBlur={this._onBarLeave}
          fill={point.color ? point.color : colorScale(point.y)}
        />
      );
    });
    return bars;
  }

  private _createStringBars(containerHeight: number, containerWidth: number): JSX.Element[] {
    const endpointDistance = 0.5 * ((containerWidth - this.margins.right!) / this._points.length);
    const xBarScale = d3ScaleLinear()
      .domain(this._isRtl ? [this._points.length - 1, 0] : [0, this._points.length - 1])
      .range([
        this.margins.left! + endpointDistance - 0.5 * this._barWidth,
        containerWidth - this.margins.right! - endpointDistance - 0.5 * this._barWidth,
      ]);
    const yBarScale = d3ScaleLinear()
      .domain([0, this._yMax])
      .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);

    const colorScale = this._createColors();
    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      return (
        <rect
          key={point.x}
          x={xBarScale(index)}
          y={containerHeight - this.margins.bottom! - yBarScale(point.y)}
          width={this._barWidth}
          height={Math.max(yBarScale(point.y), 0)}
          aria-labelledby={this._calloutId}
          ref={(e: SVGRectElement) => {
            this._refCallback(e, point.legend!);
          }}
          onMouseOver={this._onBarHover.bind(this, point, colorScale(point.y))}
          onMouseLeave={this._onBarLeave}
          onBlur={this._onBarLeave}
          data-is-focusable={true}
          onFocus={this._onBarFocus.bind(this, point, index, colorScale(point.y))}
          fill={point.color ? point.color : colorScale(point.y)}
        />
      );
    });

    return bars;
  }

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

  private _getLegendData(data: IVerticalBarChartDataPoint[], palette: IPalette): JSX.Element {
    const actions: ILegend[] = [];
    data.forEach((point: IVerticalBarChartDataPoint, _index: number) => {
      const color: string = point.color!;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          this._onLegendClick(point.legend!);
        },
        hoverAction: () => {
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
  }
}
