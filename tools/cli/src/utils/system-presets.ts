export interface CatalogSystemPreset {
  name: string;
  catalogs: string[];
  packages: string[];
  exclusions: string[];
}

export const CATALOG_SYSTEM_PRESETS: Readonly<Record<string, CatalogSystemPreset>> = {
  'fluent-v9': {
    name: 'fluent-v9',
    catalogs: ['@fluentui/react-components'],
    packages: ['@fluentui/react-accordion', '@fluentui/react-button', '@fluentui/react-components'],
    exclusions: [],
  },
  headless: {
    name: 'headless',
    catalogs: ['@fluentui/react-headless-components-preview'],
    packages: ['@fluentui/react-headless-components-preview'],
    exclusions: [],
  },
};

export const LEGACY_USAGE_PACKAGE_PATTERNS = [
  '@fluentui/*',
  '@fluentui-contrib/*',
  '@griffel/*',
  'tabster',
  'keyborg',
] as const;

export const LEGACY_INFO_PACKAGE_PATTERNS = [
  ...LEGACY_USAGE_PACKAGE_PATTERNS,
  '@floating-ui/*',
  'react',
  '@types/react',
  'typescript',
] as const;
