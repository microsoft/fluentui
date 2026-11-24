import type { AtomMotion } from '@fluentui/react-motion';
import type {
  ChoreographyItem,
  ChoreographyMotion,
  MotionLayer,
  MotionLayerOptions,
  MotionTarget,
  ResolveChoreographyOptions,
  StaggerMotion,
  StaggerOptions,
} from './types';

const DEFAULT_REDUCED_MOTION_DURATION = 1;

function assertValidStartInterval(startInterval: number): void {
  if (!Number.isFinite(startInterval) || startInterval < 0) {
    throw new RangeError('Stagger startInterval must be finite and nonnegative.');
  }
}

function assertValidDelay(delay: number): void {
  if (!Number.isFinite(delay)) {
    throw new RangeError('Layer delay must be a finite number.');
  }
}

function numericAtomDelay(delay: KeyframeEffectOptions['delay']): number {
  if (delay === undefined) {
    return 0;
  }
  if (typeof delay !== 'number' || !Number.isFinite(delay)) {
    throw new TypeError('Choreography requires finite numeric atom delays.');
  }
  return delay;
}

function cloneAtom(atom: AtomMotion): AtomMotion {
  return {
    ...atom,
    keyframes: atom.keyframes.map(frame => ({ ...frame })),
    ...(atom.reducedMotion !== undefined
      ? {
          reducedMotion: {
            ...atom.reducedMotion,
            ...(atom.reducedMotion.keyframes !== undefined
              ? { keyframes: atom.reducedMotion.keyframes.map(frame => ({ ...frame })) }
              : {}),
          },
        }
      : {}),
  };
}

function isMotionLayer(item: ChoreographyItem): item is MotionLayer {
  return 'kind' in item && item.kind === 'layer';
}

function isStaggerMotion(item: ChoreographyItem): item is StaggerMotion {
  return 'kind' in item && item.kind === 'stagger';
}

function isElement(value: unknown): value is Element {
  return typeof value === 'object' && value !== null && 'querySelectorAll' in value;
}

function defaultResolveTarget(target: string, rootElement?: Element): Element[] {
  if (!rootElement) {
    throw new Error(`Cannot resolve string target "${target}" without a rootElement or custom resolveTarget.`);
  }

  // Fast path for direct children that works consistently across DOM and JSDOM implementations.
  if (target === ':scope > *') {
    return Array.from(rootElement.children);
  }

  return Array.from(rootElement.querySelectorAll(target));
}

/**
 * Resolves a single `MotionTarget` (concrete `Element` or string target) into zero or more DOM elements.
 *
 * @internal
 */
export function resolveTargetElements(target: MotionTarget, options: ResolveChoreographyOptions): Element[] {
  if (typeof target !== 'string') {
    return [target];
  }

  if (options.resolveTarget) {
    const matched = options.resolveTarget(target, options.rootElement);
    if (!matched) {
      return [];
    }
    if (!isElement(matched) && Symbol.iterator in Object(matched)) {
      return Array.from(matched as Iterable<Element>);
    }
    return [matched as Element];
  }

  return defaultResolveTarget(target, options.rootElement);
}

function applyLayerTiming(atom: AtomMotion, target: Element, addedDelay: number, isStaggered: boolean): AtomMotion {
  const baseAtomDelay = numericAtomDelay(atom.delay);
  const totalDelay = baseAtomDelay + addedDelay;
  const shouldSetDelay = isStaggered || addedDelay !== 0 || atom.delay !== undefined;
  const shouldSetFillBoth = isStaggered || totalDelay > 0;

  let reducedMotion = atom.reducedMotion;
  if (isStaggered || addedDelay > 0) {
    // Prevent stagger/choreography delays from leaking into reduced motion while respecting explicit overrides.
    reducedMotion = {
      ...(atom.reducedMotion ?? { duration: DEFAULT_REDUCED_MOTION_DURATION }),
      delay: atom.reducedMotion?.delay ?? 0,
    };
  } else if (reducedMotion !== undefined) {
    reducedMotion = { ...reducedMotion };
  }

  return {
    ...atom,
    target,
    ...(shouldSetDelay ? { delay: totalDelay } : {}),
    ...(shouldSetFillBoth && atom.fill === undefined ? { fill: 'both' } : {}),
    ...(reducedMotion !== undefined ? { reducedMotion } : {}),
  };
}

