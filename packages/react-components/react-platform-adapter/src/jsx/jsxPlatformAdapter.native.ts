import type * as React from 'react';

import { html } from 'react-strict-dom';
import { getStylesFromClassName } from '../styling/index';
import { JSXRuntime } from './types';

const modifyPropsForNative = <P extends {}>(
  props: (P & { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) | null,
) => {
  if (props?.className) {
    props = {
      ...props,
      // TODO Need to also convert props.style from CSSProperties to StyleXStyle
      style: getStylesFromClassName(props.className),
    };
    delete props.className;
  }

  return props;
};

/**
 * Create a wrapper for React JSX that creates react-strict-dom elements for intrinsic elements.
 *
 * @param reactJsx The original JSX function to wrap from react/jsx-runtime
 */
export const jsxPlatformAdapter = (reactJsx: JSXRuntime): JSXRuntime => {
  return (type, props, key, source, self) => {
    if (typeof type === 'string' && type in html) {
      // TODO need to figure out proper type for indexing the `html` import.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return reactJsx((html as any)[type], modifyPropsForNative(props), key, source, self);
    }

    return reactJsx(type, props, key, source, self);
  };
};
