import {
  GlobalSettings
} from '@uifabric/utilities/lib/GlobalSettings';
import {
  IExtendedRawStyle,
  IFontFace,
  fontFace,
  mergeStyles
} from '@uifabric/merge-styles';

export interface IIconSubset {
  fontFace: IFontFace;
  icons: {
    [key: string]: string;
  };
  style?: IExtendedRawStyle;
}

export interface IIconSubsetRecord extends IIconSubset {
  isRegistered?: boolean;
  className?: string;
}

export interface IIconRecord {
  code: string;
  subset: IIconSubsetRecord;
  className?: string;
}

export interface IIconRecords {
  [key: string]: IIconRecord;
}

const ICON_SETTING_NAME = 'icons';
const _icons: IIconRecords = GlobalSettings.getValue(ICON_SETTING_NAME, {});

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

      _icons[iconName] = {
        code,
        subset,
        className: undefined
      };
    }
  }
}

/**
 * Gets an icon definition. If an icon is requested but the subset has yet to be registered,
 * it will get registered immediately.
 *
 * @public
 * @param name - Name of icon.
 */
export function getIcon(name?: string | null): IIconRecord | undefined {
  let icon: IIconRecord = _icons[name!];

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
  }

  return icon;
}
