import { HighContrastSelector } from '../utilities/utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { type GriffelStyle } from '@griffel/react';
import type { Font } from '@fluentui/chart-utilities';

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

export const getTooltipStyle = (): GriffelStyle => {
  return {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    padding: tokens.spacingHorizontalS,
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    pointerEvents: 'none',
    color: tokens.colorNeutralForeground1,
  };
};

export const getAxisTitleStyle = (): GriffelStyle => {
  return {
    ...typographyStyles.caption2Strong,
    fontStyle: 'normal',
    textAlign: 'center',
    color: tokens.colorNeutralForeground2,
    fill: tokens.colorNeutralForeground1,
    [HighContrastSelector]: {
      fill: 'CanvasText',
    },
  };
};

export const getBarLabelStyle = (): GriffelStyle => {
  return {
    ...typographyStyles.caption1Strong, // Confirm styles
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
  };
};

export const getMarkerLabelStyle = (): GriffelStyle => {
  return {
    ...typographyStyles.body1,
    fill: tokens.colorNeutralForeground1,
    textAnchor: 'middle',
    [HighContrastSelector]: {
      fill: 'CanvasText',
    },
  };
};

export const getChartTitleStyles = (): GriffelStyle => {
  return {
    ...typographyStyles.caption2Strong,
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalS,
  };
};

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
