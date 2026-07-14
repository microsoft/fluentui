# Motion sequence and choreography strategies

**Date:** July 14, 2026
**Branch examined:** `feat/sequence`
**Status:** Research and design recommendation; not an implementation commitment

## Executive summary

The current experiment contains three useful but different API shapes: direct JSX `<Sequence>` children, a `createSequenceComponent()` factory that injects one child into several motion elements, and visibility-driven presence components. Presence is not a sequence strategy. More importantly, the examples currently mix two domains under “sequence”:

- **single-target motion sequence** — consecutive or overlapping motion segments acting on one persistent target element;
- **multi-target choreography/timeline** — layers or targets coordinated on a shared clock, closer to an After Effects composition.

These domains should share timing and motion-description primitives, but not one undifferentiated public authoring API. Presence should remain a third, lifecycle-oriented API.

The recommended next prototype is an **atom-array-first single-target sequence factory**. Fluent's existing atoms already return mostly-POJO `AtomMotion` values, so the shortest evolutionary path is to sequence those values directly and add a small set of non-animation items such as `hold`. The factory should return a React component that binds the resulting sequence to exactly one persistent child element.

This makes a sequence a higher-order motion definition assembled from atoms rather than a list of React wrappers. It does not require Fluent to call the result a “molecule.” Strict JSON serialization, registries, stable authored IDs, markers, and absolute placement can be layered on if product requirements emerge; they should not burden the first API. A separate layered timeline API can later reuse atom lowering and clock infrastructure without turning the simple sequence factory into an After Effects composition model.

## Reading rules

- **Current fact** means verified against local source, tests, stories, or accepted local architecture records.
- **Proposal** means a design option that does not exist in the examined Fluent UI source.

Penner sources are comparative primary sources, not proposed Fluent UI dependencies. The sibling repository's verified `origin` is `github.com/robertpenner/penner`, and its examined branch is `main`.

## Vocabulary and taxonomy

| Term                | Definition                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Target**          | Persistent identity receiving animated values. The sequence target is its one bound React child.    |
| **Channel**         | One animatable quantity of a target, such as opacity, translation, scale, or rotation.              |
| **Keyframe**        | A value anchor at a time or normalized offset.                                                      |
| **Segment**         | The interval between adjacent keyframes on a channel. Easing applies to the outgoing segment.       |
| **Motion clip**     | A bounded motion description with channels/keyframes and timing.                                    |
| **Sequence item**   | One `AtomMotion` or explicit hold in a serial, single-target array.                                 |
| **Hold**            | Time during which prior resolved state remains unchanged. It is data, not absence.                  |
| **Placement**       | Serial placement after the prior item or placement at an absolute time.                             |
| **Iteration**       | Repetition of an explicitly scoped span: whole sequence, clip, layer, or channel.                   |
| **Runtime adapter** | Code binding a motion definition to React/WAAPI targets, refs, clocks, cancellation, and callbacks. |

Penner's motion-format code usefully separates opaque targets, channels/keyframes, and clock-driven playback. See its [`Composition → Layer → Channel` types](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/layers.ts), [channel/keyframe types](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/channels.ts), and accepted [format/engine split](https://github.com/robertpenner/penner/blob/main/docs/decisions/motion-format-engine-split.md).

### A. Single-target motion sequence

Ordered or explicitly placed motion steps act on one persistent target identity: slide one card in, hold it, then slide the same card out; pulse one badge without remounting it; or overlap opacity and scale clips on one element.

> **Required invariant:** changing steps must not inherently replace the target DOM node, reset child state, or lose focus.

“Sequential” describes temporal construction, not React mounting. Overlap can still occur within a target sequence; it then requires channel-conflict rules. Penner's motion theory similarly defines sequence as time-disjoint motion on the same voice set, distinguishes it from simultaneous independent voices, and makes seam compatibility explicit. It also treats hold as first-class. See [Composition Book II](https://github.com/robertpenner/penner/blob/main/packages/elements-of-motion/3-composition/books/book-2-the-three-combinations.md).

### B. Multi-target choreography/timeline

A shared master clock coordinates multiple stable targets/layers, each with channels and active windows: a title enters while photos stagger, scenes crossfade, or several layers are scrubbed at an absolute time.

Required invariants are stable target IDs, first-class absolute timing and overlap, paint order distinct from temporal order, conflicts considered per `(target, channel, time range)`, and evaluation of every target's state at time $t$ without switching whole React subtrees.

This is the After Effects-like domain. Penner's current `Composition` is explicitly `Composition → Layer → Channel`, with flat ordered layers, opaque targets, optional adapter identity, and per-channel keyframes. Its accepted heterogeneous-layer design assigns one host the shared playhead and rendering orchestration. See [composition layers](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/layers.ts) and [heterogeneous layer adapters](https://github.com/robertpenner/penner/blob/main/docs/decisions/heterogeneous-composition-layer-adapters.md).

### C. Visibility/presence transition

Presence is lifecycle motion driven by whether content should be present: enter, exit, initial appearance, interruption/reversal, and optional unmount after exit. It is not a two-step sequence. Stable [`createPresenceComponent`](../../react-motion/library/src/factories/createPresenceComponent.ts) already owns `visible`, `appear`, `unmountOnExit`, mounted state, direction-aware callbacks, and experimental reversal.

