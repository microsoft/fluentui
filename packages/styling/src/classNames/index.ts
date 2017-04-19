import { animationClassNames, IAnimationClassNames } from './animationClassNames';
import { fontClassNames, IFontClassNames } from './fontClassNames';
import { iconClassNames, IIconClassNames } from './iconClassNames';
import { colorClassNames, IColorClassNames } from './colorClassNames';

export interface IClassNames {
  animations: IAnimationClassNames;
  fonts: IFontClassNames;
  icons: IIconClassNames;
  colors: IColorClassNames;
}

export const classNames: IClassNames = {
  animations: animationClassNames,
  fonts: fontClassNames,
  icons: iconClassNames,
  colors: colorClassNames
};
