import * as React from 'react';
import { SVGTooltipText, SVGTooltipTextProps } from './SVGTooltipText';
import { CHART_TITLE_PADDING, getChartTitleInlineStyles, TitleStyles } from './Common.styles';
import { wrapContent } from './utilities';

const AXIS_TITLE_PADDING = 8;

/**
 * Props for the ChartTitle component
 */
export interface ChartTitleProps {
  /**
   * The title text to display
   */
  title: string;
  /**
   * The x position for the title (typically center of chart)
   */
  x: number;
  /**
   * Optional custom y position. If not provided, calculated based on font size.
   */
  y?: number;
  /**
   * Maximum width for the title text before wrapping/truncation
   */
  maxWidth?: number;
  /**
   * CSS class name for the title text element
   */
  className?: string;
  /**
   * Title styles configuration (font, anchors, padding)
   */
  titleStyles?: TitleStyles;
  /**
   * Text anchor for SVG text element
   * @default 'middle'
   */
  textAnchor?: 'start' | 'middle' | 'end';
  /**
   * Additional SVGTooltipText props to pass through
   */
  tooltipProps?: Partial<SVGTooltipTextProps>;
  /**
   * CSS class for the tooltip
   */
  tooltipClassName?: string;
}

/**
 * A reusable chart title component that renders an SVG text element with tooltip support.
 * This component encapsulates the common pattern for rendering chart titles across all chart types.
 */
export const ChartTitle: React.FunctionComponent<ChartTitleProps> = props => {
  const {
    title,
    x,
    y,
    maxWidth,
    className,
    titleStyles,
    textAnchor = 'middle',
    tooltipProps,
    tooltipClassName,
  } = props;

  const { titleFont, titleXAnchor, titleYAnchor, titlePad } = titleStyles ?? {};
  const calculatedY =
    y ??
    Math.max(
      (typeof titleFont?.size === 'number' ? titleFont.size : 13) + AXIS_TITLE_PADDING,
      CHART_TITLE_PADDING - AXIS_TITLE_PADDING,
    );
  const commonSvgToolTipProps: Partial<SVGTooltipTextProps> = {
    wrapContent,
    showBackground: true,
    className: tooltipClassName,
    ...tooltipProps,
  };
  return (
    <SVGTooltipText
      {...commonSvgToolTipProps}
      content={title}
      textProps={{
        x,
        y: calculatedY,
        textAnchor,
        className,
        'aria-hidden': true,
        style: getChartTitleInlineStyles(titleFont, titleXAnchor, titleYAnchor, titlePad),
      }}
      maxWidth={maxWidth}
    />
  );
};

ChartTitle.displayName = 'ChartTitle';
