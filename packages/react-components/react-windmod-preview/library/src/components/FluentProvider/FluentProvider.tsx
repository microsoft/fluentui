'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Provider, useProviderContext } from '@fluentui/react-headless-components-preview/provider';

import { componentMarkers } from '../../utils/groupMarker';
import type { FluentProviderProps } from './FluentProvider.types';

import styles from './FluentProvider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const fluentProviderClassNames: { root: string } = {
  root: componentMarkers('fluent-provider'),
};

/** Themes a subtree: a div carrying the theme class, the provider globals Griffel's
 * FluentProvider authors, and the headless Provider context. The theme stylesheet must be
 * imported once per document; this only selects the theme. */
export const FluentProvider = React.forwardRef<HTMLDivElement, FluentProviderProps>(
  ({ theme, dir, targetDocument, className, children, ...rest }, ref) => {
    const parentContext = useProviderContext();
    const resolvedDir = dir ?? parentContext.dir;

    return (
      <Provider dir={resolvedDir} targetDocument={targetDocument}>
        <div
          ref={ref}
          {...rest}
          dir={resolvedDir}
          className={clsx(fluentProviderClassNames.root, theme, styles.root, className)}
        >
          {children}
        </div>
      </Provider>
    );
  },
);

FluentProvider.displayName = 'FluentProvider';
