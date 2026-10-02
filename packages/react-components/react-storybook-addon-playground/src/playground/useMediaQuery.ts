import * as React from 'react';
import { useFluent } from '@fluentui/react-components';

/** Tracks a CSS media query against the window that hosts the playground. */
export function useMediaQuery(query: string): boolean {
  const { targetDocument } = useFluent();
  const targetWindow = targetDocument?.defaultView;
  const [matches, setMatches] = React.useState(() => targetWindow?.matchMedia(query).matches ?? false);

  React.useEffect(() => {
    if (!targetWindow) {
      return;
    }

    const mediaQueryList = targetWindow.matchMedia(query);
    const update = () => setMatches(mediaQueryList.matches);
    update();
    mediaQueryList.addEventListener('change', update);

    return () => mediaQueryList.removeEventListener('change', update);
  }, [query, targetWindow]);

  return matches;
}
