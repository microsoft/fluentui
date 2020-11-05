import * as React from 'react';
import { ThemeProvider, PartialTheme } from '@fluentui/react/lib/Theme';

const themeWithStylesheets: PartialTheme = {
  stylesheets: [`.foo { font-family: 'Courier New'; }`],
};

export const ThemeProviderStylesheetExample = () => (
  <ThemeProvider className="foo" theme={themeWithStylesheets}>
    <span>font-family is courier new.</span>
  </ThemeProvider>
);
