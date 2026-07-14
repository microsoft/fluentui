# Motion sequence and choreography strategies

**Date:** July 14, 2026
**Branch examined:** `feat/sequence`
**Status:** Research and design recommendation; not an implementation commitment

## Executive summary

The current experiment contains three useful but different API shapes: direct JSX `<Sequence>` children, a `createSequenceComponent()` factory that injects one child into several motion elements, and visibility-driven presence components. Presence is not a sequence strategy. More importantly, the examples currently mix two domains under “sequence”:

- **single-target motion sequence** — consecutive or overlapping motion segments acting on one persistent target element;
- **multi-target choreography/timeline** — layers or targets coordinated on a shared clock, closer to an After Effects composition.

These domains should share timing and motion-description primitives, but not one undifferentiated public authoring API. Presence should remain a third, lifecycle-oriented API.

The recommended next prototype is a **POJO-first single-target sequence definition** passed to a factory that returns a React component. The definition should be serializable, validated before playback, and independent of React. The component adapter should bind the definition to exactly one persistent child element. A separate layered timeline API can later reuse the same internal clips, timing placements, target keys, and event markers.

This is an evolutionary recommendation, not a public-API commitment: retain the JSX experiment while measuring it, prototype the POJO compiler and persistent-node adapter behind an experimental factory, and defer a public multi-layer timeline until production use cases justify it.

## Reading rules

- **Current fact** means verified against local source, tests, stories, or accepted local architecture records.
- **Proposal** means a design option that does not exist in the examined Fluent UI source.

Penner sources are comparative primary sources, not proposed Fluent UI dependencies. The sibling repository's verified `origin` is `github.com/robertpenner/penner`, and its examined branch is `main`.

## Vocabulary and taxonomy

| Term                | Definition                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Target**          | Persistent identity receiving animated values. Portable data uses an opaque key rather than a DOM reference. |
| **Channel**         | One animatable quantity of a target, such as opacity, translation, scale, or rotation.                       |
| **Keyframe**        | A value anchor at a time or normalized offset.                                                               |
| **Segment**         | The interval between adjacent keyframes on a channel. Easing applies to the outgoing segment.                |
| **Motion clip**     | A bounded motion description with channels/keyframes and timing.                                             |
| **Step**            | A single-target authoring item: motion clip, hold, or event marker, with a stable authored ID.               |
| **Hold**            | Time during which prior resolved state remains unchanged. It is data, not absence.                           |
| **Placement**       | Serial placement after the prior item or placement at an absolute time.                                      |
| **Iteration**       | Repetition of an explicitly scoped span: whole sequence, clip, layer, or channel.                            |
| **Runtime adapter** | Code binding portable data to React/WAAPI targets, refs, clocks, cancellation, and callbacks.                |

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

**Strengths:** content is supplied once, patterns are reusable, and a future data-first factory can preserve the useful “define, then render” workflow.

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

**Current fact.** [`Hold`](../library/src/choreography/Sequence/Sequence.tsx) renders children unchanged and schedules completion through `useTimeout()`. Its effect reschedules when `duration` or callback dependencies change. That is not inherently a bug; desired mid-hold updates simply need a contract. A portable hold should eventually compile to timeline state rather than necessarily remaining a timer component.

### Keys

**Current fact.** The JSX factory uses authored element keys or array indices. Prefixing an index with `"motion-"` would still be positional and would not create stable identity. A data-first design should require explicit step IDs.

### `Scene`

**Current fact.** `Scene` is exactly an alias of `Hold`; it is not a composition, layer collection, shared clock, or parallel scheduler. Reserve `Scene` or `Timeline` for actual multi-target orchestration and keep `Hold` for elapsed constant state.

### Motion components, atoms, and reduced motion

**Current fact.** Stable [`createMotionComponent`](../../react-motion/library/src/factories/createMotionComponent.ts) intentionally accepts an optional child, binds one or more atoms to one resolved child element, and returns the resolved child. It supports `replayKey` specifically to rerun motion without remounting the DOM subtree.

