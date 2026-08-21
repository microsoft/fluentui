'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Provider } from '@fluentui/react-headless-components-preview/provider';

import type { ThemeProviderProps } from './ThemeProvider.types';

import styles from './ThemeProvider.module.css';

/** Themes a subtree: a display:contents div carrying the theme class (custom properties
 * cascade from it, including into top-layer popovers) plus the headless Provider context.
 * The theme stylesheet must be imported once per document; this only selects the theme. */
export const ThemeProvider = React.forwardRef<HTMLDivElement, ThemeProviderProps>((props, ref) => {
  const { theme, dir, targetDocument, className, children, ...rest } = props;

  return (
    <Provider dir={dir} targetDocument={targetDocument}>
      <div ref={ref} {...rest} dir={dir} className={clsx(styles.root, theme, className)}>
        {children}
      </div>
    </Provider>
  );
});

ThemeProvider.displayName = 'ThemeProvider';
