import { ComponentVariablesInput, ComponentVariablesPrepared, mergeComponentVariables } from '@fluentui/styles';

/**
 mergeComponentVariables() is always creating a function even if the arguments are undefined we have this temporary
 fix in place to avoid creating empty function because it is breaking caching we should either fix
 mergeComponentVariables(), or handle this in a more generic way.
 */
export function mergeVariablesOverrides(
  variables: ComponentVariablesInput,
  overrides: ComponentVariablesInput,
): ComponentVariablesPrepared {
  if (variables && overrides) {
    return mergeComponentVariables(variables, overrides);
  }

  if (variables) {
    return variables;
  }

  return overrides;
}