[`AtomMotion`](../../react-motion/library/src/types.ts) is mostly data-shaped—keyframes, timing, and an optional reduced-motion override—but atom functions receive a live `HTMLElement`, and native keyframe values are not a repository-owned JSON schema. “Atom” is therefore not automatically synonymous with “portable serialized definition.”

[`useAnimateAtoms`](../../react-motion/library/src/hooks/useAnimateAtoms.ts) defaults reduced motion to 1 ms unless an atom overrides it. [`useIsReducedMotion`](../../react-motion/library/src/hooks/useIsReducedMotion.ts) obtains the target window through Fluent context. A sequence-level policy must additionally collapse holds and infinite iteration; otherwise 1 ms clips can still be separated by long timer delays.

---

## Primary proposal: POJO-first single-target sequence factory

Everything in this section is a **proposal**.

### Goals and boundaries

1. Plain data—not React elements or component constructors—is the source of truth.
2. Registered motion references and literal keyframes can survive JSON serialization.
3. Stable authored IDs survive insertion, reordering, diagnostics, telemetry, and editor round-trips.
4. One React child is bound once and remains the same target through every step.
5. Serial timing stays concise while absolute placement and overlap remain possible.
6. Holds and event markers are explicit union members.
7. Functions, refs, clocks, and DOM objects stay in the runtime adapter.
8. Reduced motion is defined at sequence scope, including holds and iteration.
9. Validation returns step-addressable diagnostics before playback.

### Concrete data sketch

```ts
type SequenceStepId = string;
type MotionRefId = string;
type SequenceEventName = string;

type StepPlacement =
  | { readonly mode: 'afterPrevious'; readonly offsetMs?: number }
  | { readonly mode: 'at'; readonly timeMs: number };

type SerializableMotion =
  | {
      readonly kind: 'motionRef';
      readonly motionId: MotionRefId;
      readonly params?: Readonly<Record<string, boolean | number | string>>;
    }
  | {
      readonly kind: 'keyframes';
      readonly keyframes: readonly Readonly<Record<string, boolean | number | string | null>>[];
      readonly easing?: string;
    };

interface StepBase {
  readonly id: SequenceStepId;
  readonly placement?: StepPlacement; // default: afterPrevious
}

interface AnimateStep extends StepBase {
  readonly kind: 'animate';
  readonly durationMs: number;
  readonly motion: SerializableMotion;
  readonly channels?: readonly string[];
  readonly emit?: readonly SequenceEventName[];
}

interface HoldStep extends StepBase {
  readonly kind: 'hold';
  readonly durationMs: number;
  readonly emit?: readonly SequenceEventName[];
}

interface EventStep extends StepBase {
  readonly kind: 'event';
  readonly event: SequenceEventName;
}

type MotionSequenceStep = AnimateStep | HoldStep | EventStep;

interface MotionSequenceDefinition {
  readonly schemaVersion: 1;
  readonly kind: 'singleTargetSequence';
  readonly id: string;
  readonly steps: readonly MotionSequenceStep[];
  readonly playback?: {
    readonly iterations?: number;
    readonly direction?: 'normal' | 'reverse' | 'alternate';
  };
  readonly reducedMotion?: {
    readonly mode: 'finishImmediately' | 'preserveEssential';
    readonly essentialStepIds?: readonly SequenceStepId[];
  };
}
```

The public schema should be narrower than all of `KeyframeEffectOptions`: admit only fields whose validation, serialization, cross-browser behavior, and reduced-motion semantics Fluent UI is willing to own. The compiled internal form can be richer.

Discriminated unions make handling exhaustive. A hold is not “an atom with duration but no keyframes,” and an event cannot accidentally acquire animation options. Promise waits and arbitrary predicates should remain runtime orchestration: they make total duration unknowable and serialization misleading.

### Stable step identity

Every sequence and step should require an authored ID. Array indices cannot reliably support:

- patching after insertion/reordering;
- diagnostics such as `steps["settle"].durationMs`;
- event/telemetry correlation;
- schema migration;
- reduced-motion selection;
- deterministic ties among simultaneous markers.

Validation must reject duplicate IDs. A development helper may generate IDs for a literal, but persisted definitions should contain resolved IDs.

### Persistent target identity

