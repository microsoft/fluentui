import * as React from 'react';
import { HeatMapChartProps } from './HeatMapChart.types';
import {
  AccessibilityProps,
  Chart,
  HeatMapChartData,
  HeatMapChartDataPoint,
  Margins,
  ImageExportOptions,
} from '../../types/index';
import {
  ChartTypes,
  getAccessibleDataObject,
  getColorContrast,
  getTypeOfAxis,
  resolveCSSVariables,
  XAxisTypes,
  YAxisType,
  createNumericYAxis,
  IMargins,
  IDomainNRange,
  domainRangeOfXStringAxis,
  createStringYAxis,
  useRtl,
  sortAxisCategories,
} from '../../utilities/index';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { CartesianChart, ChartPopoverProps, ChildProps } from '../CommonComponents/index';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useHeatMapChartStyles } from './useHeatMapChartStyles.styles';
import { Legend, Legends, LegendContainer } from '../Legends/index';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { format as d3Format } from 'd3-format';
import { timeFormat as d3TimeFormat } from 'd3-time-format';
import { toImage } from '../../utilities/image-export-utils';

type DataSet = {
  dataSet: RectanglesGraphData;
  yAxisPoints: string[];
  xAxisPoints: string[];
};
type FlattenData = HeatMapChartDataPoint & {
  legend: string;
};
type RectanglesGraphData = { [key: string]: FlattenData[] };

export const HeatMapChart: React.FunctionComponent<HeatMapChartProps> = React.forwardRef<
  HTMLDivElement,
  HeatMapChartProps
