import * as React from 'react';

export function useMediaQueryMatch(query: string): boolean {
  const targetWindow = typeof document === 'undefined' ? undefined : document.defaultView;
  const matchMedia = targetWindow?.matchMedia;

  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [match] = React.useState<MediaQueryList | undefined>(() => {
    if (typeof matchMedia === 'function') {
      return matchMedia(query);
    }

    return undefined;
  });

  React.useEffect(
    function () {
      match?.addEventListener('change', forceUpdate);

      return () => {
        match?.removeEventListener('change', forceUpdate);
      };
    },
    [match],
  );

  return match?.matches || false;
}
