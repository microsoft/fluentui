import { IStyle } from '@uifabric/styling';

interface IResizeGroupOverflowExampleStyle {
  root: IStyle;
  resizeIsShort: IStyle;
  settingsGroup: IStyle;
  itemCountDropdown: IStyle;
}

const resizeGroupOverflowExampleStyle: IResizeGroupOverflowExampleStyle = {
  root: {
    display: 'block'
  },
  resizeIsShort: {
    width: '400px'
  },
  settingsGroup: {
    paddingTop: '20px'
  },
  itemCountDropdown: {
    width: '180px'
  }
};

export { resizeGroupOverflowExampleStyle, IResizeGroupOverflowExampleStyle };