>(
  (
    props = {
      xAxisCategoryOrder: 'default',
      yAxisCategoryOrder: 'default',
      data: [],
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    },
    forwardedRef,
  ) => {
    const classes = useHeatMapChartStyles(props);
    const _stringXAxisDataPoints = React.useRef<string[]>([]);
    const _stringYAxisDataPoints = React.useRef<string[]>([]);
    const _dataSet = React.useRef<RectanglesGraphData>({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _colorScale = React.useRef<any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _xAxisScale = React.useRef<any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _yAxisScale = React.useRef<any>();
    const _xAxisType = React.useRef<XAxisTypes>();
    const _yAxisType = React.useRef<YAxisType>();
    const _calloutAnchorPoint = React.useRef<FlattenData | null>(null);
    const _emptyChartId = useId('_HeatMap_empty');
    const _margins = React.useRef<Margins>({});
    const cartesianChartRef = React.useRef<Chart>(null);
    const _legendsRef = React.useRef<LegendContainer>(null);
    const _isRtl = useRtl();

    const [selectedLegend, setSelectedLegend] = React.useState<string>('');
    const [activeLegend, setActiveLegend] = React.useState<string>('');
    const [isPopoverOpen, setPopoverOpen] = React.useState<boolean>(false);
    const [calloutLegend, setCalloutLegend] = React.useState<string>('');
    const [calloutTextColor, setCalloutTextColor] = React.useState<string>('');
    const [calloutYValue, setCalloutYValue] = React.useState<string>('');
    const [ratio, setRatio] = React.useState<[number, number]>();
    const [descriptionMessage, setDescriptionMessage] = React.useState<string>('');
    const [callOutAccessibilityData, setCallOutAccessibilityData] = React.useState<AccessibilityProps>();
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });

    React.useImperativeHandle(
      props.componentRef,
      () => ({
        chartContainer: cartesianChartRef.current?.chartContainer ?? null,
        toImage: (opts?: ImageExportOptions): Promise<string> => {
          return toImage(cartesianChartRef.current?.chartContainer, _legendsRef.current?.toSVG, _isRtl, opts);
        },
      }),
      [],
    );

    function _getMinMaxOfYAxis() {
      return { startValue: 0, endValue: 0 };
    }

    function _getDomainNRangeValues(
      points: HeatMapChartDataPoint[],
      margins: IMargins,
      width: number,
      chartType: ChartTypes,
      isRTL: boolean,
      xAxisType: XAxisTypes,
      barWidth: number,
      tickValues: Date[] | number[] | undefined,
      shiftX: number,
    ) {
      let domainNRangeValue: IDomainNRange;
      if (xAxisType === XAxisTypes.NumericAxis || xAxisType === XAxisTypes.DateAxis) {
        domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
      } else {
        domainNRangeValue = domainRangeOfXStringAxis(_margins.current, width, isRTL);
      }
      return domainNRangeValue;
    }

    const _getXandY = (): { x: string | Date | number; y: string | Date | number } => {
      let x: string | Date | number = '';
      let y: string | Date | number = '';
      props.data.forEach((item: HeatMapChartData) => {
        if (item.data && item.data.length > 0) {
          x = item.data[0].x;
          y = item.data[0].y;
          return { x, y };
        }
      });
      return { x, y };
    };

    const _getMargins = (margins: Margins) => {
      _margins.current = margins;
    };

    const _getOpacity = (legendTitle: string): string => {
      const opacity = _legendHighlighted(legendTitle) || _noLegendHighlighted() ? '1' : '0.1';
      return opacity;
    };

    const _onRectFocus = (id: string, data: FlattenData, focusEvent: React.FocusEvent<SVGGElement>): void => {
      const boundingRect = focusEvent.currentTarget.getBoundingClientRect();
      const clientX = boundingRect.left + boundingRect.width / 2;
      const clientY = boundingRect.top + boundingRect.height / 2;
      updatePosition(clientX, clientY);
      /** Show the callout if highlighted rectangle is focused and Hide it if unhighlighted rectangle is focused */
      setPopoverOpen(selectedLegend === '' || selectedLegend === data.legend);
      setCalloutYValue(`${data.rectText}`);
      setCalloutTextColor(Number.isNaN(data.value) ? tokens.colorNeutralForeground1 : _colorScale.current(data.value));
      setCalloutLegend(data.legend);
      setRatio(data.ratio);
      setDescriptionMessage(data.descriptionMessage || '');
      setCallOutAccessibilityData(data.callOutAccessibilityData);
    };

    const _onRectMouseOver = (id: string, data: FlattenData, mouseEvent: React.MouseEvent<SVGGElement>): void => {
      mouseEvent.persist();
      if (_calloutAnchorPoint.current !== data) {
        _calloutAnchorPoint.current = data;
        updatePosition(mouseEvent.clientX, mouseEvent.clientY);
        /** Show the callout if highlighted rectangle is hovered and Hide it if unhighlighted rectangle is hovered */
        setPopoverOpen(selectedLegend === '' || selectedLegend === data.legend);
        setCalloutYValue(`${data.rectText}`);
        setCalloutTextColor(
          Number.isNaN(data.value) ? tokens.colorNeutralForeground1 : _colorScale.current(data.value),
        );
        setCalloutLegend(data.legend);
        setRatio(data.ratio);
        setDescriptionMessage(data.descriptionMessage || '');
        setCallOutAccessibilityData(data.callOutAccessibilityData);
      }
    };

    const _onRectBlurOrMouseOut = (): void => {
      /**/
    };

    const _handleChartMouseLeave = (): void => {
      _calloutAnchorPoint.current = null;
      setPopoverOpen(false);
    };

    const _getInvertedTextColor = (color: string): string => {
      return color === tokens.colorNeutralForeground1 ? tokens.colorNeutralBackground1 : tokens.colorNeutralForeground1;
    };

    /**
     * This is the function which is responsible for
     * drawing the rectangle in the graph and also
     * attaching dom events to that rectangles
     */
    const _createRectangles = (): React.ReactNode => {
      const rectangles: JSXElement[] = [];
      const yAxisDataPoints = _stringYAxisDataPoints.current.slice().reverse();
      /**
       * yAxisDataPoint is noting but the DataPoint
       * which will be rendered on the y-axis
       */
      yAxisDataPoints.forEach((yAxisDataPoint: string) => {
        let index = 0;
        _stringXAxisDataPoints.current.forEach((xAxisDataPoint: string) => {
          let rectElement: JSXElement;
          const id = `x${xAxisDataPoint}y${yAxisDataPoint}`;
          if (
            _dataSet.current[yAxisDataPoint][index]?.x === xAxisDataPoint &&
            typeof _dataSet.current[yAxisDataPoint][index]?.value === 'number'
          ) {
            /**
             * dataPointObject is an object where it contains information on single
             * data point such as x, y , value, rectText property of the rectangle
             */
            const dataPointObject = _dataSet.current[yAxisDataPoint][index];
            let styleRules = '';
            let foregroundColor = tokens.colorNeutralForeground1;
            if (cartesianChartRef.current?.chartContainer) {
              styleRules = resolveCSSVariables(cartesianChartRef.current.chartContainer, foregroundColor);
            }
            const contrastRatio = getColorContrast(styleRules, _colorScale.current(dataPointObject.value));
            if (contrastRatio < 3) {
              foregroundColor = _getInvertedTextColor(foregroundColor);
            }
            rectElement = (
              <g
                key={id}
                role="img"
                aria-label={_getAriaLabel(dataPointObject)}
                tabIndex={_legendHighlighted(dataPointObject.legend) || _noLegendHighlighted() ? 0 : -1}
                fillOpacity={_getOpacity(dataPointObject.legend)}
                transform={`translate(${_xAxisScale.current(dataPointObject.x)}, ${_yAxisScale.current(
                  dataPointObject.y,
                )})`}
                onFocus={e => _onRectFocus(id, dataPointObject, e)}
                onBlur={_onRectBlurOrMouseOut}
                onMouseOver={e => _onRectMouseOver(id, dataPointObject, e)}
                onMouseOut={_onRectBlurOrMouseOut}
              >
                <rect
                  fill={_colorScale.current(dataPointObject.value)}
                  width={_xAxisScale.current.bandwidth()}
                  height={_yAxisScale.current.bandwidth()}
                  onClick={dataPointObject.onClick}
                />
                <text
                  dominantBaseline={'middle'}
                  textAnchor={'middle'}
                  className={classes.text}
                  transform={`translate(${_xAxisScale.current.bandwidth() / 2}, ${
                    _yAxisScale.current.bandwidth() / 2
                  })`}
                  fill={foregroundColor}
                >
                  {formatToLocaleString(dataPointObject.rectText, props.culture, props.useUTC) as React.ReactNode}
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
                aria-label={_getAriaLabel(dataPointObject)}
                tabIndex={_noLegendHighlighted() ? 0 : -1}
                transform={`translate(${_xAxisScale.current(dataPointObject.x)}, ${_yAxisScale.current(
                  dataPointObject.y,
                )})`}
                onFocus={e => _onRectFocus(id, dataPointObject, e)}
                onBlur={_onRectBlurOrMouseOut}
                onMouseOver={e => _onRectMouseOver(id, dataPointObject, e)}
                onMouseOut={_onRectBlurOrMouseOut}
              >
                <rect
                  fill="transparent"
                  width={_xAxisScale.current.bandwidth()}
                  height={_yAxisScale.current.bandwidth()}
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
    const _onLegendHover = (legendTitle: string): void => {
      setActiveLegend(legendTitle);
    };

    /**
     * when the mouse is out from the legend , we need
     * to show the graph in initial mode.
     */
    const _onLegendLeave = (): void => {
      setActiveLegend('');
    };
    /**
     * @param legendTitle
     * when the legend is clicked we need to highlight
     * all the rectangles which fall under that category
     * and un highlight the rest of them
     */
    const _onLegendClick = (legendTitle: string): void => {
      /**
       * check if the legend is already selceted,
       * if yes, un-select the legend, else
       * set the selected legend state to legendTitle
       */
      if (selectedLegend === legendTitle) {
        setSelectedLegend('');
      } else {
        setSelectedLegend(legendTitle);
      }
    };
    const _createLegendBars = (): JSXElement => {
      const { data, legendProps } = props;
      const legends: Legend[] = [];
      data.forEach((item: HeatMapChartData) => {
        const legend: Legend = {
          title: item.legend,
          color: _colorScale.current(item.value),
          action: () => {
            _onLegendClick(item.legend);
          },
          hoverAction: () => {
            _handleChartMouseLeave();
            _onLegendHover(item.legend);
          },
          onMouseOutAction: () => {
            _onLegendLeave();
          },
        };
        legends.push(legend);
      });
      return <Legends {...legendProps} legends={legends} legendRef={_legendsRef} />;
    };

    const _getColorScale = () => {
      const { domainValuesForColorScale, rangeValuesForColorScale } = props;
      return d3ScaleLinear()
        .domain(domainValuesForColorScale)
        .range(rangeValuesForColorScale as unknown as number[]);
    };

    const _getXIndex = (value: string | Date | number): string => {
      if (_xAxisType.current === XAxisTypes.DateAxis) {
        return `${(value as Date).getTime()}`;
      } else if (_xAxisType.current === XAxisTypes.StringAxis) {
        return value as string;
      } else if (_xAxisType.current === XAxisTypes.NumericAxis) {
        return `${value}`;
      } else {
        return '';
      }
    };
    const _getYIndex = (value: string | Date | number): string => {
      if (_yAxisType.current === YAxisType.DateAxis) {
        return `${(value as Date).getTime()}`;
      } else if (_yAxisType.current === YAxisType.StringAxis) {
        return value as string;
      } else if (_yAxisType.current === YAxisType.NumericAxis) {
        return `${value}`;
      } else {
        return '';
      }
    };

    const { xAxisStringFormatter } = props;
    const _getFormattedLabelForXAxisDataPoint = React.useCallback(
      (point: string): string => {
        return xAxisStringFormatter ? xAxisStringFormatter(point) : point;
      },
      [xAxisStringFormatter],
    );

    const { yAxisStringFormatter } = props;
    const _getFormattedLabelForYAxisDataPoint = React.useCallback(
      (point: string): string => {
        return yAxisStringFormatter ? yAxisStringFormatter(point) : point;
      },
      [yAxisStringFormatter],
    );

    /**
     * This function will return the final sorted and formatted x-axis points
     * which will be rendered on the x-axis
     * @param points
     * @returns x-axis points
     */
    const _getXAxisDataPoints = React.useCallback(
      (points: { [key: string]: '1' }): string[] => {
        let xAxisPoints: string[] = [];
        const unFormattedXAxisDataPoints = _getOrderedXAxisLabels(points);
        xAxisPoints = unFormattedXAxisDataPoints.map((xPoint: string) => {
          if (_xAxisType.current === XAxisTypes.DateAxis) {
            return _getStringFormattedDate(xPoint, props.xAxisDateFormatString);
          } else if (_xAxisType.current === XAxisTypes.NumericAxis) {
            return _getStringFormattedNumber(xPoint, props.xAxisNumberFormatString);
          } else {
            return _getFormattedLabelForXAxisDataPoint(xPoint);
          }
        });

        return xAxisPoints;
      },
      [
        _getFormattedLabelForXAxisDataPoint,
        props.sortOrder,
        props.xAxisDateFormatString,
        props.xAxisNumberFormatString,
      ],
    );

    /**
     * This function will return the final sorted and formatted y-axis points
     * which will be rendered on the y-axis
     * @param points
     * @returns yaxis points
     */
    const _getYAxisDataPoints = React.useCallback(
      (points: { [key: string]: '1' }): string[] => {
        let yAxisPoints: string[] = [];
        const unFormattedYAxisDataPoints = _getOrderedYAxisLabels(points);
        yAxisPoints = unFormattedYAxisDataPoints.map((yPoint: string) => {
          if (_yAxisType.current === YAxisType.DateAxis) {
            return _getStringFormattedDate(yPoint, props.yAxisDateFormatString);
          } else if (_yAxisType.current === YAxisType.NumericAxis) {
            return _getStringFormattedNumber(yPoint, props.yAxisNumberFormatString);
          } else {
            return _getFormattedLabelForYAxisDataPoint(yPoint);
          }
        });

        return yAxisPoints;
      },
      [
        _getFormattedLabelForYAxisDataPoint,
        props.sortOrder,
        props.yAxisDateFormatString,
        props.yAxisNumberFormatString,
      ],
    );

    /**
     * This will create a new data set based on the prop
     * @data
     * We will be using This data set to contsruct our rectangles
     * in the chart, we use this data set becuase, when we loop in this
     * data and build the heat map, it will support accessibility as
     * specified in the figma
     */

    const _createNewDataSet = React.useCallback(
      (
        data: HeatMapChartData[],
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
        data.forEach((item: HeatMapChartData) => {
          item.data.forEach((point: HeatMapChartDataPoint) => {
            flattenData.push({ ...point, legend: item.legend });
          });
        });
        const yPoints: RectanglesGraphData = {};
        const uniqueYPoints: { [key: string]: '1' } = {};
        const uniqueXPoints: { [key: string]: '1' } = {};
        flattenData.forEach((item: FlattenData) => {
          const posX = _getXIndex(item.x);
          const posY = _getYIndex(item.y);

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
          yPoints[item] = _getOrderedXPoints(yPoints[item]);

          yPoints[item].forEach((datapoint: HeatMapChartDataPoint) => {
            if (_xAxisType.current === XAxisTypes.DateAxis) {
              datapoint.x = _getStringFormattedDate(datapoint.x as string, xAxisDateFormatString);
            }
            if (_xAxisType.current === XAxisTypes.NumericAxis) {
              datapoint.x = _getStringFormattedNumber(datapoint.x as string, xAxisNumberFormatString);
            }
            if (_xAxisType.current === XAxisTypes.StringAxis) {
              datapoint.x = _getFormattedLabelForXAxisDataPoint(datapoint.x as string);
            }
            if (_yAxisType.current === YAxisType.DateAxis) {
              datapoint.y = _getStringFormattedDate(datapoint.y as string, yAxisDateFormatString);
            }
            if (_yAxisType.current === YAxisType.NumericAxis) {
              datapoint.y = _getStringFormattedNumber(datapoint.y as string, yAxisNumberFormatString);
            }
            if (_yAxisType.current === YAxisType.StringAxis) {
              datapoint.y = _getFormattedLabelForYAxisDataPoint(datapoint.y as string);
            }
          });
        });
        /**
         * if  y-axis data points are of type date or number or if we have string formatter,
         * then we need to change data points  to their respective string
         * format, becuase in the private variable _stringYAxisDatapoints, points will be stored in
         * string format. and in here `yPoint` are not so we need to change, so that
         * function `_createRectangles` should work perfetcly while looping, and  if we don't change
         * then `_createRectangles` will fail while looping, causing the error
         * Cannot read property 'forEach' of undefined
         */

        Object.keys(yPoints).forEach((yPoint: string) => {
          if (_yAxisType.current === YAxisType.DateAxis) {
            yPoints[_getStringFormattedDate(yPoint, yAxisDateFormatString)] = yPoints[yPoint];
          } else if (_yAxisType.current === YAxisType.NumericAxis) {
            yPoints[`${_getStringFormattedNumber(yPoint, yAxisNumberFormatString)}`] = yPoints[yPoint];
          } else {
            yPoints[_getFormattedLabelForYAxisDataPoint(yPoint)] = yPoints[yPoint];
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
        const yAxisPoints = _getYAxisDataPoints(uniqueYPoints);
        /**
         * These are the x axis data points which will get rendered in the
         * x axis in the graph
         */

        const xAxisPoints = _getXAxisDataPoints(uniqueXPoints);
        return {
          dataSet,
          yAxisPoints,
          xAxisPoints,
        };
      },
      [
        _getFormattedLabelForXAxisDataPoint,
        _getFormattedLabelForYAxisDataPoint,
        _getXAxisDataPoints,
        _getYAxisDataPoints,
        props.sortOrder,
      ],
    );

    const _getStringFormattedDate = (point: string, formatString?: string): string => {
      const date = new Date();
      date.setTime(+point);
      return d3TimeFormat(formatString || '%b/%d')(date);
    };

    const _getStringFormattedNumber = (point: string, formatString?: string): string => {
      return d3Format(formatString || '.2~s')(+point);
    };

    /**
     * This function checks if the given legend is highlighted or not.
     * A legend can be highlighted in 2 ways:
     * 1. selection: if the user clicks on it
     * 2. hovering: if there is no selected legend and the user hovers over it
     */
    const _legendHighlighted = (legendTitle: string) => {
      return selectedLegend === legendTitle || (selectedLegend === '' && activeLegend === legendTitle);
    };

    /**
     * This function checks if none of the legends is selected or hovered.
     */
    const _noLegendHighlighted = () => {
      return selectedLegend === '' && activeLegend === '';
    };

    const _getAriaLabel = (point: FlattenData): string => {
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

    const _isChartEmpty = (): boolean => {
      return !(props.data && props.data.length > 0);
    };

    const _getChartTitle = (): string => {
      const { chartTitle } = props;
      const numDataPoints = props.data.reduce((acc, curr) => acc + curr.data.length, 0);
      return (chartTitle ? `${chartTitle}. ` : '') + `Heat map chart with ${numDataPoints} data points. `;
    };

    const _getOrderedXAxisLabels = (points: { [key: string]: '1' }) => {
      if (!_shouldOrderXAxisLabelsByCategoryOrder()) {
        // Keep the original ordering logic as the default behavior to ensure backward compatibility
        return Object.keys(points).sort((a: string, b: string) => {
          if (_xAxisType.current === XAxisTypes.DateAxis || _xAxisType.current === XAxisTypes.NumericAxis) {
            return +a - +b;
          } else {
            return props.sortOrder === 'none' ? 0 : a.toLowerCase() > b.toLowerCase() ? 1 : -1;
          }
        });
      }

      return sortAxisCategories(_mapCategoryToValues(), props.xAxisCategoryOrder);
    };

    const _getOrderedYAxisLabels = (points: { [key: string]: '1' }) => {
      if (!_shouldOrderYAxisLabelsByCategoryOrder()) {
        // Keep the original ordering logic as the default behavior to ensure backward compatibility
        return Object.keys(points).sort((a: string, b: string) => {
          if (_yAxisType.current === YAxisType.DateAxis || _yAxisType.current === YAxisType.NumericAxis) {
            return +a - +b;
          } else {
            return props.sortOrder === 'none' ? 0 : a.toLowerCase() > b.toLowerCase() ? 1 : -1;
          }
        });
      }

      return sortAxisCategories(_mapCategoryToValues(true), props.yAxisCategoryOrder);
    };

    const _getOrderedXPoints = (xPoints: FlattenData[]) => {
      if (!_shouldOrderXAxisLabelsByCategoryOrder()) {
        return xPoints.sort((a: HeatMapChartDataPoint, b: HeatMapChartDataPoint) => {
          if (_xAxisType.current === XAxisTypes.StringAxis) {
            return props.sortOrder === 'none'
              ? 0
              : (a.x as string).toLowerCase() > (b.x as string).toLowerCase()
              ? 1
              : -1;
          } else if (_xAxisType.current === XAxisTypes.DateAxis) {
            return (a.x as Date).getTime() - (b.x as Date).getTime();
          } else if (_xAxisType.current === XAxisTypes.NumericAxis) {
            return +(a.x as string) > +(b.x as string) ? 1 : -1;
          } else {
            return a.x > b.x ? 1 : -1;
          }
        });
      }

      const result: FlattenData[] = [];

      const xValueToPoints: Record<string, FlattenData[]> = {};
      xPoints.forEach(point => {
        const xValue = point.x as string;
        if (!xValueToPoints[xValue]) {
          xValueToPoints[xValue] = [];
        }
        xValueToPoints[xValue].push(point);
      });

      const xAxisLabels = _getOrderedXAxisLabels({});
      xAxisLabels.forEach(xValue => {
        if (xValueToPoints[xValue]) {
          result.push(...xValueToPoints[xValue]);
        }
      });

      return result;
    };

    const _shouldOrderXAxisLabelsByCategoryOrder = () => {
      return _xAxisType.current === XAxisTypes.StringAxis && props.xAxisCategoryOrder !== 'default';
    };

    const _shouldOrderYAxisLabelsByCategoryOrder = () => {
      return _yAxisType.current === YAxisType.StringAxis && props.yAxisCategoryOrder !== 'default';
    };

    const _mapCategoryToValues = (isYAxis = false) => {
      const categoryToValues: Record<string, number[]> = {};
      props.data.forEach(item => {
        item.data.forEach(point => {
          const category = (isYAxis ? point.y : point.x) as string;
          if (!categoryToValues[category]) {
            categoryToValues[category] = [];
          }
          categoryToValues[category].push(point.value);
        });
      });
      return categoryToValues;
    };

    const updatePosition = (newX: number, newY: number) => {
      const threshold = 1; // Set a threshold for movement
      const { x, y } = clickPosition;
      // Calculate the distance moved
      const distance = Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2));
      // Update the position only if the distance moved is greater than the threshold
      if (distance > threshold) {
        setClickPosition({ x: newX, y: newY });
      }
    };

    const { x, y } = _getXandY();
    _xAxisType.current = getTypeOfAxis(x, true) as XAxisTypes;
    _yAxisType.current = getTypeOfAxis(y, false) as YAxisType;
    const { data, xAxisDateFormatString, xAxisNumberFormatString, yAxisDateFormatString, yAxisNumberFormatString } =
      props;
    _colorScale.current = _getColorScale();
    const { dataSet, xAxisPoints, yAxisPoints } = React.useMemo(
      () =>
        _createNewDataSet(
          data,
          xAxisDateFormatString,
          xAxisNumberFormatString,
          yAxisDateFormatString,
          yAxisNumberFormatString,
        ),
      [
        _createNewDataSet,
        data,
        xAxisDateFormatString,
        xAxisNumberFormatString,
        yAxisDateFormatString,
        yAxisNumberFormatString,
      ],
    );
    _dataSet.current = dataSet;
    _stringYAxisDataPoints.current = yAxisPoints;
    _stringXAxisDataPoints.current = xAxisPoints;
    const calloutProps: ChartPopoverProps = {
      ...props.calloutProps,
      isPopoverOpen,
      YValue: calloutYValue,
      legend: calloutLegend,
      color: calloutTextColor,
      ratio,
      descriptionMessage,
      clickPosition,
      ...getAccessibleDataObject(callOutAccessibilityData, 'text', false),
      styles: {
        calloutContentRoot: classes.calloutContentRoot!,
      },
    };
    const tickParams = {
      tickValues: props.tickValues,
      tickFormat: props.tickFormat,
    };
    return !_isChartEmpty() ? (
      <CartesianChart
        {...props}
        chartTitle={_getChartTitle()}
        points={data}
        chartType={ChartTypes.HeatMapChart}
        xAxisType={XAxisTypes.StringAxis}
        yAxisType={YAxisType.StringAxis}
        calloutProps={calloutProps}
        createYAxis={createNumericYAxis}
        datasetForXAxisDomain={_stringXAxisDataPoints.current}
        stringDatasetForYAxisDomain={_stringYAxisDataPoints.current}
        createStringYAxis={createStringYAxis}
        getDomainNRangeValues={_getDomainNRangeValues}
        getMinMaxOfYAxis={_getMinMaxOfYAxis}
        getmargins={_getMargins}
        xAxisTickCount={_stringXAxisDataPoints.current.length}
        xAxistickSize={0}
        xAxisPadding={0.02}
        yAxisPadding={0.02}
        legendBars={_createLegendBars()}
        onChartMouseLeave={_handleChartMouseLeave}
        componentRef={cartesianChartRef}
        tickParams={tickParams}
        /* eslint-disable react/jsx-no-bind */
        children={(p: ChildProps) => {
          _xAxisScale.current = p.xScale;
          _yAxisScale.current = p.yScalePrimary;
          return _createRectangles();
        }}
      />
    ) : (
      <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  },
);
