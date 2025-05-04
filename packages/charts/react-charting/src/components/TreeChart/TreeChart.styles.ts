import { HighContrastSelectorBlack } from '@fluentui/react/lib/Styling';
import { ITreeStyleProps, ITreeStyles } from './TreeChart.types';

export const getStyles = (props: ITreeStyleProps): ITreeStyles => {
  return {
    root: [
      props.theme.spacing,
      'ms-TreeChart',
      props.className,
      {
        overflow: 'scroll',
      },
    ],
    link: {
      fill: 'none',
      stroke: props.theme!.palette.neutralSecondary,
      strokeWidth: '2px',
    },
    rectNode: {
      strokeWidth: '2px',
      fill: props.theme!.semanticColors.bodyBackground,
      padding: '10px',
      rx: '2px',
    },
    rectText: {
      fill: props.theme!.palette.neutralDark,
      ...props.theme!.fonts.large,
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(179, 179, 179)',
        },
      },
    },
    rectSubText: {
      fill: props.theme!.palette.neutralPrimary,
      ...props.theme!.fonts.medium,
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(179, 179, 179)',
        },
      },
    },
    rectBodyText: {
      fill: props.theme!.palette.neutralPrimaryAlt,
      ...props.theme!.fonts.xSmall,
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(179, 179, 179)',
        },
      },
    },
    rectMetricText: {
      fill: props.theme!.palette.neutralDark,
      ...props.theme!.fonts.xLarge,
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(179, 179, 179)',
        },
      },
    },
  };
};
