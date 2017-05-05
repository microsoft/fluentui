import { IconCodes, DefaultFontStyles } from '../styles/index';
import {
  IClassNames,
  mergeStyles
} from '../utilities/index';
import {
  before
} from '../glamorExports';

export interface IIconClassNames extends IClassNames<typeof IconCodes> { }

export const IconClassNames: IIconClassNames = {};

// tslint:disable-next-line:forin
for (const iconName in IconCodes) {
  Object.defineProperty(IconClassNames, iconName, {
    get: (): string => mergeStyles(
      DefaultFontStyles.icon,
      before({ content: `"${IconCodes[iconName]}"` })
    ).toString(),
    enumerable: true,
    configurable: true
  });
}
