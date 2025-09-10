import { type DocsContextProps } from '@storybook/addon-docs';

import { type FluentParameters } from '../hooks';

const docsDefaults = {
  tableOfContents: true,
  dirSwitcher: true,
  themePicker: true,
  argTable: {
    slotsApi: true,
    nativePropsApi: true,
  },
};

function getDocsParametersConfig(
  context: DocsContextProps,
): NonNullable<FluentParameters['reactStorybookAddon']>['docs'] {
  return context?.projectAnnotations?.parameters?.reactStorybookAddon?.docs;
}

/**
 * Checks if the docs page is enabled
 */
export function isDocsEnabled(context: DocsContextProps): boolean {
  const docsConfig = getDocsParametersConfig(context);

  // If docs is true, enable page
  if (docsConfig === true) {
    return true;
  }

  // If docs is an object, page is enabled
  if (typeof docsConfig === 'object' && docsConfig !== null) {
    return true;
  }

  // Default: disabled
  return false;
}

/**
 * Gets the docs page configuration from context
 */
export function getDocsPageConfig(context: DocsContextProps): {
  tableOfContents: boolean;
  dirSwitcher: boolean;
  themePicker: boolean;
  argTable: {
    slotsApi: boolean;
    nativePropsApi: boolean;
  };
} | null {
  const docsConfig = getDocsParametersConfig(context);

  // If docs is true, return default config (all enabled)
  if (docsConfig === true) {
    return docsDefaults;
  }

  // If docs is an object, extract the configuration directly
  if (typeof docsConfig === 'object' && docsConfig !== null) {
    return {
      tableOfContents: docsConfig.tableOfContents !== false,
      dirSwitcher: docsConfig.dirSwitcher !== false,
      themePicker: docsConfig.themePicker !== false,
      argTable: getArgTableConfig(docsConfig.argTable),
    };
  }

  // Fallback
  return null;
}

/**
 * Gets the argTable configuration with early exit pattern
 */
function getArgTableConfig(argTableConfig: boolean | { slotsApi?: boolean; nativePropsApi?: boolean } | undefined) {
  if (argTableConfig === false) {
    return {
      slotsApi: false,
      nativePropsApi: false,
    };
  }

  if (argTableConfig === true || argTableConfig === undefined) {
    return {
      slotsApi: true,
      nativePropsApi: true,
    };
  }

  if (typeof argTableConfig === 'object' && argTableConfig !== null) {
    return {
      slotsApi: argTableConfig.slotsApi !== false,
      nativePropsApi: argTableConfig.nativePropsApi !== false,
    };
  }

  // Fallback to default
  return docsDefaults.argTable;
}
