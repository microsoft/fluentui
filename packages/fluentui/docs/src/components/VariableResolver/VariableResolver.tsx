import { ProviderContextPrepared } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import useClassNamesListener from './useClassNamesListener';
import useEnhancedRenderer, { UsedVariables } from './useEnhancedRenderer';

type VariableResolverProps = {
  onResolve: (variables: Record<string, string[]>) => void;
};

const VariableResolver: React.FunctionComponent<VariableResolverProps> = props => {
  const { onResolve } = props;

  const elementRef = React.useRef<HTMLDivElement>();
  const latestVariables = React.useRef<UsedVariables>({});

  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const [, /* renderer */ resolvedVariables] = useEnhancedRenderer(context.renderer);

  const onClassNamesChange = React.useCallback(() => {
    if (!_.isEqual(resolvedVariables.current, latestVariables.current)) {
      // deep is required to avoid referencing values
      latestVariables.current = _.cloneDeep(resolvedVariables.current);

      const ordered = _.mapValues(latestVariables.current, variables => Object.keys(variables).sort());

      onResolve(ordered);
    }
  }, [onResolve, resolvedVariables]);

  useClassNamesListener(elementRef, onClassNamesChange);

  // TODO: fix this feature
  return <div ref={elementRef}>{props.children}</div>;
  // return (
  //   <Provider renderer={renderer}>
  //     <div ref={elementRef}>{props.children}</div>
  //   </Provider>
  // );
};

export default VariableResolver;
