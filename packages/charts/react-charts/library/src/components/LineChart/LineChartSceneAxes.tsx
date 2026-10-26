'use client';

import * as React from 'react';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import type { AxisScale } from 'd3-axis';
import { select } from 'd3-selection';
import { tokens } from '@fluentui/react-theme';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { autoLayoutXAxisLabels, createWrapOfXLabels, rotateXAxisLabels } from '../../utilities/index';
import type {
  LineChartAxisStrokeProps,
  LineChartPlotContext,
  LineChartProps,
  LineChartResolvedAxis,
  LineChartXValue,
} from './LineChart.types';
import {
  getLineChartXOptions,
  getLineChartYScaleOptions,
  getLineChartYScaleTicks,
  getLineChartXAxisTicks,
} from './lineChartScales';

export interface LineChartSceneAxisProps {
  axis: LineChartResolvedAxis;
  className?: string;
  titleClassName?: string;
  options: LineChartProps;
  plot: LineChartPlotContext;
  onMeasure: (key: string, size: number, ticks?: ReadonlyMap<string, number>) => void;
}

/** Adapt the committed projection to D3's axis protocol without resolving another scale. */
function createAxisProjection(axis: LineChartResolvedAxis, plot: LineChartPlotContext): AxisScale<LineChartXValue> {
  const range =
    axis.orientation === 'x' ? plot.xScale.range : plot.yScales.find(scale => scale.key === axis.scaleKey)!.range;
  const scale: AxisScale<LineChartXValue> = Object.assign(
    (value: LineChartXValue) =>
      axis.orientation === 'x'
        ? (plot.projectX(value) ?? NaN) - plot.svgRect.x
        : plot.projectY(axis.scaleKey, Number(value)) ?? NaN,
    {
      copy: () => scale,
      domain: () => axis.ticks.map(tick => tick.value),
      range: () =>
        axis.orientation === 'x' ? [range[0] - plot.svgRect.x, range[1] - plot.svgRect.x] : [range[0], range[1]],
    },
  );
  return scale;
}

