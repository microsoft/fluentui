import {
  ComponentVariablesInput,
  ComponentVariablesPrepared,
  mergeComponentVariables,
  deepmerge,
} from '@fluentui/styles';
import * as _ from 'lodash';

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
    if (_.isPlainObject(variables) && _.isPlainObject(overrides)) {
      return deepmerge(variables, overrides);
    }
    return mergeComponentVariables(variables, overrides);
  }

  return variables || overrides;
}
