import { callable } from '@fluentui/styles';
import { ComponentSlotStylesPrepared, Renderer } from '@fluentui/react-northstar';
import flat from 'flat';
import * as _ from 'lodash';
import * as React from 'react';

export type UsedVariables = Record<string, Record<string, null>>;

const variableRegex = /<<variable:(\w+)>>/g;
const getAllVariables = (styleValue: string, matches: string[] = []): string[] => {
  const match = variableRegex.exec(styleValue);

  if (match) {
    matches.push(match[1]);
    getAllVariables(styleValue, matches);
  }

  return matches;
};

const useEnhancedRenderRule = (renderer: Renderer): [Renderer['renderRule'], React.RefObject<UsedVariables>] => {
  const variables = React.useRef<UsedVariables>({});

  const renderRule: Renderer['renderRule'] = React.useCallback(
    (rule, props) => {
      const componentName: string = (props as any).displayName;
      variables.current[componentName] = variables.current[componentName] || {};

      // Maps all variable values with matching strings:
      // { color: 'blue' } => { color: 'variable.color' }
      const mappedVariables = _.mapValues((props as any).variables, (variableValue, variableName) => {
        // Temporary workaround until variables be flat
        return typeof variableValue === 'string' ? `<<variable:${variableName}>>` : variableValue;
      });

      const resolvedStyles: ComponentSlotStylesPrepared = callable(rule)({
        ...props,
        variables: mappedVariables,
      });
      const flattenStyles: Record<string, string> = flat(resolvedStyles);

      _.forEach(flattenStyles, styleValue => {
        if (typeof styleValue === 'string') {
          // String can contain multiple variables: <<variable:foo>> 1px <<variable:bar>>
          getAllVariables(styleValue).forEach(variableName => {
            variables.current[componentName][variableName] = null;
          });
        }
      });

      return renderer.renderRule(rule, props);
    },
    [renderer],
  );

  return [renderRule, variables];
};

/** Enhances passed Fela renderer to get actual variables. */
const useEnhancedRenderer = (originalRenderer: Renderer): [Renderer, React.RefObject<UsedVariables>] => {
  const [renderRule, variables] = useEnhancedRenderRule(originalRenderer);
  const enhancedRenderer: Renderer = React.useMemo(() => ({ ...originalRenderer, renderRule }), [
    originalRenderer,
    renderRule,
  ]);

  return [enhancedRenderer, variables];
};

export default useEnhancedRenderer;
