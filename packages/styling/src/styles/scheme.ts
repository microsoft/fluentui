import { mergeCustomizations, ICustomizerContext } from '@uifabric/utilities';
import { ISchemeNames, ITheme } from '../interfaces/index';

/**
 * Modify context to activate the specified scheme, using scheme in context (if available)
 * and falling back to settingsTheme. If no scheme is available, undefined context will be returned.
 *
 * @param scheme Scheme to get customizations for.
 * @param context Context in which to get schemed customizations.
 * @param settingsTheme Themes setting fallback if context does not have schemed theme.
 */
export function getSchemedContext(
  scheme: ISchemeNames,
  context: ICustomizerContext,
  settingsTheme?: ITheme
): ICustomizerContext | undefined {
  // As written now, schemes affect all components (including styled components) by modifying the active contextual theme.
  //    With this method, if there is a scopedSetting theme with schemes, it will be ignored as only schemes in the default theme will take
  //    effect. In addition, any scopedSetting themes will override the active theme, schemed or otherwise. This seems consistent
  //    as scopedSettings are more localized than a contextual scheme name.
  //  * Should schemes work with scopedSettings? If so, how?
  //  * Should scopedSetting theme schemes have an effect? How would they be applied?
  //  * Should scheme be a scopedSetting? How would it work (i.e. which components would the scheme affect)?
  let newContext: ICustomizerContext | undefined;
  const contextTheme: ITheme | undefined = context.customizations.settings.theme;
  // Grab scheme theme from context (if it exists) with fallback to settings.
  const schemeSource: ITheme | undefined =
    contextTheme && contextTheme.schemes && contextTheme.schemes[scheme] ? contextTheme : settingsTheme;
  const schemeTheme: ITheme | undefined =
    schemeSource && schemeSource.schemes && schemeSource.schemes[scheme] ? schemeSource.schemes[scheme] : undefined;

  // These first two checks are logically redundant but TS doesn't infer schemeSource.schemes is defined when schemeTheme is defined.
  // TODO: This should be optimized (whether here or outside of this function TBD) so that this code block is not executing on every
  //        render if scheme name and theme data has not changed. This needs to be carefully implemented to consider scheme data
  //        changing when scheme name doesn't, to account for the fact that mergeCustomizations makes new objects (shallow ref won't
  //        work), etc.
  if (schemeSource && schemeSource.schemes && schemeTheme) {
    // TODO: are either or both of these spreads necessary?
    const newTheme: ITheme = { ...schemeTheme };
    newTheme.schemes = { ...schemeSource.schemes };
    newContext = mergeCustomizations({ settings: { theme: newTheme } }, context);
  }
  return newContext;
}
