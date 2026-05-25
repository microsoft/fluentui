# Overflow Northstar

This document is the temporary working document for future overflow changes.

It is not the source of truth for current behavior. Current behavior is described by:

- `overflow-algorithm.md` for the engine
- `react-overflow-react-bridge.md` for the React bridge

This file exists to capture:

- the current architecture decisions
- the desired future state
- the remaining narrow decisions
- the basis for implementation discussions

The long-term goal is to delete this document once its useful conclusions have been absorbed into the two specs.

## Why this work exists

This document is not proposing refactoring for its own sake.

It exists because the current engine and bridge specs already point to concrete problems that the future design should address.

### What the engine spec tells us

The engine spec shows that the current engine:

- couples configuration to observation through `observe(container, options)`
- recomputes aggregate occupied size repeatedly during stabilization
- exposes its results primarily through callback flow instead of stable readable state
- treats registration as add/remove lifecycle rather than as a long-lived controller relationship

Those are not speculative complaints. They are direct consequences of the current engine contract and algorithm shape described in `overflow-algorithm.md`.

### What the bridge spec tells us

The bridge spec shows that the current bridge:

- mirrors engine state into React-owned state
- rebuilds visibility maps on every engine update
- republishes those maps through context
- recreates the engine when options change after first mount
- sometimes causes follow-up engine work through React effects, especially around menu handling

Those are not aesthetic concerns. They are the concrete bridge costs and ownership problems described in `react-overflow-react-bridge.md`.

### What the northstar is trying to solve

The northstar is therefore trying to solve three things that are already documented in the current specs:

1. the engine contract is not stable enough for the bridge to hold onto comfortably
2. the bridge is compensating for engine contract weakness by re-owning and republishing engine state
3. React integration is paying more churn than it should because ownership and lifecycle boundaries are blurry

That is why the desired state in this document is centered on:

- a long-lived, incrementally configurable, readable, and subscribable `OverflowManager`
- a bridge that remains the stable React boundary without re-owning canonical overflow state
- manager-in-context plus selector-based bridge subscriptions

### Success condition

This work is only justified if it removes or materially reduces the specific problems already described in the current specs.

If it does not improve those concrete problems, then it is not a worthwhile migration or refactor.

## Current conclusions

The current research baseline leads to these conclusions:

1. the engine has real cost, especially repeated aggregate measurement and layout-affecting visibility changes
2. the React bridge has real cost, especially mirrored state, map rebuilding, and React subscription churn
3. the bridge should already be the stable boundary for React, but the current engine API may not give it a strong enough contract to play that role well
4. future work should start from clearly stated ownership, subscription, lifecycle, and measurement questions rather than from broad dissatisfaction

## Decision log

### 1. Keep the three-document structure

The current document structure is intentionally:

- `overflow-algorithm.md` for the engine spec
- `react-overflow-react-bridge.md` for the bridge spec
- `overflow-northstar.md` for everything exploratory and temporary

### 2. Keep the bridge as the intended stable React boundary

The current framing is not that React necessarily needs a new permanent adapter layer.

The current framing is that the existing bridge is supposed to be that stable boundary already, and the engine contract may be underdesigned for that role.

### 3. Evolve `OverflowManager` rather than invent a new top-level abstraction name

The target is a future shape of `OverflowManager`, not a separately named controller.

### 4. Store-like behavior is acceptable in the engine if it remains generic

Readable state and generic subscription are acceptable engine concerns as long as they remain host-agnostic and do not make the engine React-shaped.

### 5. Pure construction and paired cleanup are required

The manager should be created in a pure way.

That means construction itself should not require cleanup.

Cleanup should be attached to the specific runtime relationships that are created later:

- observation
- subscription
- item registration
- divider registration
- menu attachment
- container attachment

The normal desired design should not rely on a monolithic `destroy()` to compensate for blurred lifecycle boundaries.

### 6. Converge on the viable engine contract first

The current target is the viable future `OverflowManager`, not the ideal one.

The viable target includes:

- `setOptions()`
- `observe(container)` returning cleanup
- `attachOverflowMenu(element)` returning cleanup
- `registerItem(item)` returning cleanup
- `registerDivider(divider)` returning cleanup
- `getSnapshot()`
- `subscribe()`

### 7. Handle-based registration is ideal, but not required yet

`registerItem(...)->handle.update()/unregister()` and its divider equivalent remain part of the ideal engine surface, but they are not required for the first viable improved state.

### 8. Engine contract work comes before deeper bridge redesign

The next phase should assume that improving the engine contract comes first.

Only after that should we decide how much of the remaining bridge complexity still justifies deeper bridge redesign or ideal-surface expansion.

### 9. The viable transition should be non-breaking at the component level

