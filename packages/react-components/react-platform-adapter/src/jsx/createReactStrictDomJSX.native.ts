import type * as React from 'react';

import { getStylesFromClassName } from '../styling/index';
import { JSXCreateElement } from './types';
import { html } from 'react-strict-dom';

const modifyPropsForNative = <P extends {}>(
  props: (P & { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) | null,
) => {
  if (!props?.className) {
    return props;
  }

  props = {
    ...props,
    // TODO Need to also convert props.style from CSSProperties to StyleXStyle
    style: getStylesFromClassName(props.className),
  };
  delete props.className;

  return props;
};

export const createReactStrictDomJSX = (reactJsx: JSXCreateElement): JSXCreateElement => {
  return (type, props, key, source, self) => {
    if (typeof type === 'string' && type in html) {
      return reactJsx(html[type], modifyPropsForNative(props), key, source, self);
    }

    return reactJsx(type, props, key, source, self);
  };
};
