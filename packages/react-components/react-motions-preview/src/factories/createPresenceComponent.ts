import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import { MOTION_FINISH_EVENT, MotionFinishEventDetail } from '../events';
import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { useMountedState } from '../hooks/useMountedState';
import { getChildElement } from '../utils/getChildElement';
import type { PresenceMotion, MotionImperativeRef, PresenceMotionFn } from '../types';

export type PresenceComponentProps = {
  /**
   * By default, the child component won't execute the "enter" motion when it initially mounts, regardless of the value
   * of "visible". If you desire this behavior, ensure both "appear" and "visible" are set to "true".
   */
  appear?: boolean;

  /** A React element that will be cloned and will have motion effects applied to it. */
  children: React.ReactElement;

  /** Provides imperative controls for the animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;

  /** Defines whether a component is visible; triggers the "enter" or "exit" motions. */
  visible?: boolean;

  /**
   * By default, the child component remains mounted after it reaches the "finished" state. Set "unmountOnExit" if
   * you prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;
};

function shouldSkipAnimation(appear: boolean | undefined, isFirstMount: boolean, visible: boolean | undefined) {
  return !appear && isFirstMount && visible;
}

export function createPresenceComponent(motion: PresenceMotion | PresenceMotionFn) {
  const Presence: React.FC<PresenceComponentProps> = props => {
    const itemContext = React.useContext(PresenceGroupChildContext);
    const { appear, children, imperativeRef, visible, unmountOnExit } = { ...itemContext, ...props };

    const [mounted, setMounted] = useMountedState(visible, unmountOnExit);
    const child = getChildElement(children);

    const animationRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();
    const ref = useMergedRefs(elementRef, child.ref);
    const optionsRef = React.useRef<{ appear?: boolean }>({});

    const isFirstMount = React.useRef<boolean>(true);
    const isReducedMotion = useIsReducedMotion();

    useIsomorphicLayoutEffect(() => {
      optionsRef.current = { appear };
    });

    useIsomorphicLayoutEffect(() => {
      if (!elementRef.current || shouldSkipAnimation(optionsRef.current.appear, isFirstMount.current, visible)) {
        return;
      }

      const presenceDefinition = typeof motion === 'function' ? motion(elementRef.current) : motion;
      const { keyframes, ...options } = visible ? presenceDefinition.enter : presenceDefinition.exit;

      const animation = elementRef.current.animate(keyframes, {
        fill: 'forwards',

        ...options,
        ...(isReducedMotion() && { duration: 1 }),
      });

      if (!visible && isFirstMount.current) {
        // Heads up!
        // .finish() is used there to skip animation on first mount, but apply animation styles immediately
        animation.finish();
        return;
      }

      animationRef.current = animation;
      animation.onfinish = animationEvent => {
        elementRef.current?.dispatchEvent(
          new CustomEvent<MotionFinishEventDetail>(MOTION_FINISH_EVENT, {
            bubbles: true,
            detail: {
              direction: visible ? 'enter' : 'exit',
              animationEvent,
            },
          }),
        );

        if (!visible && unmountOnExit) {
          setMounted(false);
        }
      };

      return () => {
        animation.cancel();
      };
    }, [animationRef, isReducedMotion, visible]);

    useIsomorphicLayoutEffect(() => {
      isFirstMount.current = false;
    }, []);

    if (mounted) {
      return React.cloneElement(child, { ref });
    }

    return null;
  };

  return Presence;
}
