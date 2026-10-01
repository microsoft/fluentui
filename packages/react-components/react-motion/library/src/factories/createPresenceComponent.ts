'use client';

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
  BasePresenceParams,
  MotionImperativeRef,
  PresenceMotionFn,
  PresenceDirection,
  AnimationHandle,
} from '../types';
import { useMotionBehaviourContext } from '../contexts/MotionBehaviourContext';
import type { MotionComponent } from './createMotionComponent';
import { createMotionComponent } from './createMotionComponent';

/**
 * A private symbol to store the motion definition on the component for variants.
 *
 * @internal
 */
export const PRESENCE_MOTION_DEFINITION = Symbol('PRESENCE_MOTION_DEFINITION');

/** Retains pose mappings on the component so variants can reuse directional normalization. */
export const PRESENCE_COMPONENT_OPTIONS = Symbol('PRESENCE_COMPONENT_OPTIONS');

/**
 * Selects props whose defined value types are assignable in both directions with the present-pose prop.
 * Each prop maps to its key or never; the final indexed access collects the compatible keys into a union.
 *
 * @example
 * ```ts
 * type Params = {
 *   fromScale?: number;
 *   inScale?: number;
 *   toScale?: number;
 *   fromX?: string;
 *   limitedScale?: 0 | 1;
 * };
 * type ScaleKeys = CompatiblePoseKeys<Params, 'inScale'>;
 * // 'fromScale' | 'inScale' | 'toScale'
 * // fromX has a different value type; limitedScale cannot accept every number.
 * ```
 */
type CompatiblePoseKeys<MotionParams, Present extends keyof MotionParams> = {
  // -? prevents optional props from adding undefined to the resulting key union.
  // NonNullable ignores absent values; tuple wrappers compare whole types, including union-valued props.
  [Key in keyof MotionParams]-?: [NonNullable<MotionParams[Key]>] extends [NonNullable<MotionParams[Present]>]
    ? // Check the reverse assignment too: a narrower type such as 0 | 1 must not match number.
      [NonNullable<MotionParams[Present]>] extends [NonNullable<MotionParams[Key]>]
      ? Key
      : never
    : never;
}[keyof MotionParams];

/**
 * Maps temporal endpoint props to the present pose used by directional components.
 *
 * @example
 * ```ts
 * type Params = {
 *   fromX?: string;
 *   inX?: string;
 *   toX?: string;
 *   fromY?: string;
 *   inY?: string;
 *   toY?: string;
 * };
 * const options: PresenceComponentOptions<Params, 'inX' | 'inY'> = {
 *   poseProps: [
 *     { from: 'fromX', in: 'inX', to: 'toX', neutral: '0px' },
 *     { from: 'fromY', in: 'inY', to: 'toY', neutral: '0px' },
 *   ],
 * };
 * // If fromX is authored without fromY, axis completion supplies fromY = '0px'.
 * ```
 */
export type PresenceComponentOptions<
  MotionParams extends Record<string, MotionParam>,
  PresentKeys extends keyof MotionParams = never,
> = {
  /** One mapping per primitive pose value, such as scale or a translation axis. */
  poseProps: readonly ({ in: PresentKeys } & {
    [Present in keyof MotionParams]-?: {
      from: CompatiblePoseKeys<MotionParams, Present>;
      in: Present;
      to: CompatiblePoseKeys<MotionParams, Present>;
      /** Value for omitted axes when any axis of this pose is authored. */
      neutral?: MotionParams[Present];
    };
  }[keyof MotionParams])[];
};

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

export type PresenceComponent<
  MotionParams extends Record<string, MotionParam> = {},
  PresentKeys extends keyof MotionParams = never,
> = React.FC<PresenceComponentProps & MotionParams> & {
  (props: PresenceComponentProps & MotionParams): JSXElement | null;
  [PRESENCE_MOTION_DEFINITION]: PresenceMotionFn<MotionParams>;
  [PRESENCE_COMPONENT_OPTIONS]?: {
    poseProps: readonly { from: PropertyKey; in: PropertyKey; to: PropertyKey; neutral?: MotionParam }[];
  };
  // Present-pose props belong to the visibility-controlled root, not the one-way components.
  In: MotionComponent<Omit<MotionParams, PresentKeys>>;
  Out: MotionComponent<Omit<MotionParams, PresentKeys>>;
};

const INTERRUPTABLE_MOTION_SYMBOL = Symbol.for('interruptablePresence');

const exitTimingProps = {
  duration: 'exitDuration',
  easing: 'exitEasing',
  delay: 'exitDelay',
} satisfies {
  [Key in keyof BasePresenceParams as Key extends `exit${string}` ? never : Key]-?: Extract<
    keyof BasePresenceParams,
    `exit${Capitalize<Key>}`
  >;
};

