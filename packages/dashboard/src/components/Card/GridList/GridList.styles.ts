import { ICustomCssForCells, IGridListStyles } from './GridList.types';

export const getStyles = (props: ICustomCssForCells): IGridListStyles => {
  return {
    root: {},
    actionButton: {
      color: 'blue'
    },
    imageAlignment: {
      float: 'left',
      marginRight: '16px',
      color: props.iconColor ? props.iconColor : ''
    },
    cursonPointer: {
      cursor: 'pointer'
    },
    text: {
      fontSize: '14px',
      lineHeight: '16px',
      color: props.textColor ? props.textColor : '#333333',
      display: 'block',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  };
};
