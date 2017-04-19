import { animationStyles, IAnimationStyles } from './animationStyles';
import { fontStyles, IFontStyles } from './fontStyles';
import { colorStyles, IColorStyles } from './colorStyles';
import { iconCodes, IIconCodes } from './iconCodes';

export interface IStyles {
  animations: IAnimationStyles;
  fonts: IFontStyles;
  colors: IColorStyles;
  iconCodes: IIconCodes;
}

export const styles: IStyles = {
  animations: animationStyles,
  fonts: fontStyles,
  colors: colorStyles,
  iconCodes
};