A sequence may run inside present content, and a timeline can have a visibility channel, but neither should redefine presence mounting semantics.

### Why the distinction is load-bearing

The [current carousel sequence story](../stories/src/CarouselInSteps/CarouselStep4_Sequence.stories.tsx) contains all three levels: title/photo phase sequences, `Hold` wrappers around several parallel children called scenes, and an outer sequence switching album scenes. Calling all of these “sequence” obscures target persistence, shared clocks, and React lifetime.

## Existing strategies, verified against current code

### Strategy 1: direct JSX `<Sequence>` children

**Current fact.** [`Sequence`](../library/src/choreography/Sequence/Sequence.tsx) maps valid React children, stores a current child/iteration index through [`useSequenceAnimation`](../library/src/choreography/Sequence/useSequenceAnimation.tsx), renders only the current child, and clones it with `commonProps` plus an `onMotionFinish` callback. Completion advances the index; the final child either starts another iteration or invokes sequence completion.

The [child-mapping utility](../library/src/choreography/Sequence/utils/getSequenceChildMapping.ts) uses `React.Children.toArray()` and restores original order by index. The hook resets only when child count changes, not when identity/order changes with the same count.

Current authoring looks like:

```tsx
<Sequence iterations={Infinity}>
  <Slide.In duration={400}>{card}</Slide.In>
  <Hold duration={1200}>{card}</Hold>
  <Slide.Out duration={400}>{card}</Slide.Out>
</Sequence>
```

**Strengths:** highly discoverable React composition, ordinary JSX branching, and genuinely different content per phase.

**Limits:** the motion program is coupled to the React subtree rendered during each phase. The representation is not portable, independently validatable, seekable, or naturally schedulable with overlap. It does not promise persistent DOM identity across unlike outer motion components; that must be measured with a node-identity test rather than asserted either way.

**Best fit:** prototypes, intentional distinct-content phase switching, and possibly an escape hatch. It should not define persistent-target semantics merely because it is concise JSX.

---

### Strategy 2: JSX `createSequenceComponent()` factory

**Current fact.** [`createSequenceComponent`](../library/src/choreography/Sequence/Sequence.tsx) accepts component types, React elements, `null`, or `undefined`. It injects the same `children` value into each entry and renders the resulting list through `<Sequence>`.

The [current carousel story](../stories/src/CarouselInSteps/CarouselStep4_Sequence.stories.tsx) uses this define-then-render workflow:

```tsx
const TitleSequence = createSequenceComponent({
  motions: [
    <Slide.In fromY="-100px" duration={400} easing={motionTokens.curveDecelerateMin} />,
    <Hold duration={1200} />,
    <Slide.Out fromY="100px" duration={400} easing={motionTokens.curveAccelerateMin} />,
  ],
});

// Usage: single child flows through all motions
<TitleSequence>{titleA}</TitleSequence>;
```

**Strengths:** content is supplied once, patterns are reusable, and an atom-array factory can preserve the useful “define, then render” workflow.

**Verified limits:** the captured “definition” is live React values; `MotionEntry` uses `React.ComponentType<any>`; omitted keys fall back to array positions; the returned component does not expose outer sequence iteration/common props/completion; callback composition is unspecified when an entry already has `onMotionFinish`; and there is no validation phase. Each step is still realized as a different current React component.

The old recommendation to change `index` into a string such as `` `motion-${index}` `` does not create stable identity; it only changes the spelling of a positional key. Stable IDs must come from authored data.

**Best fit:** short-term ergonomics experiment or compatibility adapter, not the preferred long-term source of truth.

### Strategy 3: presence

The old analysis showed a local `<Presence enter={...} exit={...}>` helper. That helper is not present in the current sequence implementation or current `_Sequence` story. The supported comparison is stable [`createPresenceComponent`](../../react-motion/library/src/factories/createPresenceComponent.ts).

**Strengths:** explicit external visibility state, enter/exit direction, interruption behavior, initial appearance, and optional unmount after exit.

**Limit as a sequence API:** presence does not represent arbitrary progression, holds, absolute timing, or repeated clips. Adding these would make visibility lifecycle harder to reason about.

**Recommendation:** keep presence separate for dialogs, popovers, toasts, and conditional UI. A sequence can run inside a present subtree; it should not own mounting semantics.

---

## Current implementation facts and corrected claims

### Sequence contract and tests

**Current fact.** The implementation is a serial list of mounted React component phases. It has no absolute placement, overlap, pause/seek, sequence cancellation event, independent step IDs, target IDs, channel conflict model, or validation pass.

The branch has tests for stable motion/presence factories and preview atoms/components, but no dedicated `Sequence`, `Hold`, `useSequenceAnimation`, or child-mapping test file. Stories demonstrate intent; they do not establish node identity, callback ordering, timer cleanup, or iteration edge behavior. Claims such as “every step replaces the DOM node,” “index keys break loops,” or “the timer leaks” therefore remain hypotheses until tests prove them.

