'use client';

import * as React from 'react';
import { PolarChartProps } from './PolarChart.types';
import { usePolarChartStyles } from './usePolarChartStyles.styles';
import { useImageExport } from '../../utilities/hooks';
import { pointRadial as d3PointRadial, areaRadial as d3AreaRadial, lineRadial as d3LineRadial } from 'd3-shape';
import { PolarDataPoint } from '../../types/DataPoint';
import { tokens } from '@fluentui/react-theme';
import { Legend, Legends } from '../Legends/index';
import { createScale, getDomain, getScaleType } from './PolarChart.utils';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { getCurveFactory, getColorFromToken, getNextColor } from '../../utilities/index';
import { extent as d3Extent } from 'd3-array';

const DEFAULT_LEGEND_HEIGHT = 32;
const LABEL_WIDTH = 36;
const LABEL_HEIGHT = 16;
const LABEL_OFFSET = 8;
const EPSILON = 1e-6;
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
    const innerRadius = props.innerRadius || 0;
    const outerRadius =
      Math.min(svgWidth - (margins.left + margins.right), svgHeight - (margins.top + margins.bottom)) / 2;

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

    const xValues = React.useMemo(() => chartData.flatMap(series => series.data.map(point => point.r)), [chartData]);
    const xScaleType = React.useMemo(
      () =>
        getScaleType(xValues, {
          scaleType: props.xScaleType,
          supportsLog: true,
        }),
      [xValues, props.xScaleType],
    );
    const xDomain = React.useMemo(() => getDomain(xScaleType, xValues), [xScaleType, xValues]);
    const xScale = React.useMemo(
      () => createScale(xScaleType, xDomain, [innerRadius, outerRadius], { innerPadding: 1 }),
      [xScaleType, xDomain, innerRadius, outerRadius],
    );
    const xTickValues = React.useMemo(() => ('ticks' in xScale ? xScale.ticks(3) : xScale.domain()), [xScale]);
    const xTickFormat = React.useCallback((x: string | number | Date) => `${x}`, []);

    const yValues = React.useMemo(
      () => chartData.flatMap(series => series.data.map(point => point.theta)),
      [chartData],
    );
    const yScaleType = React.useMemo(
      () =>
        getScaleType(yValues, {
          scaleType: props.yScaleType,
          supportsLog: true,
        }),
      [yValues, props.yScaleType],
    );
    const yDomain = React.useMemo(() => getDomain(yScaleType, yValues), [yScaleType, yValues]);
    const yScale = React.useMemo(
      () =>
        createScale(yScaleType, yScaleType === 'category' ? [...yDomain, ''] : yDomain, [0, 2 * Math.PI], {
          innerPadding: 1,
        }),
      [yScaleType, yDomain],
    );
    const yTickValues = React.useMemo(
      () => ('ticks' in yScale ? yScale.ticks() : yScale.domain().slice(0, -1)),
      [yScale],
    );
    const yTickFormat = React.useCallback((y: string | number | Date) => `${y}`, []);

    const classes = usePolarChartStyles(props);

    const renderPolarGrid = React.useCallback(() => {
      const extXTickValues = [];
      if (innerRadius > 0 && xDomain[0] !== xTickValues[0]) {
        extXTickValues.push(xDomain[0]);
      }
      extXTickValues.push(...xTickValues);
      if (xDomain[xDomain.length - 1] !== xTickValues[xTickValues.length - 1]) {
        extXTickValues.push(xDomain[xDomain.length - 1]);
      }

      return (
        <g>
          <g>
            {extXTickValues.map((xTickValue, xTickIndex) => {
              const className =
                xTickIndex === extXTickValues.length - 1 ? classes.gridLineOuter : classes.gridLineInner;

              if (props.shape === 'polygon') {
                let d = '';
                yTickValues.forEach((yTickValue, yTickIndex) => {
                  const radialPoint = d3PointRadial(yScale(yTickValue as any)!, xScale(xTickValue as any)!);
                  d += (yTickIndex === 0 ? 'M' : 'L') + radialPoint.join(',') + ' ';
                });
                d += 'Z';

                return <path key={xTickIndex} d={d} className={className} />;
              }

              return <circle key={xTickIndex} cx={0} cy={0} r={xScale(xTickValue as any)} className={className} />;
            })}
          </g>
          <g>
            {yTickValues.map((yTickValue, yTickIndex) => {
              const radialPoint1 = d3PointRadial(yScale(yTickValue as any)!, innerRadius);
              const radialPoint2 = d3PointRadial(yScale(yTickValue as any)!, outerRadius);

              return (
                <path
                  key={yTickIndex}
                  d={`M${radialPoint1.join(',')} L${radialPoint2.join(',')}`}
                  className={classes.gridLineInner}
                />
              );
            })}
          </g>
        </g>
      );
    }, [innerRadius, outerRadius, xDomain, xTickValues, yTickValues, xScale, yScale, props.shape, classes]);

    const renderPolarTicks = React.useCallback(() => {
      return (
        <g>
          <g>
            {xTickValues.map((xTickValue, xTickIndex) => {
              return (
                <text
                  key={xTickIndex}
                  x={-LABEL_OFFSET}
                  y={-xScale(xTickValue as any)!}
                  textAnchor="end"
                  dominantBaseline="middle"
                  aria-hidden={true}
                  className={classes.tickLabel}
                >
                  {xTickFormat(xTickValue)}
                </text>
              );
            })}
          </g>
          <g>
            {yTickValues.map((yTickValue, yTickIndex) => {
              const angle = yScale(yTickValue as any)!;
              const [pointX, pointY] = d3PointRadial(angle, outerRadius + LABEL_OFFSET);

              return (
                <text
                  key={yTickIndex}
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
                  {yTickFormat(yTickValue)}
                </text>
              );
            })}
          </g>
        </g>
      );
    }, [xTickValues, yTickValues, xScale, yScale, outerRadius, xTickFormat, yTickFormat, classes]);

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
          .angle(d => yScale(d.theta as any)!)
          .innerRadius(innerRadius)
          .outerRadius(d => xScale(d.r as any)!)
          .curve(getCurveFactory(series.lineOptions?.curve));
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
    }, [chartData, innerRadius, xScale, yScale, legendHighlighted]);

    const renderRadialLines = React.useCallback(() => {
      const lineData = chartData.filter(series => series.type === 'linepolar');

      return lineData.map((series, seriesIndex) => {
        const radialLine = d3LineRadial<PolarDataPoint>()
          .angle(d => yScale(d.theta as any)!)
          .radius(d => xScale(d.r as any)!)
          .curve(getCurveFactory(series.lineOptions?.curve));

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
    }, [chartData, xScale, yScale, legendHighlighted]);

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
        setPopoverXValue(point.radialAxisCalloutData ?? xTickFormat(point.r));
        setPopoverLegend(legend);
        setPopoverColor(point.color!);
        setPopoverYValue(point.angularAxisCalloutData ?? yTickFormat(point.theta));
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
                const [x, y] = d3PointRadial(yScale(point.theta as any)!, xScale(point.r as any)!);
                const id = `${seriesIndex}-${pointIndex}`;
                const isActive = activePoint === id;
                let radius = isActive ? 6 : MIN_PIXEL;
                if (typeof point.markerSize !== 'undefined' && minMarkerSize !== maxMarkerSize) {
                  radius =
                    MIN_PIXEL +
                    ((point.markerSize - minMarkerSize!) / (maxMarkerSize! - minMarkerSize!)) * (MAX_PIXEL - MIN_PIXEL);
                }

                const xValue = point.radialAxisCalloutData || xTickFormat(point.r);
                const legend = series.legend;
                const yValue = point.angularAxisCalloutData || yTickFormat(point.theta);
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
      [
        legendHighlighted,
        xScale,
        yScale,
        activePoint,
        showPopover,
        xTickFormat,
        yTickFormat,
        minMarkerSize,
        maxMarkerSize,
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
