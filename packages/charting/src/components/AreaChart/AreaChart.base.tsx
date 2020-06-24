import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { area as d3Area, stack as d3Stack, curveMonotoneX as d3CurveBasis } from 'd3-shape';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, IPalette, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { IAreaChartProps, IAreaChartStyleProps, IAreaChartStyles } from './AreaChart.types';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, Legends } from '../Legends/index';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

import { IAreaChartDataSetPoint, ILineChartDataPoint, ILineChartPoints } from '../../types/index';

import { createNumericXAxis, createDateXAxis, createYAxis } from '../../utilities/index';

const getClassNames = classNamesFunction<IAreaChartStyleProps, IAreaChartStyles>();

export interface IRefArrayData {
  legendText?: string;
  refElement?: SVGGElement;
}

export interface IDPointType {
  index: number;
  point: {
    values: { 0: number; 1: number; data: {} };
    xVal: number;
  };
}

export interface IAreaChartState {
  _width: number;
  _height: number;
  activeLegend: string;
  color: string;
  containerWidth: number;
  containerHeight: number;
  dataForHoverCard: number;
  isCalloutVisible: boolean;
  isLegendSelected: boolean;
  isLegendHovered: boolean;
  titleForHoverCard: string;
  // tslint:disable-next-line:no-any
  refSelected: any;
  YValueHover: { legend?: string; y?: number; color?: string }[];
  hoverYValue: string | number | null;
  hoverXValue: string | number | null;
  xCalloutValue?: string;
  yCalloutValue?: string;
}