`MotionEntry` does use `React.ComponentType<any>`. Strengthening that local type can improve the experiment, but a typed React-element union still would not provide portable step identity, serialization, or a target/channel model.

---

### Iteration examples

**Current fact.** [Sequence props](../library/src/choreography/Sequence/sequence-types.ts) use numeric DOM `EffectTiming['iterations']`; `Infinity` is documented and used in the current carousel story. The [default story](../stories/src/choreography/Sequence/SequenceDefault.stories.tsx) and an earlier carousel story still use the string `"infinite"`. This is a verified type/API inconsistency in examples, not evidence that numeric runtime iteration is broken.

Zero, negative, fractional, `NaN`, dynamic updates, duplicate completion, and reduced-motion handling are currently unspecified.

### Hold timing

**Current fact.** [`Hold`](../library/src/choreography/Sequence/Sequence.tsx) renders children unchanged and schedules completion through `useTimeout()`. Its effect reschedules when `duration` or callback dependencies change. That is not inherently a bug; desired mid-hold updates simply need a contract. An atom-sequence hold should compile to preserved timeline state rather than necessarily remaining a timer component.

### Keys

**Current fact.** The JSX factory uses authored element keys or array indices. Prefixing an index with `"motion-"` would still be positional and would not create stable React identity. The proposed immutable atom array can intentionally use indices for scheduling and diagnostics; stable authored IDs are a separate persisted-format concern.

### `Scene`

**Current fact.** `Scene` is exactly an alias of `Hold`; it is not a composition, layer collection, shared clock, or parallel scheduler. Reserve `Scene` or `Timeline` for actual multi-target orchestration and keep `Hold` for elapsed constant state.

### Motion components, atoms, and reduced motion

**Current fact.** Stable [`createMotionComponent`](../../react-motion/library/src/factories/createMotionComponent.ts) intentionally accepts an optional child, binds one or more atoms to one resolved child element, and returns the resolved child. It supports `replayKey` specifically to rerun motion without remounting the DOM subtree.

[`AtomMotion`](../../react-motion/library/src/types.ts) is mostly data-shaped—keyframes, timing, and an optional reduced-motion override—but atom functions receive a live `HTMLElement`, and native keyframe values are not a repository-owned JSON schema. “Atom” is therefore not automatically synonymous with “portable serialized definition.”

[`useAnimateAtoms`](../../react-motion/library/src/hooks/useAnimateAtoms.ts) defaults reduced motion to 1 ms unless an atom overrides it. [`useIsReducedMotion`](../../react-motion/library/src/hooks/useIsReducedMotion.ts) obtains the target window through Fluent context. A sequence-level policy must additionally collapse holds and infinite iteration; otherwise 1 ms clips can still be separated by long timer delays.

---

## Primary proposal: atom-array-first single-target sequence factory

Everything in this section is a **proposal**.

### Goals and boundaries

1. Existing `AtomMotion` values are the primary motion items; do not invent registry references before they are needed.
2. A small `SequenceHold` union member represents elapsed time without a new animation.
3. Array order defines a serial, single-target schedule.
4. One React child is bound once and remains the same DOM target through every item and iteration.
5. The compiler validates and normalizes atoms before handing them to existing motion infrastructure.
6. Reduced motion is defined at whole-sequence scope, including holds and iteration.
7. Multi-target choreography and presence remain separate APIs.

### Public authoring shape

The exact first prototype should be as small as:

```ts
createSequenceFromAtoms([
  slideAtom({ fromX: '-20px', duration: 200 }),
  { kind: 'hold', durationMs: 400 },
  fadeAtom({ duration: 150 }),
]);
```

```ts
type SequenceHold = {
  readonly kind: 'hold';
  readonly durationMs: number;
};

type SequenceItem = AtomMotion | SequenceHold;

declare function createSequenceFromAtoms(
  items: readonly SequenceItem[],
  options?: {
    readonly iterations?: number;
    readonly reducedMotion?: 'finishImmediately' | 'preserveEssential';
  },
): ForwardRefComponent<MotionComponentProps>;
```

`AtomMotion` is already mostly a POJO: it carries keyframes, timing, and an optional reduced-motion override. Atom factories can still derive an `AtomMotion` from props and, where supported, a live element. That runtime edge means atoms are not necessarily JSON, but it does not prevent direct atom values from being the simplest useful sequence input.

A sequence is a higher-order motion definition assembled from lower-level atoms. Internally that is molecule-like composition, but the public API need not introduce or require the word “molecule.”

Preview atoms may need to be rewritten before this factory is pleasant to use. The current slide experiments are presence-centric and encode `enter`/`exit` direction. A neutral sequence atom should instead describe explicit `from` and `to` endpoints; presence can choose direction while a sequence can place the same neutral definition anywhere.

One possible refactor is to make timing and directed endpoints the complete atom contract:

