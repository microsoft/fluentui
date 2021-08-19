import { Customizations, mergeSettings } from '@fluentui/utilities';
import type { ICustomizerContext } from '@fluentui/utilities';
import type { ISchemeNames, ITheme } from '../interfaces/index';

/**
 * @internal
 * This function is still in experimental phase in support of Foundation experimental development.
 * Its API signature and existence are subject to change.
 *
 * Modify context to activate the specified scheme or theme. For schemes, look in context (if available) and fall back
 * to global Customizations. If both scheme and theme are specified, scheme will be looked up in theme. In this case,
 * scheme must be present in theme arg, otherwise new context will default to theme arg (there is no fallback to
 * settings to look up scheme.)
 *
 * @param context - Context in which to get schemed customizations.
 * @param scheme - Scheme to get customizations for from theme arg (if supplied) OR from context and global settings.
 * @param theme - Theme to merge into context.
 * @returns modified schemed context if scheme is valid and not already applied, unmodified context otherwise.
 */
export function getThemedContext(
  context: ICustomizerContext,
  scheme?: ISchemeNames,
  theme?: ITheme,
): ICustomizerContext {
  let newContext: ICustomizerContext = context;
  let newSettings;

  // Only fall back to context and customizations when theme arg is not provided.
  let schemeSource = theme || Customizations.getSettings(['theme'], undefined, context.customizations).theme;

  if (theme) {
    newSettings = { theme };
  }

  const schemeTheme: ITheme | undefined =
    scheme && schemeSource && schemeSource.schemes && schemeSource.schemes[scheme];

  // These first two checks are logically redundant but TS doesn't infer schemeSource.schemes is defined
  // when schemeTheme is defined.
  if (schemeSource && schemeTheme && schemeSource !== schemeTheme) {
    newSettings = { theme: schemeTheme };
    newSettings.theme.schemes = schemeSource.schemes;
  }

  if (newSettings) {
    newContext = {
      customizations: {
        settings: mergeSettings(context.customizations.settings, newSettings),
        scopedSettings: context.customizations.scopedSettings,
      },
    };
  }

  return newContext;
}
