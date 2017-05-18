import { IconCodes, DefaultFontStyles } from '../styles/index';
import {
  mergeStyles
} from '../utilities/index';
import {
  before
} from '../glamorExports';

/**
 * All class names for all Fabric icons.
 */
export const IconClassNames: {[key in keyof typeof IconCodes]?: string } = {};

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
