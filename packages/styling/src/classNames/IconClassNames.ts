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
  let className: string;

  Object.defineProperty(IconClassNames, iconName, {
    get: (): string => {
      if (className === undefined) {
        className = mergeStyles(
          DefaultFontStyles.icon,
          {
            ':before': {
              // tslint:disable-next-line:no-any
              content: `"${(IconCodes as any)[iconName]}"`
            }
          }
        ).toString();
      }

      return className;
    },
    enumerable: true,
    configurable: true
  });
}
