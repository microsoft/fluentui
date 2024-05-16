import { useEventCallback, useFirstMount, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import type { EventData, EventHandler } from '@fluentui/react-utilities';
import * as React from 'react';

import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { useMountedState } from '../hooks/useMountedState';
import { animate } from '../utils/animate';
import { getChildElement } from '../utils/getChildElement';
import type {
  PresenceMotion,
  MotionImperativeRef,
  PresenceMotionFn,
  PresenceOverrideFields,
  PresenceOverride,
} from '../types';

type PresenceMotionEventData = EventData<'animation', AnimationPlaybackEvent> & {
  direction: 'enter' | 'exit';
};

export type PresenceComponentProps<CustomOverrides = {}> = {
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
   * Fades in/out on enter/exit.
   * @default true
   */
  animateOpacity?: boolean;

  /**
   * By default, the child component remains mounted after it reaches the "finished" state. Set "unmountOnExit" if
   * you prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;

  override?: PresenceOverride<CustomOverrides>;
};

function shouldSkipAnimation(appear: boolean | undefined, isFirstMount: boolean, visible: boolean | undefined) {
  return !appear && isFirstMount && visible;
}

export function createPresenceComponent<CustomProps = {}>(motion: PresenceMotion | PresenceMotionFn<CustomProps>) {
  const Presence: React.FC<PresenceComponentProps> = props => {
    const itemContext = React.useContext(PresenceGroupChildContext);
    const {
      appear,
      children,
      imperativeRef,
      onMotionFinish,
      visible,
      animateOpacity,
      unmountOnExit,
      override = {},
    } = { ...itemContext, ...props };

    const [mounted, setMounted] = useMountedState(visible, unmountOnExit);
    const child = getChildElement(children);

    const animationRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();
    // For override and animateOpacity props, we don't want to restart the animation when they change.
    // So we use refs to store the current values, which will not rerender the component when they change.
    // The new value will show on the next animation, usually triggered by the visible prop.
    const overrideRef = React.useRef(override);
    const animateOpacityRef = React.useRef(animateOpacity);
    const ref = useMergedRefs(elementRef, child.ref);
    const optionsRef = React.useRef<{ appear?: boolean }>({});

    const isFirstMount = useFirstMount();
    const isReducedMotion = useIsReducedMotion();

    const onEnterFinish = useEventCallback((event: AnimationPlaybackEvent) => {
      onMotionFinish?.(event, { event, type: 'animation', direction: 'enter' });
    });
    const onExitFinish = useEventCallback((event: AnimationPlaybackEvent) => {
      onMotionFinish?.(event, { event, type: 'animation', direction: 'exit' });

      if (unmountOnExit) {
        setMounted(false);
        itemContext?.onExit();
      }
    });

    useIsomorphicLayoutEffect(() => {
      optionsRef.current = { appear };
    });

    useIsomorphicLayoutEffect(
      () => {
        if (!elementRef.current || shouldSkipAnimation(optionsRef.current.appear, isFirstMount, visible)) {
          return;
        }

        const { enter: enterProp, exit: exitProp, all } = overrideRef.current;
        // Only create override objects if there are any overrides;
        // otherwise use undefined so enter/exit overrides won't be passed to the motion function
        const enter =
          all || enterProp ? ({ ...all, ...enterProp } as Partial<PresenceOverrideFields & CustomProps>) : undefined;
        const exit =
          all || exitProp ? ({ ...all, ...exitProp } as Partial<PresenceOverrideFields & CustomProps>) : undefined;

        const presenceDefinition =
          typeof motion === 'function'
            ? motion({ element: elementRef.current, animateOpacity: animateOpacityRef.current, enter, exit })
            : motion;
        const { keyframes, ...options } = visible ? presenceDefinition.enter : presenceDefinition.exit;

        const animation = animate(elementRef.current, keyframes, {
          fill: 'forwards',

          ...options,
          ...(isReducedMotion() && { duration: 1 }),
        });

        if (!animation) {
          return;
        }

        if (!visible && isFirstMount) {
          // Heads up!
          // .finish() is used there to skip animation on first mount, but apply animation styles immediately
          animation.finish();
          return;
        }

        animationRef.current = animation;
        animation.onfinish = visible ? onEnterFinish : onExitFinish;

        return () => {
          animation.cancel();
        };
      },
      // Excluding `isFirstMount` from deps to prevent re-triggering the animation on subsequent renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [animationRef, isReducedMotion, onEnterFinish, onExitFinish, visible],
    );

    React.useEffect(() => {
      overrideRef.current = override;
    }, [override]);

    React.useEffect(() => {
      animateOpacityRef.current = animateOpacity;
    }, [animateOpacity]);

    if (mounted) {
      return React.cloneElement(child, { ref });
    }

    return null;
  };

  return Presence;
}
