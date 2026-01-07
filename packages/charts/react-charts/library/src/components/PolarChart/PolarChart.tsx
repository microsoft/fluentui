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
import { PolarDataPoint } from '../../types/DataPoint';
import { tokens } from '@fluentui/react-theme';
import { Legend, Legends } from '../Legends/index';
import { createRadialScale, getScaleDomain, getScaleType, EPSILON, createAngularScale } from './PolarChart.utils';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { getColorFromToken, getNextColor } from '../../utilities/index';
import { extent as d3Extent } from 'd3-array';

const DEFAULT_LEGEND_HEIGHT = 32;
const LABEL_WIDTH = 36;
const LABEL_HEIGHT = 16;
const LABEL_OFFSET = 8;
const MIN_PIXEL = 4;
const MAX_PIXEL = 16;

export const PolarChart: React.FunctionComponent<PolarChartProps> = React.forwardRef<HTMLDivElement, PolarChartProps>(
  (props, forwardedRef) => {
    const { chartContainerRef, legendsRef } = useImageExport(props.componentRef, props.hideLegend, false);
    const legendContainerRef = React.useRef<HTMLDivElement>(null);

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
    }, []);
    React.useEffect(() => {
      if (props.hideLegend) {
        setLegendContainerHeight(0);
      } else if (legendContainerRef.current) {
        const { height } = legendContainerRef.current.getBoundingClientRect();
        const { marginTop } = getComputedStyle(legendContainerRef.current);
        setLegendContainerHeight(Math.max(height, DEFAULT_LEGEND_HEIGHT) + parseFloat(marginTop));
      }
    }, [props.hideLegend]);

    React.useEffect(() => {
      setSelectedLegends(props.legendProps?.selectedLegends || []);
    }, [JSON.stringify(props.legendProps?.selectedLegends)]);

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

    const svgWidth = props.width || containerWidth;
    const svgHeight = (props.height || containerHeight) - legendContainerHeight;
    const outerRadius =
      Math.min(svgWidth - (margins.left + margins.right), svgHeight - (margins.top + margins.bottom)) / 2;
    const innerRadius = Math.min(Math.abs(props.hole || 0), 1) * outerRadius;

    const legendColorMap = React.useRef<Record<string, string>>({});
    const chartData = React.useMemo(() => {
      legendColorMap.current = {};
      let colorIndex = 0;

      return props.data.map(series => {
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
      });
    }, [props.data]);

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
        getScaleDomain(rScaleType, rValues, {
          rangeStart: props.radialAxis?.rangeStart,
          rangeEnd: props.radialAxis?.rangeEnd,
        }),
      [rScaleType, rValues, props.radialAxis?.rangeStart, props.radialAxis?.rangeEnd],
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
      [rScaleType, rScaleDomain, innerRadius, outerRadius],
    );

    const aValues = React.useMemo(
      () => chartData.flatMap(series => series.data.map(point => point.theta)),
      [chartData],
    );
    const aType = React.useMemo(
      () =>
        getScaleType(aValues, {
          scaleType: props.angularAxis?.scaleType,
          supportsLog: true,
        }),
      [aValues, props.angularAxis?.scaleType],
    );
    const aDomain = React.useMemo(() => getScaleDomain(aType, aValues), [aType, aValues]);
    const {
      scale: aScale,
      tickValues: aTickValues,
      tickLabels: aTickLabels,
    } = React.useMemo(
      () =>
        createAngularScale(aType, aDomain, {
          tickCount: props.angularAxis?.tickCount,
          tickValues: props.angularAxis?.tickValues,
          tickText: props.angularAxis?.tickText,
          tickFormat: props.angularAxis?.tickFormat,
          culture: props.culture,
          tickStep: props.angularAxis?.tickStep,
          tick0: props.angularAxis?.tick0,
        }),
      [aType, aDomain],
    );

    const classes = usePolarChartStyles(props);

    const renderPolarGrid = React.useCallback(() => {
      const extRTickValues = [];
      if (innerRadius > 0 && rScaleDomain[0] !== rTickValues[0]) {
        extRTickValues.push(rScaleDomain[0]);
      }
      extRTickValues.push(...rTickValues);
      if (rScaleDomain[rScaleDomain.length - 1] !== rTickValues[rTickValues.length - 1]) {
        extRTickValues.push(rScaleDomain[rScaleDomain.length - 1]);
      }

      return (
        <g>
          <g>
            {extRTickValues.map((r, rIndex) => {
              const className = rIndex === extRTickValues.length - 1 ? classes.gridLineOuter : classes.gridLineInner;

              if (props.shape === 'polygon') {
                let d = '';
                aTickValues.forEach((a, aIndex) => {
                  const radialPoint = d3PointRadial(aScale(a), rScale(r as any)!);
                  d += (aIndex === 0 ? 'M' : 'L') + radialPoint.join(',') + ' ';
                });
                d += 'Z';

                return <path key={rIndex} d={d} className={className} />;
              }

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
    }, [innerRadius, outerRadius, rScaleDomain, rTickValues, aTickValues, rScale, aScale, props.shape, classes]);

    const renderPolarTicks = React.useCallback(() => {
      return (
        <g>
          <g>
            {rTickValues.map((r, rIndex) => {
              return (
                <text
                  key={rIndex}
                  x={-LABEL_OFFSET}
                  y={-rScale(r as any)!}
                  textAnchor="end"
                  dominantBaseline="middle"
                  aria-hidden={true}
                  className={classes.tickLabel}
                >
                  {rTickLabels[rIndex]}
                </text>
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
    }, [rTickValues, aTickValues, rScale, aScale, outerRadius, classes]);

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

    const renderRadialAreas = React.useCallback(() => {
      const areaData = chartData.filter(series => series.type === 'areapolar');

      return areaData.map((series, seriesIndex) => {
        const radialArea = d3AreaRadial<PolarDataPoint>()
          .angle(d => aScale(d.theta))
          .innerRadius(innerRadius)
          .outerRadius(d => rScale(d.r as any)!)
          .curve(d3CurveLinearClosed);
        const shouldHighlight = legendHighlighted(series.legend);

        return (
          <g
            key={seriesIndex}
            role="region"
            aria-label={`${series.legend}, series ${seriesIndex + 1} of ${chartData.length} with ${
              series.data.length
            } data points.`}
          >
            <path
              d={radialArea(series.data)!}
              fill={series.color}
              fillOpacity={shouldHighlight ? 0.7 : 0.1}
              stroke={series.color}
              strokeOpacity={shouldHighlight ? 1 : 0.1}
              strokeWidth={series.lineOptions?.strokeWidth ?? 2}
              strokeDasharray={series.lineOptions?.strokeDasharray}
              strokeDashoffset={series.lineOptions?.strokeDashoffset}
              strokeLinecap={series.lineOptions?.strokeLinecap}
              pointerEvents="none"
            />
            <g>{renderRadialPoints([series])}</g>
          </g>
        );
      });
    }, [chartData, innerRadius, rScale, aScale, legendHighlighted]);

    const renderRadialLines = React.useCallback(() => {
      const lineData = chartData.filter(series => series.type === 'linepolar');

      return lineData.map((series, seriesIndex) => {
        const radialLine = d3LineRadial<PolarDataPoint>()
          .angle(d => aScale(d.theta))
          .radius(d => rScale(d.r as any)!);

        return (
          <g
            key={seriesIndex}
            role="region"
            aria-label={`${series.legend}, series ${seriesIndex + 1} of ${chartData.length} with ${
              series.data.length
            } data points.`}
          >
            <path
              d={radialLine(series.data)!}
              fill="none"
              stroke={series.color}
              strokeOpacity={legendHighlighted(series.legend) ? 1 : 0.1}
              strokeWidth={series.lineOptions?.strokeWidth ?? 2}
              strokeDasharray={series.lineOptions?.strokeDasharray}
              strokeDashoffset={series.lineOptions?.strokeDashoffset}
              strokeLinecap={series.lineOptions?.strokeLinecap}
              pointerEvents="none"
            />
            <g>{renderRadialPoints([series])}</g>
          </g>
        );
      });
    }, [chartData, rScale, aScale, legendHighlighted]);

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
        setPopoverXValue(point.radialAxisCalloutData ?? point.r);
        setPopoverLegend(legend);
        setPopoverColor(point.color!);
        setPopoverYValue(point.angularAxisCalloutData ?? point.theta);
        setActivePoint(pointId);
      },
      [],
    );

    const hidePopover = React.useCallback(() => {
      setPopoverOpen(false);
      setActivePoint('');
    }, []);

    const renderRadialPoints = React.useCallback(
      (scatterData: typeof chartData) => {
        return scatterData.map((series, seriesIndex) => {
          const shouldHighlight = legendHighlighted(series.legend);
          return (
            <g
              key={seriesIndex}
              role="region"
              aria-label={`${series.legend}, series ${seriesIndex + 1} of ${chartData.length} with ${
                series.data.length
              } data points.`}
            >
              {series.data.map((point, pointIndex) => {
                const [x, y] = d3PointRadial(aScale(point.theta), rScale(point.r as any)!);
                const id = `${seriesIndex}-${pointIndex}`;
                const isActive = activePoint === id;
                let radius = isActive ? 6 : MIN_PIXEL;
                if (typeof point.markerSize !== 'undefined' && minMarkerSize !== maxMarkerSize) {
                  radius =
                    MIN_PIXEL +
                    ((point.markerSize - minMarkerSize!) / (maxMarkerSize! - minMarkerSize!)) * (MAX_PIXEL - MIN_PIXEL);
                }

                const xValue = point.radialAxisCalloutData || point.r;
                const legend = series.legend;
                const yValue = point.angularAxisCalloutData || point.theta;
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
        });
      },
      [legendHighlighted, rScale, aScale, activePoint, showPopover, minMarkerSize, maxMarkerSize],
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
        <div ref={legendContainerRef}>
          <Legends
            legends={legends}
            centerLegends
            onChange={onLegendSelectionChange}
            legendRef={legendsRef}
            {...props.legendProps}
          />
        </div>
      );
    }, [props.hideLegend, props.legendProps, legendsRef, onLegendSelectionChange]);

    return (
      <div className={classes.root} ref={chartContainerRef} onMouseLeave={hidePopover} onBlur={hidePopover}>
        <div className={classes.chartWrapper}>
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
              {renderRadialAreas()}
              {renderRadialLines()}
              {renderRadialPoints(chartData.filter(series => series.type === 'scatterpolar'))}
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
