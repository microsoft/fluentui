import {
  mergeStyles,
  mergeStyleSets,
  ITheme
} from '../../Styling';
import {
  memoize
} from '../../Utilities';
import { IIconStyles } from './Icon.Props';

export const getStyles = memoize((
  theme?: ITheme,
  customStyles?: IIconStyles
): IIconStyles => {
  let iconStyles = {

    root: mergeStyles({
      display: 'inline-block'
    }),

    imageContainer: mergeStyles({
      overflow: 'hidden'
    })
  };

  return mergeStyleSets(iconStyles, customStyles);
});
