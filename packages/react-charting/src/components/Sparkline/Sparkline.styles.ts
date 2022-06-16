import { ISparklineStyleProps, ISparklineStyles } from './Sparkline.types';

export const getStyles = (props: ISparklineStyleProps): ISparklineStyles => {
  return {
    tooltip: {
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      borderRadius: '2px',
      pointerEvents: 'none',
    },
  };
};
