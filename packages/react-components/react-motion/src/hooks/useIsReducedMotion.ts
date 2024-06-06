import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const REDUCED_MEDIA_QUERY = 'screen and (prefers-reduced-motion: reduce)';

// TODO: find a better approach there as each hook creates a separate subscription

export function useIsReducedMotion(): () => boolean {
  const { targetDocument } = useFluent();
  const targetWindow: Window | null = targetDocument?.defaultView ?? null;

  const queryValue = React.useRef<boolean>(false);
  const isEnabled = React.useCallback(() => queryValue.current, []);

  React.useEffect(() => {
    if (targetWindow === null || typeof targetWindow.matchMedia !== 'function') {
      return;
    }

    const queryMatch = targetWindow.matchMedia(REDUCED_MEDIA_QUERY);

    if (queryMatch.matches) {
      queryValue.current = true;
    }

    const matchListener = (e: MediaQueryListEvent) => {
      queryValue.current = e.matches;
    };

    queryMatch.addEventListener('change', matchListener);

    return () => {
      queryMatch.removeEventListener('change', matchListener);
    };
  }, [targetWindow]);

  return isEnabled;
}
