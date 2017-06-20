import { IHoverCardStyles } from './HoverCard.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyleSets,
  before
} from '../../Styling';

export const getStyles = memoizeFunction((
  customStyles?: IHoverCardStyles
): IHoverCardStyles => {

  const styles: IHoverCardStyles = {
    root: {
      width: '340px',
      'background-color': 'transparent',
      'pointer-events': 'none'
    },
    compactCard: {
      padding: '20px 24px',
      'height': '156px',
      'box-sizing': 'border-box',
      'pointer-events': 'auto'
    },
    expandedCard: [
      {
        padding: '0px 24px',
        height: '0',
        'overflow-y': 'auto',
        'box-sizing': 'border-box',
        'background-color': '#f4f4f4',
        'pointer-events': 'auto',
        transition: 'height 0.467s cubic-bezier(0.5, 0, 0, 1)'
      },
      // before({
      //   content: '""',
      //   height: '1px',
      //   width: 'calc(100% + 24px)',
      //   position: 'absolute',
      //   top: '0',
      //   left: '-24px',
      //   'background-color': 'gray'
      // })
    ],
    expandedCardIsExpanded: {
      height: '384px'
    }
  };

  return mergeStyleSets(styles, customStyles);
});