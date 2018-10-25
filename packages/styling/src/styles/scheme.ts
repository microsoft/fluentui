import { Customizations, mergeSettings, ICustomizerContext } from '@uifabric/utilities';
import { ISchemeNames, ITheme } from '../interfaces/index';

/**
 * Modify context to activate the specified scheme, using scheme in context (if available)
 * and falling back to settingsTheme. If no scheme is available, undefined context will be returned.
 *
 * @param scheme - Scheme to get customizations for.
 * @param context - Context in which to get schemed customizations.
 */
export function getSchemedContext(scheme: ISchemeNames, context: ICustomizerContext): ICustomizerContext {
  let newContext: ICustomizerContext = context;
  const contextTheme: ITheme | undefined = context.customizations.settings.theme;

  const settingsTheme = Customizations.getSettings(['theme'], undefined, context.customizations).theme;
  const schemeTheme: ITheme | undefined = settingsTheme && settingsTheme.schemes && settingsTheme.schemes[scheme];

  // TODO: This should be analyzed for perf improvements. Can we prevent executing this if scheme or theme data hasn't changed?
  // These first two checks are logically redundant but TS doesn't infer schemeSource.schemes is defined when schemeTheme is defined.
  if (contextTheme && schemeTheme) {
    const newSettings = { theme: schemeTheme };
    newSettings.theme.schemes = contextTheme.schemes;

    newContext = {
      customizations: {
        settings: mergeSettings(context.customizations.settings, newSettings),
        scopedSettings: context.customizations.scopedSettings
      }
    };
  }
  return newContext;
}
