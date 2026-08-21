'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Provider } from '@fluentui/react-headless-components-preview/provider';

import type { ThemeProviderProps } from './ThemeProvider.types';

import styles from './ThemeProvider.module.css';

/**
 * Applies a Fluent theme to a subtree by rendering a `display: contents` div carrying
 * the theme class — the theme's custom properties cascade from it without introducing a
 * layout box, and they reach top-layer surfaces (popover/dialog) opened from inside the
 * subtree, since those keep their DOM ancestry. Also composes the headless Provider so
 * descendants read `dir`/`targetDocument` from context.
 *
 * The theme stylesheet itself (`@fluentui/react-tailwind-theme-preview/styles.css`) must
 * be imported once per document — this component only selects which theme applies.
 */
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
