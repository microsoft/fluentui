import { IMultiCountStyles, IMultiCountStyleProps } from './MultiCount.types';

export const getStyles = (props: IMultiCountStyleProps): IMultiCountStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      alignItems: 'baseline'
    },
    bodyText: {
      fontFamily: 'Segoe UI Semibold',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: props.bodyTextFontSize ? props.bodyTextFontSize : '28px',
      flex: 1,
      color: props.bodyTextColor ? props.bodyTextColor : '#000000'
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
      color: props.annotationTextColor ? props.annotationTextColor : '#000000',
      fontSize: props.annotationTextFontSize ? props.annotationTextFontSize : '12px'
    },
    icon: {
      width: '12px',
      height: '12px',
      display: props.iconName === '' ? 'none' : '',
      color: props.iconName === 'FlickUp' ? '#ED0000' : '#6BB700'
    }
  };
};
