import { HighContrastSelector } from '../utilities/utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { type GriffelStyle } from '@griffel/react';
import type { Font } from '@fluentui/chart-utilities';

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
    ...typographyStyles.caption1,
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalS,
  };
};

/**
 * Creates dynamic chart title styles using CSS properties.
 * @param titleFont - Optional font configuration from Plotly layout
 * @returns Style object with CSS properties for dynamic styling
 */
export function getChartTitleInlineStyles(titleFont: Partial<Font> | undefined): React.CSSProperties {
  if (!titleFont) {
    return {};
  }

  return {
    ...(titleFont.family && { fontFamily: titleFont.family }),
    ...(titleFont.size && { fontSize: `${titleFont.size}px` }),
    ...(titleFont.weight && { fontWeight: titleFont.weight }),
    ...(titleFont.color && { fill: titleFont.color as string }),
    ...(titleFont.shadow && titleFont.shadow !== 'none' && { filter: `drop-shadow(${titleFont.shadow})` }),
  };
}
