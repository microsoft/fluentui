import { IHoverCardStyles } from './HoverCard.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyleSets
} from '../../Styling';

export const getStyles = memoizeFunction((
  customStyles?: IHoverCardStyles
): IHoverCardStyles => {

  const styles: IHoverCardStyles = {
    root: {
      width: '340px',
      'background-color': '#FFF'
    },
    compactCard: {
      padding: '20px 24px',
      'max-height': '156px',
      'box-sizing': 'border-box'
    },
    expandedCard: {
      padding: '20px 24px',
      'max-height': '384px',
      'overflow-y': 'auto',
      'box-sizing': 'border-box',
      ':before': {
        content: '',
        height: '1px',
        position: 'absolute',
        bottom: '0',
        'background-color': '#f4f4f4'
      }
    }
  };

  return mergeStyleSets(styles, customStyles);
});