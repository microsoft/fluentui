import { ComponentSlotStylesResolved, ComponentVariablesObject, isDebugEnabled } from '@fluentui/styles';
import * as _ from 'lodash';

import { ProviderContextPrepared } from '../context';
import { ComponentSlotClasses, ResolveStylesOptions } from '../styles/types';
import { resolveVariables } from './resolveVariables';
import { resolveStyles } from './resolveStyles';

export type GetStylesResult = {
  classes: ComponentSlotClasses;
  variables: ComponentVariablesObject;
  styles: ComponentSlotStylesResolved;
  theme: ProviderContextPrepared['theme'];
};

export const getStyles = (options: ResolveStylesOptions): GetStylesResult => {
  const { primaryDisplayName, telemetry } = options;

  //
  // To compute styles we are going through three stages:
  // - resolve variables (siteVariables => componentVariables + props.variables)
  // - resolve styles (with resolvedVariables & props.styles & props.design)
  // - compute classes (with resolvedStyles)
  // - conditionally add sources for evaluating debug information to component

  const telemetryPartStart = telemetry?.enabled ? performance.now() : 0;
  const resolvedVariables = resolveVariables(
    options.allDisplayNames,
    options.theme,
    options.inlineStylesProps.variables,
    options.performance.enableVariablesCaching,
  );

  if (telemetry?.enabled && telemetry.performance[primaryDisplayName]) {
    telemetry.performance[primaryDisplayName].msResolveVariablesTotal += performance.now() - telemetryPartStart;
  }

  const { classes, resolvedStyles, resolvedStylesDebug } = resolveStyles(options, resolvedVariables);

  // conditionally add sources for evaluating debug information to component
  if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
    options.saveDebug({
      componentName: options.allDisplayNames.join(':'),
      componentVariables: _.filter(resolvedVariables._debug, variables => !_.isEmpty(variables.resolved)),
      componentStyles: resolvedStylesDebug,
      siteVariables: _.filter(options.theme.siteVariables._debug, siteVars => {
        if (_.isEmpty(siteVars) || _.isEmpty(siteVars.resolved)) {
          return false;
        }

        const keys = Object.keys(siteVars.resolved);
        if (keys.length === 1 && keys.pop() === 'fontSizes' && _.isEmpty(siteVars.resolved['fontSizes'])) {
          return false;
        }

        return true;
      }),
    });
  }

  return {
    classes,
    variables: resolvedVariables,
    styles: resolvedStyles,
    theme: options.theme,
  };
};
