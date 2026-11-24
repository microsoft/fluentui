import type {
  AtomMotion,
  MotionParam,
  PresenceComponentOptions,
  PresenceDirection,
  PresenceMotion,
} from '@fluentui/react-motion';

/**
 * A concrete DOM element or a CSS selector (or logical target name when paired with a custom `TargetResolver`).
 */
export type MotionTarget = Element | string;

/**
 * Associates a motion target with one or more motion atoms and an optional additive base delay.
 */
export type MotionLayer = {
  readonly kind: 'layer';
  readonly target: MotionTarget;
  readonly motion: AtomMotion | readonly AtomMotion[];
  readonly delay?: number;
};

/**
 * Options for constructing a `MotionLayer`.
 */
export type MotionLayerOptions = {
  /** Base delay in milliseconds added to each atom in this layer (and before any stagger offset). */
  readonly delay?: number;
};

/**
 * Sequence order in which stagger start offsets are assigned to resolved targets.
 */
export type StaggerOrder = 'forward' | 'reverse';

/**
 * Options for constructing a `StaggerMotion` POJO.
 */
export type StaggerOptions = {
  /** Start-to-start interval in milliseconds between consecutive staggered targets. Must be finite and nonnegative. */
  readonly startInterval: number;
  /** Sequence order in which stagger offsets are assigned. Defaults to `'forward'`. */
  readonly order?: StaggerOrder;
};

/**
 * Canonical stagger POJO preserving ordered layer participants and their additive start-to-start interval.
 *
 * When all layer targets are strings, the entire structure is plain JSON-serializable data.
 */
export type StaggerMotion = {
  readonly kind: 'stagger';
  readonly startInterval: number;
  readonly order?: StaggerOrder;
  readonly members: readonly MotionLayer[];
};

/**
 * A single unit in a choreography definition:
 * - `AtomMotion`: animates the component's root element directly.
 * - `MotionLayer`: binds one or more atoms to a target element or selector with an optional base delay.
 * - `StaggerMotion`: staggers ordered `MotionLayer` participants by an additive `startInterval`.
 */
export type ChoreographyItem = AtomMotion | MotionLayer | StaggerMotion;

/**
 * A one-way choreography definition (a single item or a parallel array of items).
 */
export type ChoreographyMotion = ChoreographyItem | readonly ChoreographyItem[];

/**
 * A bidirectional presence choreography definition with `enter` and `exit` edges.
 */
export type PresenceChoreographyMotion = Record<PresenceDirection, ChoreographyMotion>;

/**
 * Maps a string target (CSS selector or logical target ID) to zero, one, or many DOM elements.
 */
export type TargetResolver = (target: string, rootElement?: Element) => Element | Iterable<Element> | null | undefined;

/**
 * Options for resolving a `ChoreographyMotion` POJO into bound `AtomMotion[]` ready for WAAPI playback.
 */
export type ResolveChoreographyOptions = {
  /** Root element used as the query scope for string targets. */
  readonly rootElement?: Element;
  /** Custom binder for resolving string targets to DOM elements. Defaults to `rootElement.querySelectorAll`. */
  readonly resolveTarget?: TargetResolver;
};

/**
 * Dynamic choreography motion function receiving the wrapped root element and motion parameters.
 */
export type ChoreographyMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement } & MotionParams,
) => ChoreographyMotion;

/**
 * Dynamic presence choreography motion function receiving the wrapped root element and motion parameters.
 */
export type PresenceChoreographyMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement } & MotionParams,
) => PresenceChoreographyMotion;

/**
 * Options for `createChoreographyComponent`.
 */
export type CreateChoreographyOptions = {
  /** Custom target binder used when resolving string targets. */
  readonly resolveTarget?: TargetResolver;
};

/**
 * Options for `createChoreographyPresenceComponent`.
 */
export type CreateChoreographyPresenceOptions<
  MotionParams extends Record<string, MotionParam> = {},
  PresentKeys extends keyof MotionParams = never,
> = Partial<PresenceComponentOptions<NoInfer<MotionParams>, PresentKeys>> & {
  /** Custom target binder used when resolving string targets. */
  readonly resolveTarget?: TargetResolver;
};

/**
 * Primitive runtime parameters accepted by components created with `createStaggerComponent`.
 */
export type StaggerParams = {
  /** Start-to-start interval in milliseconds between consecutive targets. */
  startInterval?: number;
  /** Sequence order for assigning stagger offsets. Defaults to `'forward'`. */
  order?: StaggerOrder;
  /** CSS selector (or logical target for a custom `resolveTarget`) selecting items inside the root element. Defaults to `':scope > *'`. */
  target?: string;
};

/**
 * Primitive runtime parameters accepted by components created with `createStaggerPresenceComponent`.
 */
export type StaggerPresenceParams = StaggerParams & {
  /** Start-to-start interval in milliseconds on exit. Defaults to `startInterval`. */
  exitStartInterval?: number;
  /** Sequence order for assigning stagger offsets on exit. Defaults to `order`. */
  exitOrder?: StaggerOrder;
};

/**
 * Per-item motion function for `createStaggerComponent`, invoked once per matched target element.
 */
export type StaggerItemMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement; index: number; count: number } & MotionParams,
) => AtomMotion | readonly AtomMotion[];

/**
 * Per-item presence motion function for `createStaggerPresenceComponent`, invoked once per matched target element.
 */
export type StaggerItemPresenceMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement; index: number; count: number } & MotionParams,
) => PresenceMotion;

/**
 * Options for `createStaggerComponent`.
 */
export type CreateStaggerOptions = {
  /** Default `startInterval` (ms) when omitted as a prop. Defaults to `50`. */
  readonly defaultStartInterval?: number;
  /** Default stagger order when omitted as a prop. Defaults to `'forward'`. */
  readonly defaultOrder?: StaggerOrder;
  /** Default selector/target string when omitted as a prop. Defaults to `':scope > *'`. */
  readonly defaultTarget?: string;
  /** Custom target binder used when resolving string targets. */
  readonly resolveTarget?: TargetResolver;
};

/**
 * Options for `createStaggerPresenceComponent`.
 */
export type CreateStaggerPresenceOptions = CreateStaggerOptions & {
  /** Default exit `startInterval` (ms) when omitted as a prop. Defaults to the resolved enter `startInterval`. */
  readonly defaultExitStartInterval?: number;
  /** Default exit order when omitted as a prop. Defaults to the resolved enter `order`. */
  readonly defaultExitOrder?: StaggerOrder;
};
