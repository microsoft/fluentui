import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { FileTypeIconMap } from './FileTypeIconMap';
import { DEFAULT_BASE_URL, ICON_SIZES } from './fileTypeIconUrl';

export { DEFAULT_BASE_URL, ICON_SIZES } from './fileTypeIconUrl';

export interface IIconOptions {
  disableWarnings: boolean;
  warnOnMissingIcons?: boolean;
}

type IconRecords = Record<string, unknown> & {
  __options: IIconOptions;
};

const GLOBAL_SETTINGS_PROP_NAME = '__globalSettings__';
const ICON_SETTING_NAME = 'icons';
const fileTypeIconSubset = { mergeImageProps: true };

// Each entry produces a `<size><dir>_<ext>` key for every icon name.
// SVGs only ship at 1x and 1.5x; PNGs ship the full DPR ladder.
const ICON_VARIANTS: ReadonlyArray<{ dir: string; exts: ReadonlyArray<'png' | 'svg'> }> = [
  { dir: '', exts: ['png', 'svg'] },
  { dir: '_1.5x', exts: ['png', 'svg'] },
  { dir: '_2x', exts: ['png'] },
  { dir: '_3x', exts: ['png'] },
  { dir: '_4x', exts: ['png'] },
];

const moduleGlobalSettings: Record<string, unknown> = {};

export function initializeFileTypeIcons(baseUrl: string = DEFAULT_BASE_URL, options?: Partial<IIconOptions>): void {
  ICON_SIZES.forEach((size: number) => {
    _initializeIcons(baseUrl, size, options);
  });
}

function _initializeIcons(baseUrl: string, size: number, options?: Partial<IIconOptions>): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);
  const fileTypeIcons: { [key: string]: React.ReactElement } = {};

  iconTypes.forEach((type: string) => {
    ICON_VARIANTS.forEach(({ dir, exts }) => {
      exts.forEach(ext => {
        const key = `${type}${size}${dir}_${ext}`;
        const src = `${baseUrl}${size}${dir}/${type}.${ext}`;
        fileTypeIcons[key] = createFileTypeIconImage(src, size);
      });
    });
  });

  registerIcons(fileTypeIcons, options);
}

function createFileTypeIconImage(src: string, size: number): React.ReactElement {
  return <img src={src} height={size} width={size} alt="" />;
}

function registerIcons(icons: Record<string, React.ReactElement>, options?: Partial<IIconOptions>): void {
  const iconSettings = getIconSettings();

  // Merge caller-provided options onto the persisted defaults so subsequent registrations
  // observe the most recent preference (matches v8 @fluentui/style-utilities behavior).
  if (options) {
    iconSettings.__options = { ...iconSettings.__options, ...options };
  }
  const { disableWarnings } = iconSettings.__options;

  for (const iconName in icons) {
    if (Object.prototype.hasOwnProperty.call(icons, iconName)) {
      const normalizedIconName = normalizeIconName(iconName);
      if (iconSettings[normalizedIconName] && !disableWarnings) {
        // eslint-disable-next-line no-console
        console.warn(`Icon '${iconName}' was re-registered. Use 'disableWarnings' to suppress this warning.`);
      }
      iconSettings[normalizedIconName] = {
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
    globalScope[GLOBAL_SETTINGS_PROP_NAME] = {};
  }

  return globalScope[GLOBAL_SETTINGS_PROP_NAME];
}

function normalizeIconName(name: string): string {
  return name.toLowerCase();
}
