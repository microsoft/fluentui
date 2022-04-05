import * as React from 'react';

import { Theme } from '@fluentui/react';

export interface IExampleCardTheme {
  /**
   * Theme title used in selectors shown to user.
   */
  title: string;
  /**
   * Associated theme that will be applied to example card.
   */
  theme: Theme;
}

export interface IAppThemes {
  exampleCardTheme?: IExampleCardTheme[];
  hideSchemes?: boolean;
}

export const AppThemesContext = React.createContext<IAppThemes>({
  exampleCardTheme: undefined,
  hideSchemes: false,
});