```ts
type AtomTimingParams = {
  readonly duration: number;
  readonly easing?: string;
  readonly delay?: number;
  readonly fill?: FillMode;
};

type SlideAtomParams = AtomTimingParams & {
  readonly fromX?: string;
  readonly fromY?: string;
  readonly toX?: string;
  readonly toY?: string;
};

export function slideAtom({
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fill,
  fromX = '0px',
  fromY = '0px',
  toX = '0px',
  toY = '0px',
}: SlideAtomParams): AtomMotion {
  return {
    keyframes: [{ translate: `${fromX} ${fromY}` }, { translate: `${toX} ${toY}` }],
    duration,
    easing,
    delay,
    ...(fill === undefined ? {} : { fill }),
  };
}

type FadeAtomParams = AtomTimingParams & {
  readonly fromOpacity?: number;
  readonly toOpacity?: number;
};

export function fadeAtom({
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fill,
  fromOpacity = 0,
  toOpacity = 1,
}: FadeAtomParams): AtomMotion {
  return {
    keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
    duration,
    easing,
    delay,
    ...(fill === undefined ? {} : { fill }),
  };
}
```

There is no `direction` branch and no mutation through `keyframes.reverse()`. Each atom says exactly which value change it performs. A standalone atom can omit `fill` and inherit the motion runtime's forward-fill default. Callers that need pre-delay state, including presence, request it explicitly.

The existing presence component then becomes the policy layer that constructs atoms in each direction:

```ts
const slidePresenceFn: PresenceMotionFn<SlideParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveDecelerateMid,
  delay = 0,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMid,
  exitDelay = delay,
  outX = '0px',
  outY = '0px',
  inX = '0px',
  inY = '0px',
  animateOpacity = true,
}) => {
  const enter: AtomMotion[] = [
    slideAtom({
      fromX: outX,
      fromY: outY,
      toX: inX,
      toY: inY,
      duration,
      easing,
      delay,
      fill: 'both',
    }),
  ];
  const exit: AtomMotion[] = [
    slideAtom({
      fromX: inX,
      fromY: inY,
      toX: outX,
      toY: outY,
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      fill: 'both',
    }),
  ];

  if (animateOpacity) {
    enter.push(fadeAtom({ fromOpacity: 0, toOpacity: 1, duration, easing, delay, fill: 'both' }));
    exit.push(
      fadeAtom({
        fromOpacity: 1,
        toOpacity: 0,
        duration: exitDuration,
        easing: exitEasing,
        delay: exitDelay,
        fill: 'both',
      }),
    );
  }

  return { enter, exit };
};

export const Slide = createPresenceComponent(slidePresenceFn);
```

The sequence author uses the same atoms directly, without presence terminology:

```tsx
const CardSequence = createSequenceFromAtoms([
  slideAtom({ fromX: '-20px', toX: '0px', duration: 200 }),
  { kind: 'hold', durationMs: 400 },
  fadeAtom({ fromOpacity: 1, toOpacity: 0, duration: 150 }),
]);

<CardSequence>
  <Card />
</CardSequence>;
```

This also clarifies ownership of defaults. Atoms own neutral value defaults and keyframe construction. Presence owns enter/exit endpoint ordering and pre-delay visibility. The sequence compiler owns serial placement and fill normalization across item boundaries.

### Stable step identity

The runtime prototype can address items by array index. Diagnostics such as `items[1].durationMs` are deterministic for an immutable factory input and avoid making every inline atom carry authoring metadata. Stable authored IDs become useful only if definitions are persisted, patched, or edited out of process; they belong to that optional later format.

### Persistent target identity

A single-target sequence binds exactly one child and preserves that child's DOM identity:

```tsx
const CardSequence = createSequenceFromAtoms(items);

<CardSequence>
  <Card />
</CardSequence>;
```

The adapter resolves the element once, composes refs, and keeps the same node mounted. Items change animation state; they do not select alternate React wrappers or switch child subtrees. This is the defining difference from the current JSX `<Sequence>` experiment and protects focus, selection, uncontrolled state, and descendant state.

A multi-target timeline instead needs explicit opaque identity:

```ts
interface TimelineLayer {
  readonly id: string;
  readonly target: string;
  readonly clips: readonly PlacedMotionClip[];
}
```

That explicit target binding belongs to a separate future timeline host, not this factory.

### Serial timing and explicit future parallelism

At the top level, the new array means **serial**: each item starts at the cursor left by the previous item. This intentionally differs from existing `createMotionComponent()` atom arrays, where atoms run **concurrently** on one target.

```ts
type SequenceParallel = {
  readonly kind: 'parallel';
  readonly atoms: readonly AtomMotion[];
};
```

Do not overload nested or top-level arrays with both meanings. If future evidence requires parallel work inside a serial sequence, add the explicit `{ kind: 'parallel', atoms: [...] }` item. Absolute placement, overlap, and channel-conflict policy are not required for the first prototype; multi-target overlap belongs to the timeline domain.

### Holds

`{ kind: 'hold', durationMs }` advances the serial cursor while preserving the resolved visual state produced by prior items. It is not an empty gap and should not restore underlying styles during its interval.

Penner's implemented `CompositionSequence` is useful evidence: `composition` and `hold` are discriminated items; its builder computes `startMs`/`endMs`; its evaluator freezes the previous clip's terminal value; and lowering emits an equal-valued trailing keyframe. It rejects a leading hold because no prior composition state exists. See [sequence types/builder](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/sequence.ts), [evaluation tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/evaluate.test.ts), and [lowering tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/lowerCompositionToEffects.test.ts).

