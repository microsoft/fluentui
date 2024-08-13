import { CartesianChart, IChildProps, IModifiedCartesianChartProps } from '../../components/CommonComponents/index';
import { IAccessibilityProps, IHeatMapChartData, IHeatMapChartDataPoint } from '../../types/IDataPoint';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { classNamesFunction, getId, memoizeFunction } from '@fluentui/react/lib/Utilities';
import { FocusZoneDirection } from '@fluentui/react-focus';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import * as React from 'react';
import { IHeatMapChartProps, IHeatMapChartStyleProps, IHeatMapChartStyles } from './HeatMapChart.types';
import { ILegend, Legends } from '../Legends/index';
import { convertToLocaleString } from '../../utilities/locale-util';
import {
  ChartTypes,
  createNumericYAxis,
  getAccessibleDataObject,
  XAxisTypes,
  YAxisType,
  getTypeOfAxis,
  IMargins,
  IDomainNRange,
  domainRangeOfXStringAxis,
  createStringYAxis,
} from '../../utilities/utilities';
import { Target } from '@fluentui/react';
import { format as d3Format } from 'd3-format';
import { timeFormat as d3TimeFormat } from 'd3-time-format';

type DataSet = {
  dataSet: RectanglesGraphData;
  yAxisPoints: string[];
  xAxisPoints: string[];
};
type FlattenData = IHeatMapChartDataPoint & {
  legend: string;
};
interface IRectRef {
  data: FlattenData;
  refElement: SVGGElement;
}
type RectanglesGraphData = { [key: string]: FlattenData[] };
export interface IHeatMapChartState {
  /**
   * contains the selected legend string
   */
  selectedLegend: string;
  /**
   * contains the hovered legend string
   */
  activeLegend: string;
  /**
   * determines wethere to show or hide the callout
   * @default false
   */
  isCalloutVisible: boolean;
  /**
   * y value to be shown in callout
   */
  calloutYValue: string;
  /**
   * legend title to be shown in callout
   */
  calloutLegend: string;
  /**
   * color of the text in the callout
   */
  calloutTextColor: string;
  /**
   * The target that the Callout should try to position itself based on
   */
  target: Target;
  /**
   * ratio to show in the callout
   */
  ratio: [number, number] | null;

  /**
   * description message to show in the callout
   */
  descriptionMessage: string;
  /**
   * id to give to callout for accesiblity purpose
   */
  calloutId: string;
  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;
}
const getClassNames = classNamesFunction<IHeatMapChartStyleProps, IHeatMapChartStyles>();
export class HeatMapChartBase extends React.Component<IHeatMapChartProps, IHeatMapChartState> {
  private _classNames: IProcessedStyleSet<IHeatMapChartStyles>;
  private _stringXAxisDataPoints: string[];
  private _stringYAxisDataPoints: string[];
  private _createSet: (
    data: IHeatMapChartData[],
    xDate: string | undefined,
    xNum: string | undefined,
    yDate: string | undefined,
    yNum: string | undefined,
  ) => DataSet;
  private _dataSet: RectanglesGraphData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _colorScale: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisScale: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _yAxisScale: any;
  /**
   * This array contains ref for all the rectangles
   * drawn inside the chard
   */
  private _rectRefArray: { [key: string]: IRectRef } = {};
  private _xAxisType: XAxisTypes;
  private _yAxisType: YAxisType;
  private _calloutAnchorPoint: FlattenData | null;
  private _emptyChartId: string;
  public constructor(props: IHeatMapChartProps) {
    super(props);
    /**
     * below funciton creates a new data set from the prop
     * @data and also finds all the unique x-axis datapoints
     * and y-axis datapoints(which will render in the axis in graph)
     * we store this in a memoized function, because we want to calulate
     * this set whenever props changes.
     */
    this._createSet = memoizeFunction(
      (
        data: IHeatMapChartData[],
        xDate: string | undefined,
        xNum: string | undefined,
        yDate: string | undefined,
        yNum: string | undefined,
      ): DataSet => this._createNewDataSet(data, xDate, xNum, yDate, yNum),
    );
    this.state = {
      selectedLegend: '',
      activeLegend: '',
      isCalloutVisible: false,
      target: null,
      calloutLegend: '',
      calloutTextColor: '',
      calloutYValue: '',
      ratio: null,
      descriptionMessage: '',
      calloutId: '',
    };
    this._emptyChartId = getId('_HeatMap_empty');
  }

