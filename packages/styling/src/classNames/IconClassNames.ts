import { IconCodes, DefaultFontStyles } from '../styles/index';
import {
  mergeStyles
} from '../utilities/index';

/**
 * All class names for all Fabric icons.
 */
export const IconClassNames: {[key in keyof typeof IconCodes]?: string } = {};

// tslint:disable-next-line:forin
for (const iconName in IconCodes) {
  Object.defineProperty(IconClassNames, iconName, {
    get: (): string => {
      let className = mergeStyles(
        DefaultFontStyles.icon,
        {
          ':before': {
            content: `"${IconCodes[iconName]}"`
          }
        },
      ).toString();
      return className;
    },
    enumerable: true,
    configurable: true
  });
}
