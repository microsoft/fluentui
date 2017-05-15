import {
  mergeStyles,
  mergeStyleSets,
  ITheme
} from '../../Styling';
import { IIconStyles } from './Icon.Props';

export function getStyles(
  theme?: ITheme,
  customStyles?: IIconStyles
): IIconStyles {
  let iconStyles = {
    imageContainer: mergeStyles({
      overflow: 'hidden'
    })
  };

  return mergeStyleSets(iconStyles, customStyles);
}
