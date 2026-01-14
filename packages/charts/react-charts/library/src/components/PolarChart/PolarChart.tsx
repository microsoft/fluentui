'use client';

import * as React from 'react';
import { PolarChartProps } from './PolarChart.types';
import { usePolarChartStyles } from './usePolarChartStyles.styles';
import { useImageExport } from '../../utilities/hooks';
import {
  pointRadial as d3PointRadial,
  areaRadial as d3AreaRadial,
  lineRadial as d3LineRadial,
  curveLinearClosed as d3CurveLinearClosed,
} from 'd3-shape';
import { AreaPolarSeries, LinePolarSeries, PolarDataPoint, ScatterPolarSeries } from '../../types/DataPoint';
import { tokens } from '@fluentui/react-theme';
import { Legend, Legends } from '../Legends/index';
import {
  createRadialScale,
  getContinuousScaleDomain,
  getScaleType,
  EPSILON,
  createAngularScale,
  formatAngle,
} from './PolarChart.utils';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import {
  getColorFromToken,
  getCurveFactory,
  getNextColor,
  isPlottable,
  sortAxisCategories,
} from '../../utilities/index';
import { extent as d3Extent } from 'd3-array';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const DEFAULT_LEGEND_HEIGHT = 32;
const LABEL_WIDTH = 36;
const LABEL_HEIGHT = 16;
const LABEL_OFFSET = 10;
const TICK_SIZE = 6;
const MIN_MARKER_SIZE_PX = 2;
const MAX_MARKER_SIZE_PX = 16;
const MIN_MARKER_SIZE_PX_MARKERS_ONLY = 4;

