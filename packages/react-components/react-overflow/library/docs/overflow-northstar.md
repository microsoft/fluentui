# Overflow Northstar

This document now tracks only the remaining delta after the lifecycle-boundary refactor.

It is not the source of truth for current behavior. Current behavior is described by:

- `overflow-algorithm.md` for the engine
- `react-overflow-react-bridge.md` for the React bridge

The long-term goal is still to delete this document once the remaining open decisions have either been resolved or absorbed into the two specs.

## What is complete

The viable refactor that originally motivated this document is now implemented.

Completed pieces:

1. the engine contract is now centered on a long-lived `OverflowManager`
2. pure construction is separated from runtime connections
3. `setOptions()` is independent from observation
4. `observe(container)` returns cleanup instead of coupling configuration to observation
5. `attachOverflowMenu(element)` returns cleanup
6. `registerItem(item)` and `registerDivider(divider)` return cleanup
7. the engine publishes canonical readable state through `getSnapshot()` and `subscribe()`
8. `useOverflowContainer()` now keeps one manager instance per container and configures it incrementally
9. selector-based state-reading hooks now subscribe to manager-owned snapshot state
10. the component-level public API remains stable
11. `Overflow.tsx` and `OverflowContext` no longer republish mirrored visibility state through the provider

Those conclusions are now part of current truth and should be read primarily from the engine and bridge specs.

## Current state summary

Today the system is best understood like this:

1. the engine owns canonical overflow truth
2. the bridge owns React integration and ergonomics
3. the engine contract now has paired cleanup boundaries instead of a monolithic teardown model
4. the bridge has adopted manager subscription as its primary state-reading path
5. the provider layer is now manager-and-registration only, while selector hooks remain the external-store readers

## Remaining open questions

The remaining questions are narrower than the original refactor.

### 1. Should the bridge keep the menu follow-up update path?

`useOverflowMenu()` still calls `updateOverflow()` after the menu becomes layout-participating.

This is understandable and correct today, but it remains a second-phase bridge feedback loop that may or may not deserve further simplification.

### 2. Should lower-level removal helpers stay public on the engine surface?

The current implementation still exposes `removeItem()`.

That is compatible with the cleanup-boundary model, but it is not part of the minimal desired shape that originally motivated the northstar. The remaining question is whether it should remain as a low-level escape hatch or be folded away later.

### 3. Do ideal registration handles still matter?

The viable cleanup-returning API is in place.

The remaining question is whether handle-based registration such as:

```ts
registerItem(item): OverflowItemHandle;
registerDivider(divider): OverflowDividerHandle;
```

still buys enough to justify another engine step.

Current recommendation:

- not yet
- only revisit this if metadata churn becomes a meaningful remaining cost

### 4. Do we need custom selector equality?

Current recommendation remains:

- not by default
- keep selections narrow first
- only add broader equality support if profiling proves it necessary

## What no longer belongs here

The following are no longer northstar-only conclusions because they are now implemented:

- pure manager construction should not itself require cleanup
- runtime connections should have paired local cleanup
- the manager should expose canonical snapshot state and generic subscription
- the bridge should use one long-lived manager per container
- state-reading hooks should subscribe to manager-owned state

Those points now belong in the engine and bridge specs, not here.

## Exit condition

This file should disappear once the remaining questions above are either:

1. resolved in code and moved into the two specs, or
2. intentionally rejected as unnecessary follow-up work

At that point, the engine spec and bridge spec should be able to stand on their own without a third design ledger.
