import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

type UsePresenceStateStore = {
  rendered: boolean;
  mounted: boolean;
  entering: boolean;
  exiting: boolean;
};

type UsePresenceState = UsePresenceStateStore & {
  animating: boolean;
};

const usePresenceState = (open: boolean, ref: React.RefObject<HTMLElement>): UsePresenceState => {
  const [hasFinishedStart, setHasFinishedStart] = React.useState(false);

  const [presenceState, setPresenceState] = React.useState<UsePresenceStateStore>({
    rendered: open,
    mounted: false,
    entering: false,
    exiting: false,
  });
  const animating = React.useMemo(() => presenceState.entering || presenceState.exiting, [presenceState]);

  const onStart = React.useCallback(
    event => {
      if (event.target !== ref.current) {
        return;
      }

      setPresenceState(prevState => ({
        ...prevState,
        entering: open,
        exiting: !open,
      }));
      setHasFinishedStart(true);
    },
    [open, ref],
  );

  const onEnd = React.useCallback(
    event => {
      if (event.target !== ref.current) {
        return;
      }

      setPresenceState({
        entering: false,
        exiting: false,
        rendered: open,
        mounted: open,
      });
    },
    [open, ref],
  );

  useIsomorphicLayoutEffect(() => {
    let currentRef: HTMLElement;

    if (open) {
      setPresenceState(prevState => ({
        ...prevState,
        rendered: true,
      }));
    } else if (!hasFinishedStart) {
      setPresenceState(prevState => ({
        ...prevState,
        rendered: false,
      }));
      setHasFinishedStart(false);
    }

    const animationFrame = requestAnimationFrame(() => {
      if (ref && ref.current) {
        currentRef = ref.current;

        ref.current.addEventListener('transitionstart', onStart);
        ref.current.addEventListener('animationstart', onStart);
        ref.current.addEventListener('transitionend', onEnd);
        ref.current.addEventListener('animationend', onEnd);
      }

      setPresenceState(prevState => ({
        ...prevState,
        mounted: open,
      }));
    });

    return () => {
      cancelAnimationFrame(animationFrame);

      if (!currentRef) {
        return;
      }

      currentRef.removeEventListener('transitionstart', onStart);
      currentRef.removeEventListener('animationstart', onStart);
      currentRef.removeEventListener('transitionend', onEnd);
      currentRef.removeEventListener('animationend', onEnd);
    };
  }, [hasFinishedStart, onEnd, onStart, open, ref]);

  return {
    ...presenceState,
    animating,
  };
};

export default usePresenceState;
