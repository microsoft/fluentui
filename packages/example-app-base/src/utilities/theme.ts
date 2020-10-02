import * as React from 'react';
import { Theme } from '@fluentui/theme';
import { MDL2Customizations } from '@uifabric/mdl2-theme';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '@uifabric/azure-themes';
import {
  TeamsCustomizations,
  WordCustomizations,
  DefaultCustomizations,
  DarkCustomizations,
} from '@uifabric/theme-samples';
import { ICustomizations } from 'office-ui-fabric-react/lib/Utilities';

export interface IExampleCardThemes {
  /**
   * Theme title used in selectors shown to user.
   */
  title: string;
  /**
   * Associated themes that will be applied to example card.
   */
  theme: Theme;
}

export interface IAppThemes {
  exampleCardThemes?: IExampleCardThemes[];
  hideSchemes?: boolean;
}

export const AppThemeContext = React.createContext<IAppThemes>({
  exampleCardThemes: undefined,
  hideSchemes: false,
});

export type ThemeTitle = 'Default' | 'Dark' | 'Word' | 'Teams' | 'Azure' | 'Azure Dark' | 'MDL2';

export function createAppThemes(titles: ThemeTitle[], hideSchemes: boolean = false): IAppThemes {
  const themes: { [key in ThemeTitle]: Theme } = {
    Default: convertCustomizationsToTheme(DefaultCustomizations),
    Dark: convertCustomizationsToTheme(DarkCustomizations),
    Word: convertCustomizationsToTheme(WordCustomizations),
    Teams: convertCustomizationsToTheme(TeamsCustomizations),
    Azure: convertCustomizationsToTheme(AzureCustomizationsLight),
    'Azure Dark': convertCustomizationsToTheme(AzureCustomizationsDark),
    MDL2: convertCustomizationsToTheme(MDL2Customizations),
  };

  const exampleCardThemes: IExampleCardThemes[] = [];
  titles.forEach((title: ThemeTitle) => {
    exampleCardThemes.push({
      title,
      theme: themes[title],
    });
  });

  return {
    exampleCardThemes,
    hideSchemes,
  };
}

// TODO: define and use Themes from `theme-samples`.
function convertCustomizationsToTheme(customizations: ICustomizations): Theme {
  return {
    ...customizations.settings.theme,
    components: customizations.scopedSettings,
  };
}
