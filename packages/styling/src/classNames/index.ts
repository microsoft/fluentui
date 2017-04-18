import { animations, IAnimationClassNames } from './animations';
import { fonts, IFontClassNames } from './fonts';
import { iconFont, icons, IIconClassNames } from './icons';
import { colors, IColorClassNames } from './colors';

export interface IClassNames {
  animations: IAnimationClassNames;
  fonts: IFontClassNames;
  iconFont: string;
  icons: IIconClassNames;
  colors: IColorClassNames;
}

export const classNames: IClassNames = {
  animations,
  fonts,
  iconFont,
  icons,
  colors
};
