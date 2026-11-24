import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { getChartTitleInlineStyles, wrapContent } from '../../utilities/index';
import { SVGTooltipText } from '../../utilities/SVGTooltipText';
import type { LineChartPlotContext, LineChartProps } from './LineChart.types';

/** Existing axis captions, distinct from data/event annotation primitives. */
export const LineChartSceneCaptions = ({
  options,
  plot,
  className,
}: {
  options: LineChartProps;
  plot: LineChartPlotContext;
  className?: string;
}): JSXElement => {
  const { titleFont, titleXAnchor, titleYAnchor, titlePad } = options.titleStyles ?? {};
  const fontSize = typeof titleFont?.size === 'number' ? titleFont.size : 13;
  const left = plot.plotRect.x + 8;
  const right = plot.plotRect.x + plot.plotRect.width - 8;
  const x =
    (titleXAnchor === 'left' ? left : titleXAnchor === 'right' ? right : (left + right) / 2) +
    (titlePad?.l ?? 0) -
    (titlePad?.r ?? 0);
  const y = plot.svgRect.y + Math.max(fontSize + 8, 12) + (titlePad?.t ?? 0) - (titlePad?.b ?? 0);
  const valueX = plot.isRtl ? plot.svgRect.x + 16 : plot.svgRect.x + plot.svgRect.width - 8;
  const valueY = plot.plotRect.y + plot.plotRect.height / 2;
  return (
    <g aria-hidden="true">
      {options.xAxisAnnotation && (
        <SVGTooltipText
          content={options.xAxisAnnotation}
          maxWidth={Math.max(0, plot.plotRect.width - 16)}
          wrapContent={wrapContent}
          textProps={{
            x,
            y,
            className,
            textAnchor: titleXAnchor === 'left' ? 'start' : titleXAnchor === 'right' ? 'end' : 'middle',
            dominantBaseline:
              titleYAnchor === 'top'
                ? 'hanging'
                : titleYAnchor === 'bottom'
                ? 'alphabetic'
                : titleYAnchor === 'middle'
                ? 'central'
                : 'auto',
            style: getChartTitleInlineStyles(titleFont),
          }}
        />
      )}
      {options.yAxisAnnotation && !options.secondaryYAxistitle && (
        <SVGTooltipText
          content={options.yAxisAnnotation}
          maxWidth={Math.max(0, plot.plotRect.height - 16)}
          wrapContent={wrapContent}
          textProps={{
            x: valueX,
            y: valueY,
            textAnchor: 'middle',
            className,
            transform: `rotate(-90,${valueX},${valueY})`,
          }}
        />
      )}
    </g>
  );
};
