import { ITreeStyleProps, ITreeStyles } from './TreeChart.types';

export const getStyles = (props: ITreeStyleProps): ITreeStyles => {
  return {
    tooltip: {
      padding: '16px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
    },
    link: {
      fill: 'none',
      stroke: 'black',
      strokeWidth: '2px',
    },
  };
};
