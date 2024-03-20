export { XPlatProvider, suppressCssVariableInsertion } from './XPlatProvider/XPlatProvider';
export type { XPlatProviderProps } from './XPlatProvider/XPlatProvider.types';
export { jsxPlatformAdapter } from './jsx/jsxPlatformAdapter';
export { getStylesFromClassName } from './styling/classNameMap';
export { makeResetStyles } from './styling/makeResetStyles';
export { makeStyles } from './styling/makeStyles';
export { mergeClasses } from './styling/mergeClasses';
export { shorthands } from './styling/shorthands';
export { isReactNative } from './utilities/isReactNative';

// re-export some griffel types to have fluent use the griffel adapter instead of griffel directly
export { useRenderer_unstable, TextDirectionProvider } from '@griffel/react';
export { makeStyles as makeStylesCore } from '@griffel/core';
