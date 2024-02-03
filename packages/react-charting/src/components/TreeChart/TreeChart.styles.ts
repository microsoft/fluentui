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
      stroke: '#A1A1A1',
      strokeWidth: '2px',
    },
    rectNode: {
      strokeWidth: '2px',
      fill: props.theme!.semanticColors.bodyBackground,
      padding: '10px',
      rx: '2px',
    },
    rectText: {
      fill: props.theme!.semanticColors.messageText,
      ...props.theme!.fonts.large,
    },
    rectSubText: {
      fill: props.theme!.semanticColors.bodySubtext,
      ...props.theme!.fonts.medium,
    },
    rectBodyText: {
      fill: props.theme!.palette.neutralTertiary,
      ...props.theme!.fonts.xSmall,
    },
    rectMetricText: {
      fill: props.theme!.palette.neutralSecondary,
      ...props.theme!.fonts.xLarge,
    },
  };
};
