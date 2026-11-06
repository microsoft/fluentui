'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { Legends } from '../Legends/Legends';
import {
  getVegaLiteChartDescription,
  renderVegaLiteAxes,
  VegaLiteChartTitle,
  VegaLiteTooltipContainer,
  vegaLiteChartPresentation,
} from './VegaLiteChartPresentation';
import type { VegaLiteSpec } from './VegaLiteTypes';
import type { useVegaLiteChartInteraction } from './useVegaLiteChartInteraction';

type ShellProps = React.ComponentPropsWithoutRef<'div'> &
  Omit<Parameters<typeof renderVegaLiteAxes>[0], 'id'> & {
    spec: VegaLiteSpec;
    hideTitle?: boolean;
    chartTitle: string;
    svgId: string;
    width: number;
    height: number;
    subject: 'marks' | 'points';
    navigationAttributes: ReturnType<typeof useVegaLiteChartInteraction>['navigationAttributes'];
    navigationKind: 'ranged' | 'centered';
    classes: { root: string; svg: string; axis: string; axisLine: string; tooltip: string };
    beforeNavigation?: React.ReactNode;
    beforeAxes?: React.ReactNode;
    legendProps?: React.ComponentProps<typeof Legends>;
    tooltip?: { target: SVGElement; content: React.ReactNode };
  };

/** Shared DOM framing only: neither geometry nor tooltip/mark semantics are normalized here. */
export const VegaLiteChartShell: ForwardRefComponent<ShellProps> = React.forwardRef((props, ref) => {
  const {
    spec,
    hideTitle,
    chartTitle,
    svgId: id,
    width,
    height,
    plotWidth,
    plotHeight,
    axes,
    showXAxis,
    showYAxis,
    subject,
    navigationAttributes,
    navigationKind,
    classes,
    beforeNavigation,
    beforeAxes,
    legendProps,
    tooltip,
    children,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...rootProps
  } = props;
  const svgDescription = Array.from(
    new Set([...(ariaDescribedBy ?? '').split(/\s+/), `${id}-description`].filter(Boolean)),
  ).join(' ');
  return (
    <div {...rootProps} ref={ref} className={mergeClasses(classes.root, className)} role="presentation">
      <VegaLiteChartTitle spec={spec} hideTitle={hideTitle} />
      {beforeNavigation}
      <div
        {...navigationAttributes}
        {...(navigationKind === 'ranged'
          ? { 'data-ranged-navigation': 'true' }
          : { 'data-centered-navigation': 'true' })}
      >
        <svg
          id={id}
          className={classes.svg}
          width={width}
          height={height}
          viewBox={`${vegaLiteChartPresentation.viewBox.x} ${vegaLiteChartPresentation.viewBox.y} ${width} ${height}`}
          role="group"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : `${id}-title`)}
          aria-describedby={svgDescription}
        >
          <title id={`${id}-title`}>{chartTitle}</title>
          <desc id={`${id}-description`}>{getVegaLiteChartDescription(spec, subject)}</desc>
          <defs>
            <clipPath id={`${id}-clip`}>
              <rect width={plotWidth} height={plotHeight} />
            </clipPath>
          </defs>
          {beforeAxes}
          {renderVegaLiteAxes({ id, axes, plotWidth, plotHeight, showXAxis, showYAxis, classes })}
          <g clipPath={`url(#${id}-clip)`}>{children}</g>
        </svg>
      </div>
      {legendProps && <Legends {...legendProps} />}
      {tooltip && (
        <ChartPopover
          isPopoverOpen
          positioning={{ target: tooltip.target }}
          customCallout={{
            customizedCallout: (
              <VegaLiteTooltipContainer id={`${id}-tooltip`} className={classes.tooltip}>
                {tooltip.content}
              </VegaLiteTooltipContainer>
            ),
          }}
        />
      )}
    </div>
  );
});
VegaLiteChartShell.displayName = 'VegaLiteChartShell';
