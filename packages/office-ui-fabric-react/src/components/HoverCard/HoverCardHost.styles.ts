import { IHoverCardHostStyles } from './HoverCardHost.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyleSets
} from '../../Styling';

export const getStyles = memoizeFunction((
  customStyles?: IHoverCardHostStyles
): IHoverCardHostStyles => {

  const styles: IHoverCardHostStyles = {
    host: {}
  };

  return mergeStyleSets(styles, customStyles);
});