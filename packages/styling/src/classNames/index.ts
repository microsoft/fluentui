import { animations, IAnimationClassNames } from './animations';
import { fonts, IFontClassNames } from './fonts';
import { iconFont, icons, IIconClassNames } from './icons';

export interface IClassNames {
  animations: IAnimationClassNames;
  fonts: IFontClassNames;
  iconFont: string;
  icons: IIconClassNames;
}

export const classNames: IClassNames = {
  animations,
  fonts,
  iconFont,
  icons
};
