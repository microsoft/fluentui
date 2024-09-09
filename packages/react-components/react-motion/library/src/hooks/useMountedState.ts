import { useForceUpdate } from '@fluentui/react-utilities';
import * as React from 'react';

/**
 * This hook manages the mounted state of a component, based on the "visible" and "unmountOnExit" props.
 * It simulates the behavior of getDerivedStateFromProps(), which is not available in functional components.
 */
export function useMountedState(
  visible: boolean = false,
  unmountOnExit: boolean = false,
): [boolean, (value: boolean) => void] {
  const mountedRef = React.useRef<boolean>(unmountOnExit ? visible : true);
  const forceUpdate = useForceUpdate();

  const setMounted = React.useCallback(
    (newValue: boolean) => {
      if (mountedRef.current !== newValue) {
        mountedRef.current = newValue;
        forceUpdate();
      }
    },
    [forceUpdate],
  );

  React.useEffect(() => {
    if (visible) {
      mountedRef.current = visible;
    }
  });

  return [visible || mountedRef.current, setMounted];
}
