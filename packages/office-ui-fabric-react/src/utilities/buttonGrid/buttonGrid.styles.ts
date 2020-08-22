import { IButtonGridStyleProps, IButtonGridStyles } from './buttonGrid.types';

export const getStyles = (props: IButtonGridStyleProps): IButtonGridStyles => {
  return {
    root: {
      padding: 2,
      outline: 'none',
    },
    tableCell: {
      padding: 0,
    },
  };
};
