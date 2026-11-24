import {
  motionTokens,
  type AtomMotion,
  type MotionComponent,
  type MotionParam,
  type PresenceComponent,
  type PresenceMotion,
} from '@fluentui/react-motion';
import { createChoreographyComponent, createChoreographyPresenceComponent } from './createChoreographyComponent';
import { layer, resolveTargetElements, stagger } from './stagger';
import type {
  CreateStaggerOptions,
  CreateStaggerPresenceOptions,
  MotionLayer,
  StaggerItemMotionFn,
  StaggerItemPresenceMotionFn,
  StaggerParams,
  StaggerPresenceParams,
} from './types';

const DEFAULT_STAGGER_INTERVAL = motionTokens.durationUltraFast;
const DEFAULT_STAGGER_TARGET = ':scope > *';

/**
 * Creates a one-way staggered motion component that applies one item motion across all matched targets
 * inside the wrapped container element.
 *
 * Accepts either a static `AtomMotion | AtomMotion[]` or a per-item function receiving `{ element, index, count, ...params }`.
 */
export function createStaggerComponent<MotionParams extends Record<string, MotionParam> = {}>(
  itemMotion: AtomMotion | readonly AtomMotion[] | StaggerItemMotionFn<MotionParams>,
  options?: CreateStaggerOptions,
): MotionComponent<StaggerParams & MotionParams> {
  const defaultStartInterval = options?.defaultStartInterval ?? DEFAULT_STAGGER_INTERVAL;
  const defaultOrder = options?.defaultOrder ?? 'forward';
  const defaultTarget = options?.defaultTarget ?? DEFAULT_STAGGER_TARGET;

  return createChoreographyComponent<StaggerParams & MotionParams>(
    ({ element, startInterval = defaultStartInterval, order = defaultOrder, target = defaultTarget, ...rest }) => {
      if (typeof itemMotion === 'function') {
        const targets = resolveTargetElements(target, {
          rootElement: element,
          resolveTarget: options?.resolveTarget,
        });
        const itemParams = rest as unknown as MotionParams;
        const members = targets.map((targetElement, index) =>
          layer(
            targetElement,
            itemMotion({
              ...itemParams,
              element: targetElement as HTMLElement,
              index,
              count: targets.length,
            }),
          ),
        );
        return stagger(members, { startInterval, order });
      }

      return stagger([layer(target, itemMotion)], { startInterval, order });
    },
    { resolveTarget: options?.resolveTarget },
  );
}

/**
 * Creates a bidirectional staggered presence component (with `.In` and `.Out` directional variants)
 * that applies one presence motion across all matched targets inside the wrapped container element.
 *
 * Accepts either a static `PresenceMotion` or a per-item function receiving `{ element, index, count, ...params }`.
 */
export function createStaggerPresenceComponent<MotionParams extends Record<string, MotionParam> = {}>(
  itemMotion: PresenceMotion | StaggerItemPresenceMotionFn<MotionParams>,
  options?: CreateStaggerPresenceOptions,
): PresenceComponent<StaggerPresenceParams & MotionParams> {
  const defaultStartInterval = options?.defaultStartInterval ?? DEFAULT_STAGGER_INTERVAL;
  const defaultOrder = options?.defaultOrder ?? 'forward';
  const defaultTarget = options?.defaultTarget ?? DEFAULT_STAGGER_TARGET;

  return createChoreographyPresenceComponent<StaggerPresenceParams & MotionParams>(
    ({ element, startInterval, exitStartInterval, order, exitOrder, target = defaultTarget, ...rest }) => {
      const resolvedStartInterval = startInterval ?? defaultStartInterval;
      const resolvedExitStartInterval =
        exitStartInterval ??
        (startInterval !== undefined ? startInterval : options?.defaultExitStartInterval ?? resolvedStartInterval);
      const resolvedOrder = order ?? defaultOrder;
      const resolvedExitOrder = exitOrder ?? (order !== undefined ? order : options?.defaultExitOrder ?? resolvedOrder);

      if (typeof itemMotion === 'function') {
        const targets = resolveTargetElements(target, {
          rootElement: element,
          resolveTarget: options?.resolveTarget,
        });
        const itemParams = rest as unknown as MotionParams;
        const enterMembers: MotionLayer[] = [];
        const exitMembers: MotionLayer[] = [];

        targets.forEach((targetElement, index) => {
          const itemPresence = itemMotion({
            ...itemParams,
            element: targetElement as HTMLElement,
            index,
            count: targets.length,
          });
          enterMembers.push(layer(targetElement, itemPresence.enter));
          exitMembers.push(layer(targetElement, itemPresence.exit));
        });

        return {
          enter: stagger(enterMembers, { startInterval: resolvedStartInterval, order: resolvedOrder }),
          exit: stagger(exitMembers, { startInterval: resolvedExitStartInterval, order: resolvedExitOrder }),
        };
      }

      return {
        enter: stagger([layer(target, itemMotion.enter)], {
          startInterval: resolvedStartInterval,
          order: resolvedOrder,
        }),
        exit: stagger([layer(target, itemMotion.exit)], {
          startInterval: resolvedExitStartInterval,
          order: resolvedExitOrder,
        }),
      };
    },
    { resolveTarget: options?.resolveTarget },
  );
}