export function createPresenceComponent<
  MotionParams extends Record<string, MotionParam> = {},
  PresentKeys extends keyof MotionParams = never,
>(
  value: PresenceMotion | PresenceMotionFn<MotionParams>,
  options?: PresenceComponentOptions<NoInfer<MotionParams>, PresentKeys>,
): PresenceComponent<MotionParams, PresentKeys> {
  // An authored endpoint uses neutral values for omitted axes. For example, fromX alone implies fromY = '0px'.
  // Leave wholly omitted endpoints untouched so the motion function or variant can supply its defaults.
  const completePoses = (params: MotionParams): MotionParams => {
    // Normalize a copy: completing poses and remapping directional props must not mutate the caller's parameters.
    const normalized = { ...params };
    if (!options) {
      return normalized;
    }
    for (const endpoint of ['from', 'in', 'to'] as const) {
      if (options.poseProps.some(pose => normalized[pose[endpoint]] !== undefined)) {
        for (const pose of options.poseProps) {
          const key: keyof MotionParams = pose[endpoint];
          if (normalized[key] === undefined && pose.neutral !== undefined) {
            normalized[key] = pose.neutral;
          }
        }
      }
    }
    return normalized;
  };
  // Apply the same axis completion to presence and directional playback, while retaining the animated element.
  const presenceFn: PresenceMotionFn<MotionParams> =
    typeof value === 'function'
      ? options
        ? params => value({ ...completePoses(params), element: params.element })
        : value
      : () => value;
  const directionalMotion = (direction: PresenceDirection) =>
    typeof value === 'function'
      ? (params: { element: HTMLElement } & Omit<MotionParams, PresentKeys>) => {
          const normalized = completePoses(params as { element: HTMLElement } & MotionParams);
          // Presence definitions enter from -> in and exit in -> to. One-way components always play from -> to,
          // so .In maps its destination to in, while .Out maps its source to in before selecting the definition.
          for (const pose of options?.poseProps ?? []) {
            const endpoint: keyof MotionParams = direction === 'enter' ? pose.to : pose.from;
            const present: keyof MotionParams = pose.in;
            if (normalized[endpoint] !== undefined) {
              normalized[present] = normalized[endpoint];
              // Remove the consumed prop so it cannot override defaults for the opposite presence endpoint.
              delete normalized[endpoint];
            }
          }
          // Let .Out use ordinary timing props. Translate explicit values before variant defaults are merged,
          // preserving an explicit exit-prefixed value when both forms are supplied.
          if (direction === 'exit') {
            for (const [ordinary, exit] of Object.entries(exitTimingProps)) {
              const source = ordinary as keyof MotionParams;
              const destination = exit as keyof MotionParams;
              if (normalized[destination] === undefined && normalized[source] !== undefined) {
                normalized[destination] = normalized[source];
              }
            }
          }
          return presenceFn({ ...normalized, element: params.element })[direction];
        }
      : value[direction];

  return Object.assign(
    (props: PresenceComponentProps & MotionParams) => {
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
        // Read the latest params when visibility changes without restarting the animation on every parameter update.
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

          const presenceMotion = presenceFn({ element, ...optionsRef.current.params });
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

      React.useEffect(() => {
        // Heads up!
        //
        // Dispose the handle when unmounting the component to clean up retained references. Doing it in a separate
        // effect to ensure that the component is unmounted.

        if (unmountOnExit && !mounted) {
          handleRef.current?.dispose();
        }
      }, [handleRef, unmountOnExit, mounted]);

      if (mounted) {
        return child;
      }

      return null;
    },
    {
      // Heads up!
      // Always normalize it to a function to simplify types
      [PRESENCE_MOTION_DEFINITION]: presenceFn,
      [PRESENCE_COMPONENT_OPTIONS]: options,
    },
    {
      // Wrap `enter` in its own motion component as a static method, e.g. <Fade.In>
      In: createMotionComponent<Omit<MotionParams, PresentKeys>>(
        // If we have a motion function, wrap it to forward the runtime params and pick `enter`.
        // Otherwise, pass the `enter` motion object directly.
        directionalMotion('enter'),
      ),

      // Wrap `exit` in its own motion component as a static method, e.g. <Fade.Out>
      Out: createMotionComponent<Omit<MotionParams, PresentKeys>>(
        // If we have a motion function, wrap it to forward the runtime params and pick `exit`.
        // Otherwise, pass the `exit` motion object directly.
        directionalMotion('exit'),
      ),
    },
  );
}
