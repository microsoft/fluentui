import {
  createMotionComponent,
  createPresenceComponent,
  type MotionComponent,
  type MotionParam,
  type PresenceComponent,
  type PresenceComponentOptions,
} from '@fluentui/react-motion';
import { resolveChoreography } from './stagger';
import type {
  ChoreographyMotion,
  ChoreographyMotionFn,
  CreateChoreographyOptions,
  CreateChoreographyPresenceOptions,
  PresenceChoreographyMotion,
  PresenceChoreographyMotionFn,
} from './types';

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
  PresentKeys extends keyof MotionParams = never,
>(
  value: PresenceChoreographyMotion | PresenceChoreographyMotionFn<MotionParams>,
  options?: CreateChoreographyPresenceOptions<MotionParams, PresentKeys>,
): PresenceComponent<MotionParams, PresentKeys> {
  const presenceOptions =
    options?.poseProps !== undefined
      ? ({ poseProps: options.poseProps } as PresenceComponentOptions<NoInfer<MotionParams>, PresentKeys>)
      : undefined;

  return createPresenceComponent<MotionParams, PresentKeys>(params => {
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
