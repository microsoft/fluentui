import { ITreeStyleProps, ITreeStyles } from './TreeChart.types';

export const getStyles = (props: ITreeStyleProps): ITreeStyles => {
  return {
    link: {
      fill: 'none',
      stroke: 'black',
      strokeWidth: '2px',
    },
  };
};