/** Native D3 tick generation/label wrapping consumes only the committed scene projection. */
export const LineChartSceneAxis = ({
  axis,
  className,
  titleClassName,
  options,
  plot,
  onMeasure,
}: LineChartSceneAxisProps): JSXElement => {
  const ref = React.useRef<SVGGElement>(null);
  const titleRef = React.useRef<SVGTextElement>(null);
  const measureRef = React.useRef<(() => void) | undefined>(undefined);
  const x = axis.orientation === 'x';
  const configuration = x ? getLineChartXOptions(options) : getLineChartYScaleOptions(options, axis.scaleKey);
  const presentation = configuration.axis === false ? undefined : configuration.axis;
  const axisX = axis.side === 'left' ? axis.rect.x + axis.rect.width : axis.rect.x;
  const axisY = axis.rect.y;

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const scale = createAxisProjection(axis, plot);
    const generator = (x ? axisBottom(scale) : axis.side === 'left' ? axisLeft(scale) : axisRight(scale))
      .tickValues(axis.ticks.map(tick => tick.value))
      .tickFormat((_, index) => axis.ticks[index]?.label ?? '')
      .tickSize(x ? options.xAxistickSize ?? 6 : 0)
      .tickPadding(x ? options.xAxisTickPadding ?? 10 : options.tickPadding ?? 10);
    // The older label helpers split numeric and string axis aliases. This
    // projection implements the same axis protocol for the validated family.
    const labelAxis = generator as unknown as Parameters<typeof createWrapOfXLabels>[0]['xAxis'];
    const selection = select(node).call(generator);
    selection.select('.domain').attr('display', 'none');
    selection
      .selectAll('.tick line')
      .attr('stroke', configuration.line?.strokeColor ?? tokens.colorNeutralForeground1)
      .attr('stroke-width', configuration.line?.strokeWidth ?? 1)
      .attr('stroke-dasharray', configuration.line?.dashArray ?? null)
      .attr('opacity', configuration.line?.opacity ?? 0.2);
    const text = selection.selectAll<SVGTextElement, LineChartXValue>('.tick text');
    text.attr('fill', tokens.colorNeutralForeground1).attr('style', null);
    if (presentation?.tickLabelStyle) {
      for (const element of text.nodes()) {
        Object.assign(element.style, presentation.tickLabelStyle);
      }
    }
    // These helpers are the same native label layout paths used by CartesianChart.
    if (x && options.xAxis?.tickLayout === 'auto') {
      autoLayoutXAxisLabels(
        axis.ticks.map(tick => tick.value) as number[],
        axis.ticks.map(tick => tick.label),
        scale as unknown as Parameters<typeof autoLayoutXAxisLabels>[2],
        node as unknown as SVGSVGElement,
        plot.svgRect.width,
        node.ownerSVGElement?.parentElement,
      );
    } else if (x && (options.wrapXAxisLables || options.showXAxisLablesTooltip)) {
      const positions = axis.ticks.map(tick => tick.position).sort((a, b) => a - b);
      let availableWidth = plot.plotRect.width;
      for (let index = 1; index < positions.length; index++) {
        availableWidth = Math.min(availableWidth, positions[index] - positions[index - 1]);
      }
      createWrapOfXLabels({
        node: node as unknown as SVGSVGElement,
        xAxis: labelAxis,
        noOfCharsToTruncate: options.noOfCharsToTruncate ?? 4,
        showXAxisLablesTooltip: options.showXAxisLablesTooltip ?? false,
        width: Math.max(1, availableWidth - 8),
        container: node.ownerSVGElement?.parentElement,
      });
    }
    if (x && options.rotateXAxisLables) {
      rotateXAxisLabels({ node: node as unknown as SVGSVGElement, xAxis: labelAxis });
    }
    const measure = () => {
      const tickWidths = new Map<string, number>();
      selection.selectAll<SVGGElement, LineChartXValue>('.tick').each(function (_, index) {
        const element = this.querySelector('text');
        const tick = axis.ticks[index];
        if (element && tick) {
          element.style.visibility = tick.labelVisible ? 'visible' : 'hidden';
          if (typeof element.getBBox === 'function') {
            tickWidths.set(`x-tick:${tick.key}`, element.getBBox().width);
          }
          if (
            (x ? options.showXAxisLablesTooltip : options.showYAxisLablesTooltip) &&
            !element.querySelector('title')
          ) {
            const title = node.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = tick.label;
            element.appendChild(title);
          }
        }
      });
      if (typeof node.getBBox === 'function') {
        const box = node.getBBox();
        const title = titleRef.current;
        const titleSpace = presentation?.title
          ? title && typeof title.getBBox === 'function'
            ? title.getBBox().height + 8
            : 24
          : 0;
        const width = presentation?.labelsVisible === false ? titleSpace + 16 : box.width + titleSpace + 10;
        onMeasure(
          x ? 'x' : `y:${axis.scaleKey}`,
          x ? Math.max(0, box.height + 10) : Math.max(0, width),
          x ? tickWidths : undefined,
        );
        if (x && titleSpace) {
          onMeasure('x-title', titleSpace);
        }
      }
    };
    measureRef.current = measure;
    measure();
    return () => {
      if (measureRef.current === measure) {
        measureRef.current = undefined;
      }
    };
  }, [
    axis,
    plot.geometryVersion,
    options.xAxistickSize,
    options.xAxisTickPadding,
    options.tickPadding,
    options.xAxis?.tickLayout,
    options.wrapXAxisLables,
    options.showXAxisLablesTooltip,
    options.showYAxisLablesTooltip,
    options.noOfCharsToTruncate,
    options.rotateXAxisLables,
    configuration.line?.strokeColor,
    configuration.line?.strokeWidth,
    configuration.line?.dashArray,
    configuration.line?.opacity,
    presentation?.tickLabelStyle,
    presentation?.titleStyle,
    presentation?.title,
    className,
    titleClassName,
    onMeasure,
  ]);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const measure = () => measureRef.current?.();
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
    observer?.observe(node);
    if (titleRef.current) {
      observer?.observe(titleRef.current);
    }
    node.ownerDocument.fonts?.addEventListener('loadingdone', measure);
    return () => {
      observer?.disconnect();
      node.ownerDocument.fonts?.removeEventListener('loadingdone', measure);
    };
  }, [axis.scaleKey, presentation?.title]);

  return (
    <g aria-hidden="true">
      <g
        ref={ref}
        className={className}
        transform={x ? `translate(${plot.svgRect.x},${axisY})` : `translate(${axisX},0)`}
      />
      {presentation?.title && (
        <text
          ref={titleRef}
          className={titleClassName}
          fill={tokens.colorNeutralForeground1}
          x={
            x
              ? axis.rect.x + axis.rect.width / 2
              : axis.side === 'left'
              ? axis.rect.x + 8
              : axis.rect.x + axis.rect.width - 8
          }
          y={x ? axis.rect.y + axis.rect.height - 4 : axis.rect.y + axis.rect.height / 2}
          textAnchor="middle"
          transform={
            x
              ? undefined
              : `rotate(-90,${axis.side === 'left' ? axis.rect.x + 8 : axis.rect.x + axis.rect.width - 8},${
                  axis.rect.y + axis.rect.height / 2
                })`
          }
          style={presentation.titleStyle}
        >
          {presentation.title}
        </text>
      )}
      {options.onRenderAxisDecoration?.({ axis, plot })}
    </g>
  );
};

