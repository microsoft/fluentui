import {
  mergeStyles,
  mergeStyleSets,
  ITheme,
  getTheme
} from '../../Styling';
import {
  memoize
} from '../../Utilities';
import { IIconStyles } from './Icon.Props';

export const getStyles = memoize((
  theme: ITheme = getTheme(),
  customStyles: IIconStyles = undefined
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
