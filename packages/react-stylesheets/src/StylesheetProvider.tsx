import * as React from 'react';
import { StylesheetContext, StylesheetContextType } from './StylesheetContext';
import { StylesheetProviderProps } from './StylesheetProvider.types';

/**
 * Provider for registering stylesheets in a given target document.
 * The `register` method can be called many times and will only register once
 * per unique target document.
 */
export const StylesheetProvider = (props: React.PropsWithChildren<StylesheetProviderProps>) => {
  const context = React.useContext(StylesheetContext);
  const mergedContext = React.useMemo<StylesheetContextType>(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(context as any),
      ...props,
    }),
    // Only recompute the context to pass down if the parent passes a new one. Props should not
    // be mutating dynamically for a provider, or may be doing so accidentally. Avoid recomputations.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context],
  );

  return <StylesheetContext.Provider value={mergedContext}>{props.children}</StylesheetContext.Provider>;
};

export const StylesheetConsumer = StylesheetContext.Consumer;
