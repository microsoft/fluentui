import * as ReactRuntime from 'react/jsx-runtime';
import { createReactStrictDomJSX } from './createReactStrictDomJSX.native';
import type { JSXRuntime } from './types';

export const Runtime: JSXRuntime = {
  jsx: createReactStrictDomJSX((ReactRuntime as JSXRuntime).jsx),
  jsxs: createReactStrictDomJSX((ReactRuntime as JSXRuntime).jsxs),
};
