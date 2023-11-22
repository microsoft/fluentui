import { useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { getChildElement } from '../utils/getChildElement';
import type { MotionTransition } from '../types';

type TransitionProps = {
  children: React.ReactElement;

  appear?: boolean;
  visible?: boolean;

  unmountOnExit?: boolean;
};

export function createTransition(transition: MotionTransition) {
  const Transition: React.FC<TransitionProps> = props => {
    const { appear, children, visible, unmountOnExit } = props;

    const child = getChildElement(children);

    const elementRef = React.useRef<HTMLElement>();
    const ref = useMergedRefs(elementRef, child.ref);

    const [mounted, setMounted] = React.useState(() => (unmountOnExit ? visible : true));

    const isFirstMount = React.useRef<boolean>(true);
    const isReducedMotion = useIsReducedMotion();

    const onExitFinish = useEventCallback(() => {
      if (unmountOnExit) {
        setMounted(false);
      }
    });

    useIsomorphicLayoutEffect(() => {
      if (visible) {
        setMounted(true);
        return;
      }

      if (elementRef.current) {
        const animation = elementRef.current.animate(transition.exit.keyframes, {
          fill: 'forwards',

          ...transition.exit.options,
          ...(isReducedMotion() && { duration: 1 }),
        });

        if (isFirstMount.current) {
          // Heads up!
          // .finish() is used there to skip animation on first mount, but apply animation styles
          animation.finish();
          return;
        }

        animation.onfinish = onExitFinish;

        return () => {
          // TODO: should we set unmount there?
          animation.cancel();
        };
      }
    }, [isReducedMotion, onExitFinish, visible]);

    useIsomorphicLayoutEffect(() => {
      if (!elementRef.current) {
        return;
      }

      const shouldEnter = isFirstMount.current ? appear && visible : mounted && visible;

      if (shouldEnter) {
        const animation = elementRef.current.animate(transition.enter.keyframes, {
          fill: 'forwards',

          ...transition.enter.options,
          ...(isReducedMotion() && { duration: 1 }),
        });

        return () => {
          animation.cancel();
        };
      }
    }, [isReducedMotion, mounted, visible, appear]);

    useIsomorphicLayoutEffect(() => {
      isFirstMount.current = false;
    }, []);

    if (mounted) {
      return React.cloneElement(child, { ref });
    }

    return null;
  };

  return Transition;
}