A single-target definition should not repeat a target key on every step. The factory's child binding supplies it:

```tsx
const CardSequence = createMotionSequenceComponent(cardSequence, { motionRegistry });

<CardSequence onSequenceEvent={handleSequenceEvent}>
  <Card />
</CardSequence>;
```

The adapter resolves one element, composes refs, and keeps that element mounted. Steps operate on animation effects/handles rather than alternate React wrappers.

A multi-target timeline instead needs explicit opaque identity:

```ts
interface TimelineLayer {
  readonly id: string;
  readonly target: string;
  readonly clips: readonly PlacedMotionClip[];
}
```

The runtime separately binds target keys to elements or component adapters. Portable data must not contain `HTMLElement`, React refs, selector closures, or component constructors.

### Serial, absolute, and overlapping timing

`afterPrevious` advances a serial cursor; signed `offsetMs` permits a gap or overlap relative to the prior end. `at` places an item at absolute master time. Compilation resolves every step to `[startMs, endMs]` and uses `(startMs, authored order, id)` for deterministic ties.

```ts
const cardSequence: MotionSequenceDefinition = {
  schemaVersion: 1,
  kind: 'singleTargetSequence',
  id: 'card-intro',
  steps: [
    {
      id: 'enter',
      kind: 'animate',
      durationMs: 240,
      motion: { kind: 'motionRef', motionId: 'slide-fade-in', params: { fromY: 12 } },
      channels: ['translateY', 'opacity'],
      emit: ['entered'],
    },
    { id: 'read', kind: 'hold', durationMs: 800 },
    {
      id: 'settle-scale',
      kind: 'animate',
      placement: { mode: 'afterPrevious', offsetMs: -80 },
      durationMs: 180,
      motion: { kind: 'motionRef', motionId: 'scale-to-one' },
      channels: ['scale'],
    },
    {
      id: 'ready-marker',
      kind: 'event',
      placement: { mode: 'at', timeMs: 960 },
      event: 'ready',
    },
  ],
};
```

Different-channel overlap is straightforward. Same-target, same-channel overlap is not. The first prototype should reject it unless an explicit composition mode (`replace`, `add`, or `accumulate`) exists. Silent last-write-wins makes output depend on lowering details. Registry entries should declare channels; unknown channels conservatively conflict with all channels.

### Holds

Hold means “preserve state at this interval's start.” It should compile to timeline/keyframe state rather than necessarily to a JavaScript timer, enabling seek, reverse, reduction, and clock alignment.

Penner's implemented `CompositionSequence` is useful evidence: `composition` and `hold` are discriminated items; its builder computes `startMs`/`endMs`; its evaluator freezes the previous clip's terminal value; and lowering emits an equal-valued trailing keyframe. It rejects a leading hold because no prior composition state exists. See [sequence types/builder](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/sequence.ts), [evaluation tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/evaluate.test.ts), and [lowering tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/lowerCompositionToEffects.test.ts).

Fluent should not copy that restriction blindly. An initial single-target hold could mean “leave the child's current style unchanged,” but computed/inline/snapshot semantics must be specified.

### Serialization boundary, events, and callbacks

Portable data contains event names, not functions. The adapter owns handlers:

```ts
interface MotionSequenceComponentProps {
  children: React.ReactElement;
  onSequenceEvent?: (
    event: null,
    data: { sequenceId: string; stepId: string; name: string; iteration: number },
  ) => void;
  onMotionFinish?: (event: null) => void;
  onMotionCancel?: (event: null) => void;
}
```

The contract must define start-vs-end events, simultaneous ordering, seek/reverse replay, cancellation, reduced-motion delivery, and exception isolation.

Runtime-dependent motions cross a registry boundary:

```ts
interface MotionRegistryEntry {
  readonly channels: readonly string[];
  resolve(params: Readonly<Record<string, boolean | number | string>>): AtomMotion | readonly AtomMotion[];
}
```

The registry is nonserializable code. `motionId` and primitive params are portable. Unknown IDs fail validation before playback. This follows the useful Penner stance that [`SerializedKfxKeyframeEffect`](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/data/protocol.ts) is primary while function-bearing compiled/runtime forms do not cross the wire.

