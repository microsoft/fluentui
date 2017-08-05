import { IHoverCardStyles } from './HoverCard.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyleSets
} from '../../Styling';

export const getStyles = memoizeFunction((
  customStyles?: IHoverCardStyles
): IHoverCardStyles => {

  const styles: IHoverCardStyles = {
    host: {}
  };

  return mergeStyleSets(styles, customStyles)!;
});