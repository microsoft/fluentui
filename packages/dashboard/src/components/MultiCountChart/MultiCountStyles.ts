import { IMultiCountChartStyles, IMultiCountStyleProps } from './MutliCountChart.types';

export const getStyles = (props: IMultiCountStyleProps): IMultiCountChartStyles => {
  return {
    root: {
      display: 'flex',
      lineHeight: '33px',
      flexDirection: 'row',
      flex: 1
    },
    bodyText: {
      fontFamily: 'Segoe UI Semibold',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '28px',
      flex: 1
    },
    data: {
      fontFamily: 'Segoe UI',
      fontWeight: 'bold',
      color: props.color,
      marginRight: '8px'
    },
    annotation: {
      display: 'inline-flex',
      flex: 1
    },
    annotationText: {
      marginLeft: '16px',
      color: '#000000'
    },
    icon: {
      width: '12px',
      height: '12px',
      display: props.iconName ? '' : 'none',
      color: props.iconName === 'FlickUp' ? '#ED0000' : '#6BB700'
    }
  };
};
