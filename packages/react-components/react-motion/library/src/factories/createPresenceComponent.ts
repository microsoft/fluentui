import { useEventCallback, useFirstMount, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import * as React from 'react';

import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import { useAnimateAtoms } from '../hooks/useAnimateAtoms';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { useMountedState } from '../hooks/useMountedState';
import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useChildElement } from '../utils/useChildElement';
import type {
  MotionParam,
  PresenceMotion,
  MotionImperativeRef,
  PresenceMotionFn,
  PresenceDirection,
  AnimationHandle,
} from '../types';
import { useMotionBehaviourContext } from '../contexts/MotionBehaviourContext';
import { createMotionComponent, MotionComponentProps } from './createMotionComponent';

/**
 * @internal A private symbol to store the motion definition on the component for variants.
 */
export const PRESENCE_MOTION_DEFINITION = Symbol('PRESENCE_MOTION_DEFINITION');

export type PresenceComponentProps = {
  /**
   * By default, the child component won't execute the "enter" motion when it initially mounts, regardless of the value
   * of "visible". If you desire this behavior, ensure both "appear" and "visible" are set to "true".
   */
  appear?: boolean;

  /** A React element that will be cloned and will have motion effects applied to it. */
  children: JSXElement;

  /** Provides imperative controls for the animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;

  /**
   * Callback that is called when the whole motion finishes.
   *
   * A motion definition can contain multiple animations and therefore multiple "finish" events. The callback is
   * triggered once all animations have finished with "null" instead of an event object to avoid ambiguity.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionFinish?: (ev: null, data: { direction: PresenceDirection }) => void;

  /**
   * Callback that is called when the whole motion is cancelled. When a motion is cancelled it does not
   * emit a finish event but a specific cancel event
   *
   * A motion definition can contain multiple animations and therefore multiple "finish" events. The callback is
   * triggered once all animations have finished with "null" instead of an event object to avoid ambiguity.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionCancel?: (ev: null, data: { direction: PresenceDirection }) => void;

  /**
   * Callback that is called when the whole motion starts.
   *
   * A motion definition can contain multiple animations and therefore multiple "start" events. The callback is
   * triggered when the first animation is started. There is no official "start" event with the Web Animations API.
   * so the callback is triggered with "null".
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionStart?: (ev: null, data: { direction: PresenceDirection }) => void;

  /** Defines whether a component is visible; triggers the "enter" or "exit" motions. */
  visible?: boolean;

  /**
   * By default, the child component remains mounted after it reaches the "finished" state. Set "unmountOnExit" if
   * you prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;
};

export type PresenceComponent<MotionParams extends Record<string, MotionParam> = {}> = React.FC<
  PresenceComponentProps & MotionParams
> & {
  (props: PresenceComponentProps & MotionParams): JSXElement | null;
  [PRESENCE_MOTION_DEFINITION]: PresenceMotionFn<MotionParams>;
  In: React.FC<MotionComponentProps & MotionParams>;
  Out: React.FC<MotionComponentProps & MotionParams>;
};

const INTERRUPTABLE_MOTION_SYMBOL = Symbol.for('interruptablePresence');

export function createPresenceComponent<MotionParams extends Record<string, MotionParam> = {}>(
  value: PresenceMotion | PresenceMotionFn<MotionParams>,
): PresenceComponent<MotionParams> {
  return Object.assign(
    (props: PresenceComponentProps & MotionParams) => {
      'use no memo';

      const itemContext = React.useContext(PresenceGroupChildContext);
      const merged = { ...itemContext, ...props };
      const skipMotions = useMotionBehaviourContext() === 'skip';

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
      const [child, childRef] = useChildElement(children, mounted);

      const handleRef = useMotionImperativeRef(imperativeRef);
      const optionsRef = React.useRef<{ appear?: boolean; params: MotionParams; skipMotions: boolean }>({
        appear,
        params,
        skipMotions,
      });

      const animateAtoms = useAnimateAtoms();
      const isFirstMount = useFirstMount();
      const isReducedMotion = useIsReducedMotion();

      const handleMotionStart = useEventCallback((direction: PresenceDirection) => {
        onMotionStart?.(null, { direction });
      });
      const handleMotionFinish = useEventCallback((direction: PresenceDirection) => {
        onMotionFinish?.(null, { direction });

        if (direction === 'exit' && unmountOnExit) {
          setMounted(false);
          onExit?.();
        }
      });

      const handleMotionCancel = useEventCallback((direction: PresenceDirection) => {
        onMotionCancel?.(null, { direction });
      });

      useIsomorphicLayoutEffect(() => {
        // Heads up!
        // We store the params in a ref to avoid re-rendering the component when the params change.
        optionsRef.current = { appear, params, skipMotions };
      });

      useIsomorphicLayoutEffect(
        () => {
          const element = childRef.current;

          if (!element) {
            return;
          }

          let handle: AnimationHandle | undefined;

          function cleanup() {
            if (!handle) {
              return;
            }

            // Heads up!
            //
            // If the animation is interruptible & is running, we don't want to cancel it as it will be reversed in
            // the next effect.
            if (IS_EXPERIMENTAL_INTERRUPTIBLE_MOTION && handle.isRunning()) {
              return;
            }

            handle.cancel();
            handleRef.current = undefined;
          }

          const presenceMotion =
            typeof value === 'function' ? value({ element, ...optionsRef.current.params }) : (value as PresenceMotion);
          const IS_EXPERIMENTAL_INTERRUPTIBLE_MOTION = (
            presenceMotion as PresenceMotion & { [INTERRUPTABLE_MOTION_SYMBOL]?: boolean }
          )[INTERRUPTABLE_MOTION_SYMBOL];

          if (IS_EXPERIMENTAL_INTERRUPTIBLE_MOTION) {
            handle = handleRef.current;

            if (handle && handle.isRunning()) {
              handle.reverse();

              return cleanup;
            }
          }

          const atoms = visible ? presenceMotion.enter : presenceMotion.exit;
          const direction: PresenceDirection = visible ? 'enter' : 'exit';

          // Heads up!
          // Initial styles are applied when the component is mounted for the first time and "appear" is set to "false" (otherwise animations are triggered)
          const applyInitialStyles = !optionsRef.current.appear && isFirstMount;
          const skipAnimationByConfig = optionsRef.current.skipMotions;

          if (!applyInitialStyles) {
            handleMotionStart(direction);
          }

          handle = animateAtoms(element, atoms, { isReducedMotion: isReducedMotion() });

          if (applyInitialStyles) {
            // Heads up!
            // .finish() is used in this case to skip animation and apply animation styles immediately
            handle.finish();

            return cleanup;
          }

          handleRef.current = handle;
          handle.setMotionEndCallbacks(
            () => handleMotionFinish(direction),
            () => handleMotionCancel(direction),
          );

          if (skipAnimationByConfig) {
            handle.finish();
          }

          return cleanup;
        },
        // Excluding `isFirstMount` from deps to prevent re-triggering the animation on subsequent renders
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
          animateAtoms,
          childRef,
          handleRef,
          isReducedMotion,
          handleMotionFinish,
          handleMotionStart,
          handleMotionCancel,
          visible,
        ],
      );

      if (mounted) {
        return child;
      }

      return null;
    },
    {
      // Heads up!
      // Always normalize it to a function to simplify types
      [PRESENCE_MOTION_DEFINITION]: typeof value === 'function' ? value : () => value,
    },
    {
      // Wrap `enter` in its own motion component as a static method, e.g. <Fade.In>
      In: createMotionComponent(
        // If we have a motion function, wrap it to forward the runtime params and pick `enter`.
        // Otherwise, pass the `enter` motion object directly.
        typeof value === 'function' ? (...args: Parameters<typeof value>) => value(...args).enter : value.enter,
      ),

      // Wrap `exit` in its own motion component as a static method, e.g. <Fade.Out>
      Out: createMotionComponent(
        // If we have a motion function, wrap it to forward the runtime params and pick `exit`.
        // Otherwise, pass the `exit` motion object directly.
        typeof value === 'function' ? (...args: Parameters<typeof value>) => value(...args).exit : value.exit,
      ),
    },
  );
}
