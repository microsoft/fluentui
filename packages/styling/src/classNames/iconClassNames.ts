import { iconCodes, IIconCodes } from '../styles/iconCodes';
import { fontStyles } from '../styles/fontStyles';
import { IClassNames } from '../utilities/getClassNames';
import { css, before } from 'glamor';

export interface IIconClassNames extends IClassNames<IIconCodes> { }

// tslint:disable-next-line:no-any
export const iconClassNames: IIconClassNames = {};

// tslint:disable-next-line:forin
for (const iconName in iconCodes) {
  Object.defineProperty(iconClassNames, iconName, {
    get: (): string => css(fontStyles.icon, before({ content: `"${iconCodes[iconName]}"` })).toString(),
    enumerable: true,
    configurable: true
  });
}