import * as React from 'react';
import { StylesheetContext } from './StylesheetContext';

/**
 * A hook for providing a stylesheet or array of stylesheets. Can be used standalone
 * or with the `StylesheetProvider` component to direct styles to be registered to a
 * different target such as a child window or as a string in SSR scenarios.
 */
export const useStylesheet = (sheets: undefined | string | string[]) => {
  const context = React.useContext(StylesheetContext);

  context.registerStyles(sheets, context);
};
