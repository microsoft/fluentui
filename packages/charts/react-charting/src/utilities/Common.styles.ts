import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import type { IRawStyle } from '@fluentui/merge-styles';
import { FontSizes, FontWeights, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react';

export const getTooltipStyle = (theme: ITheme): IStyle => {
  return {
    ...theme.fonts.medium,
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    position: 'absolute',
    textAlign: 'center',
    top: '0px',
    background: theme.semanticColors.bodyBackground,
    borderRadius: '2px',
    pointerEvents: 'none',
    color: theme.semanticColors.bodyText,
  };
};

export const getAxisTitleStyle = (theme: ITheme, font: IRawStyle): IStyle => {
  return [
    font,
    {
      textAlign: 'center',
      fontWeight: FontWeights.semibold,
      fontStyle: 'normal',
      lineHeight: FontSizes.medium,
      color: NeutralColors.gray160,
      fill: theme.semanticColors.bodyText,
      [HighContrastSelector]: {
        fill: 'CanvasText',
      },
    },
  ];
};

export const getBarLabelStyle = (theme: ITheme): IStyle => {
  return {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semibold,
    fill: theme.palette.neutralPrimary,
    selectors: {
      [HighContrastSelector]: {
        fill: 'CanvasText',
      },
    },
  };
};

export const getMarkerLabelStyle = (theme: ITheme): IStyle => {
  return {
    fontSize: FontSizes.medium,
    fill: theme.semanticColors.bodyText,
    textAnchor: 'middle',
    selectors: {
      [HighContrastSelector]: {
        fill: 'CanvasText',
      },
    },
  };
};
