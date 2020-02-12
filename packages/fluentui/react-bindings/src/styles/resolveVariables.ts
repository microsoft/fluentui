import {
  callable,
  ComponentVariablesInput,
  ComponentVariablesObject,
  mergeComponentVariables,
  ThemePrepared,
  withDebugId
} from '@fluentui/styles';

const variablesCache = new WeakMap<ThemePrepared, Record<string, ComponentVariablesObject>>();

const resolveVariables = (
  displayName: string,
  theme: ThemePrepared,
  variables: ComponentVariablesInput | undefined,
  enabledVariablesCaching: boolean | undefined
): ComponentVariablesObject => {
  //
  // Simple caching model, works only if there is no `props.variables`
  // Resolves variables for this component, cache the result in provider
  //

  let componentThemeVariables = {};

  if (enabledVariablesCaching) {
    if (!variablesCache.has(theme)) {
      variablesCache.set(theme, {});
    }

    const variablesThemeCache = variablesCache.get(theme) || {};

    if (!variablesThemeCache[displayName]) {
      variablesThemeCache[displayName] = callable(theme.componentVariables[displayName])(theme.siteVariables) || {};
      variablesCache.set(theme, variablesThemeCache);
    }

    componentThemeVariables = variablesThemeCache[displayName];
  } else {
    componentThemeVariables = callable(theme.componentVariables[displayName])(theme.siteVariables) || {};
  }

  if (variables === undefined) {
    return componentThemeVariables;
  }

  return mergeComponentVariables(componentThemeVariables, withDebugId(variables, 'props.variables'))(theme.siteVariables);
};

export default resolveVariables;
