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
      padding: '20px 24px',
      'pointer-events': 'none'
    }
  };

  return mergeStyleSets(styles, customStyles);
});