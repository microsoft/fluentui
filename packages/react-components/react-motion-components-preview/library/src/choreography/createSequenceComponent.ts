import type { MotionComponent, MotionParam } from '@fluentui/react-motion';
import { sequence } from './choreography';
import { createChoreographyComponent } from './createChoreographyComponent';
import type { ChoreographyMotion, CreateSequenceOptions, SequenceMotionFn, SequenceParams } from './types';

/**
 * Creates a one-way sequenced motion component that plays ordered choreography steps serially
 * on a persistent wrapped child element (or across targeted descendants inside it).
 *
 * Accepts either a static array of `ChoreographyMotion` steps (atoms, parallel arrays, `hold()`,
 * `layer()`, `stagger()`, or nested `sequence()`) or a dynamic function returning steps.
 */
export function createSequenceComponent<MotionParams extends Record<string, MotionParam> = {}>(
  steps: readonly ChoreographyMotion[] | SequenceMotionFn<MotionParams>,
  options?: CreateSequenceOptions,
): MotionComponent<SequenceParams & MotionParams> {
  const defaultGap = options?.defaultGap;

  return createChoreographyComponent<SequenceParams & MotionParams>(
    ({ element, gap = defaultGap, ...rest }) => {
      const resolvedSteps =
        typeof steps === 'function' ? steps({ ...(rest as unknown as MotionParams), element }) : steps;
      return sequence(resolvedSteps, gap !== undefined ? { gap } : undefined);
    },
    { resolveTarget: options?.resolveTarget },
  );
}
