import * as React from 'react';
import { Theme } from '@fluentui/theme';

export interface IExampleCardThemes {
  /**
   * Theme title used in selectors shown to user.
   */
  title: string;
  /**
   * Associated themes that will be applied to example card.
   */
  themes: Theme[];
}

export interface IAppThemes {
  exampleCardThemes?: IExampleCardThemes[];
  hideSchemes?: boolean;
}

export const AppThemeContext = React.createContext<IAppThemes>({
  exampleCardThemes: undefined,
  hideSchemes: false,
});
