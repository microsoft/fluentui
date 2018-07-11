import { IGridStyleProps, IGridStyles } from './Grid.types';

export const getStyles = (props: IGridStyleProps): IGridStyles => {
  return {
    root: {
      padding: 2,
      outline: 'none'
    },
    tableCell: {
      padding: 0
    }
  };
};
