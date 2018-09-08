import { ICardHeaderProps, ICardHeaderStyles } from './CardHeader.types';
import { FontSize } from './CardHeader.types';

export const getStyles = (props: ICardHeaderProps): ICardHeaderStyles => {
  const { fontSize } = props;

  return {
    root: {
      overflow: 'hidden',
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '22px',
      alignItems: 'baseline'
    },
    headerText: {
      fontSize: fontSize === FontSize.medium ? '16px' : '28px',
      lineHeight: fontSize === FontSize.medium ? '21px' : '36px',
      fontFamily: 'Segoe UI',
      whiteSpace: 'noWrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      marginRight: '16px',
      color: '#000000',
      fontWeight: 'bold'
    },
    annotationText: {
      whiteSpace: 'noWrap',
      fontFamily: 'Segoe UI',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontSize: '12px',
      lineHeight: '16px',
      color: '#000000',
      paddingTop: '9px'
    }
  };
};
