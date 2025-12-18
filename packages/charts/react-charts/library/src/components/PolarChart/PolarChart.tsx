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
import { DataPointV2 } from '../../types/DataPoint';
import { tokens } from '@fluentui/react-theme';
import { Legend, Legends } from '../Legends/index';
import { getColorFromToken, getNextColor } from '../../utilities/colors';
import { createScale, getDomain, getScaleType } from './PolarChart.utils';
import { ChartPopover } from '../CommonComponents/ChartPopover';

const DEFAULT_LEGEND_HEIGHT = 32;
const LABEL_WIDTH = 36;
const LABEL_HEIGHT = 16;
const LABEL_OFFSET = 4;

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

    const margins = {
      left: LABEL_OFFSET + LABEL_WIDTH,
      right: LABEL_OFFSET + LABEL_WIDTH,
      top: LABEL_OFFSET + LABEL_HEIGHT,
      bottom: LABEL_OFFSET + LABEL_HEIGHT,
      ...props.margins,
    };

    const svgWidth = props.width || containerWidth;
    const svgHeight = (props.height || containerHeight) - legendContainerHeight;
    const innerRadius = props.innerRadius || 0;
    const outerRadius =
      Math.min(svgWidth - (margins.left + margins.right), svgHeight - (margins.top + margins.bottom)) / 2;

    const legendColorMap: Record<string, string> = {};
    let colorIndex = 0;
    const chartData = props.data.map(series => {
      const seriesColor = series.color ? getColorFromToken(series.color) : getNextColor(colorIndex++, 0);
      if (!(series.legend in legendColorMap)) {
        legendColorMap[series.legend] = seriesColor;
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

    const xValues = chartData.flatMap(series => series.data.map(point => point.x));
    const xScaleType = getScaleType(xValues, {
      scaleType: props.xScaleType,
      supportsLog: true,
    });
    const xDomain = getDomain(xScaleType, xValues);
    const xScale = createScale(xScaleType, xDomain, [innerRadius, outerRadius], { innerPadding: 1 });

    const yValues = chartData.flatMap(series => series.data.map(point => point.y));
    const yScaleType = getScaleType(yValues, {
      scaleType: props.yScaleType,
      supportsLog: true,
    });
    const yDomain = getDomain(yScaleType, yValues);
    const yScale = createScale(yScaleType, yScaleType === 'category' ? [...yDomain, ''] : yDomain, [0, 2 * Math.PI], {
      innerPadding: 1,
    });

    const classes = usePolarChartStyles(props);

    const renderPolarGrid = () => {
      return (
        <>
          <g>
            {('ticks' in xScale ? xScale.ticks(3) : xScale.domain()).map((xTickValue, xTickIndex) => {
              if (props.shape === 'polygon') {
                let d = '';
                ('ticks' in yScale ? yScale.ticks() : yScale.domain().slice(0, -1)).forEach(
                  (yTickValue, yTickIndex) => {
                    const radialPoint = d3PointRadial(yScale(yTickValue as any)!, xScale(xTickValue as any)!);
                    d += (yTickIndex === 0 ? 'M' : 'L') + radialPoint.join(',') + ' ';
                  },
                );
                d += 'Z';

                return (
                  <path
                    key={xTickIndex}
                    d={d}
                    fill="none"
                    stroke={tokens.colorNeutralForeground1}
                    strokeWidth={1}
                    opacity={0.2}
                  />
                );
              }

              return (
                <circle
                  key={xTickIndex}
                  r={xScale(xTickValue as any)}
                  fill="none"
                  stroke={tokens.colorNeutralForeground1}
                  strokeWidth={1}
                  opacity={0.2}
                />
              );
            })}
          </g>
          <g>
            {('ticks' in yScale ? yScale.ticks() : yScale.domain().slice(0, -1)).map((yTickValue, yTickIndex) => {
              const radialPoint1 = d3PointRadial(yScale(yTickValue as any)!, innerRadius);
              const radialPoint2 = d3PointRadial(yScale(yTickValue as any)!, outerRadius);

              return (
                <path
                  key={yTickIndex}
                  d={`M${radialPoint1.join(',')} L${radialPoint2.join(',')}`}
                  fill="none"
                  stroke={tokens.colorNeutralForeground1}
                  strokeWidth={1}
                  opacity={0.2}
                />
              );
            })}
          </g>
        </>
      );
    };

    const renderPolarTicks = () => {
      return (
        <>
          <g>
            {('ticks' in xScale ? xScale.ticks(3) : xScale.domain()).map((xTickValue, xTickIndex) => {
              return (
                <text key={xTickIndex} x={xScale(xTickValue as any)} dy="0.35em" textAnchor="middle" aria-hidden={true}>
                  {`${xTickValue}`}
                </text>
              );
            })}
          </g>
          <g>
            {('ticks' in yScale ? yScale.ticks() : yScale.domain().slice(0, -1)).map((yTickValue, yTickIndex) => {
              const angle = yScale(yTickValue as any)!;
              const radialPoint = d3PointRadial(angle, outerRadius);

              return (
                <text
                  key={yTickIndex}
                  x={radialPoint[0]}
                  y={radialPoint[1]}
                  textAnchor={angle > Math.PI ? 'end' : 'start'}
                  dominantBaseline={angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'hanging' : 'auto'}
                  aria-hidden={true}
                >
                  {`${yTickValue}`}
                </text>
              );
            })}
          </g>
        </>
      );
    };

    const renderRadialAreas = () => {
      return (
        <g>
          {chartData
            .filter(series => series.type === 'area')
            .map((series, seriesIndex) => {
              const radialArea = d3AreaRadial<DataPointV2<string | number | Date, string | number | Date>>()
                .angle(d => yScale(d.y as any)!)
                .innerRadius(innerRadius)
                .outerRadius(d => xScale(d.x as any)!)
                .curve(d3CurveLinearClosed);

              return <path key={seriesIndex} d={radialArea(series.data)!} fill={series.color} fillOpacity={0.5} />;
            })}
        </g>
      );
    };

    const renderRadialLines = () => {
      return (
        <g>
          {chartData
            .filter(series => series.type === 'line')
            .map((series, seriesIndex) => {
              const radialLine = d3LineRadial<DataPointV2<string | number | Date, string | number | Date>>()
                .angle(d => yScale(d.y as any)!)
                .radius(d => xScale(d.x as any)!)
                .curve(d3CurveLinearClosed);

              return (
                <path
                  key={seriesIndex}
                  d={radialLine(series.data)!}
                  fill="none"
                  stroke={series.color}
                  strokeWidth={2}
                />
              );
            })}
        </g>
      );
    };

    const renderRadialPoints = () => {
      return (
        <g>
          {chartData
            .filter(series => series.type === 'scatter')
            .map((series, seriesIndex) => {
              return (
                <g key={seriesIndex} role="region" aria-label="">
                  {series.data.map((point, pointIndex) => {
                    const radialPoint = d3PointRadial(yScale(point.y as any)!, xScale(point.x as any)!);
                    return (
                      <circle
                        key={pointIndex}
                        cx={radialPoint[0]}
                        cy={radialPoint[1]}
                        r={(point.markerSize ?? 6) / 2}
                        fill={point.color}
                        role="img"
                        aria-label=""
                        tabIndex={0}
                        onMouseOver={e => showPopover(e, point, series.legend, point.color)}
                        onFocus={e => showPopover(e, point, series.legend, point.color)}
                      />
                    );
                  })}
                </g>
              );
            })}
        </g>
      );
    };

    const renderLegends = () => {
      if (props.hideLegend) {
        return null;
      }

      const legends: Legend[] = Object.keys(legendColorMap).map(legendTitle => {
        return {
          title: legendTitle,
          color: legendColorMap[legendTitle],
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
    };

    const showPopover = (
      event: React.MouseEvent<SVGElement> | React.FocusEvent<SVGElement>,
      point: DataPointV2<string | number | Date, string | number | Date>,
      legend: string,
      color: string,
    ) => {
      setPopoverTarget(event.currentTarget);
      setPopoverOpen(noLegendHighlighted() || legendHighlighted(legend));
      setPopoverXValue(point.xAxisCalloutData ?? `${point.x}`);
      setPopoverLegend(legend);
      setPopoverColor(color);
      setPopoverYValue(point.yAxisCalloutData ?? `${point.y}`);
    };

    const hidePopover = () => {
      setPopoverOpen(false);
    };

    const onLegendSelectionChange = (
      _selectedLegends: string[],
      event: React.MouseEvent<HTMLButtonElement>,
      currentLegend?: Legend,
    ) => {
      if (props.legendProps?.canSelectMultipleLegends) {
        setSelectedLegends(_selectedLegends);
      } else {
        setSelectedLegends(_selectedLegends.slice(-1));
      }
      if (props.legendProps?.onChange) {
        props.legendProps.onChange(_selectedLegends, event, currentLegend);
      }
    };

    const legendHighlighted = (legendTitle: string) => {
      return getHighlightedLegend().includes(legendTitle);
    };

    const noLegendHighlighted = () => {
      return getHighlightedLegend().length === 0;
    };

    const getHighlightedLegend = () => {
      return selectedLegends.length > 0 ? selectedLegends : hoveredLegend ? [hoveredLegend] : [];
    };

    return (
      <div className={classes.root} ref={chartContainerRef} onMouseLeave={hidePopover} onBlur={hidePopover}>
        <div className={classes.chartWrapper}>
          <svg
            className={classes.chart}
            width={svgWidth}
            height={svgHeight}
            viewBox={`${-svgWidth / 2} ${-svgHeight / 2} ${svgWidth} ${svgHeight}`}
            role="region"
            aria-label=""
          >
            {renderPolarGrid()}
            {renderRadialAreas()}
            {renderRadialLines()}
            {renderRadialPoints()}
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