function strokeProps(style: LineChartAxisStrokeProps | undefined): React.SVGAttributes<SVGLineElement> {
  return {
    stroke: style?.strokeColor ?? tokens.colorNeutralForeground1,
    strokeWidth: style?.strokeWidth ?? 1,
    strokeDasharray: style?.dashArray,
    opacity: style?.opacity ?? 0.2,
  };
}

/** Grid/rule paint is separate from labels so belowGrid is a real ordering boundary. */
export const LineChartSceneRules = ({
  plot,
  options,
  gridOpacity,
  axisOpacity,
}: {
  plot: LineChartPlotContext;
  options: LineChartProps;
  gridOpacity: number;
  axisOpacity: number;
}): JSXElement => {
  const xOptions = getLineChartXOptions(options);
  const right = plot.plotRect.x + plot.plotRect.width;
  const bottom = plot.plotRect.y + plot.plotRect.height;
  return (
    <g aria-hidden="true" pointerEvents="none">
      <g opacity={gridOpacity}>
        {xOptions.grid?.visible &&
          getLineChartXAxisTicks(plot).map(tick => (
            <line
              key={tick.key}
              x1={tick.position}
              x2={tick.position}
              y1={plot.plotRect.y}
              y2={bottom}
              {...strokeProps(xOptions.grid)}
            />
          ))}
        {plot.yScales.map(scale => {
          const configuration = getLineChartYScaleOptions(options, scale.key);
          return configuration.grid?.visible ? (
            <g key={scale.key}>
              {getLineChartYScaleTicks(plot, scale.key).map(tick => (
                <line
                  key={tick.key}
                  x1={plot.plotRect.x}
                  x2={right}
                  y1={tick.position}
                  y2={tick.position}
                  {...strokeProps(configuration.grid)}
                />
              ))}
            </g>
          ) : null;
        })}
      </g>
      <g opacity={axisOpacity}>
        {plot.axes.map(axis => {
          const configuration = axis.orientation === 'x' ? xOptions : getLineChartYScaleOptions(options, axis.scaleKey);
          if (!configuration.line?.visible) {
            return null;
          }
          const x = axis.side === 'left' ? axis.rect.x + axis.rect.width : axis.rect.x;
          return axis.orientation === 'x' ? (
            <line
              key={axis.scaleKey}
              x1={axis.rect.x}
              x2={axis.rect.x + axis.rect.width}
              y1={axis.rect.y}
              y2={axis.rect.y}
              {...strokeProps(configuration.line)}
            />
          ) : (
            <line
              key={axis.scaleKey}
              x1={x}
              x2={x}
              y1={axis.rect.y}
              y2={axis.rect.y + axis.rect.height}
              {...strokeProps(configuration.line)}
            />
          );
        })}
      </g>
    </g>
  );
};
