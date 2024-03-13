import { createReactStrictDomJSX } from '@fluentui/react-platform-adapter';
import * as ReactRuntime from 'react/jsx-runtime';
import type { JSXRuntime } from './types';

export const Runtime = {
  jsx: createReactStrictDomJSX((ReactRuntime as { jsx: JSXRuntime }).jsx),
  jsxs: createReactStrictDomJSX((ReactRuntime as { jsxs: JSXRuntime }).jsxs),
};
