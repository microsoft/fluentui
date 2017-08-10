import {
  mergeStyleSets
} from '../../Styling';
import {
  memoizeFunction
} from '../../Utilities';
import { IIconStyles } from './Icon.Props';

export const getStyles = memoizeFunction((
  customStyles?: IIconStyles
): IIconStyles => {
  let iconStyles = {
    root: {
      display: 'inline-block'
    },

    imageContainer: {
      overflow: 'hidden'
    }
  };

  return mergeStyleSets(iconStyles, customStyles)!;
});