### Iteration

Initial semantics should be whole-sequence and WAAPI-like: default `1`; accept only specified positive finite values and `Infinity`; decide fractional support explicitly; never finish an uncancelled infinite run; include documented iteration numbering in events; and do not synthesize completion on cancellation.

Per-step/per-channel cycling is a separate axis. Penner's accepted looping decision likewise distinguishes whole-composition repetition from per-channel cycles. See [Looping via a Uniform Hold-Keyframe Model](https://github.com/robertpenner/penner/blob/main/docs/decisions/whole-composition-looping-via-hold-keyframe.md).

### Validation and compilation

```ts
type SequenceDiagnostic = {
  readonly code: string;
  readonly severity: 'error' | 'warning';
  readonly stepId?: string;
  readonly message: string;
};

type CompiledMotionSequence = {
  readonly id: string;
  readonly durationMs: number;
  readonly steps: readonly {
    readonly id: string;
    readonly startMs: number;
    readonly endMs: number;
    readonly kind: MotionSequenceStep['kind'];
  }[];
};

function compileMotionSequence(
  definition: MotionSequenceDefinition,
  registry: MotionRegistry,
): { ok: true; value: CompiledMotionSequence } | { ok: false; diagnostics: readonly SequenceDiagnostic[] };
```

Minimum validation covers schema version/kind; nonempty unique IDs; finite non-negative times/durations; iteration values; known registry references; serializable params/keyframes; arithmetic overflow; per-channel overlap; supported easing; valid reduced-motion references; and deterministic event ties. Return structured diagnostics rather than silently clamping authoring input.

### React factory and execution strategies

The factory should return a `ForwardRefComponent`, safely merge the child's ref, use Fluent's target-document infrastructure, and drive one child element. It may compile to:

1. one native WAAPI effect when clips flatten cleanly;
2. coordinated WAAPI animations on one element for independent channels;
3. a small master-clock runner when markers or unsupported placement demand it.

The authoring model should not reveal which strategy was selected. Portable source data is primary; compiled/runtime objects are derived and disposable.

### Accessibility and reduced motion

Persistent identity can preserve focus, selection, uncontrolled state, live-region identity, and assistive-technology relationships. It does not solve semantic visibility: opacity zero does not remove content from the accessibility tree, and `hidden`, `inert`, focus movement, and unmounting belong to component/presence policy.

Recommended default under reduced motion:

1. resolve the intended final visual state immediately or near-immediately;
2. preserve semantic event order without decorative elapsed delays;
3. suppress infinite repetition;
4. allow explicitly essential steps to provide reduced alternatives;
5. do not require duplication of the entire sequence.

The current atom-level 1 ms fallback is a base, but sequence scope must also collapse holds and repeated events.

## Additional strategy proposals

### Atom-array input adapter

An atom array is more programmatic than JSX and aligns with Fluent's low-level layer:

```tsx
const CardSequence = createSequenceFromAtoms([
  slideAtom({ fromX: '-20px', duration: 200 }),
  { kind: 'hold', durationMs: 400 },
  fadeAtom({ duration: 150 }),
]);
```

Raw atoms alone do not provide stable IDs, portable function boundaries, target identity, markers, absolute placement, or validation. Treat this as input to the POJO IR, not a second equal model. Do not claim every atom is serializable: atom functions may receive a live element.

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

A universal schema could put `target` on every step and represent one-target sequences as one-layer timelines. That yields one validator but forces simple enter-hold-exit use cases to understand registries, layer identity, stacking, and conflict semantics. Presence still does not fit because mounting is not merely a channel.

Completely unrelated schemas avoid that complexity but duplicate clips, easing, placement, event markers, validation, and lowering.

### Recommendation: focused APIs over a shared internal IR

Use three public contracts:

