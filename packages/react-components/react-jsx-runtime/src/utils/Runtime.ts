import * as ReactRuntime from 'react/jsx-runtime';
import { jsxPlatformAdapter } from '@fluentui/react-platform-adapter-preview';
import type { JSXRuntime } from './types';

export const Runtime = {
  jsx: jsxPlatformAdapter((ReactRuntime as { jsx: JSXRuntime }).jsx),
  jsxs: jsxPlatformAdapter((ReactRuntime as { jsxs: JSXRuntime }).jsxs),
};
