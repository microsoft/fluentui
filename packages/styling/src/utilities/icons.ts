import { GlobalSettings } from '@uifabric/utilities/lib/GlobalSettings';
import { fontFace } from '../glamorExports';
import { mergeStyles } from './mergeStyles';
import { FontWeights } from '../styles/DefaultFontStyles';

export interface IIconSubsetDefinition {
  fontFamily: string;
  fontWeight?: number;
  src?: string;
  icons: {
    [key: string]: string;
  };
}

export interface IIconDefinition {
  baseClassName: string;
  className: string;
  code: string;
}

export interface IIconDefinitions {
  [key: string]: IIconDefinition;
}

const ICON_SETTING_NAME = 'icons';
const _icons: IIconDefinitions = GlobalSettings.getValue(ICON_SETTING_NAME, {});

/**
 * Registers a given subset of icons.
 *
 * @param iconSubset - the icon subset definition.
 */
export function registerIcons({
  fontFamily,
  fontWeight = FontWeights.regular,
  src,
  icons
}: IIconSubsetDefinition): void {
  // Register font face for given icons.
  fontFace({
    fontFamily,
    fontWeight,
    src
  });

  // Generate a base class name for the given font.
  const baseClassName = mergeStyles({
    fontFamily,
    fontStyle: 'normal'
  }).toString();

  for (const iconName in icons) {
    if (icons.hasOwnProperty(iconName)) {
      const code = icons[iconName];

      _icons[iconName] = {
        baseClassName,
        className: '',
        code
      };
    }
  }
}

/**
 * Gets an icon definition.
 *
 * @public
 * @param name - Name of icon.
 */
export function getIcon(name: string): IIconDefinition {
  return _icons[name];
}

/**
 * Gets all icon definitions.
 *
 * @public
 */
export function getAllIcons(): IIconDefinitions {
  return _icons;
}

/**
 * Gets a given registered icon's class name to inject.
 *
 * @public
 * @param name - Name of icon.
 */
export function getIconClassName(name: string): string {
  let definition = _icons[name];

  if (definition) {
    if (!definition.className) {
      definition.className = mergeStyles([
        definition.baseClassName,
        {
          ':after': {
            content: `"${definition.code}"`
          }
        }
      ]).toString();
    }
    return definition.className;
  }

  return '';
}
