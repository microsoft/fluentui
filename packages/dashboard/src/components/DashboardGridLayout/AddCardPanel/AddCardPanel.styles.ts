import { IAddCardPanelStyles } from './AddCardPanel.types';

export const getStyles = (): IAddCardPanelStyles => {
  return {
    header: {
      fontWeight: 700,
      fontSize: '28px',
      lineHeight: '38px',
      marginBottom: '26px'
    },
    contentRoot: {
      margin: '0px 13px 20px 32px'
    }
  };
};
