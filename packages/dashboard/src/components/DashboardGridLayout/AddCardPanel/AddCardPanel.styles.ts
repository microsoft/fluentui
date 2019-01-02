import { IAddCardPanelStyles } from './AddCardPanel.types';
import { FontSizes, DefaultFontStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (): IAddCardPanelStyles => {
  return {
    header: {
      fontWeight: 700,
      fontSize: FontSizes.xxLarge,
      lineHeight: '38px',
      marginBottom: '26px'
    },
    contentRoot: {
      margin: '0px 13px 20px 32px'
    },
    emptyCardStyles: {
      position: 'absolute',
      top: '50%',
      left: '35%',
      transform: 'translateY(-50%)',
      margin: ' 0px auto',
      height: '200px',
      width: '200px'
    },
    emptyCardContentStyles: {
      fontFamily: DefaultFontStyles.medium.fontFamily,
      lineHeight: '20px',
      fontSize: '14px',
      textAlign: 'center',
      color: DefaultPalette.black,
      paddingTop: '32px'
    }
  };
};