1. `MotionSequenceDefinition` — one factory-bound target;
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
  readonly events: readonly CompiledEventMarker[];
}
```

A sequence lowers with an implicit `"$child"` target; a timeline supplies explicit keys. Both reuse motion clips, timing resolution, conflict diagnostics, event ordering, and reduced-motion transforms without forcing one public mental model.

## How Penner informs—but does not dictate—the design

### Adopt these lessons

1. **POJO-first source of truth.** Serialized data is primary; live compiled objects are derived caches. See the [format/engine decision](https://github.com/robertpenner/penner/blob/main/docs/decisions/motion-format-engine-split.md).
2. **Data/runtime separation.** Definition, validation, normalization, and lowering should not own the playback clock.
3. **Opaque target identity.** Data names targets; adapters resolve them.
4. **Layer/channel structure.** Multi-target authoring needs per-target grouping and per-channel timing.
5. **Hybrid timing.** Real durations define spans while normalized offsets preserve reusable motion shape; both appear in Penner's [channel types](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/language/composition/channels.ts).
6. **Holds are stateful data**, not empty timeout gaps.
7. **Boundary validation.** Penner builders reject invalid timing, and worker envelopes use discriminated unions and runtime guards. See [protocol source](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/data/protocol.ts) and [tests](https://github.com/robertpenner/penner/blob/main/packages/motion-format/src/data/protocol.test.ts).
8. **Sequence and concurrence are distinct axes.** Same-target temporal concatenation is not all choreography. See [Composition Book II](https://github.com/robertpenner/penner/blob/main/packages/elements-of-motion/3-composition/books/book-2-the-three-combinations.md).
9. **Continuity belongs at seams.** Adjacent clips may need $C^0$ value agreement; $C^1$ velocity agreement is stronger and not free.

### Do not copy these blindly

1. Penner `Composition` is an editor/codegen model with paths, contributors, modifiers, arbitrary channels, and heterogeneous adapters—far more than a React factory needs.
2. Its current `CompositionSequence` serially sequences whole compositions and holds; it is not a ready-made overlapping Fluent step model.
3. Its evaluator/backends serve DOM, workers, Canvas, SDF, and code generation. Fluent's first adapter can be React + WAAPI focused.
4. Parts of Penner's in-memory model permit functions with documented resolver boundaries. Fluent should begin with a narrow serializable subset.
5. Penner's “voice/concurrence/superposition” vocabulary is precise theory; Fluent can expose approachable target/channel/layer terminology while preserving the distinctions.
6. React presence owns mount/unmount and interruptible visibility, which cannot be reduced to value channels alone.

## Decision matrix

| Approach                | Persistent target     | Portable data               | Serial ergonomics | Absolute overlap | Multiple targets       | Presence lifecycle | Cost        | Role                       |
| ----------------------- | --------------------- | --------------------------- | ----------------- | ---------------- | ---------------------- | ------------------ | ----------- | -------------------------- |
| Direct JSX `<Sequence>` | Unproven              | No                          | High              | Low              | Subtree switching only | Low                | Low         | Exploration/escape hatch   |
| Current JSX factory     | Unproven              | No                          | High              | Low              | No                     | Low                | Low         | Compatibility experiment   |
| POJO-first factory      | Yes by contract       | High with registry boundary | High              | Medium/high      | No publicly            | Low                | Medium      | **Primary next prototype** |
| Atom-array adapter      | Possible              | Medium                      | High              | Medium           | No                     | Low                | Medium      | Input adapter              |
| Flattened WAAPI effect  | Yes                   | High after lowering         | Compiler target   | Medium           | No                     | Low                | Medium      | Execution strategy         |
| Hook/controller         | Yes                   | Definition can be           | Medium            | High             | One per hook           | Low                | Medium      | Runtime/power-user seam    |
| Multi-layer host        | Yes per binding       | High                        | Medium            | High             | High                   | Low                | Very high   | Separate later prototype   |
| Existing presence       | Usually while mounted | Partly data-shaped          | Low for 3+ steps  | Low              | One target             | **High**           | Established | Visibility lifecycle       |

No benchmark supports relative performance stars from the old document; they have been removed.

## Use-case recommendations

| Use case                                            | Direction                             | Reason                                         |
| --------------------------------------------------- | ------------------------------------- | ---------------------------------------------- |
| Enter → hold → exit on one card without state reset | POJO-first factory                    | One persistent child, reusable data            |
| Replay one effect on the same node                  | Existing motion component `replayKey` | Already promises DOM continuity                |
| Show/hide dialog or toast with optional unmount     | Existing presence component           | Visibility is the source of truth              |
| Slideshow with different content per phase          | Direct JSX or purpose-built carousel  | Replacement is intentional                     |
| Title plus photos with overlap/stagger              | Multi-layer timeline prototype        | Several targets share one clock                |
| Programmatically generated sequence                 | POJO builder                          | Validation and stable IDs                      |
| Persist/export a preset                             | POJO + registry IDs                   | React values/functions are not portable        |
| Dynamic conditional control flow                    | Hook/controller or React state        | Do not pretend duration is statically portable |
| Simultaneous properties on one element              | POJO absolute placements              | One target; per-channel conflict checking      |

## Evolution path

### Phase 0: characterize current behavior

- Test exact node identity, focus/state preservation, callback order, finite/infinite iteration, hold cleanup, child reordering, and Strict Mode.
- Correct example iteration spelling when implementation work begins.
- Stop presenting `Scene` as richer than a `Hold` alias.

### Phase 1: pure compiler

- Implement types, validation, schedule resolution, diagnostics, and JSON round-trip tests.
- Cover `animate`, `hold`, and `event`.
- Start with serial placement but compile to absolute intervals.
- Keep it experimental and non-public.

### Phase 2: persistent-target adapter

- Add a new experimental factory beside—not overloaded onto—the JSX factory.
- Bind one element and verify identity/focus through steps and iterations.
- Reuse behavior context, Fluent target-document access, atom reduction, and WAAPI handles.
- Compare flattened-effect and coordinated-effect execution.

### Phase 3: compatibility

- Convert only recognized motion definitions into the new IR, or offer explicit `fromAtoms()` input.
- Warn when closures/React elements make a definition nonportable.
- Retain direct JSX for intentional subtree switching, potentially under a more precise name.

### Phase 4: overlap and controls

- Add absolute/negative-relative placement and channel conflict diagnostics.
- Add pause/play/seek/reverse only after event semantics are deterministic.
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

1. Are zero-duration and simultaneous-marker schedules deterministic?
2. Does hold preserve the computed terminal state exactly?
3. What does a leading hold preserve: no write, inline style, or computed style?
4. How do transform subchannels overlap without clobbering `transform`?
5. Are same-channel overlaps rejected, composed, or prioritized?
6. Can literal-keyframe $C^0$ mismatches be diagnosed?
7. Is $C^1$ only documented/diagnosed, or ever repaired?

### Events and lifecycle

1. Exactly when do start, marker, step-end, finish, and cancel fire?
2. What if a handler synchronously unmounts/restarts the runner?
3. Are duplicate native finishes idempotent?
4. Does seek/reverse replay markers?
5. Which events survive reduced-motion collapse?

### Iteration

1. Are `0`, negative, fractional, `NaN`, and `Infinity` accepted?
2. Is count snapshotted or reactive?
3. Does the boundary restore initial state without a flash or remount?
4. Do markers emit per iteration, and how does alternate direction affect them?
5. Are infinite loops suppressed under reduced motion?

### Validation and serialization

1. Does JSON round-trip preserve definitions?
2. Do duplicate IDs, unknown refs, invalid easing, nonfinite timing, and unsupported values yield stable diagnostic codes?
3. Can schema and registry versions reject/migrate without React?
4. Can one compiled definition safely serve many mounted instances?

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

Prototype a **POJO-first single-target sequence factory** and make persistent target identity its defining contract. Compile serial sugar to absolute intervals; keep callbacks, refs, registries, and clocks in the adapter; model holds/events explicitly; validate before playback; and define reduced motion at sequence scope.

Do not make the current JSX factory the long-term source of truth, though preserve its “define once, pass one child” ergonomics. Keep direct JSX for intentional content switching. Do not unify sequence, multi-target timeline, and presence into one public schema: use focused APIs over a shared scheduled-motion IR.

Use Penner as evidence for POJO-first data, target/channel structure, holds, validation, lowering, and the data/runtime seam—not as a model to copy wholesale.

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
