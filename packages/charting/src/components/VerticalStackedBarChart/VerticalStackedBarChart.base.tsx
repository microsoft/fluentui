import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { Axis as D3Axis } from 'd3-axis';
import { scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale';
import { classNamesFunction, getId, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { ILegend, Legends } from '../Legends/index';
import {
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles,
  IRefArrayData,
  IVerticalStackedChartProps,
  IDataPoint,
  IVSChartDataPoint,
  IMargins,
  IChildProps,
} from './VerticalStackedBarChart.types';
import { IBasestate } from '../../types/index';
import { ChartTypes, XAxisTypes, additionalMarginRight } from '../../utilities/index';
import { CartesianChart } from '../CommonComponents/CartesianChart';

const getClassNames = classNamesFunction<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>();
type NumericAxis = D3Axis<number | { valueOf(): number }>;
type NumericScale = D3ScaleLinear<number, number>;
type StringScale = D3ScaleLinear<string, string>;

export interface IVerticalStackedBarChartState extends IBasestate {
  selectedLegendTitle: string;
}
export class VerticalStackedBarChartBase extends React.Component<
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartState
> {
  private _points: IVerticalStackedChartProps[];
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // private _xAxisScale: any = '';
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // private _yAxisScale: any = '';
  private _dataset: IDataPoint[];
  private _bars: JSX.Element[];
  private _isNumeric: boolean;
  private _barWidth: number;
  // private _yAxisTickCount: number;
  private _colors: string[];
  private _calloutId: string;
  private _classNames: IProcessedStyleSet<IVerticalStackedBarChartStyles>;
  private _refArray: IRefArrayData[];
  private margins: IMargins;
  private _isRtl: boolean = getRTL();

  public constructor(props: IVerticalStackedBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      selectedLegendTitle: '',
      refSelected: null,
      dataForHoverCard: 0,
      color: '',
      xCalloutValue: '',
      yCalloutValue: '',
    };
    this._onLegendLeave = this._onLegendLeave.bind(this);
    this._onBarLeave = this._onBarLeave.bind(this);
    this._calloutId = getId('callout');
    this._refArray = [];
    this._adjustProps();
    this._dataset = this._createDataSetLayer();
  }

  public componentDidUpdate(prevProps: IVerticalStackedBarChartProps): void {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */
    if (
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width ||
      prevProps.data !== this.props.data
    ) {
      this._adjustProps();
      this._dataset = this._createDataSetLayer();
    }
  }

  public render(): React.ReactNode {
    // need to check data change
    this._isNumeric = this._dataset.length > 0 && typeof this._dataset[0].x === 'number';
    const legendBars: JSX.Element = this._getLegendData(this._points, this.props.theme!.palette);

    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      legendColor: this.state.color,
      isRtl: this._isRtl,
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
      XValue: this.state.xCalloutValue!,
      YValue: this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard,

      YValueHover: this.state.YValueHover,
      hoverXValue: this.state.hoverXValue,
    };
    const tickParams = {
      tickValues: this.props.tickValues,
      tickFormat: this.props.tickFormat,
    };
    return (
      <CartesianChart
        {...this.props}
        points={this._dataset}
        chartType={ChartTypes.VerticalStackedBarChart}
        xAxisType={this._isNumeric ? XAxisTypes.NumericAxis : XAxisTypes.StringAxis}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        isMultiStackCallout={false}
        barwidth={this._barWidth}
        getmargins={this._getMargins}
        getGraphData={this._getGraphData}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          // this._xAxisScale = props.xScale!; // need to update with scales
          // this._yAxisScale = props.yScale!;
          return <g>{this._bars}</g>;
        }}
      />
    );
  }

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._barWidth = this.props.barWidth || 32;
    const { theme } = this.props;
    const { palette } = theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getGraphData = (xScale: any, yScale: NumericAxis, containerHeight: number, containerWidth: number) => {
    // this._xAxisScale = xScale;
    // this._yAxisScale = yScale;
    return (this._bars = this._isNumeric
      ? this._createNumericBars(containerHeight, containerWidth)
      : this._createStringBars(containerHeight, containerWidth));
  };

  private _createDataSetLayer(): IDataPoint[] {
    const dataset: IDataPoint[] = this._points.map(singlePointData => {
      let total: number = 0;
      singlePointData.chartData!.forEach((point: IVSChartDataPoint) => {
        total = total + point.data;
      });
      return {
        x: singlePointData.xAxisPoint,
        y: total,
      };
    });
    return dataset;
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

  private _getLegendData = (data: IVerticalStackedChartProps[], palette: IPalette): JSX.Element => {
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];

    data.forEach((singleChartData: IVerticalStackedChartProps) => {
      singleChartData.chartData.forEach((point: IVSChartDataPoint) => {
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

  private _refCallback(element: SVGRectElement, legendTitle: string, index: number): void {
    this._refArray[index] = { index: legendTitle, refElement: element };
  }

  private _onBarHover(
    point: IVSChartDataPoint,
    xAxisPoint: string,
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
        selectedLegendTitle: point.legend,
        dataForHoverCard: point.data,
        color: color,
        xCalloutValue: point.xAxisCalloutData ? point.xAxisCalloutData : xAxisPoint,
        yCalloutValue: point.yAxisCalloutData,
      });
    }
  }

  private _onBarFocus(point: IVSChartDataPoint, xAxisPoint: string, color: string, refArrayIndexNumber: number): void {
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.selectedLegendTitle === point.legend)
    ) {
      this._refArray.forEach((obj: IRefArrayData, index: number) => {
        if (obj.index === point.legend && refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: point.legend,
            dataForHoverCard: point.data,
            color: color,
            xCalloutValue: point.xAxisCalloutData ? point.xAxisCalloutData : xAxisPoint,
            yCalloutValue: point.yAxisCalloutData,
          });
        }
      });
    }
  }

  private _onBarLeave = (): void => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _redirectToUrl(): void {
    this.props.href ? (window.location.href = this.props.href) : '';
  }

  private _createBar = (
    xBarScale: NumericScale | StringScale,
    yBarScale: NumericScale,
    containerHeight: number,
  ): JSX.Element[] => {
    const bars = this._points.map((singleChartData: IVerticalStackedChartProps, indexNumber: number) => {
      let startingPointOfY = 0;
      const singleBar = singleChartData.chartData.map((point: IVSChartDataPoint, index: number) => {
        startingPointOfY = startingPointOfY + point.data;
        const color = point.color ? point.color : this._colors[index];
        const refArrayIndexNumber = indexNumber * singleChartData.chartData.length + index;

        let shouldHighlight = true;
        if (this.state.isLegendHovered || this.state.isLegendSelected) {
          shouldHighlight = this.state.selectedLegendTitle === point.legend;
        }

        const { theme, styles, className } = this.props;
        this._classNames = getClassNames(styles!, {
          theme: theme!,
          className: className,
          shouldHighlight: shouldHighlight,
          href: this.props.href,
          legendColor: this.state.color,
        });
        let xPoint;
        if (this._isNumeric) {
          xPoint = xBarScale(singleChartData.xAxisPoint as number);
        } else {
          xPoint = xBarScale(indexNumber);
        }
        return (
          <rect
            key={index + indexNumber}
            className={this._classNames.opacityChangeOnHover}
            x={xPoint}
            y={containerHeight - this.margins.bottom! - yBarScale(startingPointOfY)}
            width={this._barWidth}
            height={yBarScale(point.data) > 0 ? yBarScale(point.data) : 0}
            fill={color}
            ref={(e: SVGRectElement) => {
              this._refCallback(e, point.legend, refArrayIndexNumber);
            }}
            data-is-focusable={true}
            focusable={'true'}
            onMouseOver={this._onBarHover.bind(this, point, singleChartData.xAxisPoint, color)}
            onMouseMove={this._onBarHover.bind(this, point, singleChartData.xAxisPoint, color)}
            aria-labelledby={this._calloutId}
            onMouseLeave={this._onBarLeave}
            onFocus={this._onBarFocus.bind(this, point, singleChartData.xAxisPoint, color, refArrayIndexNumber)}
            onBlur={this._onBarLeave}
            onClick={this._redirectToUrl}
          />
        );
      });

      return <g key={indexNumber}>{singleBar}</g>;
    });
    return bars;
  };

  private _createNumericBars = (containerHeight: number, containerWidth: number): JSX.Element[] => {
    const yMax = this._getYMax(this._dataset);
    const xMax = d3Max(this._dataset, (point: IDataPoint) => point.x as number)!;

    const xBarScale = d3ScaleLinear()
      .domain(this._isRtl ? [xMax, 0] : [0, xMax])
      .nice()
      .range([
        this.margins.left!,
        containerWidth - this.margins.right! - this._barWidth - (this._isRtl ? additionalMarginRight : 0),
      ]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);

    return this._createBar(xBarScale, yBarScale, containerHeight);
  };

  private _createStringBars = (containerHeight: number, containerWidth: number): JSX.Element[] => {
    const yMax = this._getYMax(this._dataset);
    const endpointDistance = 0.5 * ((containerWidth - this.margins.right!) / this._dataset.length);

    const xBarScale = d3ScaleLinear()
      .domain(this._isRtl ? [this._dataset.length - 1, 0] : [0, this._dataset.length - 1])
      .range([
        this.margins.left! + endpointDistance - 0.5 * this._barWidth,
        containerWidth -
          this.margins.right! -
          endpointDistance -
          0.5 * this._barWidth -
          (this._isRtl ? additionalMarginRight : 0),
      ]);
    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);

    return this._createBar(xBarScale, yBarScale, containerHeight);
  };

  private _getYMax(dataset: IDataPoint[]) {
    return Math.max(d3Max(dataset, (point: IDataPoint) => point.y)!, this.props.yMaxValue || 0);
  }
}