/**
 * Creates a canonical `MotionLayer` POJO binding a target (DOM element or selector/ID) to one or more motion atoms.
 */
export function layer(
  target: MotionTarget,
  motion: AtomMotion | readonly AtomMotion[],
  options?: MotionLayerOptions,
): MotionLayer {
  if (options?.delay !== undefined) {
    assertValidDelay(options.delay);
  }

  return {
    kind: 'layer',
    target,
    motion: Array.isArray(motion) ? [...motion] : (motion as AtomMotion),
    ...(options?.delay !== undefined ? { delay: options.delay } : {}),
  };
}

/**
 * Creates one `MotionLayer` per target in input order without mutating `motion` or adding stagger timing.
 */
export function cloneMotionToTargets(
  targets: readonly MotionTarget[],
  motion: AtomMotion | readonly AtomMotion[],
  options?: MotionLayerOptions,
): MotionLayer[] {
  if (options?.delay !== undefined) {
    assertValidDelay(options.delay);
  }

  return targets.map(target =>
    layer(target, Array.isArray(motion) ? motion.map(cloneAtom) : cloneAtom(motion as AtomMotion), options),
  );
}

/**
 * Creates a canonical `StaggerMotion` POJO retaining ordered layer participants and their additive start-to-start interval.
 */
export function stagger(members: readonly MotionLayer[], options: StaggerOptions): StaggerMotion {
  assertValidStartInterval(options.startInterval);

  return {
    kind: 'stagger',
    startInterval: options.startInterval,
    ...(options.order !== undefined ? { order: options.order } : {}),
    members: [...members],
  };
}

/**
 * Lowers a `ChoreographyMotion` POJO (`AtomMotion`, `MotionLayer`, `StaggerMotion`, or parallel array of them)
 * into flat, target-bound `AtomMotion[]` ready for Web Animations API playback.
 *
 * - Adds `index * startInterval` additively to each layer's base `delay` and each atom's internal `delay` once.
 * - Defaults `fill` to `'both'` on staggered/delayed layers (unless explicitly set) to prevent pre-delay jumps.
 * - Zeros stagger/choreography delays under `prefers-reduced-motion` unless an explicit `reducedMotion.delay` is set.
 * - Never mutates its inputs.
 */
export function resolveChoreography(
  motion: ChoreographyMotion,
  rootOrOptions?: Element | ResolveChoreographyOptions,
): AtomMotion[] {
  const options: ResolveChoreographyOptions = isElement(rootOrOptions)
    ? { rootElement: rootOrOptions }
    : rootOrOptions ?? {};

  const items: readonly ChoreographyItem[] = Array.isArray(motion) ? motion : [motion as ChoreographyItem];
  const resolved: AtomMotion[] = [];

  for (const item of items) {
    if (isStaggerMotion(item)) {
      assertValidStartInterval(item.startInterval);

      // Expand all members into concrete target steps in logical order before assigning offsets.
      const steps: { element: Element; motion: AtomMotion | readonly AtomMotion[]; layerDelay: number }[] = [];
      for (const member of item.members) {
        if (member.delay !== undefined) {
          assertValidDelay(member.delay);
        }
        const elements = resolveTargetElements(member.target, options);
        for (const element of elements) {
          steps.push({
            element,
            motion: member.motion,
            layerDelay: member.delay ?? 0,
          });
        }
      }

      const isReversed = item.order === 'reverse';
      for (let i = 0; i < steps.length; i += 1) {
        const step = steps[i];
        const stepIndex = isReversed ? steps.length - 1 - i : i;
        const addedDelay = step.layerDelay + stepIndex * item.startInterval;
        const atoms: readonly AtomMotion[] = Array.isArray(step.motion) ? step.motion : [step.motion as AtomMotion];

        for (const atom of atoms) {
          resolved.push(applyLayerTiming(atom, step.element, addedDelay, true));
        }
      }
    } else if (isMotionLayer(item)) {
      if (item.delay !== undefined) {
        assertValidDelay(item.delay);
      }
      const elements = resolveTargetElements(item.target, options);
      const atoms: readonly AtomMotion[] = Array.isArray(item.motion) ? item.motion : [item.motion as AtomMotion];

      for (const element of elements) {
        for (const atom of atoms) {
          resolved.push(applyLayerTiming(atom, element, item.delay ?? 0, false));
        }
      }
    } else {
      resolved.push({ ...item });
    }
  }

  return resolved;
}