  public render(): React.ReactNode {
    const { x, y } = this._getXandY();
    this._xAxisType = getTypeOfAxis(x, true) as XAxisTypes;
    this._yAxisType = getTypeOfAxis(y, false) as YAxisType;
    const { data, xAxisDateFormatString, xAxisNumberFormatString, yAxisDateFormatString, yAxisNumberFormatString } =
      this.props;
    this._colorScale = this._getColorScale();
    const { dataSet, xAxisPoints, yAxisPoints } = this._createSet(
      data,
      xAxisDateFormatString,
      xAxisNumberFormatString,
      yAxisDateFormatString,
      yAxisNumberFormatString,
    );
    this._dataSet = dataSet;
    this._stringYAxisDataPoints = yAxisPoints;
    this._stringXAxisDataPoints = xAxisPoints;
    this._classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });
    const calloutProps: IModifiedCartesianChartProps['calloutProps'] = {
      isBeakVisible: false,
      gapSpace: 8,
      ...this.props.calloutProps,
      isCalloutVisible: this.state.isCalloutVisible,
      id: this.state.calloutId,
      YValue: this.state.calloutYValue,
      legend: this.state.calloutLegend,
      color: this.state.calloutTextColor,
      target: this.state.target,
      styles: this._classNames.subComponentStyles.calloutStyles,
      directionalHint: DirectionalHint.topAutoEdge,
      onDismiss: this._closeCallout,
      ...getAccessibleDataObject(this.state.callOutAccessibilityData, 'text', false),
      preventDismissOnLostFocus: true,
    };
    const chartHoverProps: IModifiedCartesianChartProps['chartHoverProps'] = {
      ...(this.state.ratio && {
        ratio: this.state.ratio,
      }),
      descriptionMessage: this.state.descriptionMessage,
    };
    return !this._isChartEmpty() ? (
      <CartesianChart
        {...this.props}
        chartTitle={this._getChartTitle()}
        points={data}
        chartType={ChartTypes.HeatMapChart}
        xAxisType={XAxisTypes.StringAxis}
        yAxisType={YAxisType.StringAxis}
        calloutProps={calloutProps}
        createYAxis={createNumericYAxis}
        chartHoverProps={chartHoverProps}
        styles={this._classNames.subComponentStyles!.cartesianStyles}
        datasetForXAxisDomain={this._stringXAxisDataPoints}
        stringDatasetForYAxisDomain={this._stringYAxisDataPoints}
        createStringYAxis={createStringYAxis}
        getDomainNRangeValues={this._getDomainNRangeValues}
        getMinMaxOfYAxis={this._getMinMaxOfYAxis}
        xAxisTickCount={this._stringXAxisDataPoints.length}
        xAxistickSize={0}
        xAxisPadding={0.02}
        yAxisPadding={0.02}
        svgFocusZoneProps={{
          direction: FocusZoneDirection.bidirectional,
        }}
        legendBars={this._createLegendBars()}
        onChartMouseLeave={this._handleChartMouseLeave}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          this._xAxisScale = props.xScale;
          this._yAxisScale = props.yScale;
          return this._createRectangles();
        }}
      />
    ) : (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  private _getMinMaxOfYAxis = () => {
    return { startValue: 0, endValue: 0 };
  };

  private _getDomainNRangeValues = (
    points: IHeatMapChartDataPoint[],
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
    if (xAxisType === XAxisTypes.NumericAxis || xAxisType === XAxisTypes.DateAxis) {
      domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    } else {
      domainNRangeValue = domainRangeOfXStringAxis(margins, width, isRTL);
    }
    return domainNRangeValue;
  };

  private _getXandY = (): { x: string | Date | number; y: string | Date | number } => {
    let x: string | Date | number = '';
    let y: string | Date | number = '';
    this.props.data.forEach((item: IHeatMapChartData) => {
      if (item.data && item.data.length > 0) {
        x = item.data[0].x;
        y = item.data[0].y;
        return { x, y };
      }
    });
    return { x, y };
  };

  private _getOpacity = (legendTitle: string): string => {
    const opacity = this._legendHighlighted(legendTitle) || this._noLegendHighlighted() ? '1' : '0.1';
    return opacity;
  };

  private _rectRefCallback = (rectElement: SVGGElement, index: number | string, dataPointObject: FlattenData): void => {
    this._rectRefArray[index] = { data: dataPointObject, refElement: rectElement };
  };

  private _onRectFocus = (id: string, data: FlattenData): void => {
    this.setState({
      target: this._rectRefArray[id].refElement,
      /** Show the callout if highlighted rectangle is focused and Hide it if unhighlighted rectangle is focused */
      isCalloutVisible: this.state.selectedLegend === '' || this.state.selectedLegend === data.legend,
      calloutYValue: `${data.rectText}`,
      calloutTextColor: Number.isNaN(data.value)
        ? this.props.theme!.semanticColors.bodyText
        : this._colorScale(data.value),
      calloutLegend: data.legend,
      ratio: data.ratio || null,
      descriptionMessage: data.descriptionMessage || '',
      calloutId: id,
      callOutAccessibilityData: data.callOutAccessibilityData,
    });
  };

  private _onRectMouseOver = (id: string, data: FlattenData, mouseEvent: React.MouseEvent<SVGGElement>): void => {
    mouseEvent.persist();
    if (this._calloutAnchorPoint !== data) {
      this._calloutAnchorPoint = data;
      this.setState({
        target: this._rectRefArray[id].refElement,
        /** Show the callout if highlighted rectangle is hovered and Hide it if unhighlighted rectangle is hovered */
        isCalloutVisible: this.state.selectedLegend === '' || this.state.selectedLegend === data.legend,
        calloutYValue: `${data.rectText}`,
        calloutTextColor: Number.isNaN(data.value)
          ? this.props.theme!.semanticColors.bodyText
          : this._colorScale(data.value),
        calloutLegend: data.legend,
        ratio: data.ratio || null,
        descriptionMessage: data.descriptionMessage || '',
        calloutId: id,
        callOutAccessibilityData: data.callOutAccessibilityData,
      });
    }
  };

  private _onRectBlurOrMouseOut = (): void => {
    /**/
  };

  private _handleChartMouseLeave = (): void => {
    this._calloutAnchorPoint = null;
    this.setState({
      isCalloutVisible: false,
    });
  };

  /**
   * This is the function which is responsible for
   * drawing the rectangle in the graph and also
   * attaching dom events to that rectangles
   */
  private _createRectangles = (): React.ReactNode => {
    const rectangles: JSX.Element[] = [];
    const yAxisDataPoints = this._stringYAxisDataPoints.slice().reverse();
    /**
     * yAxisDataPoint is noting but the DataPoint
     * which will be rendered on the y-axis
     */
    yAxisDataPoints.forEach((yAxisDataPoint: string) => {
      let index = 0;
      this._stringXAxisDataPoints.forEach((xAxisDataPoint: string) => {
        let rectElement: JSX.Element;
        const id = `x${xAxisDataPoint}y${yAxisDataPoint}`;
        if (this._dataSet[yAxisDataPoint][index]?.x === xAxisDataPoint) {
          /**
           * dataPointObject is an object where it contains information on single
           * data point such as x, y , value, rectText property of the rectangle
           */
          const dataPointObject = this._dataSet[yAxisDataPoint][index];
          rectElement = (
            <g
              key={id}
              role="img"
              aria-label={this._getAriaLabel(dataPointObject)}
              data-is-focusable={this._legendHighlighted(dataPointObject.legend) || this._noLegendHighlighted()}
              fillOpacity={this._getOpacity(dataPointObject.legend)}
              transform={`translate(${this._xAxisScale(dataPointObject.x)}, ${this._yAxisScale(dataPointObject.y)})`}
              ref={(gElement: SVGGElement) => {
                this._rectRefCallback(gElement, id, dataPointObject);
              }}
              onFocus={this._onRectFocus.bind(this, id, dataPointObject)}
              onBlur={this._onRectBlurOrMouseOut}
              onMouseOver={this._onRectMouseOver.bind(this, id, dataPointObject)}
              onMouseOut={this._onRectBlurOrMouseOut}
            >
              <rect
                fill={this._colorScale(dataPointObject.value)}
                width={this._xAxisScale.bandwidth()}
                height={this._yAxisScale.bandwidth()}
                onClick={dataPointObject.onClick}
              />
              <text
                dominantBaseline={'middle'}
                textAnchor={'middle'}
                className={this._classNames.text}
                transform={`translate(${this._xAxisScale.bandwidth() / 2}, ${this._yAxisScale.bandwidth() / 2})`}
              >
                {convertToLocaleString(dataPointObject.rectText, this.props.culture)}
              </text>
            </g>
          );
          index++;
        } else {
          const dataPointObject: FlattenData = {
            x: xAxisDataPoint,
            y: yAxisDataPoint,
            value: NaN,
            rectText: 'No data available',
            legend: '',
          };
          rectElement = (
            <g
              key={id}
              role="img"
              aria-label={this._getAriaLabel(dataPointObject)}
              data-is-focusable={this._noLegendHighlighted()}
              transform={`translate(${this._xAxisScale(dataPointObject.x)}, ${this._yAxisScale(dataPointObject.y)})`}
              ref={(gElement: SVGGElement) => {
                this._rectRefCallback(gElement, id, dataPointObject);
              }}
              onFocus={this._onRectFocus.bind(this, id, dataPointObject)}
              onBlur={this._onRectBlurOrMouseOut}
              onMouseOver={this._onRectMouseOver.bind(this, id, dataPointObject)}
              onMouseOut={this._onRectBlurOrMouseOut}
            >
              <rect
                fill={this.props.theme!.semanticColors.bodyBackground}
                width={this._xAxisScale.bandwidth()}
                height={this._yAxisScale.bandwidth()}
              />
            </g>
          );
        }
        rectangles.push(rectElement);
      });
    });
    return rectangles;
  };
  /**
   * when the legend is hovered we need to highlight
   * all the rectangles which fall under that category
   * and un-highlight the rest of them
   * @param legendTitle
   */
  private _onLegendHover(legendTitle: string): void {
    this.setState({
      activeLegend: legendTitle,
    });
  }

  /**
   * when the mouse is out from the legend , we need
   * to show the graph in initial mode.
   */
  private _onLegendLeave(): void {
    this.setState({
      activeLegend: '',
    });
  }
  /**
   * @param legendTitle
   * when the legend is clicked we need to highlight
   * all the rectangles which fall under that category
   * and un highlight the rest of them
   */
  private _onLegendClick(legendTitle: string): void {
    /**
     * check if the legend is already selceted,
     * if yes, un-select the legend, else
     * set the selected legend state to legendTitle
     */
    if (this.state.selectedLegend === legendTitle) {
      this.setState({
        selectedLegend: '',
      });
    } else {
      this.setState({
        selectedLegend: legendTitle,
      });
    }
  }
  private _createLegendBars = (): JSX.Element => {
    const { data, legendProps } = this.props;
    const legends: ILegend[] = [];
    data.forEach((item: IHeatMapChartData) => {
      const legend: ILegend = {
        title: item.legend,
        color: this._colorScale(item.value),
        action: () => {
          this._onLegendClick(item.legend);
        },
        hoverAction: () => {
          this._handleChartMouseLeave();
          this._onLegendHover(item.legend);
        },
        onMouseOutAction: () => {
          this._onLegendLeave();
        },
      };
      legends.push(legend);
    });
    return <Legends {...legendProps} legends={legends} />;
  };

  private _getColorScale = () => {
    const { domainValuesForColorScale, rangeValuesForColorScale } = this.props;
    return d3ScaleLinear()
      .domain(domainValuesForColorScale)
      .range(rangeValuesForColorScale as unknown as number[]);
  };

  private _getXIndex = (value: string | Date | number): string => {
    if (this._xAxisType === XAxisTypes.DateAxis) {
      return `${(value as Date).getTime()}`;
    } else if (this._xAxisType === XAxisTypes.StringAxis) {
      return value as string;
    } else if (this._xAxisType === XAxisTypes.NumericAxis) {
      return `${value}`;
    } else {
      return '';
    }
  };
  private _getYIndex = (value: string | Date | number): string => {
    if (this._yAxisType === YAxisType.DateAxis) {
      return `${(value as Date).getTime()}`;
    } else if (this._yAxisType === YAxisType.StringAxis) {
      return value as string;
    } else if (this._yAxisType === YAxisType.NumericAxis) {
      return `${value}`;
    } else {
      return '';
    }
  };

  /**
   * This will create a new data set based on the prop
   * @data
   * We will be using This data set to contsruct our rectangles
   * in the chart, we use this data set becuase, when we loop in this
   * data and build the heat map, it will support accessibility as
   * specified in the figma
   */

  private _createNewDataSet = (
    data: IHeatMapChartData[],
    xAxisDateFormatString: string | undefined,
    xAxisNumberFormatString: string | undefined,
    yAxisDateFormatString: string | undefined,
    yAxisNumberFormatString: string | undefined,
  ): DataSet => {
    /**
     * please do not destructure any of the props here,
     * instead send them as parameter to this functions so that
     * this functions get called whenever the prop changes
     */
    const flattenData: FlattenData[] = [];
    /**
     * below for each loop will store all the datapoints in the one array.
     * basically it will flatten the nestesd array (data prop) into single array
     * of object. where each object contains x, y, rectText , value and legend propety of single
     * data point.
     */
    data.forEach((item: IHeatMapChartData) => {
      item.data.forEach((point: IHeatMapChartDataPoint) => {
        flattenData.push({ ...point, legend: item.legend });
      });
    });
    const yPoints: RectanglesGraphData = {};
    const uniqueYPoints: { [key: string]: '1' } = {};
    const uniqueXPoints: { [key: string]: '1' } = {};
    flattenData.forEach((item: FlattenData) => {
      const posX = this._getXIndex(item.x);
      const posY = this._getYIndex(item.y);

      uniqueXPoints[posX] = '1';
      uniqueYPoints[posY] = '1';
      /** we will check if the property(posY) is already there in object, if  Yes,
       *  then we will append the item in the Array related to the pos, if not
       *  then we will simply append the item in the new Array and
       *  assign that array to the  property (posY) in the Object
       *  and finally we will get the array of Objects associated to each
       *  property (which is nothing but y data point) and object in the
       *  array are noting but x data points associated to the property y
       */
      if (yPoints[posY]) {
        yPoints[posY] = [...yPoints[posY], item];
      } else {
        yPoints[posY] = [item];
      }
    });
    /**
     * we will now sort(ascending) the array's of y data point based on the x value
     * sorting is important to achive the accessibility order of the
     * rectangles and then format the x and y datapoints respectively
     */
    Object.keys(yPoints).forEach((item: string) => {
      yPoints[item]
        .sort((a: IHeatMapChartDataPoint, b: IHeatMapChartDataPoint) => {
          if (this._xAxisType === XAxisTypes.StringAxis) {
            return (a.x as string).toLowerCase() > (b.x as string).toLowerCase() ? 1 : -1;
          } else if (this._xAxisType === XAxisTypes.DateAxis) {
            return (a.x as Date).getTime() - (b.x as Date).getTime();
          } else if (this._xAxisType === XAxisTypes.NumericAxis) {
            return +(a.x as string) > +(b.x as string) ? 1 : -1;
          } else {
            return a.x > b.x ? 1 : -1;
          }
        })
        .forEach((datapoint: IHeatMapChartDataPoint) => {
          if (this._xAxisType === XAxisTypes.DateAxis) {
            datapoint.x = this._getStringFormattedDate(datapoint.x as string, xAxisDateFormatString);
          }
          if (this._xAxisType === XAxisTypes.NumericAxis) {
            datapoint.x = this._getStringFormattedNumber(datapoint.x as string, xAxisNumberFormatString);
          }
          if (this._xAxisType === XAxisTypes.StringAxis) {
            datapoint.x = this._getFormattedLabelForXAxisDataPoint(datapoint.x as string);
          }
          if (this._yAxisType === YAxisType.DateAxis) {
            datapoint.y = this._getStringFormattedDate(datapoint.y as string, yAxisDateFormatString);
          }
          if (this._yAxisType === YAxisType.NumericAxis) {
            datapoint.y = this._getStringFormattedNumber(datapoint.y as string, yAxisNumberFormatString);
          }
          if (this._yAxisType === YAxisType.StringAxis) {
            datapoint.y = this._getFormattedLabelForYAxisDataPoint(datapoint.y as string);
          }
        });
    });
    /**
     * if  y-axis data points are of type date or number or if we have string formatter,
     * then we need to change data points  to their respective string
     * format, becuase in the private variable this._stringYAxisDatapoints, points will be stored in
     * string format. and in here `yPoint` are not so we need to change, so that
     * function `this._createRectangles` should work perfetcly while looping, and  if we don't change
     * then `this._createRectangles` will fail while looping, causing the error
     * Cannot read property 'forEach' of undefined
     */

    Object.keys(yPoints).forEach((yPoint: string) => {
      if (this._yAxisType === YAxisType.DateAxis) {
        yPoints[this._getStringFormattedDate(yPoint, yAxisDateFormatString)] = yPoints[yPoint];
      } else if (this._yAxisType === YAxisType.NumericAxis) {
        yPoints[`${this._getStringFormattedNumber(yPoint, yAxisNumberFormatString)}`] = yPoints[yPoint];
      } else {
        yPoints[this._getFormattedLabelForYAxisDataPoint(yPoint)] = yPoints[yPoint];
      }
    });
    /**
     * assigning new data set
     */
    const dataSet = yPoints;
    /**
     * These are the Y axis data points which will get rendered in the
     * Y axis in graph
     */
    const yAxisPoints = this._getYAxisDataPoints(uniqueYPoints);
    /**
     * These are the x axis data points which will get rendered in the
     * x axis in the graph
     */

    const xAxisPoints = this._getXAxisDataPoints(uniqueXPoints);
    return {
      dataSet,
      yAxisPoints,
      xAxisPoints,
    };
  };

  /**
   * This function will return the final sorted and formatted x-axis points
   * which will be rendered on the x-axis
   * @param points
   * @returns x-axis points
   */
  private _getXAxisDataPoints = (points: { [key: string]: '1' }): string[] => {
    let xAxisPoints: string[] = [];
    const unFormattedXAxisDataPoints = Object.keys(points).sort((a: string, b: string) => {
      if (this._xAxisType === XAxisTypes.DateAxis || this._xAxisType === XAxisTypes.NumericAxis) {
        return +a - +b;
      } else {
        return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
      }
    });
    xAxisPoints = unFormattedXAxisDataPoints.map((xPoint: string) => {
      if (this._xAxisType === XAxisTypes.DateAxis) {
        return this._getStringFormattedDate(xPoint, this.props.xAxisDateFormatString);
      } else if (this._xAxisType === XAxisTypes.NumericAxis) {
        return this._getStringFormattedNumber(xPoint, this.props.xAxisNumberFormatString);
      } else {
        return this._getFormattedLabelForXAxisDataPoint(xPoint);
      }
    });

    return xAxisPoints;
  };
  /**
   * This function will return the final sorted and formatted y-axis points
   * which will be rendered on the y-axis
   * @param points
   * @returns yaxis points
   */
  private _getYAxisDataPoints = (points: { [key: string]: '1' }): string[] => {
    let yAxisPoints: string[] = [];
    const unFormattedYAxisDataPoints = Object.keys(points).sort((a: string, b: string) => {
      if (this._yAxisType === YAxisType.DateAxis || this._yAxisType === YAxisType.NumericAxis) {
        return +a - +b;
      } else {
        return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
      }
    });
    yAxisPoints = unFormattedYAxisDataPoints.map((yPoint: string) => {
      if (this._yAxisType === YAxisType.DateAxis) {
        return this._getStringFormattedDate(yPoint, this.props.yAxisDateFormatString);
      } else if (this._yAxisType === YAxisType.NumericAxis) {
        return this._getStringFormattedNumber(yPoint, this.props.yAxisNumberFormatString);
      } else {
        return this._getFormattedLabelForYAxisDataPoint(yPoint);
      }
    });

    return yAxisPoints;
  };

  private _getStringFormattedDate = (point: string, formatString?: string): string => {
    const date = new Date();
    date.setTime(+point);
    return d3TimeFormat(formatString || '%b/%d')(date);
  };

  private _getStringFormattedNumber = (point: string, formatString?: string): string => {
    return d3Format(formatString || '.2~s')(+point);
  };

  private _getFormattedLabelForXAxisDataPoint = (point: string): string => {
    const { xAxisStringFormatter } = this.props;
    return xAxisStringFormatter ? xAxisStringFormatter(point) : point;
  };

  private _getFormattedLabelForYAxisDataPoint = (point: string): string => {
    const { yAxisStringFormatter } = this.props;
    return yAxisStringFormatter ? yAxisStringFormatter(point) : point;
  };

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _legendHighlighted = (legendTitle: string) => {
    return (
      this.state.selectedLegend === legendTitle ||
      (this.state.selectedLegend === '' && this.state.activeLegend === legendTitle)
    );
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this.state.selectedLegend === '' && this.state.activeLegend === '';
  };

  private _getAriaLabel = (point: FlattenData): string => {
    const xValue = point.x;
    const yValue = point.y;
    const legend = point.legend;
    const zValue = point.ratio ? `${point.ratio[0]}/${point.ratio[1]}` : point.rectText || point.value;
    const description = point.descriptionMessage;
    return (
      point.callOutAccessibilityData?.ariaLabel ||
      `${xValue}, ${yValue}. ${legend}, ${zValue}.` + (description ? ` ${description}.` : '')
    );
  };

  private _isChartEmpty(): boolean {
    return !(this.props.data && this.props.data.length > 0);
  }

  private _getChartTitle = (): string => {
    const { chartTitle } = this.props;
    const numDataPoints = this.props.data.reduce((acc, curr) => acc + curr.data.length, 0);
    return (chartTitle ? `${chartTitle}. ` : '') + `Heat map chart with ${numDataPoints} data points. `;
  };
}
