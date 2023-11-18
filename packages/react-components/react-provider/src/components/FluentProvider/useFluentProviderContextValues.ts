import * as React from 'react';
import type { FluentProviderContextValues, FluentProviderState } from './FluentProvider.types';

export function useFluentProviderContextValues_unstable(state: FluentProviderState): FluentProviderContextValues {
  const {
    applyStylesToPortals,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable,
    dir,
    root,
    targetDocument,
    theme,
    themeClassName,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable,
  } = state;

  const provider = React.useMemo(() => ({ dir, targetDocument }), [dir, targetDocument]);
  // "Tooltip" component mutates an object in this context, instance should be stable
  const [tooltip] = React.useState(() => ({}));
  const iconDirection = React.useMemo(() => ({ textDirection: dir }), [dir]);

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable,
    provider,
    textDirection: dir,
    iconDirection,
    tooltip,
    theme,
    themeClassName: applyStylesToPortals ? root.className! : themeClassName,
  };
}
