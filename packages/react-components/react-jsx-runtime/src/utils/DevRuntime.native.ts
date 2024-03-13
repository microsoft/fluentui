import { createReactStrictDomJSX } from '@fluentui/react-platform-adapter';
import * as ReactDevRuntime from 'react/jsx-dev-runtime';
import type { JSXRuntime } from './types';

export const DevRuntime = {
  jsxDEV: createReactStrictDomJSX((ReactDevRuntime as { jsxDEV: JSXRuntime }).jsxDEV),
};
