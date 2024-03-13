import { html } from 'react-strict-dom';
import { ReactDevRuntime } from './ReactDevRuntime';
import { modifyPropsForNative } from './modifyPropsForNative.native';
import type { JSXDevRuntime } from './types';

export const DevRuntime: JSXDevRuntime = {
  jsxDEV: (type, props, key, source, self) => {
    if (typeof type === 'string' && type in html) {
      return ReactDevRuntime.jsxDEV(html[type], modifyPropsForNative(props), key, source, self);
    }

    return ReactDevRuntime.jsxDEV(type, props, key, source, self);
  },
};
