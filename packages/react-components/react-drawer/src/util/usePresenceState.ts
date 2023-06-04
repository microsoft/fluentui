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

type UsePresenceStateOptions = {
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
};

const noop = () => ({});

const usePresenceState = (
  ref: React.RefObject<HTMLElement>,
  open: boolean,
  options?: UsePresenceStateOptions,
): UsePresenceState => {
  const { onEnter = noop, onEntered = noop, onExit = noop, onExited = noop } = options || {};

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

      if (open) {
        onEnter();
      } else {
        onExit();
      }
    },
    [onEnter, onExit, open, ref],
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

      if (open) {
        onEntered();
      } else {
        onExited();
      }
    },
    [onEntered, onExited, open, ref],
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
