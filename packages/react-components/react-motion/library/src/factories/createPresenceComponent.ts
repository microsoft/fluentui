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

/**
 * Retains pose mappings on the component so variants can reuse directional normalization.
 *
 * @internal
 */
export const PRESENCE_COMPONENT_OPTIONS = Symbol('PRESENCE_COMPONENT_OPTIONS');

/**
 * Selects optional keys of `MotionParams` (props that callers may omit).
 * Directional `.In` and `.Out` components omit opposite and `in` pose props at runtime,
 * so only optional props can safely be mapped in `poseProps` or stripped from directional props.
 */
type OptionalMotionParamKeys<MotionParams> = {
  [Key in keyof MotionParams]-?: {} extends Pick<MotionParams, Key> ? Key : never;
}[keyof MotionParams];

/**
 * Selects optional props (other than the anchor prop itself) whose defined value types are assignable
 * in both directions with the anchor prop.
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
 * type ScaleKeys = CompatiblePoseKeys<Params, 'fromScale'>;
 * // 'inScale' | 'toScale'
 * // fromScale is excluded; fromX has a different value type; limitedScale cannot accept every number.
 * ```
 */
type CompatiblePoseKeys<MotionParams, Anchor extends OptionalMotionParamKeys<MotionParams>> = Exclude<
  {
    // NonNullable ignores absent values; tuple wrappers compare whole types, including union-valued props.
    [Key in OptionalMotionParamKeys<MotionParams>]: [NonNullable<MotionParams[Key]>] extends [
      NonNullable<MotionParams[Anchor]>,
    ]
      ? // Check the reverse assignment too: a narrower type such as 0 | 1 must not match number.
        [NonNullable<MotionParams[Anchor]>] extends [NonNullable<MotionParams[Key]>]
        ? Key
        : never
      : never;
  }[OptionalMotionParamKeys<MotionParams>],
  Anchor
>;

type PosePropMapping<MotionParams extends Record<string, MotionParam>, AllowNeutral extends boolean> = {
  [From in OptionalMotionParamKeys<MotionParams>]: {
    [To in CompatiblePoseKeys<MotionParams, From>]: {
      from: From;
      in?: Exclude<CompatiblePoseKeys<MotionParams, From>, To>;
      to: To;
    } & (AllowNeutral extends true
      ? {
          /** Value for omitted sibling axes when any axis in this pose group is authored. */
          neutral?: MotionParams[From];
        }
      : { neutral?: never });
  }[CompatiblePoseKeys<MotionParams, From>];
}[OptionalMotionParamKeys<MotionParams>];

type StoredPoseProp = { from: PropertyKey; in?: PropertyKey; to: PropertyKey; neutral?: MotionParam };

/**
 * Maps temporal endpoint props for presence and Prism-strict directional components.
 *
 * Use a single mapping object for a scalar pose (such as opacity, scale, or DOM-measured size without an `in` prop),
 * or a nested array of mappings for coupled axes of one multi-axis pose (such as X and Y translation) where `neutral`
 * fills omitted sibling axes within that group only.
 *
 * When `poseProps` is provided, `.In` accepts only `from*` pose props (omitting `in*`, `to*`, and exit timing),
 * and `.Out` accepts only `to*` pose props (omitting `in*` and `from*`).
 *
 * @example
 * ```ts
 * type Params = {
 *   fromScale?: number;
 *   inScale?: number;
 *   toScale?: number;
 *   fromX?: string;
 *   inX?: string;
 *   toX?: string;
 *   fromY?: string;
 *   inY?: string;
 *   toY?: string;
 * };
 * const options: PresenceComponentOptions<
 *   Params,
 *   'fromScale' | 'fromX' | 'fromY',
 *   'toScale' | 'toX' | 'toY',
 *   'inScale' | 'inX' | 'inY'
 * > = {
 *   poseProps: [
 *     { from: 'fromScale', in: 'inScale', to: 'toScale' },
 *     [
 *       { from: 'fromX', in: 'inX', to: 'toX', neutral: '0px' },
 *       { from: 'fromY', in: 'inY', to: 'toY', neutral: '0px' },
 *     ],
 *   ],
 * };
 * // Authoring fromX without fromY fills fromY = '0px' without affecting fromScale.
 * ```
 */
export type PresenceComponentOptions<
  MotionParams extends Record<string, MotionParam>,
  FromKeys extends keyof MotionParams = never,
  ToKeys extends keyof MotionParams = never,
  InKeys extends keyof MotionParams = never,
> = {
  /** One entry per independent pose: a scalar mapping or a coupled multi-axis group. */
  poseProps: readonly (
    | ({ from: FromKeys; in?: InKeys; to: ToKeys } & PosePropMapping<MotionParams, false>)
    | readonly ({ from: FromKeys; in?: InKeys; to: ToKeys } & PosePropMapping<MotionParams, true>)[]
  )[];
};

type ExitTimingKey = Extract<keyof BasePresenceParams, `exit${string}`>;

type PresenceInOmit<
  MotionParams extends Record<string, MotionParam>,
  FromKeys extends keyof MotionParams,
  ToKeys extends keyof MotionParams,
  InKeys extends keyof MotionParams,
> = [FromKeys | ToKeys | InKeys] extends [never]
  ? never
  : Extract<InKeys | ToKeys | ExitTimingKey, OptionalMotionParamKeys<MotionParams>>;

