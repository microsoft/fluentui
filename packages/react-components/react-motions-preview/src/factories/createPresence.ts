import { useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { getChildElement } from '../utils/getChildElement';
import type { PresenceMotion, MotionImperativeRef, PresenceMotionFn, PresenceParams, PresenceOverride } from '../types';

type PresenceProps<CustomProps = {}> = {
  children: React.ReactElement;

  /** Provides imperative controls for the animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;

  appear?: boolean;
  visible?: boolean;

  unmountOnExit?: boolean;

  override?: PresenceOverride<CustomProps>;
};

export function createPresence<CustomProps = {}>(motion: PresenceMotion | PresenceMotionFn<CustomProps>) {
  const Presence: React.FC<PresenceProps<CustomProps>> = props => {
    const { appear, children, imperativeRef, visible, unmountOnExit, override = {} } = props;
    const child = getChildElement(children);

    const animationRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();
    const overrideRef = React.useRef(override);
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
        const { enter: enterProp, exit: exitProp, all } = overrideRef.current;
        const enter = { ...all, ...enterProp } as Partial<PresenceParams & CustomProps>;
        const exit = { ...all, ...exitProp } as Partial<PresenceParams & CustomProps>;

        const definition = typeof motion === 'function' ? motion({ element: elementRef.current, enter, exit }) : motion;
        const { keyframes, ...options } = definition.exit;

        const animation = elementRef.current.animate(keyframes, {
          fill: 'forwards',

          ...options,
          ...(isReducedMotion() && { duration: 1 }),
        });

        if (isFirstMount.current) {
          // Heads up!
          // .finish() is used there to skip animation on first mount, but apply animation styles
          animation.finish();
          return;
        }

        animationRef.current = animation;
        animation.onfinish = onExitFinish;

        return () => {
          // TODO: should we set unmount there?
          animation.cancel();
        };
      }
    }, [animationRef, isReducedMotion, onExitFinish, visible]);

    useIsomorphicLayoutEffect(() => {
      if (!elementRef.current) {
        return;
      }

      const shouldEnter = isFirstMount.current ? appear && visible : mounted && visible;

      if (shouldEnter) {
        const { enter: enterProp, exit: exitProp, all } = overrideRef.current;
        const enter = { ...all, ...enterProp } as Partial<PresenceParams & CustomProps>;
        const exit = { ...all, ...exitProp } as Partial<PresenceParams & CustomProps>;

        const definition = typeof motion === 'function' ? motion({ element: elementRef.current, enter, exit }) : motion;
        const { keyframes, ...options } = definition.enter;

        const animation = elementRef.current.animate(keyframes, {
          fill: 'forwards',

          ...options,
          ...(isReducedMotion() && { duration: 1 }),
        });

        animationRef.current = animation;

        return () => {
          animation.cancel();
        };
      }
    }, [animationRef, isReducedMotion, mounted, visible, appear]);

    useIsomorphicLayoutEffect(() => {
      isFirstMount.current = false;
    }, []);

    React.useEffect(() => {
      overrideRef.current = override;
    }, [override]);

    if (mounted) {
      return React.cloneElement(child, { ref });
    }

    return null;
  };

  return Presence;
}
