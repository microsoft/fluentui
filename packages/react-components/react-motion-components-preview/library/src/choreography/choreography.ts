import type { AtomMotion } from '@fluentui/react-motion';
import type {
  ChoreographyItem,
  ChoreographyMotion,
  HoldMotion,
  MotionLayer,
  MotionLayerOptions,
  MotionTarget,
  ResolveChoreographyOptions,
  SequenceMotion,
  SequenceOptions,
  StaggerMotion,
  StaggerOptions,
} from './types';

const DEFAULT_REDUCED_MOTION_DURATION = 1;
const ROOT_TARGET = Symbol('ROOT_TARGET');
const NON_STYLE_KEYFRAME_KEYS = new Set(['offset', 'easing', 'composite']);

type TargetKey = Element | typeof ROOT_TARGET;

type LoweredEntry = {
  atom: AtomMotion;
  readonly targetKey: TargetKey;
  readonly startTime: number;
  readonly endTime: number;
};

type LowerResult = {
  readonly entries: LoweredEntry[];
  readonly extent: number;
};

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

function assertValidHoldDuration(duration: number): void {
  if (!Number.isFinite(duration) || duration < 0) {
    throw new RangeError('Hold duration must be finite and nonnegative.');
  }
}

function assertValidGap(gap: number): void {
  if (!Number.isFinite(gap)) {
    throw new RangeError('Sequence gap must be a finite number.');
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

function numericAtomDuration(duration: KeyframeEffectOptions['duration']): number {
  if (duration === undefined) {
    return 0;
  }
  if (typeof duration !== 'number' || !Number.isFinite(duration) || duration < 0) {
    throw new TypeError('Choreography requires finite nonnegative numeric atom durations.');
  }
  return duration;
}

function numericAtomIterations(iterations: KeyframeEffectOptions['iterations']): number {
  if (iterations === undefined) {
    return 1;
  }
  if (typeof iterations !== 'number' || Number.isNaN(iterations) || iterations < 0) {
    throw new TypeError('Choreography requires nonnegative numeric atom iterations.');
  }
  return iterations;
}

function isHoldMotion(item: ChoreographyItem): item is HoldMotion {
  return 'kind' in item && item.kind === 'hold';
}

function isMotionLayer(item: ChoreographyItem): item is MotionLayer {
  return 'kind' in item && item.kind === 'layer';
}

function isSequenceMotion(item: ChoreographyItem): item is SequenceMotion {
  return 'kind' in item && item.kind === 'sequence';
}

function isStaggerMotion(item: ChoreographyItem): item is StaggerMotion {
  return 'kind' in item && item.kind === 'stagger';
}

function isElement(value: unknown): value is Element {
  return typeof value === 'object' && value !== null && 'querySelectorAll' in value;
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

function cloneMotion(motion: ChoreographyMotion): ChoreographyMotion {
  if (Array.isArray(motion)) {
    return motion.map(cloneMotion);
  }
  const item = motion as ChoreographyItem;
  if (isHoldMotion(item)) {
    return { ...item };
  }
  if (isSequenceMotion(item)) {
    return {
      ...item,
      children: item.children.map(cloneMotion),
    };
  }
  if (isMotionLayer(item)) {
    return {
      ...item,
      motion: cloneMotion(item.motion),
    };
  }
  if (isStaggerMotion(item)) {
    return {
      ...item,
      members: item.members.map(member => ({
        ...member,
        motion: cloneMotion(member.motion),
      })),
    };
  }
  return cloneAtom(item);
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

function animatedPropertiesOf(atom: AtomMotion): Set<string> {
  const props = new Set<string>();
  for (const frame of atom.keyframes) {
    for (const key of Object.keys(frame)) {
      if (!NON_STYLE_KEYFRAME_KEYS.has(key) && frame[key] !== undefined) {
        props.add(key);
      }
    }
  }
  return props;
}

function stripBackwardsFill(fill: FillMode | undefined): FillMode {
  if (fill === 'backwards' || fill === 'none') {
    return 'none';
  }
  return 'forwards';
}

function applyAtomTiming(
  atom: AtomMotion,
  target: Element | undefined,
  offset: number,
  isChoreographed: boolean,
): LoweredEntry {
  const baseAtomDelay = numericAtomDelay(atom.delay);
  const atomDuration = numericAtomDuration(atom.duration);
  const iterations = numericAtomIterations(atom.iterations);
  const activeDuration = iterations === 0 || atomDuration === 0 ? 0 : atomDuration * iterations;
  const totalDelay = baseAtomDelay + offset;
  const resolvedTarget = atom.target ?? target;
  const shouldSetDelay = isChoreographed || offset !== 0 || atom.delay !== undefined;
  const shouldSetFillBoth = isChoreographed || totalDelay > 0;

  let reducedMotion = atom.reducedMotion;
  if (isChoreographed || offset > 0) {
    // Prevent choreography delays from leaking into reduced motion while respecting explicit overrides.
    reducedMotion = {
      ...(atom.reducedMotion ?? { duration: DEFAULT_REDUCED_MOTION_DURATION }),
      delay: atom.reducedMotion?.delay ?? 0,
    };
  } else if (reducedMotion !== undefined) {
    reducedMotion = { ...reducedMotion };
  }

  const nextAtom: AtomMotion = {
    ...atom,
    ...(resolvedTarget !== undefined ? { target: resolvedTarget } : {}),
    ...(shouldSetDelay ? { delay: totalDelay } : {}),
    ...(shouldSetFillBoth && atom.fill === undefined ? { fill: 'both' } : {}),
    ...(reducedMotion !== undefined ? { reducedMotion } : {}),
  };

  return {
    atom: nextAtom,
    targetKey: resolvedTarget ?? ROOT_TARGET,
    startTime: totalDelay,
    endTime: totalDelay + activeDuration,
  };
}

function lowerNode(
  node: ChoreographyMotion,
  offset: number,
  inheritedTarget: Element | undefined,
  isChoreographed: boolean,
  options: ResolveChoreographyOptions,
): LowerResult {
  if (Array.isArray(node)) {
    const entries: LoweredEntry[] = [];
    let maxExtent = 0;

    for (const child of node) {
      const result = lowerNode(child, offset, inheritedTarget, isChoreographed, options);
      entries.push(...result.entries);
      if (result.extent > maxExtent) {
        maxExtent = result.extent;
      }
    }

    return { entries, extent: maxExtent };
  }

  const item = node as ChoreographyItem;

  if (isHoldMotion(item)) {
    assertValidHoldDuration(item.duration);
    return { entries: [], extent: item.duration };
  }

  if (isSequenceMotion(item)) {
    const gap = item.gap ?? 0;
    assertValidGap(gap);

    const entries: LoweredEntry[] = [];
    let cursor = 0;
    let maxExtent = 0;

    for (let i = 0; i < item.children.length; i += 1) {
      if (i > 0) {
        if (!Number.isFinite(cursor)) {
          throw new RangeError('Cannot sequence additional steps after an infinite-duration motion.');
        }
        const nextCursor = cursor + gap;
        if (nextCursor < 0) {
          throw new RangeError('Sequence gap cannot move a step start time before 0ms.');
        }
        cursor = nextCursor;
      }

      const result = lowerNode(item.children[i], offset + cursor, inheritedTarget, true, options);
      entries.push(...result.entries);

      const childEnd = cursor + result.extent;
      if (childEnd > maxExtent) {
        maxExtent = childEnd;
      }
      cursor = childEnd;
    }

    return { entries, extent: maxExtent };
  }

  if (isStaggerMotion(item)) {
    assertValidStartInterval(item.startInterval);

    // Expand all members into concrete target steps in logical order before assigning offsets.
    const steps: { element: Element; motion: ChoreographyMotion; layerDelay: number }[] = [];
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

    const entries: LoweredEntry[] = [];
    const isReversed = item.order === 'reverse';
    let maxExtent = 0;

    for (let i = 0; i < steps.length; i += 1) {
      const step = steps[i];
      const stepIndex = isReversed ? steps.length - 1 - i : i;
      const stepLocalOffset = step.layerDelay + stepIndex * item.startInterval;
      const result = lowerNode(step.motion, offset + stepLocalOffset, step.element, true, options);
      entries.push(...result.entries);

      const stepEnd = Math.max(0, stepLocalOffset + result.extent);
      if (stepEnd > maxExtent) {
        maxExtent = stepEnd;
      }
    }

    return { entries, extent: maxExtent };
  }

  if (isMotionLayer(item)) {
    if (item.delay !== undefined) {
      assertValidDelay(item.delay);
    }
    const layerDelay = item.delay ?? 0;
    const elements = resolveTargetElements(item.target, options);
    if (elements.length === 0) {
      return { entries: [], extent: 0 };
    }

    const entries: LoweredEntry[] = [];
    let maxChildExtent = 0;
    const layerChoreographed = isChoreographed || layerDelay !== 0;

    for (const element of elements) {
      const result = lowerNode(item.motion, offset + layerDelay, element, layerChoreographed, options);
      entries.push(...result.entries);
      if (result.extent > maxChildExtent) {
        maxChildExtent = result.extent;
      }
    }

    return { entries, extent: Math.max(0, layerDelay + maxChildExtent) };
  }

  const entry = applyAtomTiming(item, inheritedTarget, offset, isChoreographed);
  const localExtent = Math.max(0, entry.endTime - offset);
  return { entries: [entry], extent: localExtent };
}

/**
 * Creates a canonical `HoldMotion` POJO representing an explicit pause/dwell in milliseconds within a sequence.
 */
export function hold(duration: number): HoldMotion {
  assertValidHoldDuration(duration);
  return {
    kind: 'hold',
    duration,
  };
}

/**
 * Creates a canonical `SequenceMotion` POJO that plays ordered choreography children one after another.
 *
 * Pass `options.gap` for a fixed pause (`> 0`) or overlap (`< 0`) between adjacent children.
 */
export function sequence(children: readonly ChoreographyMotion[], options?: SequenceOptions): SequenceMotion {
  if (options?.gap !== undefined) {
    assertValidGap(options.gap);
  }

  return {
    kind: 'sequence',
    ...(options?.gap !== undefined ? { gap: options.gap } : {}),
    children: [...children],
  };
}

/**
 * Creates a canonical `MotionLayer` POJO binding a target (DOM element or selector/ID) to a choreography motion.
 */
export function layer(target: MotionTarget, motion: ChoreographyMotion, options?: MotionLayerOptions): MotionLayer {
  if (options?.delay !== undefined) {
    assertValidDelay(options.delay);
  }

  return {
    kind: 'layer',
    target,
    motion: Array.isArray(motion) ? [...motion] : motion,
    ...(options?.delay !== undefined ? { delay: options.delay } : {}),
  };
}

/**
 * Creates one `MotionLayer` per target in input order without mutating `motion` or adding stagger timing.
 */
export function cloneMotionToTargets(
  targets: readonly MotionTarget[],
  motion: ChoreographyMotion,
  options?: MotionLayerOptions,
): MotionLayer[] {
  if (options?.delay !== undefined) {
    assertValidDelay(options.delay);
  }

  return targets.map(target => layer(target, cloneMotion(motion), options));
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
 * Lowers a `ChoreographyMotion` POJO (`AtomMotion`, `HoldMotion`, `MotionLayer`, `SequenceMotion`,
 * `StaggerMotion`, or nested parallel arrays) into flat, target-bound `AtomMotion[]` ready for WAAPI playback.
 *
 * - Resolves sequential cursors (`sequence`, `hold`, signed `gap`) and additive stagger offsets (`stagger`) once.
 * - Defaults `fill` to `'both'` on first choreographed/delayed occurrences to prevent pre-delay jumps.
 * - Strips backwards fill (`'both' -> 'forwards'`, `'backwards' -> 'none'`) on subsequent steps targeting the same
 *   `(target, property)` so later steps in a sequence do not clobber earlier steps during their delay window.
 * - Zeros choreography delays under `prefers-reduced-motion` unless an explicit `reducedMotion.delay` is set.
 * - Emits a zero-property timing spacer if a trailing `hold` extends beyond the last animated end time.
 * - Never mutates its inputs.
 */
export function resolveChoreography(
  motion: ChoreographyMotion,
  rootOrOptions?: Element | ResolveChoreographyOptions,
): AtomMotion[] {
  const options: ResolveChoreographyOptions = isElement(rootOrOptions)
    ? { rootElement: rootOrOptions }
    : rootOrOptions ?? {};

  const { entries, extent } = lowerNode(motion, 0, undefined, false, options);

  // Normalize fill across chronologically ordered entries targeting the same (target, property)
  // so later steps' backwards fill never clobbers earlier steps in WAAPI composite order.
  const ordered = entries
    .map((entry, emissionIndex) => ({ entry, emissionIndex }))
    .sort((a, b) => a.entry.startTime - b.entry.startTime || a.emissionIndex - b.emissionIndex);

  const seenTargetProps = new Map<TargetKey, Set<string>>();

  for (const { entry } of ordered) {
    const props = animatedPropertiesOf(entry.atom);
    if (props.size === 0) {
      continue;
    }

    let seenProps = seenTargetProps.get(entry.targetKey);
    if (!seenProps) {
      seenProps = new Set<string>();
      seenTargetProps.set(entry.targetKey, seenProps);
    }

    let overlapsEarlierStep = false;
    for (const prop of props) {
      if (seenProps.has(prop)) {
        overlapsEarlierStep = true;
      } else {
        seenProps.add(prop);
      }
    }

    if (overlapsEarlierStep) {
      entry.atom = {
        ...entry.atom,
        fill: stripBackwardsFill(entry.atom.fill),
      };
    }
  }

  const atoms = entries.map(entry => entry.atom);

  // If a trailing hold extends past the latest animation end, emit a zero-property WAAPI timing spacer
  // so onMotionFinish waits for the full authored span.
  let maxAnimEnd = 0;
  for (const entry of entries) {
    if (entry.endTime > maxAnimEnd) {
      maxAnimEnd = entry.endTime;
    }
  }

  if (Number.isFinite(extent) && extent > maxAnimEnd) {
    atoms.push({
      keyframes: [],
      duration: extent - maxAnimEnd,
      delay: maxAnimEnd,
      reducedMotion: { duration: DEFAULT_REDUCED_MOTION_DURATION, delay: 0 },
    });
  }

  return atoms;
}
