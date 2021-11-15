import { ProviderContextPrepared } from '@fluentui/react-northstar';
import { Renderer } from '@fluentui/react-northstar-styles-renderer';
import { callable } from '@fluentui/styles';
import * as _ from 'lodash';
import * as React from 'react';

export type UsedVariables = Record<string, Record<string, null>>;

/** Enhances passed Fela or Emotion renderer to get actual variables. */
const useEnhancedRenderer = (
  context: ProviderContextPrepared,
  renderer: Renderer,
): [Renderer, React.RefObject<UsedVariables>] => {
  const resolvedVariables = React.useRef<UsedVariables>({});
  const renderRule: Renderer['renderRule'] = React.useCallback(
    (styles, rendererParam) => {
      const componentName: string = rendererParam.displayName;
      const componentVariables = callable(context.theme.componentVariables[rendererParam.displayName])(
        context.theme.siteVariables,
      );

      resolvedVariables.current[componentName] = resolvedVariables.current[componentName] || {};

      _.forEach(componentVariables, (variableValue, variableName) => {
        if (typeof variableValue === 'string') {
          resolvedVariables.current[componentName][variableName] = null;
        }
      });

      return renderer.renderRule(styles, rendererParam);
    },
    [context],
  );

  const enhancedRenderer: Renderer = React.useMemo(() => ({ ...renderer, renderRule }), [context, renderRule]);

  return [enhancedRenderer, resolvedVariables];
};

export default useEnhancedRenderer;
