import { GlobalSettings, warn } from '@fluentui/utilities';
import { fontFace, mergeStyles, Stylesheet } from '@fluentui/merge-styles';
import type { IRawStyle, IFontFace } from '@fluentui/merge-styles';

export interface IIconSubset {
  fontFace?: IFontFace;
  icons: {
    [key: string]: string | JSX.Element;
  };

  style?: IRawStyle;
  /**
   * Indicates to the icon renderer that it is safe to merge any props on the original `Icon` element
   * onto the child content element registered for the icon which are valid for HTML images.
   */
  mergeImageProps?: boolean;
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
   * @deprecated Use `disableWarnings` instead.
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
    warnOnMissingIcons: true,
  },
  __remapped: {},
});

// Reset icon registration on stylesheet resets.
const stylesheet = Stylesheet.getInstance();

if (stylesheet && stylesheet.onReset) {
  stylesheet.onReset(() => {
    for (const name in _iconSettings) {
      if (_iconSettings.hasOwnProperty(name) && !!(_iconSettings[name] as IIconRecord).subset) {
        (_iconSettings[name] as IIconRecord).subset.className = undefined;
      }
    }
  });
}

/**
 * Normalizes an icon name for consistent mapping.
 * Current implementation is to convert the icon name to lower case.
 *
 * @param name - Icon name to normalize.
 * @returns {string} Normalized icon name to use for indexing and mapping.
 */
const normalizeIconName = (name: string): string => name.toLowerCase();

/**
 * Registers a given subset of icons.
 *
 * @param iconSubset - the icon subset definition.
 */
export function registerIcons(iconSubset: IIconSubset, options?: Partial<IIconOptions>): void {
  let subset = {
    ...iconSubset,
    isRegistered: false,
    className: undefined,
  };
  let { icons } = iconSubset;

  // Grab options, optionally mix user provided ones on top.
  options = options ? { ..._iconSettings.__options, ...options } : _iconSettings.__options;

  for (const iconName in icons) {
    if (icons.hasOwnProperty(iconName)) {
      const code = icons[iconName];
      const normalizedIconName = normalizeIconName(iconName);

      if (_iconSettings[normalizedIconName]) {
        _warnDuplicateIcon(iconName);
      } else {
        _iconSettings[normalizedIconName] = {
          code,
          subset,
        } as IIconRecord;
      }
    }
  }
}

/**
 * Unregisters icons by name.
 *
 * @param iconNames - List of icons to unregister.
 */
export function unregisterIcons(iconNames: string[]): void {
  const options = _iconSettings.__options;

  for (const iconName of iconNames) {
    const normalizedIconName = normalizeIconName(iconName);
    if (_iconSettings[normalizedIconName]) {
      delete _iconSettings[normalizedIconName];
    } else {
      // Warn that we are trying to delete an icon that doesn't exist
      if (!options.disableWarnings) {
        warn(`The icon "${iconName}" tried to unregister but was not registered.`);
      }
    }

    // Delete any aliases for this iconName
    if (_iconSettings.__remapped[normalizedIconName]) {
      delete _iconSettings.__remapped[normalizedIconName];
    }

    // Delete any items that were an alias for this iconName
    Object.keys(_iconSettings.__remapped).forEach((key: string) => {
      if (_iconSettings.__remapped[key] === normalizedIconName) {
        delete _iconSettings.__remapped[key];
      }
    });
  }
}

/**
 * Remaps one icon name to another.
 */
export function registerIconAlias(iconName: string, mappedToName: string): void {
  _iconSettings.__remapped[normalizeIconName(iconName)] = normalizeIconName(mappedToName);
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

  name = name ? normalizeIconName(name) : '';
  name = _iconSettings.__remapped[name] || name;

  if (name) {
    icon = _iconSettings[name!] as IIconRecord;

    if (icon) {
      let { subset } = icon;
      if (subset && subset.fontFace) {
        if (!subset.isRegistered) {
          fontFace(subset.fontFace);
          subset.isRegistered = true;
        }

        if (!subset.className) {
          subset.className = mergeStyles(subset.style, {
            fontFamily: subset.fontFace.fontFamily,
            fontWeight: subset.fontFace.fontWeight || 'normal',
            fontStyle: subset.fontFace.fontStyle || 'normal',
          });
        }
      }
    } else {
      // eslint-disable-next-line deprecation/deprecation
      if (!options.disableWarnings && options.warnOnMissingIcons) {
        warn(
          `The icon "${name}" was used but not registered. See https://github.com/microsoft/fluentui/wiki/Using-icons for more information.`,
        );
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
    ...options,
  };
}

let _missingIcons: string[] = [];
let _missingIconsTimer: ReturnType<typeof setTimeout> | undefined = undefined;

function _warnDuplicateIcon(iconName: string): void {
  const options = _iconSettings.__options;
  const warningDelay = 2000;
  const maxIconsInMessage = 10;

  if (!options.disableWarnings) {
    _missingIcons.push(iconName);
    if (_missingIconsTimer === undefined) {
      _missingIconsTimer = setTimeout(() => {
        warn(
          `Some icons were re-registered. Applications should only call registerIcons for any given ` +
            `icon once. Redefining what an icon is may have unintended consequences. Duplicates ` +
            `include: \n` +
            _missingIcons.slice(0, maxIconsInMessage).join(', ') +
            (_missingIcons.length > maxIconsInMessage ? ` (+ ${_missingIcons.length - maxIconsInMessage} more)` : ''),
        );
        _missingIconsTimer = undefined;
        _missingIcons = [];
      }, warningDelay);
    }
  }
}