export class AreaChartBase extends React.Component<IAreaChartProps, IAreaChartState> {
  // tslint:disable-next-line:no-any
  private _calloutPoints: any;
  private _points: ILineChartPoints[];
  private _classNames: IProcessedStyleSet<IAreaChartStyles>;
  private _reqID: number;
  // tslint:disable-next-line:no-any
  private dataSet: any;
  private _colors: string[];
  private _keys: string[];
  private _refArray: IRefArrayData[];
  private _yAxisTickCount: number;
  private _isGraphDraw: boolean = true;
  private _showXAxisPath: boolean;
  private _showYAxisPath: boolean;
  private xAxisElement: SVGElement | null;
  private yAxisElement: SVGElement | null;
  // tslint:disable-next-line:no-any
  private _yAxisTickFormat: any;
  private chartContainer: HTMLDivElement;
  private legendContainer: HTMLDivElement;
  private minLegendContainerHeight: number = 32;
  // These margins are necessary for d3Scales to appear without cutting off
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };

  public constructor(props: IAreaChartProps) {
    super(props);
    this.state = {
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      activeLegend: '',
      color: '',
      containerHeight: 0,
      containerWidth: 0,
      dataForHoverCard: 0,
      hoverYValue: '',
      hoverXValue: '',
      isCalloutVisible: false,
      isLegendSelected: false,
      isLegendHovered: false,
      refSelected: null,
      titleForHoverCard: '',
      YValueHover: [],
      xCalloutValue: '',
      yCalloutValue: '',
    };
    this._refArray = [];
    this._calloutPoints = this.CalloutData(this.props.data.lineChartData!)
      ? this.CalloutData(this.props.data.lineChartData!)
      : [];
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
    const legends: JSX.Element = this._getLegendData(this.props.theme!.palette);

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
        <FocusZone direction={FocusZoneDirection.horizontal}>
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
        </FocusZone>
        <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
          {legends}
        </div>
        {!this.props.hideTooltip && this.state.isCalloutVisible ? (
          <Callout
            target={this.state.refSelected}
            gapSpace={15}
            isBeakVisible={false}
            setInitialFocus={true}
            directionalHint={DirectionalHint.topRightEdge}
          >
            <div className={this._classNames.calloutContentRoot}>
              <div className={this._classNames.calloutDateTimeContainer}>
                <div className={this._classNames.calloutContentX}>{this.state.hoverXValue} </div>
              </div>
              <div className={this._classNames.calloutInfoContainer}>
                {this.state.YValueHover &&
                  this.state.YValueHover.map(
                    (
                      xValue: {
                        legend?: string;
                        y?: number;
                        color?: string;
                        yAxisCalloutData?: string;
                      },
                      index: number,
                    ) => (
                      <div
                        className={mergeStyles(this._classNames.calloutBlockContainer, {
                          borderLeft: `4px solid ${xValue.color}`,
                        })}
                      >
                        <div className={this._classNames.calloutlegendText}> {xValue.legend}</div>
                        <div className={this._classNames.calloutContentY}>
                          {xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y}
                        </div>
                      </div>
                    ),
                  )}
              </div>
            </div>
          </Callout>
        ) : null}
      </div>
    );
  }

  private CalloutData = (values: ILineChartPoints[]) => {
    let combinedResult: {
      legend: string;
      y: number;
      x: number | Date | string;
      color: string;
      yAxisCalloutData?: string;
    }[] = [];

    values.forEach((element: { data: ILineChartDataPoint[]; legend: string; color: string }) => {
      const elements = element.data.map((ele: ILineChartDataPoint) => {
        return { legend: element.legend, ...ele, color: element.color };
      });
      combinedResult = combinedResult.concat(elements);
    });

    const result: { x: number | Date | string; values: { legend: string; y: number }[] }[] = [];
    combinedResult.forEach(
      (
        e1: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string },
        index: number,
      ) => {
        e1.x = e1.x instanceof Date ? e1.x.toLocaleDateString() : e1.x;
        const filteredValues = [{ legend: e1.legend, y: e1.y, color: e1.color, yAxisCalloutData: e1.yAxisCalloutData }];
        combinedResult
          .slice(index + 1)
          .forEach(
            (e2: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string }) => {
              e2.x = e2.x instanceof Date ? e2.x.toLocaleDateString() : e2.x;
              if (e1.x === e2.x) {
                filteredValues.push({
                  legend: e2.legend,
                  y: e2.y,
                  color: e2.color,
                  yAxisCalloutData: e2.yAxisCalloutData,
                });
              }
            },
          );
        result.push({ x: e1.x, values: filteredValues });
      },
    );
    return this.getUnique(result, 'x');
  };

  private getUnique = (
    arr: { x: number | Date | string; values: { legend: string; y: number }[] }[],
    comp: string | number,
  ) => {
    const unique = arr
      // tslint:disable-next-line:no-any
      .map((e: { [x: string]: any }) => e[comp])
      // store the keys of the unique objects
      .map((e: string, i: number, final: string[]) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter((e: number) => arr[e])
      .map((e: number) => arr[e]);
    return unique;
  };

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;
    const { hideLegend = false } = this.props;

    this._reqID = requestAnimationFrame(() => {
      const legendContainerComputedStyles = getComputedStyle(this.legendContainer);
      const legendContainerHeight =
        (this.legendContainer.getBoundingClientRect().height || (!hideLegend ? this.minLegendContainerHeight : 0)) +
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
      this._isGraphDraw = true;
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || this.state.isLegendSelected === false) {
      this.setState({
        isLegendHovered: false,
        titleForHoverCard: '',
        isLegendSelected: !!isLegendFocused ? false : this.state.isLegendSelected,
      });
      this._isGraphDraw = true;
    }
  }

  private _getLegendData = (palette: IPalette): JSX.Element => {
    const data = this._points;
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];

    data.map((singleChartData: ILineChartPoints) => {
      // singleChartData.series.map((point: IGVBarChartSeriesPoint) => {
      const color: string = singleChartData.color
        ? singleChartData.color
        : defaultPalette[Math.floor(Math.random() * 4 + 1)];
      const checkSimilarLegends = actions.filter(
        (leg: ILegend) => leg.title === singleChartData.legend && leg.color === color,
      );
      if (checkSimilarLegends!.length > 0) {
        return;
      }

      const legend: ILegend = {
        title: singleChartData.legend,
        color: color,
        action: () => {
          this._onLegendClick(singleChartData.legend);
        },
        hoverAction: () => {
          this._onLegendHover(singleChartData.legend);
        },
        onMouseOutAction: (isLegendSelected?: boolean) => {
          this._onLegendLeave(isLegendSelected);
        },
      };

      actions.push(legend);
      // });
    });
    return (
      <Legends
        legends={actions}
        overflowProps={this.props.legendsOverflowProps}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
      />
    );
  };

  private updateLineAndCircles = (xLineVal: number, visibilityStatus: string) => {
    d3Select('#verticalLine').attr('x1', xLineVal);
    d3Select('#verticalLine').attr('x2', xLineVal);
    d3Select('#verticalLine').attr('visibility', visibilityStatus);
  };

  private onMouseHover = (target: SVGCircleElement, x: number | Date) => {
    const formattedDate = x instanceof Date ? x.toLocaleDateString() : x;
    const found = this._calloutPoints.find((element: { x: string | number }) => element.x === formattedDate);
    const presetnData = found.values[0];
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.titleForHoverCard === presetnData.legend)
    ) {
      this.setState({
        refSelected: target,
        isCalloutVisible: true,
        titleForHoverCard: presetnData.legend,
        dataForHoverCard: presetnData.y,
        hoverXValue: x instanceof Date ? x.toLocaleDateString() : x,
        YValueHover: found.values,
        color: presetnData.color,
      });
    }
  };

  private handleMouseAction = (xLineVal: number, x: number | Date, refArrayIndexNumber: number) => {
    d3Select(`#dot${refArrayIndexNumber}`)
      .attr('fill', '#fff')
      .attr('r', 8);
    this.updateLineAndCircles(xLineVal, 'visibility');
    this.onMouseHover(d3Event.target, x);
  };

  private mouseOutAction = (refArrayIndexNumber: number, color: string) => {
    this.updateLineAndCircles(0, 'hidden');
    d3Select(`#dot${refArrayIndexNumber}`)
      .attr('fill', color)
      .attr('r', 0.01);

    this.setState({
      isCalloutVisible: false,
    });
  };

  private onChartFocus = (target: SVGCircleElement, refArrayIndexNumber: number, x: number | Date) => {
    const formattedDate = x instanceof Date ? x.toLocaleDateString() : x;
    const found = this._calloutPoints.find((element: { x: string | number }) => element.x === formattedDate);
    const presentData = found.values[0];
    if (
      this.state.isLegendSelected === false ||
      (this.state.isLegendSelected && this.state.titleForHoverCard === presentData.legend)
    ) {
      this._refArray.map((obj: IRefArrayData, index: number) => {
        if (obj.legendText === presentData.legend && refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            titleForHoverCard: presentData.legend,
            dataForHoverCard: presentData.y,
            color: presentData.color,
            hoverXValue: x instanceof Date ? x.toLocaleDateString() : x, // change examples date type
            YValueHover: found.values,
          });
        }
      });
    }
  };

  private handleFocusAction = (
    xLineVal: number,
    x: number | Date,
    legendTitle: string,
    refArrayIndexNumber: number,
  ) => {
    this._refArray[refArrayIndexNumber] = { legendText: legendTitle, refElement: d3Event.target };
    d3Select(`#dot${refArrayIndexNumber}`)
      .attr('fill', '#fff')
      .attr('r', 8);
    this.updateLineAndCircles(xLineVal, 'visibility');
    this.onChartFocus(d3Event.target, refArrayIndexNumber, x);
  };

  private onDataPointClick = (func: () => void, refArrayIndexNumber: number, color: string) => {
    d3Select(`#dot${refArrayIndexNumber}`)
      .attr('fill', color)
      .attr('r', 8);
    if (!!func) {
      func();
    }
  };

  private _drawGraph = (): void => {
    d3Select('#firstGElementForChart').remove();
    const that = this;
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
      .enter();

    series
      .append('path')
      .style('fill', (d: string, i: number) => this._colors[i])
      .attr('stroke-width', 3)
      .attr('d', area);

    const points = chartContainer
      .selectAll('.dots')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('class', 'dots')
      .attr('d', area)
      .attr('clip-path', 'url(#clip)');

    points
      .selectAll('.dot')
      .data((point: [], index: number) => {
        // tslint:disable-next-line:no-any
        const formatedArr: any = [];
        point.map((subPoint: IDPointType) => {
          formatedArr.push({ point: subPoint, index: index });
        });
        return formatedArr;
      })
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('id', (d: IDPointType, index: number) => `dot${d.index * stackedData[0].length + index}`)
      .attr('focusable', true)
      .attr('data-is-focusable', true)
      .attr('cx', (d: IDPointType) => xScale(d.point.xVal))
      .attr('cy', (d: IDPointType) => yScale(d.point.values[1]))
      .attr('r', 0.01)
      .attr('stroke', (d: IDPointType, index: number) => this._points[d.index].color)
      .attr('stroke-width', 3)
      .attr('fill', (d: IDPointType, index: number) => this._points[d.index].color)
      .on('mouseover', (d: IDPointType, index: number) => {
        return that.handleMouseAction(xScale(d.point.xVal), d.point.xVal, d.index * stackedData[0].length + index);
      })
      .on('mouseout', (d: IDPointType, index: number) =>
        that.mouseOutAction(d.index * stackedData[0].length + index, this._points[d.index].color),
      )
      .on('focus', (d: IDPointType, index: number) => {
        const refArrayIndexNumber = d.index * stackedData[0].length + index;
        return that.handleFocusAction(
          xScale(d.point.xVal),
          d.point.xVal,
          this._points[d.index].legend,
          refArrayIndexNumber,
          // xAxisCalloutData: 65 // add these
        );
      })
      .on('blur', (d: IDPointType, index: number) =>
        that.mouseOutAction(d.index * stackedData[0].length + index, this._points[d.index].color),
      )
      .on('click', (d: IDPointType, index: number) =>
        that.onDataPointClick(
          this._points[d.index].data[index].onDataPointClick!,
          d.index * stackedData[0].length + index,
          this._points[d.index].color,
        ),
      );

    chartContainer
      .append('line')
      .attr('id', 'verticalLine')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', this.state.containerHeight)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .attr('visibility', 'hidden')
      .attr('stroke-dasharray', '5,5');
  };
}