The viable engine and bridge redesign should be treated as non-breaking at the component level.

Breaking changes should only enter the conversation later if the team intentionally chooses to redesign the public React ergonomics, not as a side effect of fixing the engine contract.

## Desired state

This section captures the current end-state target as a single coherent model.

### 1. Engine

The desired engine state is:

- `OverflowManager` remains the core engine abstraction
- it is long-lived rather than routinely reconstructed
- it is incrementally configurable
- it exposes canonical readable overflow state
- it exposes generic subscription semantics
- it stays host-agnostic and non-React-specific
- its pure construction is separate from all runtime connections
- cleanup is paired with each connection boundary rather than collapsed into a single lifetime method

### Viable future `OverflowManager`

The current convergence target is:

```ts
interface OverflowManager {
  setOptions(options: Partial<OverflowManagerOptions>): void;
  observe(container: HTMLElement): () => void;
  attachOverflowMenu(element: HTMLElement): () => void;

  registerItem(item: OverflowItemEntry): () => void;
  registerDivider(divider: OverflowDividerEntry): () => void;

  update(): void;
  forceUpdate(): void;

  getSnapshot(): OverflowSnapshot;
  subscribe(listener: () => void): () => void;
}
```

This is the smallest contract that materially changes the current bridge behavior rather than merely making the engine look cleaner.

### Ideal future `OverflowManager`

The ideal version may later add:

```ts
registerItem(item: OverflowItemEntry): OverflowItemHandle;
registerDivider(divider: OverflowDividerEntry): OverflowDividerHandle;
```

where the returned handles support `update()` and `unregister()`.

This remains a second-order improvement, not part of the immediate target.

### Lifecycle boundaries

The desired lifecycle boundaries are:

1. pure construction

- `createOverflowManager()`
- no cleanup required

2. configuration

- `setOptions()`
- no external connection implied

3. container observation

- `observe(container)` returns observation cleanup

4. menu attachment

- `attachOverflowMenu(element)` returns detach cleanup

5. item registration

- `registerItem(item)` returns unregister cleanup

6. divider registration

- `registerDivider(divider)` returns unregister cleanup

7. subscription

- `subscribe(listener)` returns unsubscribe cleanup

This is the corrected desired model.

### 2. Bridge-facing snapshot

The bridge-facing snapshot should be normalized and React-friendly.

```ts
type OverflowSnapshot = {
  hasOverflow: boolean;
  overflowCount: number;
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
};
```

Current recommendation:

- `hasOverflow` is useful and cheap
- `overflowCount` should be first-class because the engine already knows invisible item count
- `itemVisibility` and `groupVisibility` are the most stable bridge-facing structures

By default, raw `visibleItems` and `invisibleItems` should not be treated as the bridge-facing canonical snapshot shape.

### 3. Bridge ownership model

The desired bridge state is:

- the bridge remains the stable React boundary
- the bridge does not own canonical overflow state
- the bridge adapts engine-owned state into React usage patterns
- the bridge stops compensating for engine lifecycle weakness

In other words:

- engine owns overflow truth
- bridge owns React integration and ergonomics

### 4. `useOverflowContainer`

The desired `useOverflowContainer` shape is:

- one long-lived manager instance per overflow container
- `setOptions()` used for configuration changes
- `observe(container)` used for observation setup with paired cleanup
- `attachOverflowMenu(element)` used for menu attachment with paired cleanup
- registration helpers exposed for item and divider wiring through paired cleanup boundaries
- manager returned explicitly for downstream bridge usage

A likely internal bridge-facing return shape is:

```ts
type UseOverflowContainerReturn<TElement extends HTMLElement> = {
  containerRef: React.RefObject<TElement | null>;
  manager: OverflowManager;
  registerItem(item: OverflowItemEntry): () => void;
  registerDivider(divider: OverflowDividerEntry): () => void;
  registerOverflowMenu(element: HTMLElement): () => void;
  updateOverflow(): void;
};
```

This keeps current registration ergonomics while making manager ownership explicit.

Internally, this implies a different lifecycle model from the current implementation:

- the manager should not be created in render and then destroyed on unmount as if those were symmetrical operations
- instead, the manager should be treated as a pure inert object, and runtime connections should be established and torn down through paired boundaries
- `useOverflowContainer` should own the manager reference, but not collapse all cleanup into one terminal manager teardown path

### 5. `Overflow.tsx`

The desired `Overflow.tsx` state is:

- thin wrapper around manager lifecycle and context wiring
- no primary mirrored overflow state ownership
- still exposes `onOverflowChange`
- still composes refs and classes
- still provides React-friendly composition surface

So `Overflow.tsx` should remain important, but it should stop behaving like a second canonical state owner.

### 6. Context

