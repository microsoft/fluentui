import { HighContrastSelector } from '../utilities/utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { shorthands, type GriffelStyle } from '@griffel/react';

export const getTooltipStyle = (): GriffelStyle => {
  return {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingHorizontalS),
    position: 'absolute',
    textAlign: 'center',
    top: tokens.spacingVerticalNone,
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
