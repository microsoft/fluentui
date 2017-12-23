import {
  warn
} from '@uifabric/utilities/lib/warn';
import {
  GlobalSettings
} from '@uifabric/utilities/lib/GlobalSettings';
import {
  IRawStyle,
  IFontFace,
  fontFace,
  mergeStyles
} from '@uifabric/merge-styles/lib/index';

export interface IIconSubset {
  fontFace?: IFontFace;
  icons: {
    [key: string]: string | JSX.Element;
  };

  style?: IRawStyle;
}

export interface IIconSubsetRecord extends IIconSubset {
  isRegistered?: boolean;
  className?: string;
}

export interface IIconRecord {
  code: string | undefined;
  subset: IIconSubsetRecord;
}

export interface IIconOptions {
  /**
   * By default, registering the same set of icons will generate a console warning per duplicate icon
   * registered, because this scenario can create unexpected consequences.
   *
   * Some scenarios include:
   *
   * Icon set was previously registered using a different base url.
   * Icon set was previously registered but a different version was provided.
   * Icons in a previous registered set overlap with a new set.
   *
   * To simply ignore previously registered icons, you can specify to disable warnings. This means
   * that if an icon which was previous registered is registered again, it will be silently ignored.
   * However, consider whether the problems listed above will cause issues.
   **/
  disableWarnings: boolean;

  /**
   * @deprecated
   * Use 'disableWarnings' instead.
   */
  warnOnMissingIcons?: boolean;
}

export interface IIconRecords {
  __options: IIconOptions;
  __remapped: { [key: string]: string };
  [key: string]: IIconRecord | {};
}

const ICON_SETTING_NAME = 'icons';

const _iconSettings = GlobalSettings.getValue<IIconRecords>(ICON_SETTING_NAME, {
  __options: {
    disableWarnings: false,
    warnOnMissingIcons: true
  },
  __remapped: {}
});

/**
 * Registers a given subset of icons.
 *
 * @param iconSubset - the icon subset definition.
 */
export function registerIcons(iconSubset: IIconSubset, options?: Partial<IIconOptions>): void {
  let subset = {
    ...iconSubset,
    isRegistered: false,
    className: undefined
  };
  let { icons } = iconSubset;

  // Grab options, optionally mix user provided ones on top.
  options = options ? { ..._iconSettings.__options, ...options } : _iconSettings.__options;

  for (const iconName in icons) {
    if (icons.hasOwnProperty(iconName)) {
      const code = icons[iconName];
      const normalizedIconName = iconName.toLowerCase();

      if (_iconSettings[normalizedIconName]) {
        if (!options.disableWarnings) {
          warn(`Icon '${iconName} being re-registered. Ignoring duplicate registration.`);
        }
      } else {
        _iconSettings[normalizedIconName] = {
          code,
          subset
        };
      }
    }
  }
}

/**
 * Remaps one icon name to another.
 */
export function registerIconAlias(iconName: string, mappedToName: string): void {
  _iconSettings.__remapped[iconName.toLowerCase()] = mappedToName.toLowerCase();
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
  const options = _iconSettings.__options;

  name = name ? name.toLowerCase() : '';
  name = _iconSettings.__remapped[name] || name;

  if (name) {
    icon = _iconSettings[name!] as IIconRecord;

    if (icon) {
      let { subset } = icon;

      if (subset.fontFace && !subset.isRegistered) {
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
      if (!options.disableWarnings && options.warnOnMissingIcons) {
        warn(`The icon "${name}" was used but not registered. See http://aka.ms/fabric-icon-usage for more information.`);
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
export function setIconOptions(options: Partial<IIconOptions>): void {
  _iconSettings.__options = {
    ..._iconSettings.__options,
    ...options
  };
}