type PresenceOutOmit<
  MotionParams extends Record<string, MotionParam>,
  FromKeys extends keyof MotionParams,
  InKeys extends keyof MotionParams,
> = Extract<InKeys | FromKeys, OptionalMotionParamKeys<MotionParams>>;

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

type DirectionalMotionParams<MotionParams extends Record<string, MotionParam>, OmitKeys extends keyof MotionParams> = [
  OmitKeys,
] extends [never]
  ? MotionParams
  : Omit<MotionParams, OmitKeys>;

export type PresenceComponent<
  MotionParams extends Record<string, MotionParam> = {},
  InOmit extends keyof MotionParams = never,
  OutOmit extends keyof MotionParams = never,
> = React.FC<PresenceComponentProps & MotionParams> & {
  (props: PresenceComponentProps & MotionParams): JSXElement | null;
  [PRESENCE_MOTION_DEFINITION]: PresenceMotionFn<MotionParams>;
  [PRESENCE_COMPONENT_OPTIONS]?: {
    poseProps: readonly (StoredPoseProp | readonly StoredPoseProp[])[];
  };
  In: MotionComponent<DirectionalMotionParams<MotionParams, InOmit>>;
  Out: MotionComponent<DirectionalMotionParams<MotionParams, OutOmit>>;
};

const INTERRUPTABLE_MOTION_SYMBOL = Symbol.for('interruptablePresence');

type ExitTimingSuffix = {
  [Key in keyof BasePresenceParams]-?: Key extends `exit${infer Suffix}`
    ? Lowercase<Suffix> extends keyof BasePresenceParams
      ? Suffix
      : never
    : never;
}[keyof BasePresenceParams];

/**
 * Creates a presence component with directional `.In` and `.Out` motion components.
 *
 * When passing `options.poseProps`, annotate `MotionParams` on `value` (for example with `PresenceMotionFn<Params>`
 * or an inline parameter type) instead of supplying a single explicit `<Params>` type argument, so TypeScript can
 * infer `FromKeys`, `ToKeys`, and `InKeys` from `options.poseProps`. Mapped pose props must be optional on
 * `MotionParams` because `.In` and `.Out` omit opposite and `in` endpoints at runtime.
 */
export function createPresenceComponent<
  MotionParams extends Record<string, MotionParam> = {},
  FromKeys extends keyof MotionParams = never,
  ToKeys extends keyof MotionParams = never,
  InKeys extends keyof MotionParams = never,
>(
  value: PresenceMotion | PresenceMotionFn<MotionParams>,
  options?: PresenceComponentOptions<NoInfer<MotionParams>, FromKeys, ToKeys, InKeys>,
): PresenceComponent<
  MotionParams,
  PresenceInOmit<MotionParams, FromKeys, ToKeys, InKeys>,
  PresenceOutOmit<MotionParams, FromKeys, InKeys>
> {
  type PoseEntry = {
    from: keyof MotionParams;
    in?: keyof MotionParams;
    to: keyof MotionParams;
    neutral?: MotionParams[keyof MotionParams];
  };
  const coupledGroups = options?.poseProps.filter(Array.isArray) as readonly (readonly PoseEntry[])[] | undefined;
  // Within each multi-axis pose group, an authored endpoint uses neutral values for omitted sibling axes
  // (e.g. fromX alone implies fromY = '0px') without affecting other groups or wholly omitted endpoints.
  const presenceFn: PresenceMotionFn<MotionParams> =
    typeof value === 'function'
      ? coupledGroups?.length
        ? params => {
            const next: Record<PropertyKey, unknown> = { ...params };
            for (const group of coupledGroups) {
              for (const ep of ['from', 'in', 'to'] as const) {
                if (group.some(p => p[ep] !== undefined && next[p[ep]!] !== undefined)) {
                  for (const p of group) {
                    const k = p[ep];
                    if (k !== undefined && next[k] === undefined && p.neutral !== undefined) {
                      next[k] = p.neutral;
                    }
                  }
                }
              }
            }
            return value(next as { element: HTMLElement } & MotionParams);
          }
        : value
      : () => value;

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
      In: createMotionComponent<
        DirectionalMotionParams<MotionParams, PresenceInOmit<MotionParams, FromKeys, ToKeys, InKeys>>
      >(
        // If we have a motion function, wrap it to forward the runtime params and pick `enter`.
        // Otherwise, pass the `enter` motion object directly.
        typeof value === 'function'
          ? params => presenceFn(params as { element: HTMLElement } & MotionParams).enter
          : value.enter,
      ),

      // Wrap `exit` in its own motion component as a static method, e.g. <Fade.Out>
      Out: createMotionComponent<
        DirectionalMotionParams<MotionParams, PresenceOutOmit<MotionParams, FromKeys, InKeys>>
      >(
        // If we have a motion function, forward explicit ordinary timing props to `exit*` before variant defaults
        // are merged (preserving any explicit `exit*` value) and pick `exit`.
        typeof value === 'function'
          ? params => {
              const next = { ...params } as Record<string, MotionParam>;
              for (const key of ['Duration', 'Easing', 'Delay'] as readonly ExitTimingSuffix[]) {
                const src = key.toLowerCase();
                const dst = `exit${key}`;
                if (next[dst] === undefined && next[src] !== undefined) {
                  next[dst] = next[src];
                }
              }
              return presenceFn(next as { element: HTMLElement } & MotionParams).exit;
            }
          : value.exit,
      ),
    },
  );
}
