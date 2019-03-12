import { IAddCardPanelStyles, IAddCardPanelStyleProps } from './AddCardPanel.types';
import { FontSizes, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (props: IAddCardPanelStyleProps): IAddCardPanelStyles => {
  const { theme } = props;
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
    emptyPanelMessageStyles: {
      ...theme!.fonts.medium,
      lineHeight: '20px',
      textAlign: 'center',
      color: DefaultPalette.black,
      paddingTop: '32px'
    }
  };
};
