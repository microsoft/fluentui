import {
  CartesianChart,
  IChildProps,
  IModifiedCartesianChartProps,
  IHeatMapChartData,
  IHeatMapChartDataPoint,
} from '../../index';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { classNamesFunction, memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZoneDirection } from '@fluentui/react-focus';
import { DirectionalHint } from 'office-ui-fabric-react/lib/components/Callout';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { IHeatMapChartProps, IHeatMapChartStyleProps, IHeatMapChartStyles } from './HeatMapChart.types';
import { ILegend, Legends } from '../Legends/index';
import { ChartTypes, XAxisTypes, YAxisType, getTypeOfAxis } from '../../utilities/utilities';
import { Target } from 'office-ui-fabric-react';
import { format as d3Format } from 'd3-format';
import * as d3TimeFormat from 'd3-time-format';

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
interface IHeatMapChartState {
  /**
   * determines if the legend any of the legend is selected or not
   * @default false
   */
  isLegendSelected: boolean;
  /**
   * contains the seleted legend string
   */
  activeLegend: string;
  /**
   * determines if the legend is hovered or not
   * @default false
   */
  isLegendHovered: boolean;
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
  public constructor(props: IHeatMapChartProps) {
    super(props);
    this._xAxisType = getTypeOfAxis(props.data[0].data[0].x, true) as XAxisTypes;
    this._yAxisType = getTypeOfAxis(props.data[0].data[0].y, false) as YAxisType;
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
      isLegendSelected: false,
      activeLegend: '',
      isLegendHovered: false,
      isCalloutVisible: false,
      target: null,
      calloutLegend: '',
      calloutTextColor: '',
      calloutYValue: '',
      ratio: null,
      descriptionMessage: '',
      calloutId: '',
    };
  }
  public render(): React.ReactNode {
    const {
      data,
      xAxisDateFormatString,
      xAxisNumberFormatString,
      yAxisDateFormatString,
      yAxisNumberFormatString,
    } = this.props;
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
      directionalHint: DirectionalHint.bottomLeftEdge,
    };
    const chartHoverProps: IModifiedCartesianChartProps['chartHoverProps'] = {
      ...(this.state.ratio && {
        ratio: this.state.ratio,
      }),
      descriptionMessage: this.state.descriptionMessage,
    };
    return (
      <CartesianChart
        {...this.props}
        points={data}
        chartType={ChartTypes.HeatMapChart}
        xAxisType={XAxisTypes.StringAxis}
        yAxisType={YAxisType.StringAxis}
        calloutProps={calloutProps}
        chartHoverProps={chartHoverProps}
        styles={this._classNames.subComponentStyles!.cartesianStyles}
        datasetForXAxisDomain={this._stringXAxisDataPoints}
        stringDatasetForYAxisDomain={this._stringYAxisDataPoints}
        xAxisTickCount={this._stringXAxisDataPoints.length}
        xAxistickSize={0}
        xAxisPadding={0.02}
        yAxisPadding={0.02}
        svgFocusZoneProps={{
          direction: FocusZoneDirection.bidirectional,
        }}
        legendBars={this._createLegendBars()}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          this._xAxisScale = props.xScale;
          this._yAxisScale = props.yScale;
          return this._createRectangles();
        }}
      />
    );
  }

  private _getOpacity = (legendTitle: string): string => {
    let shouldHighlight = true;
    if (this.state.isLegendHovered || this.state.isLegendSelected) {
      shouldHighlight = legendTitle === this.state.activeLegend;
    }
    return shouldHighlight ? '1' : '0.1';
  };

  private _rectRefCallback = (rectElement: SVGGElement, index: number | string, dataPointObject: FlattenData): void => {
    this._rectRefArray[index] = { data: dataPointObject, refElement: rectElement };
  };

  private _onRectFocus = (id: string, data: FlattenData): void => {
    this.setState({
      target: this._rectRefArray[id].refElement,
      isCalloutVisible: true,
      calloutYValue: `${data.rectText}`,
      calloutTextColor: this._colorScale(data.value),
      calloutLegend: data.legend,
      ratio: data.ratio || null,
      descriptionMessage: data.descriptionMessage || '',
      calloutId: id,
    });
  };

  private _onRectMouseOver = (id: string, data: FlattenData, mouseEvent: React.MouseEvent<SVGGElement>): void => {
    mouseEvent.persist();
    this.setState({
      target: this._rectRefArray[id].refElement,
      isCalloutVisible: true,
      calloutYValue: `${data.rectText}`,
      calloutTextColor: this._colorScale(data.value),
      calloutLegend: data.legend,
      ratio: data.ratio || null,
      descriptionMessage: data.descriptionMessage || '',
      calloutId: id,
    });
  };

  private _onRectBlurOrMouseOut = (): void => {
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
    yAxisDataPoints.forEach((yAxisDataPoint: string, index1: number) => {
      /**
       * dataPointObject is an object where it contains information on single
       * data point such as x, y , value, rectText property of the rectangle
       */
      this._dataSet[yAxisDataPoint].forEach((dataPointObject: FlattenData, index2: number) => {
        const id = `${index1}${index2}`;
        const rectElement: JSX.Element = (
          <g
            key={id}
            {...(this.state.calloutId && {
              'aria-labelledby': `${this.state.calloutId}`,
            })}
            data-is-focusable={true}
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
            />
            <text
              dominantBaseline={'middle'}
              textAnchor={'middle'}
              className={this._classNames.text}
              transform={`translate(${this._xAxisScale.bandwidth() / 2}, ${this._yAxisScale.bandwidth() / 2})`}
            >
              {dataPointObject.rectText}
            </text>
          </g>
        );
        rectangles.push(rectElement);
      });
    });
    return rectangles;
  };
  /**
   * when the legend is hovered we need to highlight
   * all the rectangles which fall under that category
   * and un-highlight the rest of them, this functionality
   * should happen only when there no legend Selected
   * @param legendTitle
   */
  private _onLegendHover = (legendTitle: string): void => {
    if (this.state.isLegendSelected === false) {
      this.setState({
        activeLegend: legendTitle,
        isLegendHovered: true,
      });
    }
  };

  /**
   * when the mouse is out from the legend , we need
   * to show the graph in initial mode. isLegendFocused will
   * be useful at the scenario where mouseout happend for
   * the legends which are in overflow card
   * @param isLegendFocused
   */
  private _onLegendLeave = (isLegendFocused?: boolean): void => {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        activeLegend: '',
        isLegendHovered: false,
        isLegendSelected: isLegendFocused ? false : this.state.isLegendSelected,
      });
    }
  };
  /**
   * @param legendTitle
   * when the legend is clicked we need to highlight
   * all the rectangles which fall under that category
   * and un highlight the rest of them
   */
  private _onLegendClick = (legendTitle: string): void => {
    /**
     * check if the legend is already selceted,
     * if yes, then check if the consumer has clicked already
     * seleceted legend if yes un-select the legend, else
     * set the acitve legend state to legendTitle
     *
     * if legend is not alredy selceted, simply set the isLegendSelected to true
     * and the active legend to the legendTitle of selected legend
     */
    if (this.state.isLegendSelected) {
      if (this.state.activeLegend === legendTitle) {
        this.setState({
          activeLegend: '',
          isLegendSelected: false,
        });
      } else {
        this.setState({ activeLegend: legendTitle });
      }
    } else {
      this.setState({
        activeLegend: legendTitle,
        isLegendSelected: true,
        isLegendHovered: false,
      });
    }
  };
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
          this._onLegendHover(item.legend);
        },
        onMouseOutAction: (isLegendSelected?: boolean) => {
          this._onLegendLeave(isLegendSelected);
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
      .range((rangeValuesForColorScale as unknown) as number[]);
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
    return d3TimeFormat.timeFormat(formatString || '%b/%d')(date);
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
}
