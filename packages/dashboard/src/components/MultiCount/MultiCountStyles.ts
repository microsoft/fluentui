import { IMultiCountStyles, IMultiCountStyleProps } from './MultiCount.types';
import { DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (props: IMultiCountStyleProps): IMultiCountStyles => {
  const {
    annotationTextColor,
    annotationTextFontSize,
    bodyTextFontSize,
    bodyTextColor,
    color,
    currentText,
    hoveredText,
    href,
    hideIcon,
    onClicked
  } = props;
  const bodyTextSize = bodyTextFontSize ? bodyTextFontSize : '28px';
  return {
    root: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      alignItems: 'baseline',
      overflow: 'hidden',
      opacity: hoveredText === '' ? '' : hoveredText === currentText ? '' : '0.1',
      cursor: href || onClicked ? 'pointer' : 'default',
      fontSize: bodyTextSize,
      height: '1.3em'
    },
    bodyText: {
      flex: '1 1 auto',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontSize: bodyTextSize,
      fontFamily: DefaultFontStyles.medium.fontFamily,
      fontWeight: 600,
      lineHeight: '1.286em',
      marginLeft: '8px',
      width: '50%'
    },
    data: {
      flex: '0 0 auto',
      fontSize: bodyTextSize,
      lineHeight: '1.286em',
      fontFamily: DefaultFontStyles.medium.fontFamily,
      fontWeight: 'bold',
      color: bodyTextColor ? bodyTextColor : color
    },
    annotation: {
      flex: '0 0 auto',
      fontFamily: DefaultFontStyles.medium.fontFamily,
      marginLeft: '16px',
      width: '12px',
      height: '12px'
    },
    annotationText: {
      marginLeft: '16px',
      color: annotationTextColor ? annotationTextColor : '#000000',
      fontSize: annotationTextFontSize ? annotationTextFontSize : '12px'
    },
    icon: {
      flex: '0 0 auto',
      marginLeft: '16px'
    },
    hoverCardText: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '16px',
      paddingBottom: '3px'
    },
    hoverCardData: {
      fontFamily: DefaultFontStyles.medium.fontFamily,
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
      fontFamily: DefaultFontStyles.medium.fontFamily
    },
    hoverCardBodyText: {
      marginRight: '16px',
      fontFamily: DefaultFontStyles.medium.fontFamily
    },
    hoverCardIcon: {
      width: '12px',
      height: '12px',
      marginRight: '16px'
    },
    customMessage: {
      fontSize: '10px',
      lineHeight: '12px',
      fontFamily: DefaultFontStyles.medium.fontFamily,
      fontWeight: 600,
      marginTop: '13px',
      marginLeft: '16px',
      marginBottom: '8px',
      opacity: '0.6'
    },
    changeIcon: {
      marginLeft: hideIcon ? '' : '16px'
    }
  };
};
