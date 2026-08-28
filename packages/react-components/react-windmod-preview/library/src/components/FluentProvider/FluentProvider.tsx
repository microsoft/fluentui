'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Provider, useProviderContext } from '@fluentui/react-headless-components-preview/provider';

import { useMergedRefs } from '@fluentui/react-utilities';

import { componentMarkers } from '../../utils/groupMarker';
import { CssVarInvalidationContext, useCssVarInvalidationScope } from '../../hooks/cssVarInvalidation';
import { useRootStylesheetCheck } from '../../hooks/rootStylesheetCheck';
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
    const resolvedClassName = clsx(fluentProviderClassNames.root, theme, styles.root, className);

    // The css-var invalidation observer must be installed by a hook on THIS fiber: React
    // attaches host refs in commit order, so the same logic in a child component would run its
    // layout effect before this div's ref is populated. Hence the internal ref.
    const elementRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRefs(ref, elementRef);
    const cssVarScope = useCssVarInvalidationScope(elementRef, resolvedClassName, rest.style);

    // Development-only, once per document: per-component CSS delivery makes the root stylesheet
    // a prerequisite, and its absence is otherwise easy to misdiagnose. Compiled out of
    // production builds.
    useRootStylesheetCheck(elementRef, targetDocument);

    return (
      <Provider dir={resolvedDir} targetDocument={targetDocument}>
        <div ref={mergedRef} {...rest} dir={resolvedDir} className={resolvedClassName}>
          <CssVarInvalidationContext.Provider value={cssVarScope}>{children}</CssVarInvalidationContext.Provider>
        </div>
      </Provider>
    );
  },
);

FluentProvider.displayName = 'FluentProvider';
