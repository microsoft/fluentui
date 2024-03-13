import { html } from 'react-strict-dom';
import { ReactRuntime } from './ReactRuntime';
import { modifyPropsForNative } from './modifyPropsForNative.native';
import type { JSXRuntime } from './types';

export const Runtime: JSXRuntime = {
  jsx: (type, props, key, source, self) => {
    if (typeof type === 'string' && type in html) {
      return ReactRuntime.jsx(html[type], modifyPropsForNative(props), key, source, self);
    }

    return ReactRuntime.jsx(type, props, key, source, self);
  },

  jsxs: (type, props, key, source, self) => {
    if (typeof type === 'string' && type in html) {
      return ReactRuntime.jsxs(html[type], modifyPropsForNative(props), key, source, self);
    }

    return ReactRuntime.jsxs(type, props, key, source, self);
  },
};
