import * as React from 'react';
import type { FluentProviderContextValues, FluentProviderState } from './FluentProvider.types';

export function useFluentProviderContextValues_unstable(state: FluentProviderState): FluentProviderContextValues {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { applyStylesToPortals, dir, root, targetDocument, theme, themeClassName, overrides_unstable } = state;

  const provider = React.useMemo(() => ({ dir, targetDocument }), [dir, targetDocument]);
  // "Tooltip" component mutates an object in this context, instance should be stable
  const [tooltip] = React.useState(() => ({}));

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable,
    provider,
    textDirection: dir,
    tooltip,
    theme,
    themeClassName: applyStylesToPortals ? root.className! : themeClassName,
  };
}
