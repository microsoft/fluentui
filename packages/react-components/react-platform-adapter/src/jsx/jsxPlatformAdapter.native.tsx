import * as React from 'react';

import { html } from 'react-strict-dom';
import { getStylesFromClassName } from '../styling/index';
import { JSXRuntime } from './types';

/**
 * Create a wrapper for React JSX that creates react-strict-dom elements for intrinsic elements.
 *
 * @param reactJsx The original JSX function to wrap from react/jsx-runtime
 */
export const jsxPlatformAdapter = (reactJsx: JSXRuntime): JSXRuntime => {
  return <P extends {}>(
    type: React.ElementType<P>,
    props: (P & { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) | null,
    key?: React.Key,
    source?: unknown,
    self?: unknown,
  ) => {
    if (typeof type === 'string' && type in html) {
      if (props?.className) {
        props = {
          ...props,
          style: [...getStylesFromClassName(props.className), props.style],
        };

        delete props!.className;
      }

      // TODO figure out which types need to wrap children in a span.
      if (type !== 'span' && props?.children) {
        let modifiedChildren = false;
        const children = React.Children.map(props.children, child => {
          if (typeof child === 'string') {
            modifiedChildren = true;
            return <html.span>{child}</html.span>;
          }
          return child;
        });
        if (modifiedChildren) {
          props = { ...props, children };
        }
      }

      // TODO need to figure out proper type for indexing the `html` import.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return reactJsx((html as any)[type], props, key, source, self);
    }

    return reactJsx(type, props, key, source, self);
  };
};
