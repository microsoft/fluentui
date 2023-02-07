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
      fill: 'white',
      padding: '10px',
      rx: '2px',
    },
    rectText: {
      fill: 'black',
      ...props.theme!.fonts.large,
    },
    rectSubText: {
      fill: '#484644',
      ...props.theme!.fonts.medium,
    },
    rectBodyText: {
      fill: '#808080',
      ...props.theme!.fonts.xSmall,
    },
    rectMetricText: {
      fill: '#000000',
      ...props.theme!.fonts.xLarge,
    },
  };
};
