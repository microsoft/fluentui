import {
  warn
} from '@uifabric/utilities';
import {
  GlobalSettings
} from '@uifabric/utilities';
import {
  IRawStyle,
  IFontFace,
  fontFace,
  mergeStyles
} from '@uifabric/merge-styles';

export interface IIconSubset {
  fontFace: IFontFace;
  icons: {
    [key: string]: string;
  };
  style?: IRawStyle;
}

export interface IIconSubsetRecord extends IIconSubset {
  isRegistered?: boolean;
  className?: string;
}

export interface IIconRecord {
  code: string;
  subset: IIconSubsetRecord;
}

export interface IIconOptions {
  warnOnMissingIcons: boolean;
}

export interface IIconRecords {
  __options: IIconOptions;
  __remapped: { [key: string]: string };
  [key: string]: IIconRecord | {};
}

const ICON_SETTING_NAME = 'icons';
const _icons = GlobalSettings.getValue<IIconRecords>(ICON_SETTING_NAME, {
  __options: {
    warnOnMissingIcons: true
  },
  __remapped: {}
});

/**
 * Registers a given subset of icons.
 *
 * @param iconSubset - the icon subset definition.
 */
export function registerIcons(iconSubset: IIconSubset): void {
  let subset = {
    ...iconSubset,
    isRegistered: false,
    className: undefined
  };
  let { icons } = iconSubset;

  for (const iconName in icons) {
    if (icons.hasOwnProperty(iconName)) {
      const code = icons[iconName];
      const normalizedIconName = iconName.toLowerCase();

      if (_icons[normalizedIconName]) {
        warn(`Icon '${iconName} being re-registered`);
      }

      _icons[normalizedIconName] = {
        code,
        subset
      };
    }
  }
}

/**
 * Remaps one icon name to another.
 */
export function registerIconAlias(iconName: string, mappedToName: string): void {
  _icons.__remapped[iconName.toLowerCase()] = mappedToName.toLowerCase();
}

/**
 * Gets an icon definition. If an icon is requested but the subset has yet to be registered,
 * it will get registered immediately.
 *
 * @public
 * @param name - Name of icon.
 */
export function getIcon(name?: string): IIconRecord | undefined {
  let icon: IIconRecord | undefined = undefined;

  name = name ? name.toLowerCase() : '';
  name = _icons.__remapped[name] || name;

  if (name) {
    icon = _icons[name!] as IIconRecord;

    if (icon) {
      let { subset } = icon;

      if (!subset.isRegistered) {
        // Register font face for given icons.
        fontFace(subset.fontFace);

        // Generate a base class name for the given font.
        subset.className = mergeStyles(
          subset.style,
          {
            fontFamily: subset.fontFace.fontFamily,
            fontWeight: subset.fontFace.fontWeight || 'normal',
            fontStyle: subset.fontFace.fontStyle || 'normal'
          }).toString();

        subset.isRegistered = true;
      }
    } else {
      if (_icons.__options.warnOnMissingIcons) {
        warn(`The icon "${name}" was referenced but not registered.`);
      }
    }
  }

  return icon;
}

/**
 * Sets the icon options.
 *
 * @public
 */
export function setIconOptions(options: IIconOptions): void {
  _icons.__options = {
    ..._icons.__options,
    ...options
  };
}
