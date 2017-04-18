import { icons as iconStyles, IIcons } from '../styles/icons';
import { iconFont as iconFontStyle } from '../styles/fonts';
import { IClassNames } from '../utilities/getClassNames';
import { css, before } from 'glamor';

export const iconFont: string = css(iconFontStyle).toString();

export interface IIconClassNames extends IClassNames<IIcons> { }

// tslint:disable-next-line:no-any
export const icons: IIconClassNames = {};

for (const iconName in iconStyles) {
  if (iconStyles.hasOwnProperty(iconName)) {
    Object.defineProperty(icons, iconName, {
      get: () => before({ content: `"${iconStyles[iconName]}"` }).toString(),
      enumerable: true,
      configurable: true
    });
  }
}