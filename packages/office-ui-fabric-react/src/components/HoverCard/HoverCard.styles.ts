import { IHoverCardStyles } from './HoverCard.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyleSets,
  after
} from '../../Styling';

export const getStyles = memoizeFunction((
  customStyles?: IHoverCardStyles
): IHoverCardStyles => {

  const styles: IHoverCardStyles = {
    root: {
      width: '340px',
      'pointer-events': 'none'
    },
    compactCard: [
      {
        'pointer-events': 'auto',
        position: 'relative'
      },
      after({
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '1px',
        'background-color': '#f4f4f4'
      })
    ],
    expandedCard: [
      {
        height: '0',
        'overflow-y': 'auto',
        'pointer-events': 'auto',
        transition: 'height 0.467s cubic-bezier(0.5, 0, 0, 1)'
      }
    ]
  };

  return mergeStyleSets(styles, customStyles);
});