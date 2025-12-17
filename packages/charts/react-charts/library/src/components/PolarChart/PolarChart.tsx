'use client';

import * as React from 'react';
import { PolarChartProps } from './PolarChart.types';
import { usePolarChartStyles } from './usePolarChartStyles.styles';
import { useImageExport } from '../../utilities/hooks';
import {
  scaleBand as d3ScaleBand,
  scaleLinear as d3ScaleLinear,
  scaleLog as d3ScaleLog,
  scaleTime as d3ScaleTime,
  scaleUtc as d3ScaleUtc,
  ScaleBand,
  ScaleContinuousNumeric,
  ScaleTime,
} from 'd3-scale';
import { extent as d3Extent } from 'd3-array';
import {
  pointRadial as d3PointRadial,
  areaRadial as d3AreaRadial,
  lineRadial as d3LineRadial,
  curveLinearClosed as d3CurveLinearClosed,
} from 'd3-shape';
import { AxisScaleType, DataPointV2 } from '../../types/DataPoint';
import { tokens } from '@fluentui/react-theme';
import { Legend, Legends } from '../Legends/index';
import { getNextColor } from '../../utilities/colors';

const DEFAULT_LEGEND_HEIGHT = 32;

export const PolarChart: React.FunctionComponent<PolarChartProps> = React.forwardRef<HTMLDivElement, PolarChartProps>(
  (props, forwardedRef) => {
    const { chartContainerRef, legendsRef } = useImageExport(props.componentRef, props.hideLegend, false);
    const legendContainerRef = React.useRef<HTMLDivElement>(null);

    const [containerWidth, setContainerWidth] = React.useState<number>(200);
    const [containerHeight, setContainerHeight] = React.useState<number>(200);
    const [legendContainerHeight, setLegendContainerHeight] = React.useState<number>(
      props.hideLegend ? 0 : DEFAULT_LEGEND_HEIGHT,
    );
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
    }, [props.hideLegend, props.legendProps?.enabledWrapLines]);

    const margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      ...props.margins,
    };

    const svgWidth = props.width || containerWidth;
    const svgHeight = (props.height || containerHeight) - legendContainerHeight;
    const innerRadius = props.innerRadius || 0;
    const outerRadius =
      Math.min(svgWidth - (margins.left + margins.right), svgHeight - (margins.top + margins.bottom)) / 2;

    const xValues = props.data.flatMap(series => series.data.map(point => point.x));
    const xScaleType = getScaleType(xValues, {
      scaleType: props.xScaleType,
      supportsLog: true,
    });
    const xDomain = getDomain(xScaleType, xValues);
    const xScale = createScale(xScaleType, xDomain, [innerRadius, outerRadius], { innerPadding: 1 });

    const yValues = props.data.flatMap(series => series.data.map(point => point.y));
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
            {('ticks' in xScale ? xScale.ticks() : xScale.domain()).map((xTickValue, xTickIndex) => {
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
            {('ticks' in xScale ? xScale.ticks() : xScale.domain()).map((xTickValue, xTickIndex) => {
              return (
                <text key={xTickIndex} x={xScale(xTickValue as any)} dy="0.35em" textAnchor="middle">
                  {`${xTickValue}`}
                </text>
              );
            })}
          </g>
          <g>
            {('ticks' in yScale ? yScale.ticks() : yScale.domain().slice(0, -1)).map((yTickValue, yTickIndex) => {
              const radialPoint = d3PointRadial(yScale(yTickValue as any)!, outerRadius);

              return (
                <text key={yTickIndex} x={radialPoint[0]} y={radialPoint[1]}>
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
          {props.data
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
          {props.data
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
          {props.data
            .filter(series => series.type === 'scatter')
            .map((series, seriesIndex) => {
              return (
                <g key={seriesIndex}>
                  {series.data.map((point, pointIndex) => {
                    const radialPoint = d3PointRadial(yScale(point.y as any)!, xScale(point.x as any)!);
                    return <circle key={pointIndex} cx={radialPoint[0]} cy={radialPoint[1]} r={2} />;
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

      const legends: Legend[] = props.data.map((series, index) => {
        const color: string = series.color || getNextColor(index, 0, false);

        return {
          title: series.legend,
          color,
          hoverAction: () => {
            // setHoveredLegend(series.legend);
          },
          onMouseOutAction: () => {
            // setHoveredLegend('');
          },
        };
      });

      return (
        <div>
          <Legends
            legends={legends}
            centerLegends
            // onChange={_onLegendSelectionChange}
            legendRef={legendsRef}
            {...props.legendProps}
          />
        </div>
      );
    };

    return (
      <div className={classes.root} ref={chartContainerRef}>
        <div className={classes.chartWrapper}>
          <svg
            className={classes.chart}
            width={svgWidth}
            height={svgHeight}
            viewBox={`${-svgWidth / 2} ${-svgHeight / 2} ${svgWidth} ${svgHeight}`}
            role="region"
          >
            {renderPolarGrid()}
            {renderRadialAreas()}
            {renderRadialLines()}
            {renderRadialPoints()}
            {renderPolarTicks()}
          </svg>
        </div>
        {renderLegends()}
      </div>
    );
  },
);

PolarChart.displayName = 'PolarChart';

const createScale = (
  scaleType: string,
  domain: (string | number | Date)[],
  range: number[],
  opts: {
    useUTC?: boolean;
    niceBounds?: boolean;
    innerPadding?: number;
  } = {},
) => {
  if (scaleType === 'category') {
    return d3ScaleBand()
      .domain(domain as string[])
      .range(range)
      .paddingInner(opts.innerPadding || 0);
  }

  let scale: ScaleContinuousNumeric<number, number, undefined> | ScaleTime<number, number>;
  switch (scaleType) {
    case 'log':
      scale = d3ScaleLog();
      break;
    case 'date':
      scale = opts.useUTC ? d3ScaleUtc() : d3ScaleTime();
      break;
    default:
      scale = d3ScaleLinear();
  }

  scale.domain(domain as (number | Date)[]);
  scale.range(range);
  if (opts.niceBounds) {
    scale.nice();
  }

  return scale;
};

const getScaleType = (
  values: (string | number | Date)[],
  opts: {
    scaleType?: AxisScaleType;
    supportsLog?: boolean;
  } = {},
) => {
  let scaleType = 'category';
  if (typeof values[0] === 'number') {
    if (opts.supportsLog && opts.scaleType === 'log') {
      scaleType = 'log';
    } else {
      scaleType = 'linear';
    }
  } else if (values[0] instanceof Date) {
    scaleType = 'date';
  }
  return scaleType;
};

const getDomain = (scaleType: string, values: (string | number | Date)[], opts: {} = {}) => {
  if (scaleType === 'category') {
    return Array.from(new Set(values));
  }

  const extent = d3Extent(values as (number | Date)[]);
  if (typeof extent[0] !== 'undefined' && typeof extent[1] !== 'undefined') {
    return extent;
  }
  return [];
};
