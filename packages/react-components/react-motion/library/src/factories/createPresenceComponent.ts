import { useEventCallback, useFirstMount, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import { useAnimateAtoms } from '../hooks/useAnimateAtoms';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { useMountedState } from '../hooks/useMountedState';
import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { getChildElement } from '../utils/getChildElement';
import type { MotionParam, PresenceMotion, MotionImperativeRef, PresenceMotionFn } from '../types';

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

  /**
   * Callback that is called when the whole motion finishes.
   *
   * A motion definition can contain multiple animations and therefore multiple "finish" events. The callback is
   * triggered once all animations have finished with "null" instead of an event object to avoid ambiguity.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionFinish?: (ev: null, data: { direction: 'enter' | 'exit' }) => void;

  /**
   * Callback that is called when the whole motion is cancelled. When a motion is cancelled it does not
   * emit a finish event but a specific cancel event
   *
   * A motion definition can contain multiple animations and therefore multiple "finish" events. The callback is
   * triggered once all animations have finished with "null" instead of an event object to avoid ambiguity.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionCancel?: (ev: null, data: { direction: 'enter' | 'exit' }) => void;

  /**
   * Callback that is called when the whole motion starts.
   *
   * A motion definition can contain multiple animations and therefore multiple "start" events. The callback is
   * triggered when the first animation is started. There is no official "start" event with the Web Animations API.
   * so the callback is triggered with "null".
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionStart?: (ev: null, data: { direction: 'enter' | 'exit' }) => void;

  /** Defines whether a component is visible; triggers the "enter" or "exit" motions. */
  visible?: boolean;

  /**
   * By default, the child component remains mounted after it reaches the "finished" state. Set "unmountOnExit" if
   * you prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;
};

function shouldSkipAnimation(appear: boolean | undefined, isFirstMount: boolean, visible: boolean | undefined) {
  return !appear && isFirstMount && !!visible;
}

export function createPresenceComponent<MotionParams extends Record<string, MotionParam> = {}>(
  value: PresenceMotion | PresenceMotionFn<MotionParams>,
) {
  const Presence: React.FC<PresenceComponentProps & MotionParams> = props => {
    'use no memo';

    const itemContext = React.useContext(PresenceGroupChildContext);
    const merged = { ...itemContext, ...props };

    const {
      appear,
      children,
      imperativeRef,
      onExit,
      onMotionFinish,
      onMotionStart,
      onMotionCancel,
      visible,
      unmountOnExit,
      ..._rest
    } = merged;
    const params = _rest as Exclude<typeof merged, PresenceComponentProps | typeof itemContext>;

    const [mounted, setMounted] = useMountedState(visible, unmountOnExit);
    const child = getChildElement(children);

    const handleRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();
    const ref = useMergedRefs(elementRef, child.ref);
    const optionsRef = React.useRef<{ appear?: boolean; params: MotionParams }>({ appear, params });

    const animateAtoms = useAnimateAtoms();
    const isFirstMount = useFirstMount();
    const isReducedMotion = useIsReducedMotion();

    const handleMotionStart = useEventCallback((direction: 'enter' | 'exit') => {
      onMotionStart?.(null, { direction });
    });
    const handleMotionFinish = useEventCallback((direction: 'enter' | 'exit') => {
      onMotionFinish?.(null, { direction });

      if (direction === 'exit' && unmountOnExit) {
        setMounted(false);
        onExit?.();
      }
    });

    const handleMotionCancel = useEventCallback((direction: 'enter' | 'exit') => {
      onMotionCancel?.(null, { direction });
    });

    useIsomorphicLayoutEffect(() => {
      // Heads up!
      // We store the params in a ref to avoid re-rendering the component when the params change.
      optionsRef.current = { appear, params };
    });

    useIsomorphicLayoutEffect(
      () => {
        const element = elementRef.current;

        if (!element || shouldSkipAnimation(optionsRef.current.appear, isFirstMount, visible)) {
          return;
        }

        const presenceMotion = typeof value === 'function' ? value({ element, ...optionsRef.current.params }) : value;
        const atoms = visible ? presenceMotion.enter : presenceMotion.exit;

        const direction = visible ? 'enter' : 'exit';
        const forceFinishMotion = !visible && isFirstMount;

        if (!forceFinishMotion) {
          handleMotionStart(direction);
        }

        const handle = animateAtoms(element, atoms, { isReducedMotion: isReducedMotion() });

        if (forceFinishMotion) {
          // Heads up!
          // .finish() is used there to skip animation on first mount, but apply animation styles immediately
          handle.finish();
          return;
        }

        handleRef.current = handle;
        handle.setMotionEndCallbacks(
          () => handleMotionFinish(direction),
          () => handleMotionCancel(direction),
        );

        return () => {
          handle.cancel();
        };
      },
      // Excluding `isFirstMount` from deps to prevent re-triggering the animation on subsequent renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [animateAtoms, handleRef, isReducedMotion, handleMotionFinish, handleMotionStart, handleMotionCancel, visible],
    );

    if (mounted) {
      return React.cloneElement(child, { ref });
    }

    return null;
  };

  return Presence;
}
