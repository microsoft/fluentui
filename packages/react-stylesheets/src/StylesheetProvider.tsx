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
      // tslint:disable-next-line:no-any
      ...(context as any),
      ...props,
    }),
    [context],
  );

  React.useLayoutEffect(() => {
    mergedContext.renderSheets(mergedContext.enqueuedSheets, mergedContext);
    mergedContext.enqueuedSheets.splice(0);
  }, [mergedContext]);

  return <StylesheetContext.Provider value={mergedContext}>{props.children}</StylesheetContext.Provider>;
};

export const StylesheetConsumer = StylesheetContext.Consumer;
