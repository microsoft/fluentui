import * as iconStyles from '../styles/icons';
import { iconFont as iconFontStyle } from '../styles/fonts';
import { IClassNames } from '../utilities/getClassNames';
import { css, before } from 'glamor';

export const iconFont: string = css(iconFontStyle).toString();

export interface IIconClassNames extends IClassNames<iconStyles.IIcons> { }

// tslint:disable-next-line:no-any
export const icons: IIconClassNames = {};

// tslint:disable-next-line:forin
for (const iconName in iconStyles) {
  Object.defineProperty(icons, iconName, {
    get: (): string => before({ content: `"${iconStyles[iconName]}"` }).toString(),
    enumerable: true,
    configurable: true
  });
}