Fluent should not copy the leading-hold restriction blindly. A leading hold can simply leave the child's current style unchanged. The compiler does need an explicit snapshot rule for computed versus inline state.

### Optional persisted-format layer

JSON portability is not the first public API's constraint. Registries, stable sequence and step IDs, event markers, schema versions, migration, and primitive-only parameters are all reasonable later requirements for saved presets or editor interchange. If those use cases arrive, define a persisted format that resolves into `SequenceItem[]`; do not make every in-code atom sequence pay that complexity up front.

Callbacks remain React adapter concerns. Whole-sequence finish and cancel callbacks are sufficient initially. Step events, marker replay under seek/reverse, and telemetry IDs should be added only with a concrete lifecycle contract.

### Iteration

Iteration applies to the **whole sequence**, not independently to each atom. Initial semantics should be WAAPI-like: default `1`; validate finite positive counts and `Infinity`; decide fractional support explicitly; never report finish for an uncancelled infinite run; and do not synthesize completion on cancellation.

Per-atom or per-channel cycling is a separate axis. Penner's accepted looping decision likewise distinguishes whole-composition repetition from per-channel cycles. See [Looping via a Uniform Hold-Keyframe Model](https://github.com/robertpenner/penner/blob/main/docs/decisions/whole-composition-looping-via-hold-keyframe.md).

### Validation and compilation

```ts
type SequenceDiagnostic = {
  readonly code: string;
  readonly severity: 'error' | 'warning';
  readonly itemIndex?: number;
  readonly message: string;
};

type CompiledMotionSequence = {
  readonly durationMs: number;
  readonly items: readonly {
    readonly itemIndex: number;
    readonly startMs: number;
    readonly endMs: number;
    readonly kind: 'atom' | 'hold';
  }[];
};

function compileMotionSequence(
  items: readonly SequenceItem[],
): { ok: true; value: CompiledMotionSequence } | { ok: false; diagnostics: readonly SequenceDiagnostic[] };
```

The compiler walks array indices in order, validates each atom's keyframes/timing and each hold's finite non-negative duration, and advances one serial cursor. Diagnostics use `itemIndex`; no registry lookup or authored ID is necessary. It should reject arithmetic overflow and unsupported timing rather than silently clamp.

Compilation must also normalize fill behavior. Once atoms are delayed onto a shared schedule, an atom with `fill: 'backwards'` or `'both'` can apply its initial keyframe before its turn and clobber the state left by prior items. Lowering must prevent future items from writing early while ensuring completed items retain the state needed by a following hold or atom. This normalization is a sequence invariant, not an atom-authoring burden.

### React factory and execution strategies

The factory should return a `ForwardRefComponent`, safely merge the child's ref, use Fluent's target-document infrastructure, and drive one persistent child. The React adapter should reuse the existing motion stack—behavior context, reduced-motion resolution, `useAnimateAtoms`, WAAPI handle/cancellation behavior, and `replayKey` conventions—rather than introduce a parallel runtime.

The compiler may lower to:

1. one native WAAPI effect when clips flatten cleanly;
2. coordinated WAAPI animations on one element for independent channels;
3. a small serial runner if native flattening cannot preserve atom semantics.

The authoring model should not reveal which strategy was selected. The atom array is source input; compiled/runtime objects are derived and disposable.

### Accessibility and reduced motion

Persistent identity can preserve focus, selection, uncontrolled state, live-region identity, and assistive-technology relationships. It does not solve semantic visibility: opacity zero does not remove content from the accessibility tree, and `hidden`, `inert`, focus movement, and unmounting belong to component/presence policy.

Recommended default under reduced motion:

1. resolve the intended final visual state immediately or near-immediately;
2. preserve whole-sequence completion semantics without decorative elapsed delays;
3. suppress infinite repetition;
4. allow explicitly essential atoms to provide reduced alternatives;
5. do not require duplication of the entire sequence.

The current atom-level 1 ms fallback is a base, but sequence scope must also collapse holds and suppress infinite iteration.

## Additional strategy proposals

### One precompiled WAAPI effect

Simple single-target sequences can concatenate keyframes into one effect; a hold becomes equal-valued keyframes separated in time. This preserves one target and native controls. Markers need separate scheduling, transform subchannels require careful lowering, and runtime-dependent atom functions may prevent precomputation. It is a promising compiler target, not necessarily an authoring API.

### Hook/imperative controller

```tsx
const sequence = useMotionSequence(definition);
return <div ref={sequence.targetRef}>...</div>;
```

This makes persistent binding explicit and supports advanced control, but exposes ref and lifetime plumbing. Use it beneath the factory and possibly as a power-user escape hatch.

### Multi-layer timeline host

```tsx
<MotionTimeline definition={timeline} bindings={{ title, photo1, photo2 }} />
```

This is the eventual shape for After Effects-like choreography if opaque target bindings remain separate from data. It needs target registration, layer lifetime, shared seeking, overlap/conflict policy, stacking, and possibly heterogeneous adapters. Prototype it separately after the single-target IR proves useful.

