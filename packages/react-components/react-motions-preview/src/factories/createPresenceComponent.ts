import { useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import type { EventData, EventHandler } from '@fluentui/react-utilities';
import * as React from 'react';

import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { getChildElement } from '../utils/getChildElement';
import type { PresenceMotion, MotionImperativeRef, PresenceMotionFn, PresenceParams, PresenceOverride } from '../types';

type PresenceMotionEventData = EventData<'animation', AnimationPlaybackEvent> & {
  direction: 'enter' | 'exit';
};

type PresenceComponentProps<CustomProps = {}> = {
  /**
   * By default, the child component won't execute the "enter" motion when it initially mounts, regardless of the value
   * of "visible". If you desire this behavior, ensure both "appear" and "visible" are set to "true".
   */
  appear?: boolean;

  /** A React element that will be cloned and will have motion effects applied to it. */
  children: React.ReactElement;

  /** Provides imperative controls for the animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;

  onMotionFinish?: EventHandler<PresenceMotionEventData>;

  /** Defines whether a component is visible; triggers the "enter" or "exit" motions. */
  visible?: boolean;

  /**
   * By default, the child component remains mounted after it reaches the "finished" state. Set "unmountOnExit" if
   * you prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;

  override?: PresenceOverride<CustomProps>;
};

export function createPresenceComponent<CustomProps = {}>(motion: PresenceMotion | PresenceMotionFn<CustomProps>) {
  const Presence: React.FC<PresenceComponentProps> = props => {
    const itemContext = React.useContext(PresenceGroupChildContext);
    const {
      appear,
      children,
      imperativeRef,
      onMotionFinish,
      visible,
      unmountOnExit,
      override = {},
    } = { ...itemContext, ...props };
    const child = getChildElement(children);

    const animationRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();
    const overrideRef = React.useRef(override);
    const ref = useMergedRefs(elementRef, child.ref);
    const optionsRef = React.useRef<{ appear?: boolean }>();

    const [mounted, setMounted] = React.useState(() => (unmountOnExit ? visible : true));

    const isFirstMount = React.useRef<boolean>(true);
    const isReducedMotion = useIsReducedMotion();

    const onEnterFinish = useEventCallback((event: AnimationPlaybackEvent) => {
      onMotionFinish?.(event, { event, type: 'animation', direction: 'enter' });
    });
    const onExitFinish = useEventCallback((event: AnimationPlaybackEvent) => {
      onMotionFinish?.(event, { event, type: 'animation', direction: 'exit' });

      if (unmountOnExit) {
        setMounted(false);
      }
    });

    useIsomorphicLayoutEffect(() => {
      optionsRef.current = { appear };
    });

    useIsomorphicLayoutEffect(() => {
      if (visible) {
        setMounted(true);
        return;
      }

      // Check for .animate which may not be available in some environments, e.g. unit tests
      if (elementRef.current && elementRef.current.animate) {
        const { enter: enterProp, exit: exitProp, all } = overrideRef.current;
        // Only create override objects if there are any overrides;
        // otherwise use undefined so enter/exit overrides won't be passed to the motion function
        const enter =
          all || enterProp ? ({ ...all, ...enterProp } as Partial<PresenceParams & CustomProps>) : undefined;
        const exit = all || exitProp ? ({ ...all, ...exitProp } as Partial<PresenceParams & CustomProps>) : undefined;

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
      if (!(elementRef.current && elementRef.current.animate)) {
        return;
      }

      const shouldEnter = isFirstMount.current ? optionsRef.current?.appear && visible : mounted && visible;

      if (shouldEnter) {
        const { enter: enterProp, exit: exitProp, all } = overrideRef.current;
        const enter =
          all || enterProp ? ({ ...all, ...enterProp } as Partial<PresenceParams & CustomProps>) : undefined;
        const exit = all || exitProp ? ({ ...all, ...exitProp } as Partial<PresenceParams & CustomProps>) : undefined;

        const definition = typeof motion === 'function' ? motion({ element: elementRef.current, enter, exit }) : motion;
        const { keyframes, ...options } = definition.enter;

        const animation = elementRef.current.animate(keyframes, {
          fill: 'forwards',

          ...options,
          ...(isReducedMotion() && { duration: 1 }),
        });

        animationRef.current = animation;
        animation.onfinish = onEnterFinish;

        return () => {
          animation.cancel();
        };
      }
    }, [animationRef, isReducedMotion, mounted, onEnterFinish, visible]);

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
