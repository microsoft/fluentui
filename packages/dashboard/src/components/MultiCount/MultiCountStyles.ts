import { IMultiCountStyles, IMultiCountStyleProps } from './MultiCount.types';

export const getStyles = (props: IMultiCountStyleProps): IMultiCountStyles => {
  const {
    annotationTextColor,
    annotationTextFontSize,
    bodyTextFontSize,
    bodyTextColor,
    color,
    currentText,
    hoveredText,
    href
  } = props;
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      alignItems: 'baseline',
      opacity: hoveredText === '' ? '' : hoveredText === currentText ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
      lineHeight: 'normal'
    },
    bodyText: {
      fontFamily: 'Segoe UI',
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: bodyTextFontSize ? bodyTextFontSize : '28px',
      flex: 1,
      color: bodyTextColor ? bodyTextColor : '#000000'
    },
    data: {
      fontFamily: 'Segoe UI',
      fontWeight: 'bold',
      color: color,
      marginRight: '8px'
    },
    annotation: {
      display: 'inline-flex',
      flex: 1
    },
    annotationText: {
      marginLeft: '16px',
      color: annotationTextColor ? annotationTextColor : '#000000',
      fontSize: annotationTextFontSize ? annotationTextFontSize : '12px'
    },
    icon: {
      width: '12px',
      height: '12px'
    },
    hoverCardText: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '16px',
      paddingBottom: '3px'
    },
    hoverCardData: {
      fontFamily: 'Segoe UI',
      fontWeight: 'bold',
      fontSize: '28px',
      lineHeight: '33px',
      color: props.color,
      paddingLeft: '16px',
      paddingBottom: '8px'
    },
    hoverCardRoot: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '16px'
    },
    hoverCardAnnotationText: {
      marginLeft: '16px',
      fontFamily: 'Segoe UI'
    },
    hoverCardBodyText: {
      marginRight: '16px',
      fontFamily: 'Segoe UI'
    },
    customMessage: {
      fontSize: '10px',
      lineHeight: '12px',
      fontFamily: 'Segoe UI',
      fontWeight: 600,
      marginTop: '13px',
      marginLeft: '16px',
      marginBottom: '8px',
      opacity: '0.6'
    }
  };
};