## One schema or layered APIs?

A universal schema could put `target` on every step and represent one-target sequences as one-layer timelines. That would force simple enter-hold-exit use cases to understand persisted schemas, registries, layer identity, stacking, and conflict semantics. Presence still does not fit because mounting is not merely a channel.

Completely unrelated implementations avoid that complexity but duplicate atom lowering, timing validation, reduced-motion transforms, and playback infrastructure.

### Recommendation: focused APIs over a shared internal IR

Use three public contracts:

1. `createSequenceFromAtoms()` — a serial atom/hold array bound to one child target;
2. `MotionTimelineDefinition` — explicit layers/targets and a separate host;
3. existing presence definitions/components — visibility lifecycle.

The first two compile to a shared internal schedule:

```ts
interface ScheduledMotionIR {
  readonly durationMs: number;
  readonly targets: readonly {
    readonly target: string;
    readonly clips: readonly CompiledPlacedClip[];
  }[];
}
```

An atom sequence lowers with an implicit `"$child"` target; a timeline supplies explicit keys. Both can eventually reuse atom lowering, timing resolution, conflict diagnostics, and reduced-motion transforms without forcing one public mental model or one public schema.

## How Penner informs—but does not dictate—the design

### Adopt these lessons

1. **Derived runtime forms.** Atom arrays can compile into disposable schedules/effects rather than exposing playback machinery. Penner applies the same principle to serialized definitions and compiled caches; see the [format/engine decision](https://github.com/robertpenner/penner/blob/main/docs/decisions/motion-format-engine-split.md).
2. **Definition/runtime separation.** Validation, fill normalization, and lowering should not own React lifetime or the playback clock.
3. **Persistent target identity.** A sequence has one implicit child target; a later multi-target format needs opaque target keys resolved by adapters.
4. **Layer/channel structure belongs to timelines.** Multi-target authoring needs per-target grouping and per-channel timing, but the first atom sequence does not.
5. **Hybrid timing is a later timeline concern.** Real durations define spans while normalized offsets preserve reusable motion shape; both appear in Penner's [channel types](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/channels.ts).
6. **Holds are stateful data**, not empty timeout gaps.
7. **Boundary validation.** Penner builders reject invalid timing; Fluent's first compiler should similarly report item-indexed diagnostics. See [protocol source](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/data/protocol.ts) and [tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/data/protocol.test.ts).
8. **Sequence and concurrence are distinct axes.** This supports serial top-level items and a future explicit `parallel` item rather than ambiguous arrays. See [Composition Book II](https://github.com/robertpenner/penner/blob/main/packages/elements-of-motion/3-composition/books/book-2-the-three-combinations.md).
9. **Continuity belongs at seams.** Adjacent atoms may need $C^0$ value agreement; $C^1$ velocity agreement is stronger and not free.

### Do not copy these blindly

1. Penner `Composition` is an editor/codegen model with paths, contributors, modifiers, arbitrary channels, and heterogeneous adapters—far more than a React factory needs.
2. Its current `CompositionSequence` serially sequences whole compositions and holds; it is evidence for cursor and hold semantics, not a ready-made Fluent atom API.
3. Its evaluator/backends serve DOM, workers, Canvas, SDF, and code generation. Fluent's first adapter can be React + WAAPI focused.
4. Penner needs persistence, workers, and editor interchange. Fluent should not require a serializable registry format until a product use case needs one.
5. Penner's “voice/concurrence/superposition” vocabulary is precise theory; Fluent can expose approachable target/channel/layer terminology while preserving the distinctions.
6. React presence owns mount/unmount and interruptible visibility, which cannot be reduced to value channels alone.

## Decision matrix

| Approach                           | Persistent target     | JSON portable | Serial ergonomics | Absolute overlap | Multiple targets       | Presence lifecycle | Cost        | Role                       |
| ---------------------------------- | --------------------- | ------------- | ----------------- | ---------------- | ---------------------- | ------------------ | ----------- | -------------------------- |
| Direct JSX `<Sequence>`            | Unproven              | No            | High              | Low              | Subtree switching only | Low                | Low         | Exploration/escape hatch   |
| Current JSX factory                | Unproven              | No            | High              | Low              | No                     | Low                | Low         | Compatibility experiment   |
| Atom-array sequence factory        | **Yes by contract**   | Not required  | **High**          | Low initially    | No                     | Low                | Low/medium  | **Primary next prototype** |
| Optional persisted-format resolver | Yes after resolution  | **High**      | Medium            | Format-dependent | No or later            | Low                | Medium/high | Later product layer        |
| Flattened WAAPI effect             | Yes                   | Derived only  | Compiler target   | Medium           | No                     | Low                | Medium      | Execution strategy         |
| Hook/controller                    | Yes                   | Input can be  | Medium            | Future           | One per hook           | Low                | Medium      | Runtime/power-user seam    |
| Multi-layer host                   | Yes per binding       | High          | Medium            | High             | **High**               | Low                | Very high   | Separate later prototype   |
| Existing presence                  | Usually while mounted | Partial       | Low for 3+ steps  | Low              | One target             | **High**           | Established | Visibility lifecycle       |

No benchmark supports relative performance stars from the old document; they have been removed.

## Use-case recommendations

| Use case                                            | Direction                             | Reason                                         |
| --------------------------------------------------- | ------------------------------------- | ---------------------------------------------- |
| Enter → hold → exit on one card without state reset | Atom-array sequence factory           | One persistent child, direct existing atoms    |
| Replay one effect on the same node                  | Existing motion component `replayKey` | Already promises DOM continuity                |
| Show/hide dialog or toast with optional unmount     | Existing presence component           | Visibility is the source of truth              |
| Slideshow with different content per phase          | Direct JSX or purpose-built carousel  | Replacement is intentional                     |
| Title plus photos with overlap/stagger              | Multi-layer timeline prototype        | Several targets share one clock                |
| Programmatically generated sequence                 | Atom-array sequence factory           | Arrays are easy to construct and validate      |
| Persist/export a preset                             | Later persisted format + resolver     | Stable IDs/registries belong at this boundary  |
| Dynamic conditional control flow                    | Hook/controller or React state        | Do not pretend duration is statically portable |
| Simultaneous properties on one element              | Existing concurrent atom array        | Already supported by motion components         |

## Evolution path

### Phase 0: characterize current behavior

- Test exact node identity, focus/state preservation, callback order, finite/infinite iteration, hold cleanup, child reordering, and Strict Mode.
- Correct example iteration spelling when implementation work begins.
- Stop presenting `Scene` as richer than a `Hold` alias.

### Phase 1: pure compiler

- Implement `SequenceItem`, index-based validation, serial cursor resolution, fill normalization, and diagnostics.
- Cover direct `AtomMotion` values and `SequenceHold` only.
- Compile serial input to absolute intervals without defining a public persisted schema.
- Keep it experimental and non-public.

### Phase 2: persistent-target adapter

- Add experimental `createSequenceFromAtoms()` beside—not overloaded onto—the JSX factory.
- Bind one element and verify identity/focus through steps and iterations.
- Reuse behavior context, Fluent target-document access, atom reduction, and WAAPI handles.
- Compare flattened-effect and coordinated-effect execution.

### Phase 3: compatibility

- Rewrite presence-centric preview atoms toward neutral `from`/`to` endpoints where sequence reuse requires it.
- Consider an explicit `parallel` sequence item only if same-target concurrent phases are needed.
- Retain direct JSX for intentional subtree switching, potentially under a more precise name.

### Phase 4: controls and optional persisted features

- Add pause/play/seek/reverse only after hold, cancellation, and whole-sequence iteration semantics are deterministic.
- Add a persisted-format resolver, stable IDs, registries, or events only for demonstrated product requirements.
- Decide fractional iteration and dynamic-definition updates from prototype evidence.

### Phase 5: choreography exploration

- Start from title/photo production use cases.
- Add `Timeline → Layer → Clip` over the shared IR.
- Establish binding, lifetime, stacking, missing-target, heterogeneous-renderer, and scrubbing semantics before public JSX.

## Prototype and test questions

### Identity and React

1. Is the exact DOM node (`===`) preserved through every step/iteration?
2. Are focus, selection, uncontrolled input state, and descendant state preserved?
3. How are child/factory refs composed, and what happens if child type/key changes?
4. Does Strict Mode cause duplicate effects/events?
5. Can SSR return the child without DOM access?

### Timing, holds, and continuity

1. Are zero-duration items deterministic?
2. Does hold preserve the computed terminal state exactly?
3. What does a leading hold preserve: no write, inline style, or computed style?
4. Does normalized fill prevent delayed atoms from writing before their serial turn?
5. Does an atom's terminal state survive until the next atom begins?
6. Can adjacent-atom $C^0$ mismatches be diagnosed?
7. Is $C^1$ only documented/diagnosed, or ever repaired?

### Lifecycle and optional events

1. Exactly when do whole-sequence start, finish, and cancel fire?
2. What if a handler synchronously unmounts/restarts the runner?
3. Are duplicate native finishes idempotent?
4. Does `replayKey` restart without replacing the target node?
5. What demonstrated use case would justify item events or markers?

### Iteration

1. Are `0`, negative, fractional, `NaN`, and `Infinity` accepted?
2. Is count snapshotted or reactive?
3. Does the boundary restore initial state without a flash or remount?
4. Does each iteration restart the entire atom/hold schedule, and how does alternate direction affect it?
5. Are infinite loops suppressed under reduced motion?

### Validation and optional persistence

1. Do invalid atoms, invalid holds, nonfinite timing, and unsupported values yield stable item-indexed diagnostic codes?
2. Does fill normalization prevent delayed future atoms from clobbering prior state?
3. Can one compiled atom array safely serve many mounted instances?
4. What concrete use case would justify a JSON schema, stable IDs, registry versions, or migration?
5. If a persisted format is added later, does its resolver produce the same `SequenceItem[]` semantics as direct authoring?

### Accessibility

1. Can visually hidden content remain focusable/invisible?
2. Can a hold delay essential operability or announcements?
3. Is final state prompt under reduced motion?
4. Are decorative loops stopped when reduced/hidden?
5. Do presence/unmount decisions remain with the owning component?

### Multi-target boundary

1. Does the first use case truly require cross-target overlap?
2. Are target keys bound to existing nodes, adapter-rendered layers, or both?
3. Who owns layer lifetime and missing-target diagnostics?
4. Is list order paint order, temporal order, or neither?
5. Can all layers be evaluated at arbitrary $t$ for scrubbing?
6. When is visibility a channel versus React presence?

## Recommendation

Prototype an **atom-array-first single-target sequence factory** and make persistent target identity its defining contract. Accept `SequenceItem = AtomMotion | SequenceHold`, interpret the top-level array serially, compile by array index, normalize fill, preserve prior state through holds, and define iteration and reduced motion at whole-sequence scope. Reuse the existing React motion infrastructure.

Do not make the current JSX factory the long-term source of truth, though preserve its “define once, pass one child” ergonomics. Keep direct JSX for intentional content switching. Keep multi-target timelines and presence separate. Treat JSON portability, registries, stable IDs, events, and a persisted schema as optional later layers rather than prerequisites for the first API.

Use Penner as evidence for serial cursor semantics, stateful holds, iteration scope, validation, lowering, and the definition/runtime seam—not as a registry-heavy API to copy wholesale.

## Sources examined

### Fluent UI

- [`Sequence`, `createSequenceComponent`, `Hold`, `Scene`](../library/src/choreography/Sequence/Sequence.tsx)
- [Sequence props](../library/src/choreography/Sequence/sequence-types.ts)
- [Sequence state/iteration](../library/src/choreography/Sequence/useSequenceAnimation.tsx)
- [Child mapping](../library/src/choreography/Sequence/utils/getSequenceChildMapping.ts)
- [Default story](../stories/src/choreography/Sequence/SequenceDefault.stories.tsx)
- [Earlier carousel story](../stories/src/CarouselInSteps/CarouselStep4.stories.tsx)
- [Current carousel sequence story](../stories/src/CarouselInSteps/CarouselStep4_Sequence.stories.tsx)
- [Motion component factory](../../react-motion/library/src/factories/createMotionComponent.ts)
- [Presence factory](../../react-motion/library/src/factories/createPresenceComponent.ts)
- [Motion/atom types](../../react-motion/library/src/types.ts)
- [WAAPI atom runner](../../react-motion/library/src/hooks/useAnimateAtoms.ts)
- [Reduced-motion hook](../../react-motion/library/src/hooks/useIsReducedMotion.ts)
- [Motion introduction](../../react-motion/stories/src/Introduction/index.mdx)

### Penner motion-format and architecture

- [motion-format context](https://github.com/robertpenner/penner/blob/main/packages/motion-format/CONTEXT.md)
- [Composition layers](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/layers.ts)
- [Channels/keyframes/cycles](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/channels.ts)
- [Composition sequence/hold](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/sequence.ts)
- [Composition evaluator](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/evaluate.ts)
- [Sequence evaluator tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/evaluate.test.ts)
- [Composition lowering](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/lowerCompositionToEffects.ts)
- [Lowering tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/lowerCompositionToEffects.test.ts)
- [Stagger-window choreography](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/choreography.ts)
- [Choreography tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/choreography.test.ts)
- [Protocol types](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/data/protocol.ts)
- [Protocol tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/data/protocol.test.ts)
- [Format/engine split](https://github.com/robertpenner/penner/blob/main/docs/decisions/motion-format-engine-split.md)
- [Heterogeneous adapters](https://github.com/robertpenner/penner/blob/main/docs/decisions/heterogeneous-composition-layer-adapters.md)
- [Flat parent bindings](https://github.com/robertpenner/penner/blob/main/docs/decisions/flat-composition-parent-bindings.md)
- [Whole-composition looping](https://github.com/robertpenner/penner/blob/main/docs/decisions/whole-composition-looping-via-hold-keyframe.md)
- [Phrase editor context](https://github.com/robertpenner/penner/blob/main/apps/phrase-editor/CONTEXT.md)

### Penner motion theory

- [Composition Book II](https://github.com/robertpenner/penner/blob/main/packages/elements-of-motion/3-composition/books/book-2-the-three-combinations.md)
- [Motion algebra operators](https://github.com/robertpenner/penner/blob/main/research/motion-algebra/research/topics/easing-algebra/03-operators-compositions-and-laws.md)

## Uncertainties retained intentionally

- No Fluent sequence test proves whether unlike outer motion steps preserve or replace the DOM node.
- The best runner—flattened effect, coordinated effects, or master clock—requires a prototype.
- Transform-subchannel overlap remains unresolved.
- Event semantics under seek, reverse, alternate direction, and reduction remain unresolved.
- Fractional whole-sequence iteration remains unresolved.
- A public multi-layer timeline is not justified by enough production cases yet.
- Penner's context includes shipped facts and forward-looking sections; implemented claims above were cross-checked against source/tests, while heterogeneous-host material is cited as accepted direction rather than current Fluent capability.