export const PolarChart: React.FunctionComponent<PolarChartProps> = React.forwardRef<HTMLDivElement, PolarChartProps>(
  (props, forwardedRef) => {
    const { chartContainerRef, legendsRef } = useImageExport(props.componentRef, props.hideLegend, false);
    const legendContainerRef = React.useRef<HTMLDivElement>(null);
    const { targetDocument } = useFluent();
    const _window = targetDocument?.defaultView;

    const [containerWidth, setContainerWidth] = React.useState<number>(200);
    const [containerHeight, setContainerHeight] = React.useState<number>(200);
    const [legendContainerHeight, setLegendContainerHeight] = React.useState<number>(
      props.hideLegend ? 0 : DEFAULT_LEGEND_HEIGHT,
    );
    const [isPopoverOpen, setPopoverOpen] = React.useState<boolean>(false);
    const [popoverTarget, setPopoverTarget] = React.useState<SVGElement | null>(null);
    const [popoverXValue, setPopoverXValue] = React.useState<string>('');
    const [popoverLegend, setPopoverLegend] = React.useState<string>('');
    const [popoverColor, setPopoverColor] = React.useState<string>('');
    const [popoverYValue, setPopoverYValue] = React.useState<string>('');
    const [hoveredLegend, setHoveredLegend] = React.useState<string>('');
    const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
    const [activePoint, setActivePoint] = React.useState<string>('');

    React.useEffect(() => {
      if (chartContainerRef.current) {
        const { width, height } = chartContainerRef.current.getBoundingClientRect();
        setContainerWidth(width);
        setContainerHeight(height);
      }
    }, [chartContainerRef]);
    React.useEffect(() => {
      if (props.hideLegend) {
        setLegendContainerHeight(0);
      } else if (legendContainerRef.current) {
        const { height } = legendContainerRef.current.getBoundingClientRect();
        const marginTop = _window?.getComputedStyle(legendContainerRef.current).marginTop || '0px';
        setLegendContainerHeight(Math.max(height, DEFAULT_LEGEND_HEIGHT) + parseFloat(marginTop));
      }
    }, [props.hideLegend, _window]);

    React.useEffect(() => {
      setSelectedLegends(props.legendProps?.selectedLegends || []);
    }, [props.legendProps?.selectedLegends]);

    const margins = React.useMemo(
      () => ({
        left: LABEL_OFFSET + LABEL_WIDTH,
        right: LABEL_OFFSET + LABEL_WIDTH,
        top: LABEL_OFFSET + LABEL_HEIGHT,
        bottom: LABEL_OFFSET + LABEL_HEIGHT,
        ...props.margins,
      }),
      [props.margins],
    );

    const svgWidth = React.useMemo(() => props.width || containerWidth, [props.width, containerWidth]);
    const svgHeight = React.useMemo(
      () => (props.height || containerHeight) - legendContainerHeight,
      [props.height, containerHeight, legendContainerHeight],
    );
    const outerRadius = React.useMemo(
      () => Math.min(svgWidth - (margins.left + margins.right), svgHeight - (margins.top + margins.bottom)) / 2,
      [svgWidth, svgHeight, margins],
    );
    const innerRadius = React.useMemo(
      () => Math.max(0, Math.min(Math.abs(props.hole || 0), 1)) * outerRadius,
      [props.hole, outerRadius],
    );

    const legendColorMap = React.useRef<Record<string, string>>({});
    const chartData = React.useMemo(() => {
      legendColorMap.current = {};
      let colorIndex = 0;
      const renderingOrder = ['areapolar', 'linepolar', 'scatterpolar'];

      return props.data
        .map(series => {
          const seriesColor = series.color ? getColorFromToken(series.color) : getNextColor(colorIndex++, 0);
          if (!(series.legend in legendColorMap.current)) {
            legendColorMap.current[series.legend] = seriesColor;
          }

          return {
            ...series,
            color: seriesColor,
            data: series.data.map(point => {
              return {
                ...point,
                color: point.color ? getColorFromToken(point.color) : seriesColor,
              };
            }),
          };
        })
        .sort((a, b) => {
          return renderingOrder.indexOf(a.type) - renderingOrder.indexOf(b.type);
        });
    }, [props.data]);

    const mapCategoryToValues = React.useCallback(
      (isAngularAxis?: boolean) => {
        const categoryToValues: Record<string, number[]> = {};
        chartData.forEach(series => {
          series.data.forEach(point => {
            const category = (isAngularAxis ? point.theta : point.r) as string;
            if (!categoryToValues[category]) {
              categoryToValues[category] = [];
            }
            const value = isAngularAxis ? point.r : point.theta;
            if (typeof value === 'number') {
              categoryToValues[category].push(value);
            }
          });
        });
        return categoryToValues;
      },
      [chartData],
    );

    const getOrderedRCategories = React.useCallback(() => {
      return sortAxisCategories(mapCategoryToValues(), props.radialAxis?.categoryOrder);
    }, [mapCategoryToValues, props.radialAxis?.categoryOrder]);

    const getOrderedACategories = React.useCallback(() => {
      return sortAxisCategories(mapCategoryToValues(true), props.angularAxis?.categoryOrder);
    }, [mapCategoryToValues, props.angularAxis?.categoryOrder]);

    const rValues = React.useMemo(() => chartData.flatMap(series => series.data.map(point => point.r)), [chartData]);
    const rScaleType = React.useMemo(
      () =>
        getScaleType(rValues, {
          scaleType: props.radialAxis?.scaleType,
          supportsLog: true,
        }),
      [rValues, props.radialAxis?.scaleType],
    );
    const rScaleDomain = React.useMemo(
      () =>
        rScaleType === 'category'
          ? getOrderedRCategories()
          : getContinuousScaleDomain(rScaleType, rValues as (number | Date)[], {
              rangeStart: props.radialAxis?.rangeStart,
              rangeEnd: props.radialAxis?.rangeEnd,
            }),
      [getOrderedRCategories, rScaleType, rValues, props.radialAxis?.rangeStart, props.radialAxis?.rangeEnd],
    );
    const {
      scale: rScale,
      tickValues: rTickValues,
      tickLabels: rTickLabels,
    } = React.useMemo(
      () =>
        createRadialScale(rScaleType, rScaleDomain, [innerRadius, outerRadius], {
          useUTC: props.useUTC,
          tickCount: props.radialAxis?.tickCount,
          tickValues: props.radialAxis?.tickValues,
          tickText: props.radialAxis?.tickText,
          tickFormat: props.radialAxis?.tickFormat,
          culture: props.culture,
          tickStep: props.radialAxis?.tickStep,
          tick0: props.radialAxis?.tick0,
          dateLocalizeOptions: props.dateLocalizeOptions,
        }),
      [
        rScaleType,
        rScaleDomain,
        innerRadius,
        outerRadius,
        props.culture,
        props.dateLocalizeOptions,
        props.radialAxis?.tick0,
        props.radialAxis?.tickCount,
        props.radialAxis?.tickFormat,
        props.radialAxis?.tickStep,
        props.radialAxis?.tickText,
        props.radialAxis?.tickValues,
        props.useUTC,
      ],
    );

    const aValues = React.useMemo(
      () => chartData.flatMap(series => series.data.map(point => point.theta)),
      [chartData],
    );
    const aScaleType = React.useMemo(
      () =>
        getScaleType(aValues, {
          scaleType: props.angularAxis?.scaleType,
        }),
      [aValues, props.angularAxis?.scaleType],
    );
    const aDomain = React.useMemo(
      () =>
        aScaleType === 'category'
          ? getOrderedACategories()
          : (getContinuousScaleDomain(aScaleType, aValues as number[]) as number[]),
      [getOrderedACategories, aScaleType, aValues],
    );
    const {
      scale: aScale,
      tickValues: aTickValues,
      tickLabels: aTickLabels,
    } = React.useMemo(
      () =>
        createAngularScale(aScaleType, aDomain, {
          tickCount: props.angularAxis?.tickCount,
          tickValues: props.angularAxis?.tickValues,
          tickText: props.angularAxis?.tickText,
          tickFormat: props.angularAxis?.tickFormat,
          culture: props.culture,
          tickStep: props.angularAxis?.tickStep,
          tick0: props.angularAxis?.tick0,
          direction: props.direction,
          unit: props.angularAxis?.unit,
        }),
      [
        aScaleType,
        aDomain,
        props.angularAxis?.tick0,
        props.angularAxis?.tickCount,
        props.angularAxis?.tickFormat,
        props.angularAxis?.tickStep,
        props.angularAxis?.tickText,
        props.angularAxis?.tickValues,
        props.angularAxis?.unit,
        props.culture,
        props.direction,
      ],
    );

    const classes = usePolarChartStyles(props);

    const renderPolarGrid = React.useCallback(() => {
      const extRTickValues = [];
      const rDomain = rScale.domain();
      if (innerRadius > 0 && rDomain[0] !== rTickValues[0]) {
        extRTickValues.push(rDomain[0]);
      }
      extRTickValues.push(...rTickValues);
      if (rDomain[rDomain.length - 1] !== rTickValues[rTickValues.length - 1]) {
        extRTickValues.push(rDomain[rDomain.length - 1]);
      }

      return (
        <g>
          <g>
            {extRTickValues.map((r, rIndex) => {
              const className = rIndex === extRTickValues.length - 1 ? classes.gridLineOuter : classes.gridLineInner;

              if (props.shape === 'polygon') {
                let d = '';
                aTickValues.forEach((a, aIndex) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const radialPoint = d3PointRadial(aScale(a), rScale(r as any)!);
                  d += (aIndex === 0 ? 'M' : 'L') + radialPoint.join(',') + ' ';
                });
                d += 'Z';

                return <path key={rIndex} d={d} className={className} />;
              }

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return <circle key={rIndex} cx={0} cy={0} r={rScale(r as any)} className={className} />;
            })}
          </g>
          <g>
            {aTickValues.map((a, aIndex) => {
              const radialPoint1 = d3PointRadial(aScale(a), innerRadius);
              const radialPoint2 = d3PointRadial(aScale(a), outerRadius);

              return (
                <path
                  key={aIndex}
                  d={`M${radialPoint1.join(',')} L${radialPoint2.join(',')}`}
                  className={classes.gridLineInner}
                />
              );
            })}
          </g>
        </g>
      );
    }, [
      innerRadius,
      outerRadius,
      rTickValues,
      aTickValues,
      rScale,
      aScale,
      props.shape,
      classes.gridLineInner,
      classes.gridLineOuter,
    ]);

    const renderPolarTicks = React.useCallback(() => {
      const radialAxisAngle = props.direction === 'clockwise' ? 0 : Math.PI / 2;
      const radialAxisStartPoint = d3PointRadial(radialAxisAngle, innerRadius);
      const radialAxisEndPoint = d3PointRadial(radialAxisAngle, outerRadius);
      // (0, pi]
      const sign = radialAxisAngle > EPSILON && radialAxisAngle - Math.PI < EPSILON ? 1 : -1;

      return (
        <g>
          <g>
            <path
              d={`M${radialAxisStartPoint.join(',')} L${radialAxisEndPoint.join(',')}`}
              className={classes.gridLineOuter}
            />
            {rTickValues.map((r, rIndex) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const [pointX, pointY] = d3PointRadial(radialAxisAngle, rScale(r as any)!);
              return (
                <g key={rIndex}>
                  <path
                    d={`M${pointX},${pointY} L${pointX + TICK_SIZE * Math.cos(radialAxisAngle) * sign},${
                      pointY + TICK_SIZE * Math.sin(radialAxisAngle) * sign
                    }`}
                    className={classes.gridLineOuter}
                  />
                  <text
                    x={pointX + (TICK_SIZE + LABEL_OFFSET) * Math.cos(radialAxisAngle) * sign}
                    y={pointY + (TICK_SIZE + LABEL_OFFSET) * Math.sin(radialAxisAngle) * sign}
                    textAnchor={
                      // pi/2 or 3pi/2
                      Math.abs(radialAxisAngle - Math.PI / 2) < EPSILON ||
                      Math.abs(radialAxisAngle - (3 * Math.PI) / 2) < EPSILON
                        ? 'middle'
                        : // (0, pi/2) or (pi, 3pi/2)
                        (radialAxisAngle > EPSILON && radialAxisAngle - Math.PI / 2 < -EPSILON) ||
                          (radialAxisAngle - Math.PI > EPSILON && radialAxisAngle - (3 * Math.PI) / 2 < -EPSILON)
                        ? 'start'
                        : 'end'
                    }
                    dominantBaseline="middle"
                    aria-hidden={true}
                    className={classes.tickLabel}
                  >
                    {rTickLabels[rIndex]}
                  </text>
                </g>
              );
            })}
          </g>
          <g>
            {aTickValues.map((a, aIndex) => {
              const angle = aScale(a);
              const [pointX, pointY] = d3PointRadial(angle, outerRadius + LABEL_OFFSET);

              return (
                <text
                  key={aIndex}
                  x={pointX}
                  y={pointY}
                  textAnchor={
                    Math.abs(angle) < EPSILON || Math.abs(angle - Math.PI) < EPSILON
                      ? 'middle'
                      : angle > Math.PI
                      ? 'end'
                      : 'start'
                  }
                  dominantBaseline="middle"
                  aria-hidden={true}
                  className={classes.tickLabel}
                >
                  {aTickLabels[aIndex]}
                </text>
              );
            })}
          </g>
        </g>
      );
    }, [
      rTickValues,
      aTickValues,
      rScale,
      aScale,
      outerRadius,
      classes.gridLineOuter,
      classes.tickLabel,
      aTickLabels,
      innerRadius,
      rTickLabels,
      props.direction,
    ]);

    const getActiveLegends = React.useCallback(() => {
      return selectedLegends.length > 0 ? selectedLegends : hoveredLegend ? [hoveredLegend] : [];
    }, [selectedLegends, hoveredLegend]);

    const legendHighlighted = React.useCallback(
      (legendTitle: string) => {
        const activeLegends = getActiveLegends();
        return activeLegends.includes(legendTitle) || activeLegends.length === 0;
      },
      [getActiveLegends],
    );

    const renderRadialArea = React.useCallback(
      (series: AreaPolarSeries) => {
        const radialArea = d3AreaRadial<PolarDataPoint>()
          .angle(d => aScale(d.theta))
          .innerRadius(innerRadius)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .outerRadius(d => rScale(d.r as any)!)
          .curve(getCurveFactory(series.lineOptions?.curve, d3CurveLinearClosed))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .defined(d => isPlottable(aScale(d.theta), rScale(d.r as any)));
        const shouldHighlight = legendHighlighted(series.legend);

        return (
          <path
            d={radialArea(series.data)!}
            fill={series.color}
            fillOpacity={shouldHighlight ? 0.7 : 0.1}
            pointerEvents="none"
          />
        );
      },
      [innerRadius, rScale, aScale, legendHighlighted],
    );

    const renderRadialLine = React.useCallback(
      (series: AreaPolarSeries | LinePolarSeries) => {
        const radialLine = d3LineRadial<PolarDataPoint>()
          .angle(d => aScale(d.theta))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .radius(d => rScale(d.r as any)!)
          .curve(getCurveFactory(series.lineOptions?.curve))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .defined(d => isPlottable(aScale(d.theta), rScale(d.r as any)));

        return (
          <path
            d={radialLine(series.data)!}
            fill="none"
            stroke={series.color}
            strokeOpacity={legendHighlighted(series.legend) ? 1 : 0.1}
            strokeWidth={series.lineOptions?.strokeWidth ?? 3}
            strokeDasharray={series.lineOptions?.strokeDasharray}
            strokeDashoffset={series.lineOptions?.strokeDashoffset}
            strokeLinecap={series.lineOptions?.strokeLinecap}
            pointerEvents="none"
          />
        );
      },
      [rScale, aScale, legendHighlighted],
    );

    const [minMarkerSize, maxMarkerSize] = React.useMemo(
      () => d3Extent<number>(chartData.flatMap(series => series.data.map(point => point.markerSize as number))),
      [chartData],
    );

    const showPopover = React.useCallback(
      (
        event: React.MouseEvent<SVGElement> | React.FocusEvent<SVGElement>,
        point: PolarDataPoint,
        pointId: string,
        legend: string,
      ) => {
        setPopoverTarget(event.currentTarget);
        setPopoverOpen(legendHighlighted(legend));
        setPopoverXValue(point.angularAxisCalloutData ?? formatAngle(point.theta, props.angularAxis?.unit));
        setPopoverLegend(legend);
        setPopoverColor(point.color!);
        setPopoverYValue(
          point.radialAxisCalloutData ?? (formatToLocaleString(point.r, props.culture, props.useUTC) as string),
        );
        setActivePoint(pointId);
      },
      [legendHighlighted, props.angularAxis?.unit, props.culture, props.useUTC],
    );

    const hidePopover = React.useCallback(() => {
      setPopoverOpen(false);
      setActivePoint('');
    }, []);

    const markersOnlyMode = React.useMemo(
      () => chartData.filter(s => s.type === 'areapolar' || s.type === 'linepolar').length === 0,
      [chartData],
    );

    const renderRadialPoints = React.useCallback(
      (series: AreaPolarSeries | LinePolarSeries | ScatterPolarSeries, seriesIndex: number) => {
        const shouldHighlight = legendHighlighted(series.legend);
        return (
          <g>
            {series.data.map((point, pointIndex) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if (!isPlottable(aScale(point.theta), rScale(point.r as any))) {
                return null;
              }

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const [x, y] = d3PointRadial(aScale(point.theta), rScale(point.r as any)!);
              const id = `${seriesIndex}-${pointIndex}`;
              const isActive = activePoint === id;
              const minPx = markersOnlyMode ? MIN_MARKER_SIZE_PX_MARKERS_ONLY : MIN_MARKER_SIZE_PX;
              let radius = minPx;
              if (typeof point.markerSize !== 'undefined' && minMarkerSize !== maxMarkerSize) {
                radius =
                  minPx +
                  ((point.markerSize - minMarkerSize!) / (maxMarkerSize! - minMarkerSize!)) *
                    (MAX_MARKER_SIZE_PX - minPx);
              }

              const xValue =
                point.radialAxisCalloutData || (formatToLocaleString(point.r, props.culture, props.useUTC) as string);
              const legend = series.legend;
              const yValue = point.angularAxisCalloutData || formatAngle(point.theta, props.angularAxis?.unit);
              const ariaLabel = point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;

              return (
                <circle
                  key={pointIndex}
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={isActive ? tokens.colorNeutralBackground1 : point.color}
                  stroke={isActive ? point.color : 'none'}
                  strokeWidth={isActive ? 2 : 0}
                  opacity={shouldHighlight ? 1 : 0.1}
                  tabIndex={shouldHighlight ? 0 : -1}
                  onMouseOver={e => showPopover(e, point, id, series.legend)}
                  onFocus={e => showPopover(e, point, id, series.legend)}
                  role="img"
                  aria-label={ariaLabel}
                />
              );
            })}
          </g>
        );
      },
      [
        legendHighlighted,
        rScale,
        aScale,
        activePoint,
        showPopover,
        minMarkerSize,
        maxMarkerSize,
        markersOnlyMode,
        props.angularAxis?.unit,
        props.culture,
        props.useUTC,
      ],
    );

    const onLegendSelectionChange = React.useCallback(
      (_selectedLegends: string[], event: React.MouseEvent<HTMLButtonElement>, currentLegend?: Legend) => {
        if (props.legendProps?.canSelectMultipleLegends) {
          setSelectedLegends(_selectedLegends);
        } else {
          setSelectedLegends(_selectedLegends.slice(-1));
        }
        if (props.legendProps?.onChange) {
          props.legendProps.onChange(_selectedLegends, event, currentLegend);
        }
      },
      [props.legendProps],
    );

    const renderLegends = React.useCallback(() => {
      if (props.hideLegend) {
        return null;
      }

      const legends: Legend[] = Object.keys(legendColorMap.current).map(legendTitle => {
        return {
          title: legendTitle,
          color: legendColorMap.current[legendTitle],
          hoverAction: () => {
            setHoveredLegend(legendTitle);
          },
          onMouseOutAction: () => {
            setHoveredLegend('');
          },
        };
      });

      return (
        <div ref={legendContainerRef} className={classes.legendContainer}>
          <Legends
            legends={legends}
            centerLegends
            onChange={onLegendSelectionChange}
            legendRef={legendsRef}
            {...props.legendProps}
          />
        </div>
      );
    }, [props.hideLegend, props.legendProps, legendsRef, onLegendSelectionChange, classes.legendContainer]);

    const focusAttributes = useArrowNavigationGroup({ axis: 'horizontal' });

    return (
      <div className={classes.root} ref={chartContainerRef} onMouseLeave={hidePopover} onBlur={hidePopover}>
        <div className={classes.chartWrapper} {...focusAttributes}>
          <svg
            className={classes.chart}
            width={svgWidth}
            height={svgHeight}
            viewBox={`${-svgWidth / 2} ${-svgHeight / 2} ${svgWidth} ${svgHeight}`}
            role="region"
            aria-label={
              (props.chartTitle ? `${props.chartTitle}. ` : '') + `Polar chart with ${chartData.length} data series.`
            }
          >
            {renderPolarGrid()}
            <g>
              {chartData.map((series, seriesIndex) => {
                return (
                  <g
                    key={seriesIndex}
                    role="region"
                    aria-label={`${series.legend}, series ${seriesIndex + 1} of ${chartData.length} with ${
                      series.data.length
                    } data points.`}
                  >
                    {series.type === 'areapolar' && renderRadialArea(series)}
                    {(series.type === 'areapolar' || series.type === 'linepolar') && renderRadialLine(series)}
                    {renderRadialPoints(series, seriesIndex)}
                  </g>
                );
              })}
            </g>
            {renderPolarTicks()}
          </svg>
        </div>
        {renderLegends()}
        {!props.hideTooltip && (
          <ChartPopover
            isPopoverOpen={isPopoverOpen}
            positioning={{
              target: popoverTarget,
            }}
            XValue={popoverXValue}
            legend={popoverLegend}
            color={popoverColor}
            YValue={popoverYValue}
          />
        )}
      </div>
    );
  },
);

PolarChart.displayName = 'PolarChart';
