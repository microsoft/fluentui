import { IHoverCardHostStyles } from './HoverCardHost.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyleSets
} from '../../Styling';

export const getStyles = memoizeFunction((
  customStyles?: IHoverCardHostStyles
): IHoverCardHostStyles => {

  const styles: IHoverCardHostStyles = {
    host: {
      display: 'inline-block'
    }
  };

  return mergeStyleSets(styles, customStyles);
});