import {
  mergeStyles,
  mergeStyleSets,
  ITheme,
  getTheme
} from '../../Styling';
import {
  memoizeFunction
} from '../../Utilities';
import { IIconStyles } from './Icon.Props';

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles: IIconStyles | undefined = undefined
): IIconStyles => {
  let iconStyles = {

    root: mergeStyles([
      theme.fonts.icon,
      {
        display: 'inline-block'
      }
    ]),

    imageContainer: mergeStyles({
      overflow: 'hidden'
    })
  };

  return mergeStyleSets(iconStyles, customStyles)!;
});
