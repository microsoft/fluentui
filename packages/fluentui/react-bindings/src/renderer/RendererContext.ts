import { createFelaRenderer } from '@fluentui/react-northstar-fela-renderer';
import { CreateRenderer } from '@fluentui/react-northstar-styles-renderer';
import * as React from 'react';

import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

type RendererContextValue = {
  factory: CreateRenderer;
  wasEverConsumed: boolean;
};

const RendererContext = React.createContext<RendererContextValue>({
  factory: createFelaRenderer,
  wasEverConsumed: false,
});

export const RendererProvider: React.FC<{ factory: CreateRenderer }> = props => {
  const context = React.useContext(RendererContext);

  const { wasEverConsumed } = context;
  context.wasEverConsumed = true;

  useIsomorphicLayoutEffect(() => {
    if (wasEverConsumed) {
      throw new Error(
        '"RendererProvider" component can be used only once in your application and always should be used before "Provider" component.',
      );
    }
  }, []);

  return React.createElement(
    RendererContext.Provider,
    { value: { factory: props.factory, wasEverConsumed: false } },
    props.children,
  );
};

export function useCreateRenderer(): CreateRenderer {
  const context = React.useContext(RendererContext);
  context.wasEverConsumed = true;

  return context.factory;
}
