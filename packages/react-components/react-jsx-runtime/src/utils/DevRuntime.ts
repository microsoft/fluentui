import * as ReactDevRuntime from 'react/jsx-dev-runtime';
import { jsxPlatformAdapter } from '@fluentui/react-platform-adapter';
import type { JSXRuntime } from './types';

export const DevRuntime = {
  jsxDEV: jsxPlatformAdapter((ReactDevRuntime as { jsxDEV: JSXRuntime }).jsxDEV),
};
