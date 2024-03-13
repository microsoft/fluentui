import * as ReactDevRuntime from 'react/jsx-dev-runtime';
import { createReactStrictDomJSX } from './createReactStrictDomJSX.native';
import type { JSXDevRuntime } from './types';

export const DevRuntime: JSXDevRuntime = {
  jsxDEV: createReactStrictDomJSX((ReactDevRuntime as JSXDevRuntime).jsxDEV),
};
