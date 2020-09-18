import { useFluentContext, Unstable_FluentContextProvider } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

import useClassNamesListener from './useClassNamesListener';
import useEnhancedRenderer, { UsedVariables } from './useEnhancedRenderer';

type VariableResolverProps = {
  onResolve: (variables: Record<string, string[]>) => void;
};

const VariableResolver: React.FunctionComponent<VariableResolverProps> = props => {
  const { onResolve } = props;

  const elementRef = React.useRef<HTMLDivElement>();
  const latestVariables = React.useRef<UsedVariables>({});

  const context = useFluentContext();
  const [enhancedContext, resolvedVariables] = useEnhancedRenderer(context);

  const onClassNamesChange = React.useCallback(() => {
    if (!_.isEqual(resolvedVariables.current, latestVariables.current)) {
      // deep is required to avoid referencing values
      latestVariables.current = _.cloneDeep(resolvedVariables.current);

      const ordered = _.mapValues(latestVariables.current, variables => Object.keys(variables).sort());

      onResolve(ordered);
    }
  }, [onResolve, resolvedVariables]);

  useClassNamesListener(elementRef, onClassNamesChange);

  return (
    <Unstable_FluentContextProvider value={enhancedContext}>
      <div ref={elementRef}>{props.children}</div>
    </Unstable_FluentContextProvider>
  );
};

export default VariableResolver;
