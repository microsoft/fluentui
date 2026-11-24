import {
  createMotionComponent,
  createPresenceComponent,
  type BasePresenceParams,
  type MotionComponent,
  type MotionParam,
  type PresenceComponent,
  type PresenceComponentOptions,
} from '@fluentui/react-motion';
import { resolveChoreography } from './choreography';
import type {
  ChoreographyMotion,
  ChoreographyMotionFn,
  CreateChoreographyOptions,
  CreateChoreographyPresenceOptions,
  PresenceChoreographyMotion,
  PresenceChoreographyMotionFn,
} from './types';

type ExitTimingKey = Extract<keyof BasePresenceParams, `exit${string}`>;

type ChoreographyPresenceInOmit<
  MotionParams extends Record<string, MotionParam>,
  FromKeys extends keyof MotionParams,
  ToKeys extends keyof MotionParams,
  InKeys extends keyof MotionParams,
> = [FromKeys | ToKeys | InKeys] extends [never] ? never : InKeys | ToKeys | Extract<keyof MotionParams, ExitTimingKey>;

type ChoreographyPresenceOutOmit<
  MotionParams extends Record<string, MotionParam>,
  FromKeys extends keyof MotionParams,
  InKeys extends keyof MotionParams,
> = InKeys | FromKeys;

/**
 * Creates a one-way motion component from a choreography POJO (`AtomMotion`, `MotionLayer`, `StaggerMotion`,
 * or an array combining them) or a dynamic function returning one.
 *
 * All targeted elements are animated under a single `AnimationHandle`, providing unified `onMotionStart`,
 * `onMotionFinish`, `onMotionCancel`, `imperativeRef`, and `replayKey` behavior without nested motion components.
 */
export function createChoreographyComponent<MotionParams extends Record<string, MotionParam> = {}>(
  value: ChoreographyMotion | ChoreographyMotionFn<MotionParams>,
  options?: CreateChoreographyOptions,
): MotionComponent<MotionParams> {
  return createMotionComponent<MotionParams>(params => {
    const choreography = typeof value === 'function' ? value(params) : value;
    return resolveChoreography(choreography, {
      rootElement: params.element,
      resolveTarget: options?.resolveTarget,
    });
  });
}

/**
 * Creates a bidirectional presence motion component (with `.In` and `.Out` directional variants) from a
 * `PresenceChoreographyMotion` POJO (`{ enter, exit }`) or a dynamic function returning one.
 *
 * Each edge can mix root-element atoms, targeted `MotionLayer`s, and `StaggerMotion` groups in a single definition.
 */
export function createChoreographyPresenceComponent<
  MotionParams extends Record<string, MotionParam> = {},
  FromKeys extends keyof MotionParams = never,
  ToKeys extends keyof MotionParams = never,
  InKeys extends keyof MotionParams = never,
>(
  value: PresenceChoreographyMotion | PresenceChoreographyMotionFn<MotionParams>,
  options?: CreateChoreographyPresenceOptions<MotionParams, FromKeys, ToKeys, InKeys>,
): PresenceComponent<
  MotionParams,
  ChoreographyPresenceInOmit<MotionParams, FromKeys, ToKeys, InKeys>,
  ChoreographyPresenceOutOmit<MotionParams, FromKeys, InKeys>
> {
  const presenceOptions =
    options?.poseProps !== undefined
      ? ({ poseProps: options.poseProps } as PresenceComponentOptions<NoInfer<MotionParams>, FromKeys, ToKeys, InKeys>)
      : undefined;

  return createPresenceComponent<MotionParams, FromKeys, ToKeys, InKeys>(params => {
    const choreography = typeof value === 'function' ? value(params) : value;
    const resolveOptions = {
      rootElement: params.element,
      resolveTarget: options?.resolveTarget,
    };

    return {
      enter: resolveChoreography(choreography.enter, resolveOptions),
      exit: resolveChoreography(choreography.exit, resolveOptions),
    };
  }, presenceOptions);
}
