import * as React from 'react';

import { COMPOSE_PROP } from './compose';
import { ComposePreparedOptions, ComposeResolvedOptions } from './types';
import useReactElement from './useReactElement';

function useCompose(): ComposeResolvedOptions | null {
  const [ElementType, props = {}] = useReactElement<
    React.FunctionComponent & { [COMPOSE_PROP]: ComposePreparedOptions | undefined },
    Record<string, any>
  >();
  const composeOptions: ComposePreparedOptions | undefined = ElementType?.[COMPOSE_PROP];

  if (composeOptions) {
    const { className, displayNames, handledProps, mapPropsToBehaviorChain, mapPropsToStylesChain, overrideStyles } = composeOptions;

    return {
      className,
      displayNames,

      behaviorProps: mapPropsToBehaviorChain.reduce((acc, fn) => ({ ...acc, ...fn(props) }), {}),
      stylesProps: mapPropsToStylesChain.reduce((acc, fn) => ({ ...acc, ...fn(props) }), {}),

      handledProps,
      overrideStyles
    };
  }

  return null;
}

export default useCompose;
