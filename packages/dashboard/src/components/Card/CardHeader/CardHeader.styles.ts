import { ICardHeaderProps, ICardHeaderStyles } from './CardHeader.types';
import { FontSize } from './CardHeader.types';

export const getStyles = (props: ICardHeaderProps): ICardHeaderStyles => {
  const { fontSize } = props;

  return {
    root: {
      overflow: 'hidden',
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '21px',
      marginBottom: '21px'
    },
    headerText: {
      fontSize: fontSize === FontSize.medium ? '16px' : '28px',
      lineHeight: fontSize === FontSize.medium ? '21px' : '36px',
      fontFamily: 'Segoe UI Semibold',
      whiteSpace: 'noWrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      marginRight: '16px',
      color: '#000000'
    },
    annotationText: {
      whiteSpace: 'noWrap',
      fontFamily: 'Segoe UI',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      alignSelf: 'flex-end',
      fontSize: '12px',
      lineHeight: '16px',
      color: '#000000'
    }
  };
};