The desired context state is:

- manager-in-context, not snapshot-in-context as the primary model
- registration helpers remain in context for migration-friendly ergonomics

The target shape is:

```ts
type OverflowContextValue = {
  manager: OverflowManager;
  registerItem(item: OverflowItemEntry): () => void;
  registerDivider(divider: OverflowDividerEntry): () => void;
  registerOverflowMenu(element: HTMLElement): () => void;
  updateOverflow(): void;
};
```

This preserves the current practical API shape while keeping ownership explicit.

The important nuance is that these bridge registration helpers remain bridge ergonomics, not canonical lifecycle primitives. Under the corrected model they should be thin wrappers over engine APIs that already provide paired cleanup.

### 7. Subscription helper layer

The bridge should have one small internal selector-based subscription helper.

Conceptually:

```ts
function useOverflowSelector<T>(selector: (snapshot: OverflowSnapshot) => T): T;
```

Its job is to:

1. obtain the manager from context
2. subscribe to the manager
3. read `getSnapshot()`
4. apply the selector
5. let React re-render when the selected value changes

Current recommendation on equality:

- keep selector results narrow enough that `Object.is`-style stability is usually sufficient
- avoid a broad custom equality layer unless profiling proves it is necessary

### 8. State-reading hooks

The desired hook model is:

- `useOverflowVisibility()` selects full visibility structures from the manager snapshot
- `useIsOverflowItemVisible(id)` selects one item visibility flag
- `useIsOverflowGroupVisible(id)` selects one group visibility value
- `useOverflowCount()` reads a first-class `overflowCount` from the manager snapshot

These hooks should stop reading bridge-owned mirrored context state.

### 9. Registration hooks and components

The desired registration model in the viable state is:

- public component APIs stay stable
- registration helpers continue to exist for bridge ergonomics
- internal registration should map onto paired engine registration boundaries first

If later evidence shows metadata churn is still a first-order problem, then handle-based registration can be added as the next engine step.

### 10. Public API stance

The desired near-term public API stance is:

- no required component-level breaking changes
- `Overflow`, `OverflowItem`, and `OverflowDivider` remain stable
- current props remain stable
- current children-based composition remains stable

Breaking changes are only justified later if the team intentionally decides to redesign public ergonomics, not as a side effect of fixing engine and bridge ownership.

## What improves immediately with the viable engine contract

If the viable future `OverflowManager` existed, these bridge problems improve immediately:

1. manager recreation on option changes
2. attachment and configuration being entangled
3. callback-only engine state access
4. the bridge being forced to act as the only stable state publisher
5. menu attachment awkwardness as a lifecycle concern
6. the need to model manager lifetime cleanup as one monolithic teardown path

## What still remains bridge-owned after that

Even under the viable engine contract, these still remain bridge-side questions:

- final React subscription granularity
- context propagation strategy
- whether broad snapshot reads are acceptable
- whether menu behavior still needs any secondary bridge modeling
- whether a future hook-first public API is worth pursuing

These are now secondary questions rather than architectural blockers.

## Remaining narrow decisions

At this point, the remaining questions are narrow and implementation-shaped.

### 1. Do we need custom selector equality?

Current recommendation:

- not by default
- keep selections narrow first
- only add broader equality support if profiling proves it necessary

### 2. Should raw `visibleItems` / `invisibleItems` remain available anywhere?

Current recommendation:

- not as the bridge-facing canonical snapshot shape
- they may still exist as internal engine data or secondary outputs if later needed

### 3. Does ideal handle-based registration still matter?

Current recommendation:

- yes, but explicitly second-order
- only pursue it if metadata churn remains a meaningful bridge cost after the viable engine contract is in place

## Final current conclusion

The current desired state is:

1. a long-lived, incrementally configurable, readable, and subscribable `OverflowManager`
2. a normalized bridge-facing snapshot containing `hasOverflow`, `overflowCount`, `itemVisibility`, and `groupVisibility`
3. a bridge that remains the stable React boundary without re-owning canonical overflow state
4. `useOverflowContainer` as the stable owner of one manager instance
5. manager-in-context with registration helpers
6. a small bridge subscription helper layer
7. state-reading hooks that subscribe/select from manager-owned state
8. no required public component-level breaking changes for the viable transition

And, critically:

9. pure manager construction should not itself require cleanup
10. every runtime connection should have paired local cleanup
11. the normal desired design should not depend on a monolithic `destroy()` to compensate for blurred lifecycle boundaries

This is the current basis for implementation discussions.

## Exit condition

This document should shrink over time.

When a conclusion becomes stable enough to be treated as truth, it should move into either the engine spec or the bridge spec.

The success condition is that this document eventually disappears because the two specs are good enough to stand on their own.
