import { useConst } from '@fluentui/react-utilities';
import * as React from 'react';
import type { FluentProviderContextValues, FluentProviderState } from './FluentProvider.types';

export function useFluentProviderContextValues(state: FluentProviderState): FluentProviderContextValues {
  const { root, dir, targetDocument, theme, noForcedColors } = state;

  const provider = React.useMemo(() => ({ dir, targetDocument, noForcedColors }), [
    dir,
    targetDocument,
    noForcedColors,
  ]);
  // "Tooltip" component mutates an object in this context, instance should be stable
  const tooltip = useConst({});

  return {
    provider,
    tooltip,
    theme,
    themeClassName: root.className!,
  };
}
