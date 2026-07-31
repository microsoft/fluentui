import type { Font } from '@fluentui/chart-utilities';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration, charts C5): the five GriffelStyle
 * factories this file used to export — getTooltipStyle, getAxisTitleStyle,
 * getBarLabelStyle, getMarkerLabelStyle, getChartTitleStyles — are GONE. They were
 * internal-only (never re-exported from the package index) and each consumer inlined the
 * factory's compiled output into its own `*.module.css` as it converted (VerticalBarChart
 * `.tooltip`/`.bar-label`, DonutChart/GaugeChart/FunnelChart/SankeyChart `.chart-title`,
 * CartesianChart axis/marker labels, …). SankeyChart (C5) was the LAST consumer.
 * What remains here is the non-Griffel surface: the chart-title layout types/constant and
 * the runtime inline-style builder.
 */

/**
 * Default padding below chart title (in pixels).
 * Used consistently across all chart types for spacing between title and chart content.
 */
export const CHART_TITLE_PADDING = 20;

/**
 * Shared interface for chart title styling properties.
 * Used by components that display a chart title with customizable font, alignment, and padding.
 * {@docCategory TitleStyles}
 */
export interface TitleStyles {
  /**
   * Font configuration for the title
   */
  titleFont?: Partial<Font>;
  /**
   * Horizontal anchor/alignment for the chart title
   */
  titleXAnchor?: 'auto' | 'left' | 'center' | 'right';
  /**
   * Vertical anchor/alignment for the chart title
   */
  titleYAnchor?: 'auto' | 'top' | 'middle' | 'bottom';
  /**
   * Padding for the chart title
   */
  titlePad?: { t?: number; r?: number; b?: number; l?: number };
}

/**
 * Creates dynamic chart title styles using CSS properties.
 * @param titleFont - Optional font configuration from Plotly layout
 * @param xanchor - Optional horizontal anchor/alignment ('auto' | 'left' | 'center' | 'right')
 * @param yanchor - Optional vertical anchor/alignment ('auto' | 'top' | 'middle' | 'bottom')
 * @param pad - Optional padding configuration
 * @returns Style object with CSS properties for dynamic styling
 */
export function getChartTitleInlineStyles(
  titleFont: Partial<Font> | undefined,
  xanchor?: string,
  yanchor?: string,
  pad?: { t?: number; r?: number; b?: number; l?: number },
): React.CSSProperties {
  const styles: React.CSSProperties = {};

  if (titleFont) {
    Object.assign(
      styles,
      titleFont.family && { fontFamily: titleFont.family },
      titleFont.size && { fontSize: `${titleFont.size}px` },
      titleFont.weight && { fontWeight: titleFont.weight },
      titleFont.color && { fill: titleFont.color as string },
      titleFont.shadow && titleFont.shadow !== 'none' && { filter: `drop-shadow(${titleFont.shadow})` },
    );
  }

  if (xanchor) {
    const anchorMap: Record<string, React.CSSProperties['textAlign']> = {
      left: 'left',
      center: 'center',
      right: 'right',
    };
    const alignmentKey = xanchor.toLowerCase();
    if (anchorMap[alignmentKey]) {
      styles.textAlign = anchorMap[alignmentKey];
    }
  }

  if (yanchor) {
    const anchorMap: Record<string, React.CSSProperties['alignSelf']> = {
      top: 'flex-start',
      middle: 'center',
      bottom: 'flex-end',
    };
    const alignmentKey = yanchor.toLowerCase();
    if (anchorMap[alignmentKey]) {
      styles.alignSelf = anchorMap[alignmentKey];
    }
  }

  if (pad) {
    const t = pad.t ?? 0;
    const r = pad.r ?? 0;
    const b = pad.b ?? 0;
    const l = pad.l ?? 0;
    styles.padding = `${t}px ${r}px ${b}px ${l}px`;
  }

  return styles;
}
