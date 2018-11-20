import { IBodyTextStyles } from './BodyText.types';
import { DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (): IBodyTextStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    subHeaderText: {
      fontFamily: DefaultFontStyles.medium.fontFamily,
      fontWeight: 'bold',
      lineHeight: '16px',
      fontSize: '12px',
      color: '#000000'
    },
    bodyText: {
      fontFamily: DefaultFontStyles.medium.fontFamily,
      lineHeight: '16px',
      fontSize: '12px',
      paddingTop: '8px',
      flexWrap: 'wrap',
      color: '#000000'
    }
  };
};
