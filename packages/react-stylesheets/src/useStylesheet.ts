import * as React from 'react';
import { StylesheetContext } from './StylesheetContext';

export const useStylesheet = (stylesheets: string | string[]) => {
  const context = React.useContext(StylesheetContext);

  context.register(Array.isArray(stylesheets) ? stylesheets : [stylesheets], context);
};
