import { IAddCardPanelStyles } from './AddCardPanel.types';
import { FontSizes } from 'office-ui-fabric-react/lib/Styling';

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
    }
  };
};
