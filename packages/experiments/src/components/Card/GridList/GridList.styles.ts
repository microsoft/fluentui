import { IGridListStyles } from './GridList.types';

export const getStyles = (): IGridListStyles => {
  return {
    root: {},
    actionButton: {
      color: 'blue'
    },
    imageAlignment: {
      float: 'left',
      marginRight: '16px'
    },
    cursonPointer: {
      cursor: 'pointer'
    },
    text: {
      fontSize: '14px',
      lineHeight: '16px',
      color: '#333333'
    }
  };
};
