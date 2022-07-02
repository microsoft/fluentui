import { ITreeStyleProps, ITreeStyles } from './TreeChart.types';

export const getStyles = (props: ITreeStyleProps): ITreeStyles => {
  return {
    link: {
      fill: 'none',
      stroke: 'black',
      strokeWidth: '2px',
    },
    rectNode: {
      strokeWidth: '2px',
      fill: 'white',
      padding: '10px',
    },
    rectText: {
      fill: 'black',
    },
  };
};
