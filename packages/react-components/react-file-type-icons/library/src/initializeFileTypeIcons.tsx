import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { FileTypeIconMap } from './FileTypeIconMap';
import { DEFAULT_BASE_URL, ICON_SIZES } from './fileTypeIconUrl';

const PNG_SUFFIX = '_png';
const SVG_SUFFIX = '_svg';

export { DEFAULT_BASE_URL, ICON_SIZES } from './fileTypeIconUrl';

export interface IIconOptions {
  disableWarnings: boolean;
  warnOnMissingIcons?: boolean;
}

type IconRecords = Record<string, unknown> & {
  __options: IIconOptions;
  __remapped: Record<string, string>;
};

const GLOBAL_SETTINGS_PROP_NAME = '__globalSettings__';
const ICON_SETTING_NAME = 'icons';
const CALLBACK_STATE_PROP_NAME = '__callbacks__';
const fileTypeIconSubset = { mergeImageProps: true };

const moduleGlobalSettings: Record<string, unknown> = {
  [CALLBACK_STATE_PROP_NAME]: {},
};

export function initializeFileTypeIcons(baseUrl: string = DEFAULT_BASE_URL, options?: Partial<IIconOptions>): void {
  void options;

  ICON_SIZES.forEach((size: number) => {
    _initializeIcons(baseUrl, size);
  });
}

function _initializeIcons(baseUrl: string, size: number): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);
  const fileTypeIcons: { [key: string]: React.ReactElement } = {};

  iconTypes.forEach((type: string) => {
    const baseUrlSizeType = baseUrl + size + '/' + type;
    fileTypeIcons[type + size + PNG_SUFFIX] = createFileTypeIconImage(baseUrlSizeType + '.png', size);
    fileTypeIcons[type + size + SVG_SUFFIX] = createFileTypeIconImage(baseUrlSizeType + '.svg', size);

    // SVGs scale well, so you can generally use the default image.
    // 1.5x is a special case where both SVGs and PNGs need a different image.

    fileTypeIcons[type + size + '_1.5x' + PNG_SUFFIX] = createFileTypeIconImage(
      baseUrl + size + '_1.5x/' + type + '.png',
      size,
    );
    fileTypeIcons[type + size + '_1.5x' + SVG_SUFFIX] = createFileTypeIconImage(
      baseUrl + size + '_1.5x/' + type + '.svg',
      size,
    );

    fileTypeIcons[type + size + '_2x' + PNG_SUFFIX] = createFileTypeIconImage(
      baseUrl + size + '_2x/' + type + '.png',
      size,
    );
    fileTypeIcons[type + size + '_3x' + PNG_SUFFIX] = createFileTypeIconImage(
      baseUrl + size + '_3x/' + type + '.png',
      size,
    );
    fileTypeIcons[type + size + '_4x' + PNG_SUFFIX] = createFileTypeIconImage(
      baseUrl + size + '_4x/' + type + '.png',
      size,
    );
  });

  registerIcons(fileTypeIcons);
}

function createFileTypeIconImage(src: string, size: number): React.ReactElement {
  return <img src={src} height={size} width={size} alt="" />;
}

function registerIcons(icons: Record<string, React.ReactElement>): void {
  const iconSettings = getIconSettings();

  for (const iconName in icons) {
    if (Object.prototype.hasOwnProperty.call(icons, iconName)) {
      iconSettings[normalizeIconName(iconName)] = {
        code: icons[iconName],
        subset: fileTypeIconSubset,
      };
    }
  }
}

function getIconSettings(): IconRecords {
  const globalSettings = getGlobalSettings();
  const iconSettings = globalSettings[ICON_SETTING_NAME];

  if (!iconSettings || typeof iconSettings !== 'object') {
    globalSettings[ICON_SETTING_NAME] = {
      __options: {
        disableWarnings: false,
        warnOnMissingIcons: true,
      },
      __remapped: {},
    };
  }

  return globalSettings[ICON_SETTING_NAME] as IconRecords;
}

function getGlobalSettings(): Record<string, unknown> {
  if (!canUseDOM()) {
    return moduleGlobalSettings;
  }

  const globalScope = globalThis as typeof globalThis & {
    [GLOBAL_SETTINGS_PROP_NAME]?: Record<string, unknown>;
  };

  if (!globalScope[GLOBAL_SETTINGS_PROP_NAME]) {
    globalScope[GLOBAL_SETTINGS_PROP_NAME] = {
      [CALLBACK_STATE_PROP_NAME]: {},
    };
  }

  return globalScope[GLOBAL_SETTINGS_PROP_NAME];
}

function normalizeIconName(name: string): string {
  return name.toLowerCase();
}
